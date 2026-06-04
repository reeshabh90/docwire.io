import './section4.css';
import React, { useState, useEffect, useRef } from "react";
import { formatGroups } from '../../../data/supportedFormatsData';

const VISIBLE = 3;

function Section4() {
    const [startIndex, setStartIndex] = useState(0);
    const [trackKey, setTrackKey]     = useState(0);
    const total = formatGroups.length;

    const headerRef   = useRef(null);
    const carouselRef = useRef(null);
    const dotsRef     = useRef(null);

    // ── Scroll-reveal ─────────────────────────────────────────────────────────
    useEffect(() => {
        const targets = [headerRef.current, carouselRef.current, dotsRef.current].filter(Boolean);
        if (!targets.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("revealed");
                    else entry.target.classList.remove("revealed");
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // ── Navigation — one function handles both arrows and dot clicks ──────────
    const navigateTo = (index) => {
        setStartIndex((index + total) % total);
        setTrackKey((k) => k + 1);
    };

    // ── Visible window ────────────────────────────────────────────────────────
    const visibleCards = Array.from({ length: VISIBLE }, (_, i) =>
        formatGroups[(startIndex + i) % total]
    );

    return (
        <div className="s4__band">
            <div className="s4__section section">

                {/* Header */}
                <div ref={headerRef} className="s4__header scroll-reveal reveal-up">
                    <h2 className="s4__title text-display">100+ formats. Zero approximations.</h2>
                    <p className="s4__subtitle text-lead">
                        From enterprise documents to regulated medical formats. DocWire parses
                        what other libraries refuse or approximate.
                    </p>
                </div>

                {/* Carousel */}
                <div
                    ref={carouselRef}
                    className="s4__carousel scroll-reveal reveal-up"
                    style={{ "--delay": "120ms" }}
                >
                    <button
                        className="s4__arrow"
                        onClick={() => navigateTo(startIndex - 1)}
                        aria-label="Previous formats"
                    >‹</button>

                    <div key={trackKey} className="s4__track">
                        {visibleCards.map((group) => (
                            <div key={group.groupName} className="s4__card-border">
                                <div className="s4__card card">
                                    <div className="s4__card-icon"><group.icon /></div>
                                    <h4 className="s4__card-name">{group.groupName}</h4>
                                    <p className="s4__card-formats">{group.formats.join(', ')}</p>
                                    <p className="s4__card-description">{group.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="s4__arrow"
                        onClick={() => navigateTo(startIndex + 1)}
                        aria-label="Next formats"
                    >›</button>
                </div>

                {/* Dots + counter */}
                <div
                    ref={dotsRef}
                    className="s4__footer scroll-reveal reveal-up"
                    style={{ "--delay": "200ms" }}
                >
                    <div className="s4__dots" role="tablist" aria-label="Format group navigation">
                        {formatGroups.map((_, i) => (
                            <button
                                key={i}
                                role="tab"
                                aria-selected={i === startIndex}
                                aria-label={`Format group ${i + 1}`}
                                className={`s4__dot${i === startIndex ? " active" : ""}`}
                                onClick={() => navigateTo(i)}
                            />
                        ))}
                    </div>
                    <p className="s4__counter" aria-live="polite">
                        {startIndex + 1} – {((startIndex + VISIBLE - 1) % total) + 1} of {total} format groups
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Section4;