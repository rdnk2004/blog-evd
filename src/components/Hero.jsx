import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (titleRef.current) {
                titleRef.current.classList.add('animate');
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-bg" aria-hidden="true" />
            <div className="hero-overlay" aria-hidden="true" />

            <div className="hero-content" ref={titleRef}>
                {/* Decorative divider above name */}
                <div className="hero-ornament" aria-hidden="true">
                    <span className="ornament-line" />
                    <svg className="ornament-leaf" width="32" height="20" viewBox="0 0 32 20" fill="none">
                        <path d="M16 1 C10 5, 2 8, 1 14 C4 18, 10 16, 16 10 C22 16, 28 18, 31 14 C30 8, 22 5, 16 1Z" fill="currentColor" />
                    </svg>
                    <span className="ornament-line" />
                </div>

                <h1 className="hero-name">DeepaRam</h1>
                <p className="hero-tagline">
                    <em>"Reflections of the soul in quiet moments."</em>
                </p>

                <div className="hero-cta">
                    <Link to="/poetry" className="btn hero-btn">
                        Begin Reading
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" aria-hidden="true">
                <div className="scroll-mouse">
                    <div className="scroll-wheel" />
                </div>
                <span className="scroll-label">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;
