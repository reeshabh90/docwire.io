---
title: DocWire SDK 2026.07.07
authors: krzysztof
tags: [release, license, content-type]
---
Welcome one and all to the Release Update 2026.07.07 of the DocWire SDK.

The latest DocWire release 2026.07.07 brings forth a substantial change to how DocWire integrates with Local AI subsystem, and SDK code base has gone through changes to provide extensive naming standardization, which aligns as per the project's coding guidelines. 


Following are the key changes which highlight this release:
### Llama.cpp Integration
DocWire now integrates with `llama.cpp` natively as an optional layer, which gives the SDK user flexibility to set up inference pipelines with GGUF-based models locally. By default, DocWire ships `IBM Granite 4.0 1B Q8_0` GGUF model, a compact yet capable LLM, but this is also optional. SDK user can easily set up their own models using our `ai_runner` interface.

### Modular AI Backends
Keeping up with the introduction of the feature above, The Local AI runtime is now split into separate optional libraries, based on `CTranslate2` and `Llama.cpp`. On top of that, a lot of convenience classes for jobs such as `Summarization, Translation, etc`. has been introduced, so that SDK user can easily set up the tasks by binding to a runner of choice, either using `CTranslate2` or `Llama.cpp`.


### Adherence to Coding Guidelines 
DocWire remains committed to its principles of delivering a standard and trustworthy software, which can serve as a building block for high-performance, predictable, and auditable data processing. And in order to do so, we have set certain [coding guidelines](https://github.com/docwire/docwire/blob/master/doc/coding_guidelines.md) which aim to maintain sanity, structure and standard in the code being accepted in DocWire ecosystem based on the principles advocated by pioneers of C++, such as Bjarne Stroustrup, Herb Stutter, etc. In this release, we have also started taking directions in this path, as we have improved the naming conventions of C++ entities (class/struct/enum) to follow `snake_case`. Watch out this space as we are actively working to bring the codebase in proper alignment with the standards set. We shall be writing about them explicitly in our [Technical Blog Section](http://localhost:3000/docwire.io/tech-dive).

### Mailio Crash Prevention 
The EML parser’s BoundaryTracker now handles prematurely closed multipart sections and injects empty parts when necessary, and thus preventing a crash in the underlying `mailio` library. DocWire's motive is to support the parsing of files as cleanly as possible, without the user getting affected by unexpected crashes coming from corner cases.

[Full release notes](https://github.com/docwire/docwire/releases/tag/2026.05.25)