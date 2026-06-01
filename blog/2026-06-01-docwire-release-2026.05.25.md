---
title: DocWire SDK 2026.05.25
authors: krzysztof
tags: [release, license, content-type]
---
The latest Docwire release 2026.05.25 has two substantive changes.

### License: GPLv2 → AGPLv3
DocWire SDK moves from GPLv2 to the GNU Affero General Public License v3.0.
The practical differences matter. AGPLv3 closes the "SaaS loophole" — under GPLv2, a company could run DocWire as a networked service without releasing their source code. AGPLv3 requires that network users also receive source. Beyond that, AGPLv3 includes explicit patent grants protecting users from litigation by contributors, is compatible with Apache License 2.0 which broadens ecosystem integration, and uses more internationally enforceable legal language.
For internal tooling, research, and open-source projects: nothing changes. For proprietary networked services, AGPLv3 is not compatible with closed-source deployment under its open-source terms. DocWire is dual-licensed — a commercial license is available for organizations that need to deploy without AGPLv3 obligations
### Content Type Detection: Heuristic Pipeline
Content type detection is where document processing pipelines fail quietly. The symptom is wrong output or silent failures; the cause is usually a file that doesn't match what libmagic expects — wrong extension, missing metadata, or a non-seekable network stream.
This release introduces specialized heuristic detectors for images (BMP, WEBP) and ZIP-based containers (OOXML, ODF formats — DOCX, XLSX, PPTX). The approach: check local file headers in the first 4KB before falling back to deep inspection. This specifically addresses detection failures on non-seekable streams with libmagic 5.47+, where the previous approach regressed.
Two additional fixes come with this: MIME type normalization now standardizes legacy types returned by libmagic to modern IANA standards (e.g. text/xml → application/xml), and when multiple MIME types have identical confidence scores, the result is now alphabetically deterministic rather than platform-dependent.
Test Infrastructure
The monolithic api_tests.cpp has been split into focused files (core_tests.cpp, error_tests.cpp, log_tests.cpp, etc.), and all unit tests now run from a single docwire_tests binary. The practical effect is significantly reduced overhead during full test cycles under Valgrind.

[Full release notes](github.com/docwire/docwire/releases/tag/2026.05.25)