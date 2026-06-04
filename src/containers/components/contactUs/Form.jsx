import './form.css'
import { useState, useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import emailjs from '@emailjs/browser'

/*
  subject → Reason option value mapping.
  Matches the query params set in SectionCTA and the footer links.
*/
const SUBJECT_MAP = {
    "Commercial+Licence+Enquiry": "License",
    "Commercial Licence Enquiry": "License",
    "LTS+Agreement+Enquiry": "Support",
    "LTS Agreement Enquiry": "Support",
    "Demo": "Demo",
    "Pricing": "Pricing",
    "SDK+Questions": "SDK Questions",
    "SDK Questions": "SDK Questions",
    "Support": "Support",
    "Other": "Other",
};

function Form() {
    const location = useLocation();

    const [formValues, setFormValues] = useState({
        reason: "",
        name: "",
        email: "",
        message: ""
    });

    const [isFormVisible, setIsFormVisible] = useState(true);
    const [State, setState] = useState("");

    // Pre-select Reason from ?subject= query param
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subject = params.get("subject");
        if (subject) {
            const mapped = SUBJECT_MAP[subject] || SUBJECT_MAP[decodeURIComponent(subject)] || "";
            if (mapped) {
                setFormValues((prev) => ({ ...prev, reason: mapped }));
            }
        }
    }, [location.search]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    function handleOnSubmit(e) {
        e.preventDefault();
        setIsFormVisible(false);
        emailjs.sendForm(
            'service_vxi20hi',
            'template_m1jh747',
            e.target,
            '-4RMv_gPIISLilkg8'
        ).then(res => {
            console.log(res);
            setState("success");
        }).catch(err => {
            setState("fail");
            console.log(err);
        });
    }

    return (
        <>
            {isFormVisible ? (
                <form id="email-form" name="email-form" method="POST" action="" onSubmit={handleOnSubmit}>
                    <h2>I want to ask about...</h2>
                    <select
                        id="Reason"
                        name="Reason"
                        className="select text-ui"
                        value={formValues.reason}
                        onChange={e => setFormValues({ ...formValues, reason: e.target.value })}
                    >
                        <option value="" disabled={!!formValues.reason}>Select one...</option>
                        <option value="Demo">Demo</option>
                        <option value="License">License</option>
                        <option value="Pricing">Pricing</option>
                        <option value="SDK Questions">SDK Questions</option>
                        <option value="Support">Support</option>
                        <option value="Other">Other</option>
                    </select>
                    <input
                        type="text" id="name" name="name"
                        className="input text-ui" maxLength="256" placeholder="Name"
                        onChange={handleChange} required
                    />
                    <input
                        type="email" id="email" name="email"
                        className="input text-ui" maxLength="256" placeholder="Email"
                        onChange={handleChange} required
                    />
                    <textarea
                        id="message" name="message"
                        className="textarea text-ui" placeholder="Your message ..."
                        onChange={handleChange} required
                    />
                    <input
                        type="submit" value="Send request"
                        className="submitButton button-pill"
                        disabled={State === "loading"}
                    />
                </form>
            ) : (
                <div className="FormAccepted">
                    <p className="AcceptedParagraph text-ui">
                        {State === "success"
                            ? "Message has been sent :)"
                            : State === "fail"
                                ? "Something went wrong. Please try again later."
                                : "Sending..."}
                    </p>
                </div>
            )}
        </>
    );
}

export default Form;