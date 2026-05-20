import './supportedFormats.css';
import React, { useState, useEffect, useCallback } from "react";
import { formatGroups } from '../../../data/supportedFormatsData';

const VISIBLE = 3;   // cards visible at once on desktop
const INTERVAL_MS = 3500;

function SupportedFormats() {
    const [startIndex, setStartIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const total = formatGroups.length;

    const next = useCallback(() => {
        setStartIndex((p) => (p + 1) % total);
    }, [total]);

    const prev = () => {
        setStartIndex((p) => (p - 1 + total) % total);
    };

    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, INTERVAL_MS);
        return () => clearInterval(t);
    }, [paused, next]);

    // Build the visible window — wraps around the array
    const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
        formatGroups[(startIndex + i) % total]
    );

    return (
        <div className="docwire__supported-formats-container section">
            <div className="docwire__supported-formats_header">
                <h2 className="text-display">One SDK, All Formats</h2>
                <p className="text-lead">
                    No matter if it's scanned reports or structured Excel sheets, the Docwire SDK helps you
                    identify and extract the data you need from virtually any file type.
                </p>
            </div>

            {/* ── Carousel ── */}
            <div
                className="docwire__formats-carousel"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Prev arrow */}
                <button
                    className="docwire__formats-arrow docwire__formats-arrow--prev"
                    onClick={prev}
                    aria-label="Previous formats"
                >
                    ‹
                </button>

                {/* Visible cards */}
                <div className="docwire__formats-carousel_track">
                    {visibleCards.map((group, i) => (
                        <div key={group.groupName} className="docwire__format-group-card_container">
                            <div className="docwire__format-group-card card">
                                <div className="docwire__format-icon">
                                    <group.icon />
                                </div>
                                <h4 className="docwire__format-group-name">{group.groupName}</h4>
                                <p className="docwire__format-group-formats">
                                    {group.formats.join(', ')}
                                </p>
                                <p className="docwire__format-group-description">
                                    {group.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Next arrow */}
                <button
                    className="docwire__formats-arrow docwire__formats-arrow--next"
                    onClick={next}
                    aria-label="Next formats"
                >
                    ›
                </button>
            </div>

            {/* Dot indicators */}
            <div className="docwire__formats-dots" role="tablist" aria-label="Format group navigation">
                {formatGroups.map((_, i) => (
                    <button
                        key={i}
                        role="tab"
                        aria-selected={i === startIndex}
                        aria-label={`Format group ${i + 1}`}
                        className={`docwire__formats-dot${i === startIndex ? " active" : ""}`}
                        onClick={() => setStartIndex(i)}
                    />
                ))}
            </div>

            {/* Counter */}
            <p className="docwire__formats-counter" aria-live="polite">
                {startIndex + 1} – {((startIndex + VISIBLE - 1) % total) + 1} of {total} format groups
            </p>
        </div>
    );
}

export default SupportedFormats;