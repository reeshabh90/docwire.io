import './homeheader.css';
import React, { useState, useEffect } from "react";
import Link from '@docusaurus/Link';

import DataFormat from '../../../assets/data-extraction.png';
import DataSecurity from '../../../assets/on-premise-security.png';

const slides = [
    {
        image: DataSecurity,
        alt: "On-premise document processing for data security",
        label: "On Premise Processing for Data Security"
    },
    {
        image: DataFormat,
        alt: "Multiple Data Format Support",
        label: "Multi-Format Files Support"
    },
];

function useLatestRelease() {
    const [version, setVersion] = useState(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/docwire/docwire/releases/latest")
            .then((r) => r.json())
            .then((data) => {
                if (data.tag_name) setVersion(data.tag_name);
            })
            .catch(() => { }); // fail silently — button still works without the badge
    }, []);

    return version;
}

function HeroSlideshow() {
    const [active, setActive] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="docwire__hero-slideshow">
            <div className="docwire__hero-slideshow_track">
                {slides.map((slide, i) => (
                    <div
                        key={i}
                        className={`docwire__hero-slide ${i === active ? 'active' : ''}`}
                        aria-hidden={i !== active}
                    >
                        <img
                            src={slide.image}
                            alt={slide.alt}
                            className="docwire__hero-slide-image"
                        />
                    </div>
                ))}
            </div>

            <p className="docwire__hero-slide-caption">
                {slides[active].label}
            </p>

            <div className="docwire__hero-slideshow_dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={`docwire__hero-dot ${i === active ? 'active' : ''}`}
                        onClick={() => setActive(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

function HomeHeader() {
    const version = useLatestRelease();

    return (
        <div className="docwire__header section">

            <h1 className="docwire__header-h1 text-display">
                DocWire SDK: Deterministic, Auditable, and Secure Data Processing
            </h1>
            <div className="docwire__header-content">

                <div className="docwire__header-text">

                    <p className="docwire__header-description">
                        DocWire is a foundation layer for modern information workflows,
                        enabling deterministic extraction, retrieval and processing of unstructured data at scale.
                        With support for 100+ file formats, built-in OCR, and secure AI integration,
                        it transforms documents into reliable, searchable, and editable data
                        for extraction, retrieval, and inference pipelines. 
                        <br></br><u>Native C++20.</u> <b>No compromises on computational speed.</b>
                    </p>

                    <div className="docwire__header-ctas">
                        <a
                            href="https://github.com/docwire/docwire/releases/latest"
                            className="button-pill docwire__release-btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {version && (
                                <span className="docwire__release-badge">{version}</span>
                            )}
                            <span className="docwire__release-label">Latest Release</span>
                        </a>

                        <Link
                            to="/contact-us"
                            className="button-pill docwire__header-cta-secondary"
                        >
                            Talk to Our Engineers
                        </Link>
                    </div>

                </div>

                <HeroSlideshow />

            </div>
        </div>
    );
}

export default HomeHeader;