import "./unlockthepower.css";
import React from "react";
import { unlockThePowerCards } from "../../../data/unlockThePowerData";

function UnlockThePower() {
    return (
        <div className="docwire__unlockthepower-content section">
            <p className="docwire__unlockthepower-content_subheader text-lead">
                Bespoke Software
            </p>
            <h2 className="docwire__unlockthepower-content_header">
                Unlock the Power of Docwire SDK
            </h2>
            {/* Narrow the paragraph so it doesn't stretch edge-to-edge */}
            <p className="docwire__unlockthepower-content_body text-lead">
                Dealing with unstructured data can be a real hassle, but with Docwire SDK software, you can easily
                extract text from a variety of file formats. Our powerful C++ library enables lightning-fast text
                extraction from docx files, PDFs, and even pst/ost files. Our software is not only easy to use but
                also quick to deploy, saving you time and hassle. Whether you're dealing with legal documents,
                financial statements, or any other type of unstructured data, Docwire SDK has got you covered.
            </p>
            <div className="docwire__unlockthepower-content_infocard_section">
                {unlockThePowerCards.map((card, index) => (
                    <div key={index} className="docwire__unlockthepower-content_infocard_single">
                        <div className="docwire__unlockthepower-content_infocard_content card">
                            <card.icon className="lightning" />
                            <h3 className="infocard_header">{card.title}</h3>
                            <p className="infocard_paragraph">{card.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnlockThePower;