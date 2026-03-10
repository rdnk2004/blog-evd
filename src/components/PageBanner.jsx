import React from 'react';
import './PageBanner.css';

const PageBanner = ({ title, subtitle, quote }) => {
    return (
        <div className="page-banner">
            <div className="container page-banner-inner text-center">
                {quote && (
                    <p className="banner-quote"><em>"{quote}"</em></p>
                )}
                <h1 className="banner-title">{title}</h1>
                {subtitle && (
                    <p className="banner-subtitle">{subtitle}</p>
                )}
                <div className="banner-ornament" aria-hidden="true">
                    <span className="banner-line" />
                    <svg width="24" height="15" viewBox="0 0 32 20" fill="none">
                        <path d="M16 1 C10 5, 2 8, 1 14 C4 18, 10 16, 16 10 C22 16, 28 18, 31 14 C30 8, 22 5, 16 1Z" fill="currentColor" />
                    </svg>
                    <span className="banner-line" />
                </div>
            </div>
        </div>
    );
};

export default PageBanner;
