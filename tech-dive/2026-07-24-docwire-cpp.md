---
title: Why is DocWire built on C++20?
authors: reeshabh
tags: [C++20, on-premise, data security, fast computation]
---

*“Hard times create strong men, strong men create good times, good times create weak men, and weak men create hard times”* - G. Michael Hopf.

Well, the current timing being hard or easy for a person does depend on his/her perspective about life, but at DocWire, we were sure about one thing: if we are setting out to build something, it must be built to endure. There was never a doubt about the potential of DocWire as an infrastructure layer to be used by developers and enterprises to quickly spin up data processing pipelines. However, we did a lot of contemplation regarding the choice of technology underneath it.

There was always an option to build just another SDK acting as a bloated abstraction, but it would not have survived the test of time. With LLMs invading the market and cloud repatriation into the mix, along with concerns of data sovereignty and auditability, we could already see the trend shifting towards local compute, which many at the time could not foresee *(even a majority do not acknowledge this concern currently)*. 

## On-premises & Edge hold the future.
Having observed the recent outage reports of leading cloud providers such as AWS, GCP, Azure, etc., it would not be an understatement to say that the “Cloud First” approach of the 2010s was an overstated affair. The cascade of failures in the year 2025 alone is quite intimidating. In the span of 10 days in October 2025, both AWS and Microsoft Azure suffered widespread outages. The AWS outage was triggered by a DNS automation bug inside DynamoDB; the Azure outage was caused by a misconfiguration in Azure Front Door. 

In both cases, a single internal failure cascaded across dependent services globally. And the DocWire team has been reading such incidents for a long time to understand the consequences, but more importantly to zero in on what is required on the infrastructure side to navigate through such scenarios. 

One idea that stuck: <u>*“Not everything needs to go to the cloud; computation can be done locally, and only required results can be moved to the cloud”*</u>.

And then we also started noticing the concerns about data security, compliance requirements, and auditability, which furthered our belief along these lines. The compliance bodies across the globe impose such restrictions. DORA requires sovereign audit rights, and EU banks are actively repatriating cloud workloads. FedRAMP, ITAR, and classified data mandates require on-prem only. HIPAA, GDPR, and DORA don't ask whether your vendor is secure but are more concerned about whether you are in control. The US CLOUD Act is a persistent threat even for EU-resident data. Under the US Cloud Act, data hosted with US-owned hyperscalers (even in their European data centers) can theoretically be accessed by US law enforcement. Financial services regulators (SEC, OCC, FINRA) impose requirements around data retention, auditability, and third-party vendor risk management. Healthcare AI systems processing PHI must maintain the same safeguards required for any electronic health record system.

However, our concern was not just about data security, sovereignty, and compliance readiness. For a system to manage things at a larger scale in an enterprise, it has to efficiently manage workloads tied to physical processes such as manufacturing systems, trading platforms, logistics coordination, etc. And in these circumstances, latency variance creates an operational risk. While cloud computing delivers easily accessible, centralized computational power and storage, edge computing emphasizes localized, lower-latency data processing. Moreover, there is tighter control over physical resources. If another node on the network gets attacked, an isolated bare-metal environment remains stable. 

Having weighed these pros and cons, we started realizing the potential around DocWire as a solution. We wanted the enterprise (explicitly the developers) to have tighter control over their process flow. A flexibility that allows them to manage easily what needs to be done locally and decide what goes to the cloud. In essence, <u>*the idea was to give power back to the development authority involved in managing such workloads.*</u> <b>But the choice of technology to build upon remained elusive.</b>

## The Software Development Mindset

Software development has grown multifold in the last few decades, and especially with LLM coding agents in the picture, things are not the same as they used to be for a traditional developer. And it will be fair to say that the current state of software development is more about wrappers around wrappers, and architectures that care less about machine and performance but more output oriented. Performance and predictability have been tossed in favor of bloated architectures, black-box frameworks, and infinite cloud computing resources. However, such a compromise breaks down the system in a longer run and especially around stressors which the common models are not built to predict. Especially for mission-critical systems and edge computing, reliability is not a feature but a strict mathematical requirement.

*<b>DocWire has been built with the philosophy to restore “Mechanical Sympathy” and bring extreme engineering discipline back to data processing.</b>*

We chose to solve this problem at the core level rather than relying on abstractions and leaving wires tangled and loose. <u>Core Principle: Deterministic software must produce an exact result in an exact time frame, consuming exact memory and resources.</u> System memory and CPU cycles are not to be treated as infinite resources. Efficient engineering is a conservative process, and it must be respected.

## C++ 20: DocWire’s choice
With various options at hand, the choice for a solution that was being built to give power back to the developer community could not have been corrupted by notions like ease and complexity. We, at DocWire, chose to build in C++, not because we were looking at this problem from a *‘choice of language’* perspective but from an architectural perspective. C++ is chosen because no other language delivers the combination of compile-time determinism, zero-cost abstraction, direct hardware access, and memory layout control that document processing at the production edge requires.

