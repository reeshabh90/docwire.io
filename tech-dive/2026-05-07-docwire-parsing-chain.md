---
title: Build Docwire Pipe-chain in 6 easy steps
authors: reeshabh
tags: [C++20, compile time, optimization]
---

## Introduction
[Docwire's](https://docwire.io/) is a powerful data extraction tool, developed on Modern C++, that converts text from nearly all known file formats into searchable and editable data. Powered by the Tesseract OCR engine, DocWire is a solution for digitizing text from many image types, MS Office files, e-mails, or e-mail attachments. DocWire outputs data to plain text that may be transmitted for further processing.

One of the interesting aspects of Docwire SDK is its ability to process documents locally (or even make an OpenAI API call) through a series of customizable steps that can be added or removed as per requirements. For example, consider the following code example ():
```cpp
std::filesystem::path("data_processing_definition.doc") | content_type::detector{} | office_formats_parser{} | PlainTextExporter() | out_stream;
```

In the above pipeline processing, a document is being picked, its content type is being detected, and accordingly, a required parser is being applied, and then the text output is being exported. Now, if we wish, we can add additional steps in the pipeline, for example:
```cpp
std::filesystem::path("data_processing_definition.doc") | content_type::detector{} | office_formats_parser{} | PlainTextExporter() | local_ai::model_chain_element("Translate to spanish:\n\n") | out_stream;
```

🔗Docwire Code examples can be accessed at this [link](https://docwire.readthedocs.io/en/latest/examples.html).

Now, we have added a local model to translate the text in the document to Spanish and then stream the output. It seems as if the product is moving on a conveyor belt, and necessary customizations can be applied, such that output of the previous step acts as an input of the next step, exactly how a pipeline chain would work. In software terms, this emulates exactly how the Unix pipe operator `|` works in the terminal.

Not only is this feature cool, but the engineering behind its implementation is also praiseworthy. However, before we dive into the exact implementation, we try to build the intuition as usual:

We are trying to build a processing pipeline. The element to be processed can be of various types, as Docwire itself supports more than 100+ file formats. However, for the sake of brevity, we take the simplest example and keep the focus on how the pipe chaining works. 

## 1st Step
We start by defining the entity we want to process, and we keep it simple:

```cpp
/**
 * A simple Message struct or `class`
 */
struct Message {
  virtual ~Message() = default;
};

struct StartMessage : Message {};
struct TextMessage : Message {
  std::string text;
  TextMessage(std::string t) : text(std::move(t)) {}
};
struct EndMessage : Message {};
```

We have defined a base entity and various types of such entities, and based on the types, the parsing steps will decide how to act. 

*_Note_*: <u>In C++, classes are nothing but structs. I have taken the approach of structs here, as the intention is to keep the implementation short and minimal.</u>

The intended behavior is as follows:

A message entity will be passed around and at each stage of parsing/processing in the pipeline, based on the processing result, it will be decided what output to forward to the next step, or whether we need to propagate something upstream, such as errors or cancellations.

## 2nd Step
So, we define the respective structure first to capture such behaviors, and then we define the structure for chain elements, the base entity that will ensure the necessary behaviors are inherited by different chain elements while parsing/processing.
```cpp
// Whether to continue or not
enum class Continue { Yes, No };

//Aliases
using Msg = std::shared_ptr<Message>;
using Callback = std::function<Continue(Msg)>;

// Whether to forward a message or bubble out
struct MessageCallbacks {
  Callback front;
  Callback back;
};

// Structure of a basic pipeline chain element
struct ChainElement {
  // the main processing function which will be custom implemented by respective Chain Elements
  virtual Continue process(Msg msg, MessageCallbacks next) = 0;
  // If yes: element consumes message and propagate
  virtual bool is_generator() const { return false; }
  // If yes: element consumes message but does not propagate
  virtual bool is_leaf() const { return false; }
  // Destructor
  virtual ~ChainElement() = default;
};
```
## 3rd Step
Now, we define different parsing chain elements:
```cpp
struct SimpleParser : ChainElement {

  bool is_generator() const override { return true; }
  Continue process(Msg msg, MessageCallbacks next) override {
    if (dynamic_cast<StartMessage *>(msg.get())) {
      std::cout << "Parser reading file...\n";

      next.front(std::make_shared<TextMessage>("Hello "));
      next.front(std::make_shared<TextMessage>("DocWire "));
      next.front(std::make_shared<TextMessage>("Pipeline!"));
      next.front(std::make_shared<EndMessage>());
      return Continue::Yes;
    }
    return next.front(msg);
  }
};

struct TextFilter : ChainElement {
  bool is_generator() const override { return false; }
  Continue process(Msg msg, MessageCallbacks next) override {
    if (!dynamic_cast<TextMessage *>(msg.get()))
      return Continue::No;
    return next.front(msg);
  }
};

struct TextExporter : ChainElement {
  bool is_leaf() const override { return true; }
  Continue process(Msg msg, MessageCallbacks) override {
    if (auto t = dynamic_cast<TextMessage *>(msg.get()))
      std::cout << "Exported: " << t->text << "\n";
    return Continue::Yes;
    ;
  }

};
```
*_Note_*: <u>TextExporter is a leaf node in this chain; it does not propagate the message forward. We can treat it as the last step of finishing the pipeline processing.</u>

However, there is one piece which is missing: how do we chain the pipeline through the `|` operator, and more importantly, are we going to use references of elements in the processing chain, or are we going to own them?
## 4th Step
```cpp
/**
 * A Class template to own or borrow references
 */
template <typename T> class ref_or_owned {
  std::shared_ptr<T> owned;
  T *ref = nullptr;

  // move ownership of a heap object into owned,
  //  and we store a raw pointer alias (ref) for fast, uniform access.
public:
  // reference
  ref_or_owned(T &t) : ref(&t) {}

  // owned
  ref_or_owned(std::shared_ptr<T> t) : owned(std::move(t)), ref(owned.get()) {}

  T &get() { return *ref; }
  const T &get() const { return *ref; }
};
```

In C++, objects can come from different places:
Example 1:
```cpp
auto parser = std::make_shared<SimpleParser>();
// This means that the program is responsible for keeping it alive
// Multiple parts of the program can safely share it
```

Example 2:
```cpp
SimpleParser parser;
// The object lives somewhere else, and we are just borrowing it.
```

Our pipeline should be supporting both cases; hence, we have a helper class template `ref_or_owned`  which does not care about an object being borrowed or owned. For a borrowed object, it stores a reference, and for an owned object, it takes ownership and keeps it alive.

## 5th Step
Now, we define the structure for a basic parsing engine that inherits the properties of a Chain element, but its job is to couple two chain elements, which we refer to as lhs (left side element of processing chain or the element whose output will serve as input to the next) and rhs (right side element of processing chain). 

For example, if we write: parser 1 | parser 2, this means that the output of `parser 1` will be fed to the output of `parser 2`, upon which it will do further processing.
```cpp
// Shared object pointer
using Element = std::shared_ptr<ChainElement>;

// Basic Parsing engine
struct ParsingChain : ChainElement {
  // should handle elements whether borrowed or owned
  ref_or_owned<ChainElement> lhs;
  ref_or_owned<ChainElement> rhs;

  // Constructors
  ParsingChain(Element a, Element b) : lhs(std::move(a)), rhs(std::move(b)) {}
  ParsingChain(ChainElement &a, ChainElement &b) : lhs(a), rhs(b) {}
  ParsingChain(ref_or_owned<ChainElement> a, ref_or_owned<ChainElement> b)
      : lhs(a), rhs(b) {}

  bool is_generator() const override { return lhs.get().is_generator(); }

  bool is_leaf() const override { return rhs.get().is_leaf(); }

 // Processes the `msg` arriving at the chain, and passes it to `lhs`
 // When `lhs` wants to propagate the message, it redirects to `rhs`
  Continue process(Msg msg, MessageCallbacks cb) override {
    MessageCallbacks lhs_cb{
    // front of lhs → rhs
                            [&](Msg m) { return rhs.get().process(m, cb); },
                            // back of lhs → back of chain
                            cb.back};
    return lhs.get().process(msg, lhs_cb);
  }
};
```

Apart from handling Chain elements in its constructor, the above structure also facilitates the processing of elements and their chaining from one stage to another.

## 6th Step
Now, we need to make use of the `|` operator to do the chaining for our cause and execute the pipeline once it is complete.
```cpp
Element operator|(Element a, Element b) {
  return std::make_shared<ParsingChain>(a, b);
}

Element operator|(ChainElement &a, ChainElement &b) {
  return std::make_shared<ParsingChain>(a, b);
}

ParsingChain operator|(ref_or_owned<ChainElement> a,
                       ref_or_owned<ChainElement> b) {
  ParsingChain chain{a, b};

  if (chain.is_generator() && chain.is_leaf()) {
    chain.process(std::make_shared<StartMessage>(),
                  MessageCallbacks{[](Msg) { return Continue::Yes; },
                                   [](Msg) { return Continue::Yes; }});
  }

  return chain;
}
```

The 3rd overload of the `|` operator basically checks if the pipeline has both a generator and the leaf nodes, and if the answer is affirmative, it automatically starts execution of the pipeline.
## Conclusion
And our feature is ready, which can be tested via the following program (given here for just reference):
```cpp
int main() {
  SimpleParser parser;
  TextFilter filter;
  TextExporter exporter;
  // auto chain = parser | filter | exporter;

  // chain.process(std::make_shared<StartMessage>(),
  //               [](Msg) { return Continue::Yes; });

  auto chain = std::make_shared<SimpleParser>() |
               std::make_shared<TextFilter>() |
               std::make_shared<TextExporter>();

  MessageCallbacks root{[](Msg) { return Continue::Yes; },
                        [](Msg) { return Continue::Yes; }};

  chain->process(std::make_shared<StartMessage>(), root);
}
```

📎 Following is the link to the actual Docwire implementation of this feature:
- https://github.com/docwire/docwire/blob/master/src/parsing_chain.h
- https://github.com/docwire/docwire/blob/master/src/parsing_chain.cpp
