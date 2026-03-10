import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import SectionDivider from '../components/SectionDivider';
import './GuestReflections.css';

const initialReflections = [
    {
        id: 1,
        name: 'Priya S.',
        date: 'March 2026',
        text: 'Reading "Before the World Woke" at 5am with a cup of coffee felt like the poem was written for exactly that moment. Some words find you precisely when you need them to.',
    },
    {
        id: 2,
        name: 'A Quiet Reader',
        date: 'February 2026',
        text: 'The story about the cartographer moved me to tears. I lost my father last year, and reading about the hand-drawn map of a life felt like an act of recognition. Thank you.',
    },
    {
        id: 3,
        name: 'Ravi Shankar M.',
        date: 'January 2026',
        text: 'I have been to Tiruvannamalai many times. Your account of the circumambulation — the part about thoughts becoming quieter near a larger body of water — captures something I had felt but could never articulate. I am grateful someone found the words.',
    },
];

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

const GuestReflections = () => {
    const [reflections, setReflections] = useState(initialReflections);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    useReveal();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim() || text.trim().length < 10) {
            setError('Please share a reflection of at least a few words.');
            return;
        }
        setError('');
        const newReflection = {
            id: Date.now(),
            name: name.trim() || 'A Quiet Visitor',
            date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
            text: text.trim(),
        };
        setReflections(prev => [newReflection, ...prev]);
        setName('');
        setText('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="reflections-page">
            <PageBanner
                title="Guest Reflections"
                subtitle="A shared journal — leave your thoughts, carry someone else's"
                quote="In sharing what moves us, we discover we are not alone."
            />

            <section className="reflections-section">
                <div className="container--narrow">

                    {/* Form */}
                    <div className="reflection-form-wrap reveal">
                        <h2 className="form-heading">Leave Your Reflection</h2>
                        <p className="form-subheading">
                            <em>This space is an open journal. Write whatever this corner of the world brought to the surface.</em>
                        </p>

                        {submitted && (
                            <div className="form-success" role="alert">
                                ✦ &ensp; Your reflection has been added. Thank you for sharing.
                            </div>
                        )}

                        <form className="reflection-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="ref-name">Your name <span>(optional)</span></label>
                                <input
                                    id="ref-name"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Or leave blank to share anonymously"
                                    maxLength={60}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ref-text">Your reflection <span>*</span></label>
                                <textarea
                                    id="ref-text"
                                    value={text}
                                    onChange={e => setText(e.target.value)}
                                    placeholder="What did you feel? What did you remember? What did you notice?"
                                    rows={6}
                                    maxLength={1000}
                                    required
                                />
                                {error && <p className="form-error" role="alert">{error}</p>}
                                <p className="char-count">{text.length} / 1000</p>
                            </div>
                            <button type="submit" className="btn">Share Reflection</button>
                        </form>
                    </div>

                    <SectionDivider variant="leaf" />

                    {/* Reflections list */}
                    <h2 className="reflections-list-title reveal">Shared Reflections</h2>
                    <div className="reflections-list">
                        {reflections.map((r) => (
                            <article key={r.id} className="reflection-entry reveal">
                                <div className="reflection-meta">
                                    <span className="reflection-name">{r.name}</span>
                                    <span className="reflection-date">{r.date}</span>
                                </div>
                                <p className="reflection-text">{r.text}</p>
                            </article>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default GuestReflections;
