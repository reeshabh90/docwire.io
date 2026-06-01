import "./section6.css";
import React, { useEffect, useRef } from "react";
import Link from '@docusaurus/Link';

const properties = [
    {
        label: "C++20 native",
        detail: "No runtime dependencies. No garbage collector. Full control over memory and execution.",
    },
    {
        label: "Cross-platform",
        detail: "Linux, Windows, macOS. Tested on every supported platform in CI on every release.",
    },
    {
        label: "On-premise by default",
        detail: "No data leaves your infrastructure. Designed from the ground up for air-gapped and regulated environments.",
    },
    {
        label: "Open-source core",
        detail: "Apache 2.0 licensed core. Commercial licence available for closed-source deployment. No lock-in.",
    },
    {
        label: "LTS available",
        detail: "Long-Term Support agreements for teams that need API stability across multi-year programmes.",
    },
];

const codeExample = `path("record.pdf")
  | content_type::detector{}
  | office_formats_parser{}
  | PlainTextExporter()
  | out_stream;`;

function Section6() {
    const headerRef = useRef(null);
    const bodyRef = useRef(null);
    const codeRef = useRef(null);
    const propsRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const targets = [
            headerRef.current,
            bodyRef.current,
            codeRef.current,
            propsRef.current,
            ctaRef.current,
        ].filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("revealed");
                    else entry.target.classList.remove("revealed");
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="s6__section section">

            {/* Heading */}
            <div ref={headerRef} className="s6__header scroll-reveal reveal-up">
                <h2 className="s6__title text-display">Infrastructure, not a wrapper.</h2>
            </div>

            {/* Body copy */}
            <div ref={bodyRef} className="s6__body scroll-reveal reveal-up" style={{ "--delay": "80ms" }}>
                <p>
                    Most document processing tools are wrappers: Python bindings around some 3rd party library,
                    held together by cloud infrastructure and a prayer. When they
                    fail in production, you inherit an unwanted architecture debt.
                </p>
                <p className="s6__body-key">
                    DocWire is different. It is a composable C++20 SDK — a set of reusable,
                    auditable building blocks that wire directly into your application. You control
                    the parsing chain. You control memory ownership. You control how data flows
                    from ingestion to output, without hidden allocations, background services, or
                    black-box transformations.
                </p>
                <p className="s6__body-lead">The pipe operator model makes pipelines readable and extensible:</p>
            </div>

            {/* Code block */}
            <div ref={codeRef} className="s6__code-block scroll-reveal reveal-up" style={{ "--delay": "140ms" }}>
                <pre><code>{codeExample}</code></pre>
                <p className="s6__code-caption">
                    Every element in the chain is open-source, testable, and replaceable. You can
                    add custom parsers, transformers, or exporters without modifying the core.
                    This is what infrastructure ownership looks like.
                </p>
            </div>

            {/* Key properties */}
            <div ref={propsRef} className="s6__properties scroll-reveal reveal-up" style={{ "--delay": "180ms" }}>
                {properties.map((p) => (
                    <div key={p.label} className="s6__property">
                        <span className="s6__property-label text-ui">{p.label}</span>
                        <span className="s6__property-detail">{p.detail}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Section6;