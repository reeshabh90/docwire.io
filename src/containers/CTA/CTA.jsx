import './cta.css';
import React from "react";

function CTA() {
    return (
            <div className='docwire__cta-background section card'>
                <div className='docwire__cta-background_banner'>
                    <div className='docwire__cta-content'>
                        <h3>Public Releases</h3>
                        <p className="text-lead">Download the latest release and start building with our powerful SDK. Available under AGPLv3 for open source, with commercial options for closed-source projects.</p>
                    </div>
                </div>
                <a href="https://github.com/docwire/docwire/releases" target="_blank" rel="noreferrer" className="docwire__cta-button button-pill">View Releases</a>
            </div>
    )
}

export default CTA;