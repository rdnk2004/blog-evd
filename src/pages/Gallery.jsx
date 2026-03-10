import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import { useContent } from '../context/ContentContext';
import './Gallery.css';

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

const Gallery = () => {
    const { artworks, sectionDescs } = useContent();
    const [lightbox, setLightbox] = useState(null);
    useReveal();

    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    const desc = sectionDescs?.gallery || {};

    return (
        <div className="gallery-page">
            <PageBanner
                title="Art Gallery"
                subtitle={desc.subtitle || 'Colour as contemplation — visual expressions of inner landscapes'}
                quote={desc.quote || 'What the words could not hold, the brush remembered.'}
            />

            <section className="gallery-section">
                <div className="container">
                    <div className="gallery-grid">
                        {artworks.map((art, i) => (
                            <figure
                                key={art.id}
                                className="gallery-item reveal"
                                style={{ transitionDelay: `${i * 0.07}s` }}
                                onClick={() => setLightbox(art)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View ${art.title}`}
                                onKeyDown={e => e.key === 'Enter' && setLightbox(art)}
                            >
                                <div className="gallery-img-wrap">
                                    <img
                                        src={art.src}
                                        alt={art.title}
                                        loading="lazy"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div className="gallery-overlay">
                                        <span className="gallery-expand">⊕ View</span>
                                    </div>
                                </div>
                                <figcaption className="gallery-caption">
                                    <span className="gallery-art-title">{art.title}</span>
                                    <span className="gallery-medium">{art.medium}</span>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightbox && (
                <div className="lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true">
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
                        <img
                            src={lightbox.src}
                            alt={lightbox.title}
                            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
                        />
                        <div className="lightbox-info">
                            <h3 className="lightbox-title">{lightbox.title}</h3>
                            <p className="lightbox-medium">{lightbox.medium}</p>
                            <p className="lightbox-desc">{lightbox.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
