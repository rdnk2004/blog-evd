import React, { useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SectionDivider from '../components/SectionDivider';
import { useContent } from '../context/ContentContext';
import './SpiritualExperiences.css';

const useReveal = () => {
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
            }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

const SpiritualExperiences = () => {
    const { experiences, sectionDescs } = useContent();
    useReveal();

    const desc = sectionDescs?.spiritual || {};

    return (
        <div className="spiritual-page">
            <PageBanner
                title="Spiritual Experiences"
                subtitle={desc.subtitle || 'Moments where the veil between ordinary and sacred grew thin'}
                quote={desc.quote || 'The divine does not announce itself. It simply waits to be noticed.'}
            />

            <section className="spiritual-section">
                <div className="container--narrow">
                    {experiences.map((exp, i) => (
                        <React.Fragment key={exp.id}>
                            <article className="spiritual-card reveal">
                                <div className="spiritual-number">{String(i + 1).padStart(2, '0')}</div>
                                <h2 className="spiritual-title">{exp.title}</h2>
                                <blockquote className="spiritual-opening">{exp.openingQuote}</blockquote>
                                <div className="spiritual-story">
                                    {exp.story.split('\n\n').map((para, j) => (
                                        <p key={j}>{para}</p>
                                    ))}
                                </div>
                                <div className="spiritual-closing">
                                    <p className="closing-text"><em>{exp.closing}</em></p>
                                    <p className="closing-sig">— DeepaRam</p>
                                </div>
                            </article>
                            {i < experiences.length - 1 && <SectionDivider variant="diya" />}
                        </React.Fragment>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SpiritualExperiences;
