import './usecases.css';
import React from "react";
import { data } from '../../data/showcaseData';
import Link from '@docusaurus/Link';

/*
  Per-client context overlay.
  Keyed by linkName so it doesn't require changes to showcaseData.
  Harpo entry uses a neutral fallback pending client confirmation.
*/
const clientContext = {
    tausight: {
        sector: "Healthcare cybersecurity, USA",
        outcome: "Engaged DocWire to add DICOM and HL7 parsing to their HIPAA-compliant PHI discovery platform, enabling automated scanning of mixed medical document repositories at scale.",
    },
    pwc: {
        sector: "Professional services",
        outcome: "DocWire powers enterprise data processing workflows requiring high-volume document extraction with full auditability.",
    },
    harpo: {
        sector: "Enterprise data processing, Poland",
        outcome: "DocWire is used in production document processing workflows requiring reliable, high-fidelity text extraction.",
    },
};

function UseCases() {
    return (
        <div className="docwire__usecases section">

            {/* Section header */}
            <div className="docwire__usecases__header">
                <p className="docwire__usecases__eyebrow text-ui">Client Cases</p>
                <h2 className="docwire__usecases__title text-display">
                    Trusted in production in regulated industries.
                </h2>
            </div>

            {/* Client entries */}
            <div className="docwire__usecases__clients">
                {data.map((item, i) => {
                    const ctx = clientContext[item.linkName] || {};
                    let imageSrc = null;
                    try {
                        imageSrc = require(`../../assets/${item.image}`).default;
                    } catch (e) {}

                    return (
                        <React.Fragment key={item.linkName}>
                            {i > 0 && <div className="docwire__usecases__divider" aria-hidden="true" />}
                            <div className="docwire__usecases__client">
                                <Link to={`/showcases/${item.linkName}`} className="docwire__usecases__client-top">
                                    {imageSrc && (
                                        <div className="docwire__usecases__logo-circle">
                                            <img src={imageSrc} alt={item.companyName} />
                                        </div>
                                    )}
                                    <div className="docwire__usecases__client-meta">
                                        <span className="docwire__usecases__client-name">{item.companyName}</span>
                                        {ctx.sector && (
                                            <span className="docwire__usecases__client-sector text-ui">{ctx.sector}</span>
                                        )}
                                    </div>
                                </Link>
                                <p className="docwire__usecases__client-outcome">
                                    {ctx.outcome || item.showcasesShortInfo}
                                </p>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

        </div>
    );
}

export default UseCases;