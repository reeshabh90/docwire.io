import "./wingssection.css";
import React from "react";
import Wings from "../../../assets/Wings.png";
import Link from '@docusaurus/Link';

function WingsSection() {
    return (
        <div className="docwire__wingssection-container section">
            <img
                src={Wings}
                alt="Floating Wings"
                className="docwire__wingssection-wings-img"
            />
            <h2 className="docwire__wingssection-heading">
                Docwire SDK is a light-weight, secure C++ text miner optimized for any tech stack
            </h2>
            <p className="docwire__wingssection-body text-lead">
                Docwire SDK is a light-weight, secure C++ text miner that is optimized for any tech stack. With our
                powerful libraries, you can implement lightning-fast text extraction that seamlessly blends with your
                current build, saving both time and money. Our C++ libraries are designed to handle any file format,
                including docx, PDF, and pst/ost files, making it easy to extract text from even the most complex
                documents.
            </p>
            <div className="docwire__wingssection-ctas">
                <a
                    href="https://github.com/docwire/docwire/releases"
                    className="button-pill"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Public Releases
                </a>
                <Link to="/contact-us" className="button-pill docwire__wingssection-cta-secondary">
                    Get a Licence
                </Link>
            </div>
        </div>
    );
}

export default WingsSection;