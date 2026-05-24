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
    return (
        <div className="docwire__header section">

            <h1 className="docwire__header-h1 text-display">
                DocWire SDK: Award-winning modern data processing in C++20
            </h1>

            <div className="docwire__header-content">

                <div className="docwire__header-text">

                    <p className="docwire__header-description">
                        DocWire is a powerful data extraction tool that converts
                        unstructured documents into searchable and editable data.
                        Powered by Tesseract OCR, it handles PDFs, images,
                        MS Office files, emails, and attachments with high
                        accuracy and performance.
                    </p>

                    <div className="docwire__header-ctas">
                        <a
                            href="https://github.com/docwire/docwire/releases"
                            className="button-pill"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download SDK
                        </a>

                        <Link
                            to="/contact-us"
                            className="button-pill docwire__header-cta-secondary"
                        >
                            Contact Us
                        </Link>
                    </div>

                </div>

                <HeroSlideshow />

            </div>
        </div>
    );
}

export default HomeHeader;