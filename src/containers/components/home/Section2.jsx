import "./section2.css";
import React, { useEffect, useRef } from "react";

const scenarios = [
    {
        id: "medical",
        label: "Medical",
        text: "A medical wearable cannot drain its battery parsing a malformed data stream.",
    },
    {
        id: "compliance",
        label: "Compliance",
        text: "A compliance system cannot hallucinate an audit trail.",
    },
    {
        id: "trading",
        label: "Trading",
        text: "A trading platform cannot tolerate a garbage-collection pause at the wrong moment.",
    },
    {
        id: "autonomous",
        label: "Autonomous",
        text: "An autonomous system cannot crash because of an undocumented proprietary file format.",
    },
];

function useScrollReveal(ref, options = {}) {
    useEffect(() => {
        const els = ref.current;
        if (!els || els.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        // Don't unobserve — we want reverse animation on scroll up
                    } else {
                        entry.target.classList.remove("revealed");
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px",
                ...options,
            }
        );

        els.forEach((el) => { if (el) observer.observe(el); });
        return () => observer.disconnect();
    }, []);
}

function Section2() {
    const cardRefs = useRef([]);
    const leadRef = useRef(null);
    const closeRef = useRef(null);

    // Lead paragraph reveal
    useEffect(() => {
        const el = leadRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.classList.add("revealed");
                else el.classList.remove("revealed");
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Close paragraph reveal
    useEffect(() => {
        const el = closeRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) el.classList.add("revealed");
                else el.classList.remove("revealed");
            },
            { threshold: 0.2 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    // Cards reveal
    useEffect(() => {
        const els = cardRefs.current.filter(Boolean);
        if (els.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    } else {
                        entry.target.classList.remove("revealed");
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="s2__section section">
            <h2 className="s2__title">No Room for Guesswork</h2>

            <div className="s2__body">
                <p
                    ref={leadRef}
                    className="s2__lead text-lead scroll-reveal reveal-up"
                >
                    Most data processing stacks are built for the easy case: clean inputs,
                    unlimited cloud resources, and a human in the loop when something breaks.
                    The real world looks different.
                </p>

                <div className="s2__scenarios">
                    {scenarios.map((s, i) => (
                        <div
                            key={s.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className="s2__scenario card scroll-reveal reveal-up"
                            style={{ "--delay": `${i * 80}ms` }}
                        >
                            <span className="s2__scenario_label text-ui">{s.label}</span>
                            <p>{s.text}</p>
                        </div>
                    ))}
                </div>

                <p
                    ref={closeRef}
                    className="s2__close scroll-reveal reveal-up"
                >
                    These are not edge cases. They are the normal operating conditions of any
                    system that runs in production, at scale, in a regulated or time-critical
                    environment.{" "}
                    <strong>DocWire SDK was built for exactly these conditions.</strong>
                </p>
            </div>
        </div>
    );
}

export default Section2;