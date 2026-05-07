import "./homehaveyouever.css";
import React, { useState, useEffect, useRef, useCallback } from "react";

// Import your images here
import MailImage from '../../../assets/slanted-mail-p-800.png'
import ExtractText from '../../../assets/ocr.png'
import ParseData from '../../../assets/parse-data.png'
import SDKFlow from '../../../assets/sdk-workflow.png'
import Email from '../../../assets/email-parse.png'

const items = [
    {
        text: "Utilize OCR and extract text data from images, PDFs, and scanned documents without the need for manual input?",
        image: ExtractText, 
        alt: "Extracting text from a scanned image",
        placeholder: "Image / document text extraction",
    },
    {
        text: "Automatically parse through and extract important data from incoming emails, such as customer information or order details?",
        image: Email,
        alt: "Parsing incoming emails for structured data",
        placeholder: "Email parsing & data capture",
    },
    {
        text: "Parse through a large amount of documents and extract specific data points, such as dates, names, or product numbers, with ease?",
        image: ParseData,
        alt: "Extracting dates, names and product numbers at scale",
        placeholder: "Bulk document data-point extraction",
    },
    {
        text: "Integrate a data extraction SDK into your workflow to streamline processes and increase efficiency for your team?",
        image: SDKFlow,
        alt: "Docwire SDK wired into a development workflow",
        placeholder: "SDK integrated into any pipeline",
    },
];

function HomeHaveYouEver() {
    const [active, setActive] = useState(0);
    const [hovered, setHovered] = useState(null);
    const itemRefs = useRef([]);
    const observerRef = useRef(null);

    const displayedActive = hovered !== null ? hovered : active;

    const handleIntersection = useCallback((entries) => {
        let bestIndex = -1;
        let bestRatio = -1;

        entries.forEach((entry) => {
            const index = itemRefs.current.indexOf(entry.target);
            if (index === -1) return;

            if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
                bestRatio = entry.intersectionRatio;
                bestIndex = index;
            }
        });

        if (bestIndex !== -1 && hovered === null) {
            setActive(bestIndex);
        }
    }, [hovered]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(handleIntersection, {
            rootMargin: "-20% 0px -25% 0px",
            threshold: [0, 0.3, 0.6, 1],
        });

        itemRefs.current.forEach((el) => {
            if (el) observerRef.current.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [handleIntersection]);

    const handleMouseEnter = (index) => setHovered(index);
    const handleMouseLeave = () => setHovered(null);

    return (
        <div className="docwire__haveyouever-section section">
            <h2 className="docwire__haveyouever-title">Have you ever wanted to:</h2>

            <div className="docwire__haveyouever-body">
                {/* Left: scrollable bullet list */}
                <ul className="docwire__haveyouever-list">
                    {items.map((item, i) => (
                        <li
                            key={i}
                            ref={(el) => (itemRefs.current[i] = el)}
                            className={`docwire__haveyouever-item text-lead ${
                                i === displayedActive ? "active" : ""
                            }`}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="docwire__haveyouever-item_bar" aria-hidden="true" />
                            <span className="docwire__haveyouever-item_text">{item.text}</span>
                        </li>
                    ))}
                </ul>

                {/* Right: Sticky Slideshow */}
                <div className="docwire__haveyouever-sticky-panel">
                    <div className="docwire__haveyouever-slideshow_track">
                        {items.map((item, i) => (
                            <div
                                key={i}
                                className={`docwire__haveyouever-slide ${
                                    i === displayedActive ? "active" : ""
                                }`}
                                aria-hidden={i !== displayedActive}
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.alt}
                                        className="docwire__haveyouever-slide-image"
                                    />
                                ) : (
                                    <div className="docwire__haveyouever-slide_placeholder">
                                        <span>{item.placeholder}</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="docwire__haveyouever-dots">
                        {items.map((_, i) => (
                            <span
                                key={i}
                                className={`docwire__haveyouever-dot ${
                                    i === displayedActive ? "active" : ""
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <p className="docwire__haveyouever-text">
                Our cutting-edge data extraction SDK offers advanced capabilities for extracting text and data from a
                wide range of sources, including images, PDFs, emails, and iWork files. With powerful OCR technology
                and advanced document parsing features, our software is optimized for fast and accurate data extraction
                and document parsing.
            </p>
        </div>
    );
}

export default HomeHaveYouEver;