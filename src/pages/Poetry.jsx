import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SectionDivider from '../components/SectionDivider';
import { useContent } from '../context/ContentContext';
import './Poetry.css';

const useReveal = () => {
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
            }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

const Poetry = () => {
    const { poems, sectionDescs } = useContent();
    const [activePoem, setActivePoem] = useState(null);
    useReveal();

    const handleOpen = (poem) => {
        setActivePoem(poem);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleClose = () => setActivePoem(null);

    const desc = sectionDescs?.poetry || {};

    if (activePoem) {
        return (
            <div className="poem-reader">
                <div className="container--narrow">
                    <button className="back-btn" onClick={handleClose}>← Back to Poems</button>
                    <div className="poem-full">
                        <div className="poem-top-ornament" aria-hidden="true">
                            <svg width="24" height="15" viewBox="0 0 32 20" fill="none">
                                <path d="M16 1 C10 5,2 8,1 14 C4 18,10 16,16 10 C22 16,28 18,31 14 C30 8,22 5,16 1Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h1 className="poem-full-title">{activePoem.title}</h1>
                        <p className="poem-full-subtitle"><em>{activePoem.subtitle}</em></p>
                        <div className="poem-divider" aria-hidden="true" />
                        <pre className="poem-full-text">{activePoem.text}</pre>
                        <p className="poem-signature">— DeepaRam</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="poetry-page">
            <PageBanner
                title="Poetry"
                subtitle={desc.subtitle || 'Verses that arise from the space between breath and word'}
                quote={desc.quote || 'In stillness, even silence becomes a poem.'}
            />

            <section className="poems-section">
                <div className="container--narrow">
                    {poems.map((poem, i) => (
                        <React.Fragment key={poem.id}>
                            <article className="poem-card reveal" style={{ transitionDelay: `${i * 0.06}s` }}>
                                <div className="poem-number">{String(i + 1).padStart(2, '0')}</div>
                                <h2 className="poem-card-title">{poem.title}</h2>
                                <p className="poem-card-subtitle"><em>{poem.subtitle}</em></p>
                                <pre className="poem-preview">{poem.text.split('\n').slice(0, 4).join('\n')}...</pre>
                                <button className="btn" onClick={() => handleOpen(poem)}>Read Poem</button>
                            </article>
                            {i < poems.length - 1 && <SectionDivider variant="dots" />}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Poetry;
