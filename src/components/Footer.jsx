import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            {/* Ornamental top border */}
            <div className="footer-ornament" aria-hidden="true">
                <span className="foot-line" />
                <svg className="foot-leaf" width="36" height="22" viewBox="0 0 32 20" fill="none">
                    <path d="M16 1 C10 5, 2 8, 1 14 C4 18, 10 16, 16 10 C22 16, 28 18, 31 14 C30 8, 22 5, 16 1Z" fill="currentColor" />
                </svg>
                <span className="foot-line" />
            </div>

            <div className="container footer-inner">
                {/* Brand */}
                <div className="footer-brand">
                    <h2 className="footer-logo">DeepaRam</h2>
                    <p className="footer-tagline">
                        <em>Where silence writes its own poetry.</em>
                    </p>
                    {/* Diya symbol */}
                    <div className="footer-diya" aria-hidden="true">
                        <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="14" cy="30" rx="10" ry="3.5" fill="currentColor" opacity="0.15" />
                            <path d="M14 26 C14 17, 5 14, 7 8 C9 3, 19 3, 21 8 C23 14, 14 17, 14 26Z" fill="currentColor" opacity="0.2" />
                            <line x1="14" y1="5" x2="14" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M11 3 Q14 0 17 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Navigation columns */}
                <div className="footer-nav">
                    <div className="footer-col">
                        <h3 className="footer-col-title">Explore</h3>
                        <ul>
                            <li><Link to="/poetry">Poetry</Link></li>
                            <li><Link to="/spiritual">Spiritual Experiences</Link></li>
                            <li><Link to="/stories">Short Stories</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h3 className="footer-col-title">Discover</h3>
                        <ul>
                            <li><Link to="/gallery">Art Gallery</Link></li>
                            <li><Link to="/about">About the Author</Link></li>
                            <li><Link to="/reflections">Guest Reflections</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    &copy; {new Date().getFullYear()} DeepaRam.
                    &ensp;·&ensp;
                    <em>Crafted with stillness and intention.</em>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
