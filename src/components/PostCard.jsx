import React from 'react';
import './PostCard.css';

const PostCard = ({ title, excerpt, date, category, readTime }) => {
    return (
        <article className="post-card fade-in">
            <div className="post-meta">
                <span className="post-category">{category}</span>
                <span className="meta-separator">•</span>
                <span className="post-date">{date}</span>
            </div>

            <h2 className="post-title">
                <a href="#read">{title}</a>
            </h2>

            <p className="post-excerpt">{excerpt}</p>

            <div className="post-footer">
                <a href="#read" className="read-more">Read Entry <span>→</span></a>
                <span className="read-time">{readTime}</span>
            </div>
        </article>
    );
};

export default PostCard;
