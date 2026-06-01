import "./sectionCTA.css";
import React, { useEffect, useRef } from "react";
import Link from '@docusaurus/Link';

function SectionCTA() {
    const headerRef = useRef(null);
    const bodyRef   = useRef(null);
    const ctasRef   = useRef(null);

    useEffect(() => {
        const targets = [headerRef.current, bodyRef.current, ctasRef.current].filter(Boolean);

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
        <div className="scta__band">
            <div className="scta__section section">

                <div ref={headerRef} className="scta__header scroll-reveal reveal-up">
                    <h2 className="scta__title text-display">
                        Start with the problem. We'll handle the rest.
                    </h2>
                </div>

                <div ref={bodyRef} className="scta__body scroll-reveal reveal-up" style={{ "--delay": "80ms" }}>
                    <p>
                        DocWire SDK is available as open-source under GPLv2, or under a commercial
                        licence for proprietary deployments. Long-Term Support agreements are available
                        for teams that need API stability across multi-year programmes.
                    </p>
                    <p>
                        If you are building something where failure is not an option, talk to our
                        engineers first. We can tell you within one conversation whether DocWire is
                        the right fit for your architecture — and if it is not, we will tell you that too.
                    </p>
                </div>

                <div ref={ctasRef} className="scta__ctas scroll-reveal reveal-up" style={{ "--delay": "140ms" }}>
                    {/* Primary */}
                    <Link to="/contact-us" className="button-pill scta__cta-primary">
                        Talk to Our Engineers
                    </Link>

                    {/* Secondary */}
                    <a
                        href="https://github.com/docwire/docwire"
                        className="button-pill scta__cta-secondary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Explore the SDK on GitHub
                    </a>

                    {/* Tertiary */}
                    <a
                        href="https://github.com/docwire/docwire/releases"
                        className="button-pill scta__cta-ghost"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download Latest Release
                    </a>

                    {/* Licence query */}
                    <Link
                        to="/contact-us?subject=Commercial+Licence+Enquiry"
                        className="scta__cta-text"
                    >
                        Enquire about Commercial Licence →
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default SectionCTA;