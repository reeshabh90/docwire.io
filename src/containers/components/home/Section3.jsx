import "./section3.css";
import React, { useEffect, useRef } from "react";
import Link from '@docusaurus/Link';

const capabilities = [
    {
        id: "local",
        label: "Local AI Models",
        summary: "Fully on-premise inference",
        description:
            "Built-in local models run without any cloud dependency. Classification, summarisation, translation, entity extraction, and embedding — no API calls, no data egress.",
    },
    {
        id: "openai",
        label: "OpenAI Integration",
        summary: "Cloud workloads, single interface",
        description:
            "Direct integration with the OpenAI API for workloads that can use cloud services: GPT-4o, o3, and the full model family. Summarise, classify, translate, or embed via a single pipe chain element.",
    },
    {
        id: "rag",
        label: "RAG-Ready Output",
        summary: "Embeddings and retrieval built in",
        description:
            "Structured chunking and embedding interfaces are built in. DocWire prepares document data for retrieval-augmented generation, semantic search, and vector database ingestion — without custom glue code.",
    },
];

const introParagraphs = [
    "Every enterprise AI initiative stalls at the same point: raw documents cannot be fed directly into a model. Dirty PDFs, broken HL7 segments, skewed DICOM scans, multi-level email archives — none of these are LLM-ready without pre-processing.",
    "Feeding unstructured input directly into a model is not just slow and expensive. In regulated industries, it is a compliance failure waiting to happen.",
    "DocWire is the orchestration layer between your raw documents and your AI models. It ingests, parses, normalises, and structures data from 100+ formats into clean, chunked, embeddings-ready output — on-premise, without cloud dependency, with a full audit trail.",
];

function Section3() {
    const paraRefs = useRef([]);
    const cardRefs = useRef([]);
    const ctaRef = useRef(null);

    // Staggered fade-up for intro paragraphs
    useEffect(() => {
        const els = paraRefs.current.filter(Boolean);
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
            { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Staggered fade-up for capability cards
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

    // CTA reveal
    useEffect(() => {
        const el = ctaRef.current;
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

    return (
        <div className="s3__section section">
            <div className="s3__header">
                <p className="s3__eyebrow text-ui">AI Integration</p>
                <h2 className="s3__title">The layer your AI pipeline is missing.</h2>
            </div>

            <div className="s3__body">
                {/* Left: staggered intro paragraphs */}
                <div className="s3__intro">
                    {introParagraphs.map((text, i) => (
                        <p
                            key={i}
                            ref={(el) => (paraRefs.current[i] = el)}
                            className="s3__intro-para scroll-reveal reveal-up"
                            style={{ "--delay": `${i * 120}ms` }}
                        >
                            {text}
                        </p>
                    ))}
                </div>

                {/* Right: capability cards */}
                <div className="s3__cards">
                    {capabilities.map((cap, i) => (
                        <div
                            key={cap.id}
                            ref={(el) => (cardRefs.current[i] = el)}
                            className="s3__card card scroll-reveal reveal-up"
                            style={{ "--delay": `${i * 100}ms` }}
                        >
                            <div className="s3__card_top">
                                <span className="s3__card_label text-ui">{cap.label}</span>
                                <span className="s3__card_summary">{cap.summary}</span>
                            </div>
                            <p className="s3__card_description">{cap.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div
                ref={ctaRef}
                className="s3__cta scroll-reveal reveal-up"
            >
                <a href="https://docwire.readthedocs.io/en/latest/examples.html"
                    className="button-pill"
                    target="_blank"
                    rel="noopener noreferrer">
                    See AI Integration Docs
                </a>


            </div>
        </div>
    );
}

export default Section3;