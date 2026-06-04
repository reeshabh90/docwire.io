import "./section5.css";
import React, { useEffect, useRef } from "react";

const pillars = [
    {
        number: "01",
        title: "Deterministic execution",
        body: "No hidden allocations. No garbage-collection pauses. No unpredictable latency spikes. DocWire gives you absolute control over memory ownership and CPU execution paths. Your pipeline does exactly what you tell it to do — consuming the same time and memory on every run, every time.",
    },
    {
        number: "02",
        title: "Auditable by design",
        body: "Every extraction is traceable to its source — document, field, value. Security teams and compliance auditors can verify exactly how data was handled at every step. Because DocWire's pipelines are mathematically rigorous and open-source, traceability is not an issue for regulatory compliance.",
    },
    {
        number: "03",
        title: "Optimised for the edge",
        body: "We do not treat memory and CPU as infinite resources. DocWire is engineered for constrained environments — from enterprise servers to smartwatches, WebAssembly, and autonomous vehicles. We minimise binary bloat and optimise for CPU cache, so you can deploy enterprise-grade data processing to lightweight, low-power devices without sacrificing speed.",
    },
    {
        number: "04",
        title: "Resilient against chaos",
        body: "Real-world data is corrupted, malformed, and undocumented. When DocWire encounters an unknown format or a broken file, it does not crash — it degrades gracefully, applying fallback rules to safely extract maximum fidelity data. You get stability in production, not surprises.",
    },
];

function Section5() {
    const headerRef = useRef(null);
    const cardRefs = useRef([]);

    // Header reveal
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.classList.add("revealed");
                else el.classList.remove("revealed");
            },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Card reveals — staggered
    useEffect(() => {
        const els = cardRefs.current.filter(Boolean);
        if (!els.length) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("revealed");
                    else entry.target.classList.remove("revealed");
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    return (
        <div className="s5__section section">

            {/* Header */}
            <div ref={headerRef} className="s5__header scroll-reveal reveal-up">
                <h2 className="s5__title text-display">Four pillars. No compromise.</h2>
            </div>

            {/* Pillar cards — 2 × 2 grid */}
            <div className="s5__grid">
                {pillars.map((p, i) => (
                    <div
                        key={p.number}
                        ref={(el) => (cardRefs.current[i] = el)}
                        className="s5__card-border scroll-reveal reveal-up"
                        style={{ "--delay": `${i * 90}ms` }}
                    >
                        <div className="s5__card card">
                            <span className="s5__card-number text-ui">{p.number}</span>
                            <h3 className="s5__card-title">{p.title}</h3>
                            <p className="s5__card-body">{p.body}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Section5;