And if one digs deeper, one can easily find out that every major production AI inference engine uses C++ at its core. Be it NVIDIA TensorRT, Meta's PyTorch C++ API, or llama.cpp, etc., they are written in C++ not by preference but by necessity. The performance per watt, the memory layout control, and the zero-overhead abstraction model that these workloads demand have no equivalent in managed runtimes.

Contrary to the narrative of C++ being a legacy language, it has survived the test of time. Its adoption has always fared well in mission-critical industries such as finance, defense, etc. And in current times, when the above-discussed problems are more evident than ever, C++ offers what other choices don't: *“Building systems that combine high-level abstraction with precise hardware control”*. 

And it is not just DocWire, which is realizing C++ potential, but even the legendary entrepreneur Elon Musk has recently acknowledged that `xAI` architecture is being written completely in C/C++. 


### What C++ offers:
#### Predictable code & performance:

Aligned with our motive to return control to the developers, C++'s greatest strength is that it gives the developers precise control over how software executes. Unlike languages such as Java, C#, JavaScript, or Python, standard C++ applications do not depend on a garbage collector, bytecode interpreter, or just-in-time (JIT) compiler. Instead, source code is compiled directly into native machine code before deployment. And the consequences are significant:

- <b>Deterministic Execution:</b>
A C++ function performs exactly the work that the programmer wrote. There is no runtime deciding when to optimize code*, relocate objects, or reclaim memory. Applications with strict timing requirements, such as financial trading systems, medical devices, autonomous robots, spacecraft, and industrial control systems, cannot tolerate random pauses caused by garbage collection. C++ avoids these pauses entirely unless a project deliberately introduces such mechanisms.
*Note: Compiler can decide about some optimizations but it is predictable. Same version of compiler, same input means same output every time, and it can be tested and guaranteed. 

- <b>Explicit memory management:</b>
Modern C++ encourages Resource Acquisition Is Initialization (RAII), smart pointers (std::unique_ptr, std::shared_ptr), stack allocation, and deterministic destruction. The reason being: Heap allocation is unpredictable even in C/C++ since the responsibility is tied to the OS. However, it is possible to manage it explicitly: preallocate larger parts of memory, place smaller objects there, and then release the whole block.[ref link: "arena allocators"]. This leads to predictable memory usage, predictable cleanup, and fewer memory leaks. 

- <b>Zero-overhead abstractions:</b>
*"What you don't use, you don't pay for. What you do use, you couldn't hand code any better."* -- Bjarne Stroustrup (while explaining C++ core design principle).

    Templates, inline functions, constexpr evaluation, move semantics, and compile-time polymorphism allow developers to build high-level abstractions that often compile down to code identical to handwritten C.

- <b>Cache-friendly programming:</b>
C++ allows developers to optimize data layout and cache locality. Few higher-level languages expose this degree of control. For a compute-intensive environment, every microsecond matters. 

#### Mature Standards
C++ does not fall under the sovereign control of a single company to maintain its standards, but the language is standardized through the International Organization for Standardization (ISO). Committee members include experts from various companies, ranging from MS, Google, Red Hat, etc. This is a major reason why C++ evolution reflects broad industry needs rather than a single vendor's priorities.

And one of the remarkable capabilities of C++ is to maintain backward compatibility. Large codebases written twenty years ago often compile with modern compilers after relatively small modifications.
#### Native Ecosystem
C++ possesses one of the richest ecosystems in software engineering, and its influence extends far beyond standalone applications. Core components of nearly every modern operating system are implemented in C or C++. Be it Windows, Linux kernel modules, Android libraries, or macOS frameworks, C++ integrates naturally. And then there is a plethora of open-source libraries offering various utilities. 

Moreover, C++ frequently acts as the performance layer beneath higher-level languages. For example, Python packages such as TensorFlow, PyTorch, OpenCV, etc. often wrap C++ libraries. And C++ comes with a mature tooling system with options in compilers, build systems, and debuggers to choose from. 
#### Proven Longevity
Created in the early 1980s, C++ remains among the world's most widely used programming languages across critical industries such as finance, aerospace, automobile, healthcare, cloud infrastructure, etc. Historically, C++ has been chosen to build infrastructure that is built to last long. 

And it is the adaptability of C++ to adopt modern language features inspired by newer languages, while maintaining compatibility, which gives it an edge. It is an actively developed language rather than just a legacy. 

<b>In a nutshell: DocWire is built on C++ to deliver Uncompromising Predictability, Auditability by Design, Edge Optimization, and Robustness against chaos.</b>

## 🔗References:
https://www.cloudzero.com/blog/aws-and-azure-outages/

https://fin.ai/learn/hipaa-gdpr-compliant-ai-agents

https://www.hbs.net/blog/cloud-repatriation-trends-cost-ai-and-the-push-towards-hybrid

https://www.citadelsecurities.com/careers/career-perspectives/why-c-is-growing-and-what-c26-means-for-production-systems/

https://arxiv.org/abs/2508.11269

https://x.com/elonmusk/status/2071385784154759468


