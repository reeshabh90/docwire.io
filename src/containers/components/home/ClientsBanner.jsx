import './clientsbanner.css';
import React from 'react';
import HarpoLogo from '../../../assets/Harpo logo.png'
import TausightLogo from '../../../assets/Tausight.png'
import PwCLogo from '../../../assets/PWC logo.png'


const clients = [
    { name: 'Harpo', url: 'https://int.harpo.com.pl/', image: HarpoLogo },
    { name: 'Tausight', url: 'https://www.tausight.com/', image: TausightLogo },
    { name: 'PwC Singapore', url: 'https://www.pwc.com/', image: PwCLogo },
];

const doubled = [...clients, ...clients];

function ClientsBanner() {
    return (
        <div className="docwire__clients-banner">
            <p className="docwire__clients-banner__label">Trusted by</p>

            <div className="docwire__clients-banner__track-wrap">
                <div className="docwire__clients-banner__track">
                    {doubled.map((client, i) => (
                        <a
                            key={i}
                            href={client.url}
                            className="docwire__clients-banner__item"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={client.name}
                            // Hide duplicates from screen readers and keyboard navigation
                            aria-hidden={i >= clients.length ? 'true' : undefined}
                            tabIndex={i >= clients.length ? -1 : 0}
                        >
                            {client.image
                                ? <img src={client.image} alt={client.name} />
                                : <span>{client.name}</span>
                            }
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ClientsBanner;