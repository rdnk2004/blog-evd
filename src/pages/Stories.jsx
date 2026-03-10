import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SectionDivider from '../components/SectionDivider';
import { useContent } from '../context/ContentContext';
import './Stories.css';

const useReveal = () => {
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

const Stories = () => {
    const { stories, sectionDescs } = useContent();
    const [activeStory, setActiveStory] = useState(null);
    useReveal();

    const desc = sectionDescs?.stories || {};

    if (activeStory) {
        return (
            <div className="story-reader">
                <div className="container--narrow">
                    <button className="back-btn" onClick={() => { setActiveStory(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        ← Back to Stories
                    </button>
                    <div className="story-full">
                        <h1 className="story-full-title">{activeStory.title}</h1>
                        <p className="story-full-desc"><em>{activeStory.description}</em></p>
                        <div className="story-body">
                            {activeStory.fullText.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                        <p className="story-sig">— DeepaRam</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="stories-page">
            <PageBanner
                title="Short Stories"
                subtitle={desc.subtitle || 'Narratives woven from small, significant human moments'}
                quote={desc.quote || 'Every story begins with a single moment of noticing.'}
            />
            <section className="stories-section">
                <div className="container">
                    <div className="stories-grid">
                        {stories.map((story, i) => (
                            <article key={story.id} className="story-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                                <div className="story-num">{String(i + 1).padStart(2, '0')}</div>
                                <h2 className="story-card-title">{story.title}</h2>
                                <p className="story-card-desc">{story.description}</p>
                                <button className="btn" onClick={() => { setActiveStory(story); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                    Read Story
                                </button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Stories;
