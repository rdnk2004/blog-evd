import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SectionDivider from '../components/SectionDivider';
import { useContent } from '../context/ContentContext';
import './Home.css';

/* ── Scroll-reveal hook ── */
function useReveal() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('active');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.15 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/* ── Category Card Data ── */
const categories = [
    { to: '/poetry', icon: '✦', title: 'Poetry', desc: 'Verses born in silence and stillness' },
    { to: '/spiritual', icon: '☽', title: 'Spiritual Experiences', desc: 'Sacred moments and inner revelations' },
    { to: '/stories', icon: '◈', title: 'Short Stories', desc: 'Tales woven from feeling and memory' },
    { to: '/gallery', icon: '◯', title: 'Art Gallery', desc: 'A visual sanctuary of the soul' },
    { to: '/about', icon: '✧', title: 'About the Author', desc: 'The voice behind the words' },
];

const Home = () => {
    const { poems, homeContent } = useContent();
    useReveal();

    // The most recently added poem (first in array) is the featured reflection
    const featuredPoem = poems[0];

    return (
        <div className="home-page">
            {/* Hero */}
            <Hero />

            {/* Welcome Introduction */}
            <section className="welcome-section">
                <div className="container--narrow text-center">
                    <p className="welcome-quote reveal">
                        <em>{homeContent?.welcomeQuote || '"This is a quiet corner of reflections where poetry, stories, spiritual experiences, and art come together."'}</em>
                    </p>
                    <p className="welcome-body reveal">
                        {homeContent?.welcomeBody || 'Each piece is born from moments of stillness, nature, and inner contemplation. This space invites readers to pause, breathe, and connect with the gentle whispers of the soul.'}
                    </p>
                </div>
            </section>

            <SectionDivider variant="diya" />

            {/* Featured Reflection */}
            {featuredPoem && (
                <section className="featured-section">
                    <div className="container--narrow">
                        <div className="section-label reveal">Featured Reflection</div>
                        <div className="featured-card reveal">
                            <div className="featured-meta">Poetry &ensp;·&ensp; Latest</div>
                            <h2 className="featured-title">{featuredPoem.title}</h2>
                            <p className="featured-excerpt">
                                {featuredPoem.text.split('\n').slice(0, 6).join('\n').split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                                ))}
                                ...
                            </p>
                            <Link to="/poetry" className="btn">Read More</Link>
                        </div>
                    </div>
                </section>
            )}

            <SectionDivider variant="leaf" />

            {/* Categories */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title text-center reveal">Explore the Space</h2>
                    <p className="section-subtitle text-center reveal">
                        Each corner holds a different kind of quiet.
                    </p>
                    <div className="categories-grid">
                        {categories.map((cat, i) => (
                            <Link
                                key={cat.to}
                                to={cat.to}
                                className="cat-card reveal"
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                <span className="cat-icon" aria-hidden="true">{cat.icon}</span>
                                <h3 className="cat-title">{cat.title}</h3>
                                <p className="cat-desc">{cat.desc}</p>
                                <span className="cat-arrow">→</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
