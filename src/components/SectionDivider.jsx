import React from 'react';

const SectionDivider = ({ variant = 'leaf' }) => {
    return (
        <div className="section-divider" aria-hidden="true">
            <span className="divider-line" />
            {variant === 'leaf' && (
                <svg className="divider-icon" width="28" height="18" viewBox="0 0 32 20" fill="none">
                    <path d="M16 1 C10 5, 2 8, 1 14 C4 18, 10 16, 16 10 C22 16, 28 18, 31 14 C30 8, 22 5, 16 1Z" fill="currentColor" />
                </svg>
            )}
            {variant === 'diya' && (
                <svg className="divider-icon" width="22" height="28" viewBox="0 0 28 34" fill="none">
                    <ellipse cx="14" cy="30" rx="10" ry="3.5" fill="currentColor" opacity="0.25" />
                    <path d="M14 26 C14 17, 5 14, 7 8 C9 3, 19 3, 21 8 C23 14, 14 17, 14 26Z" fill="currentColor" opacity="0.35" />
                    <line x1="14" y1="5" x2="14" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 3 Q14 0 17 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
            )}
            {variant === 'dots' && (
                <span className="divider-dots">· · ·</span>
            )}
            <span className="divider-line" />

            <style>{`
        .section-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          margin: 3rem 0;
          color: var(--sandalwood);
        }
        .divider-line {
          display: block;
          width: 80px;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--border));
        }
        .divider-line:last-child {
          background: linear-gradient(to left, transparent, var(--border));
        }
        .divider-icon { color: var(--sandalwood); opacity: 0.6; }
        .divider-dots {
          font-size: 1.2rem;
          letter-spacing: 0.3em;
          color: var(--sandalwood);
          opacity: 0.7;
        }
      `}</style>
        </div>
    );
};

export default SectionDivider;
