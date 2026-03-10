import React, { useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SectionDivider from '../components/SectionDivider';
import './About.css';

const useReveal = () => {
    useEffect(() => {
        const obs = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);
};

const About = () => {
    useReveal();
    return (
        <div className="about-page">
            <PageBanner
                title="About the Author"
                subtitle="The voice behind the words"
                quote="Writing is my way of listening to what I already know."
            />

            <section className="about-section">
                <div className="container--narrow">

                    {/* Author portrait placeholder */}
                    <div className="author-portrait-wrap reveal">
                        <div className="author-portrait">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Author portrait">
                                <circle cx="40" cy="40" r="39" stroke="var(--border)" strokeWidth="1.5" fill="var(--cream)" />
                                <circle cx="40" cy="30" r="14" fill="var(--sandalwood)" opacity="0.35" />
                                <ellipse cx="40" cy="62" rx="22" ry="14" fill="var(--sandalwood)" opacity="0.2" />
                                {/* Diya at bottom of portrait */}
                                <path d="M40 55 C40 50, 34 48, 35 44 C36 41, 44 41, 45 44 C46 48, 40 50, 40 55Z" fill="var(--gold)" opacity="0.5" />
                                <line x1="40" y1="41" x2="40" y2="39" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="author-name-plate">
                            <h2>DeepaRam</h2>
                            <p><em>Poet · Writer · Artist</em></p>
                        </div>
                    </div>

                    <SectionDivider variant="leaf" />

                    {/* Bio */}
                    <div className="about-bio reveal">
                        <p>
                            DeepaRam writes from moments of stillness — those quiet intervals where the day has not yet decided what it wants to be, and the self is briefly, mercifully, undemanded. Through poetry, stories, reflections, and art, she captures experiences that often pass unnoticed in the ordinary rush: the quality of light on temple stone, the conversation between a river and its banks, the prayer that has no words.
                        </p>
                        <p>
                            Her work is rooted in the South Indian landscape — the coastal smell of salt and marigold, the particular silence of midday heat, the rituals that mark time without explaining it. But she writes for anyone who has ever felt the impulse to pause, to look more carefully, to let the world's surface open into depth.
                        </p>
                        <p>
                            She began writing poetry in her late twenties, after a period of difficulty that, she says, "taught me that language is not only for expressing what we feel but for discovering what we feel." She came to visual art later, through an unexpected afternoon with watercolours that she never quite put away.
                        </p>
                        <p>
                            She lives with a large collection of books, an unreasonable fondness for monsoon rains, and the persistent belief that every ordinary moment, looked at with enough stillness, becomes sacred.
                        </p>
                    </div>

                    <SectionDivider variant="dots" />

                    {/* Closing quote */}
                    <div className="about-closing reveal text-center">
                        <blockquote className="about-quote">
                            "I do not write to be remembered. I write so that this moment — this particular quality of afternoon, this feeling, this noticing — does not entirely disappear."
                        </blockquote>
                        <p className="about-quote-sig">— DeepaRam</p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;
