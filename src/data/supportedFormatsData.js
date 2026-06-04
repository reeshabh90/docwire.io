import {
    BsMicrosoft,
    BsFileEarmarkText,
    BsGlobe,
    BsEnvelope,
    BsCardImage,
    BsApple,
    BsArchive,
    BsCodeSlash,
    BsDatabase,
    BsFileEarmarkPdf,
    BsHospital,
} from "react-icons/bs";

export const formatGroups = [
    {
        groupName: "Medical",
        icon: BsHospital,
        formats: ["DICOM (DCM)", "HL7"],
        description:
            "Production-tested parsing for healthcare data formats. DICOM scan metadata extraction and HL7 message segment traversal — validated for HIPAA-regulated environments.",
    },
    {
        groupName: "Email & Mailboxes",
        icon: BsEnvelope,
        formats: ["PST", "OST", "EML"],
        description:
            "Full Outlook mailbox traversal including PST and OST archives. EML with nested attachments parsed recursively — complete email chain reconstruction.",
    },
    {
        groupName: "Microsoft Office",
        icon: BsMicrosoft,
        formats: ["DOCX", "XLSX", "PPTX", "DOC", "XLS", "XLSB", "PPT", "RTF"],
        description:
            "Office Open XML and legacy binary formats. Tables, embedded objects, and metadata extracted with full fidelity — including XLSB binary workbooks.",
    },
    {
        groupName: "OpenOffice / LibreOffice",
        icon: BsFileEarmarkText,
        formats: ["ODT", "ODS", "ODP"],
        description:
            "Complete support for the ISO-standard Open Document Format used across LibreOffice, OpenOffice, and government document systems worldwide.",
    },
    {
        groupName: "PDF",
        icon: BsFileEarmarkPdf,
        formats: ["PDF"],
        description:
            "Native PDF parsing with layout reconstruction. Handles encrypted, malformed, and multi-column documents. OCR fallback for scanned pages with full metadata extraction.",
    },
    {
        groupName: "Web",
        icon: BsGlobe,
        formats: ["HTML", "HTM", "CSS"],
        description:
            "Structure-aware HTML parsing that strips boilerplate and preserves semantic hierarchy — handles malformed markup without pipeline failure.",
    },
    {
        groupName: "Images & OCR",
        icon: BsCardImage,
        formats: ["JPG", "JPEG", "JFIF", "BMP", "PNM", "PNG", "TIFF", "WEBP"],
        description:
            "Built-in OCR engine in over 100 languages. Converts scanned images and embedded raster content into machine-readable text with skew correction.",
    },
    {
        groupName: "Apple iWork",
        icon: BsApple,
        formats: ["PAGES", "NUMBERS", "KEY"],
        description:
            "Full extraction from Apple's office suite formats — documents, spreadsheets, and presentations — without requiring macOS or iCloud.",
    },
    {
        groupName: "Archives",
        icon: BsArchive,
        formats: ["ZIP", "TAR", "RAR", "GZ", "BZ2", "XZ"],
        description:
            "Recursive archive traversal — unpacks nested containers and processes every file within, regardless of depth. No pre-extraction step required.",
    },
    {
        groupName: "Source Code",
        icon: BsCodeSlash,
        formats: ["C", "CPP", "CS", "JAVA", "JS", "PHP", "PY", "GO", "and more"],
        description:
            "Syntax-aware extraction from a wide variety of programming and script files — for code search, licence scanning, IP auditing, and AI training pipelines.",
    },
    {
        groupName: "Structured Data",
        icon: BsDatabase,
        formats: ["XML", "CSV", "JSON", "YAML", "ODFXML", "MD", "LOG"],
        description:
            "Schema-tolerant parsing for tabular and hierarchical data formats. Handles inconsistent delimiters, nested structures, and malformed records without failure.",
    },
];