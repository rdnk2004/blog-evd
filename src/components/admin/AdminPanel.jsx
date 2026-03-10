import React, { useState, useRef } from 'react';
import { useContent } from '../../context/ContentContext';
import './AdminPanel.css';

// ─── Password ─────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'deeparam2024';

// ─── Section tab config ───────────────────────────────────────────────────────
const TABS = [
    { id: 'poetry', label: '✦ Poetry', icon: '✦' },
    { id: 'stories', label: '◈ Stories', icon: '◈' },
    { id: 'spiritual', label: '☽ Spiritual', icon: '☽' },
    { id: 'gallery', label: '◯ Gallery', icon: '◯' },
    { id: 'home', label: '⌂ Home Page', icon: '⌂' },
    { id: 'sections', label: '✧ Section Descriptions', icon: '✧' },
];

// ─── Reusable field components ────────────────────────────────────────────────
function Field({ label, hint, children }) {
    return (
        <div className="ap-field">
            <label className="ap-label">{label}</label>
            {hint && <p className="ap-hint">{hint}</p>}
            {children}
        </div>
    );
}

function Input({ value, onChange, placeholder, maxLength }) {
    return (
        <input
            className="ap-input"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
        />
    );
}

function Textarea({ value, onChange, placeholder, rows = 6 }) {
    return (
        <textarea
            className="ap-textarea"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
        />
    );
}

function SuccessBanner({ msg }) {
    return msg ? <div className="ap-success">✦ &ensp;{msg}</div> : null;
}

function EmptyState({ items, label }) {
    if (items.length === 0) return <p className="ap-empty">No {label} yet. Add your first one above!</p>;
    return null;
}

// ─── Poetry Form ──────────────────────────────────────────────────────────────
function PoetryForm() {
    const { poems, addPoem, deletePoem } = useContent();
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [text, setText] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');

    const handleAdd = () => {
        if (!title.trim()) { setErr('Please enter a title for the poem.'); return; }
        if (!text.trim()) { setErr('Please enter the poem text.'); return; }
        setErr('');
        addPoem({ title: title.trim(), subtitle: subtitle.trim(), text: text.trim() });
        setTitle(''); setSubtitle(''); setText('');
        setMsg('Your poem has been added to the Poetry page!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Add a New Poem</h3>
            <p className="ap-form-desc">Fill in the details below and click "Add Poem". It will appear at the top of the Poetry page and as the new Featured Reflection on the home page.</p>

            <SuccessBanner msg={msg} />
            {err && <div className="ap-error">{err}</div>}

            <Field label="Poem Title *" hint="e.g. The River That Forgot the Sea">
                <Input value={title} onChange={setTitle} placeholder="Enter the title of your poem" maxLength={120} />
            </Field>
            <Field label="Subtitle / Theme" hint="A short phrase describing what the poem is about (optional)">
                <Input value={subtitle} onChange={setSubtitle} placeholder="e.g. On stillness and remembering" maxLength={120} />
            </Field>
            <Field label="Poem Text *" hint="Type or paste your poem here. Each new line will be preserved exactly as you write it.">
                <Textarea value={text} onChange={setText} placeholder="Write your poem here..." rows={10} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleAdd}>✦ Add Poem</button>

            {poems.length > 0 && (
                <div className="ap-existing">
                    <h4 className="ap-existing-title">Existing Poems ({poems.length})</h4>
                    <p className="ap-hint">Click ✕ to remove a poem permanently.</p>
                    <ul className="ap-list">
                        {poems.map(p => (
                            <li key={p.id} className="ap-list-item">
                                <span className="ap-list-name">{p.title}</span>
                                <button className="ap-delete-btn" onClick={() => deletePoem(p.id)} title="Delete this poem">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <EmptyState items={poems} label="poems" />
        </div>
    );
}

// ─── Stories Form ─────────────────────────────────────────────────────────────
function StoriesForm() {
    const { stories, addStory, deleteStory } = useContent();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [fullText, setFullText] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');

    const handleAdd = () => {
        if (!title.trim()) { setErr('Please enter a title for the story.'); return; }
        if (!fullText.trim()) { setErr('Please enter the story text.'); return; }
        setErr('');
        addStory({ title: title.trim(), description: description.trim(), fullText: fullText.trim() });
        setTitle(''); setDescription(''); setFullText('');
        setMsg('Your story has been added to the Stories page!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Add a New Short Story</h3>
            <p className="ap-form-desc">Fill in the details below. Your story will appear at the top of the Stories page.</p>

            <SuccessBanner msg={msg} />
            {err && <div className="ap-error">{err}</div>}

            <Field label="Story Title *" hint="e.g. The Last Jar of Mango Pickle">
                <Input value={title} onChange={setTitle} placeholder="Enter the title of your story" maxLength={150} />
            </Field>
            <Field label="One-Line Description" hint="A short line shown on the story card (optional)">
                <Input value={description} onChange={setDescription} placeholder="e.g. A story about inheritance and memory" maxLength={200} />
            </Field>
            <Field label="Full Story Text *" hint="Type or paste the complete story here. Leave a blank line between paragraphs.">
                <Textarea value={fullText} onChange={setFullText} placeholder="Write your story here..." rows={12} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleAdd}>◈ Add Story</button>

            {stories.length > 0 && (
                <div className="ap-existing">
                    <h4 className="ap-existing-title">Existing Stories ({stories.length})</h4>
                    <p className="ap-hint">Click ✕ to remove a story permanently.</p>
                    <ul className="ap-list">
                        {stories.map(s => (
                            <li key={s.id} className="ap-list-item">
                                <span className="ap-list-name">{s.title}</span>
                                <button className="ap-delete-btn" onClick={() => deleteStory(s.id)} title="Delete this story">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── Spiritual Form ───────────────────────────────────────────────────────────
function SpiritualForm() {
    const { experiences, addExperience, deleteExperience } = useContent();
    const [title, setTitle] = useState('');
    const [openingQuote, setOpeningQuote] = useState('');
    const [story, setStory] = useState('');
    const [closing, setClosing] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');

    const handleAdd = () => {
        if (!title.trim()) { setErr('Please enter a title.'); return; }
        if (!story.trim()) { setErr('Please enter the experience text.'); return; }
        setErr('');
        addExperience({ title: title.trim(), openingQuote: openingQuote.trim(), story: story.trim(), closing: closing.trim() });
        setTitle(''); setOpeningQuote(''); setStory(''); setClosing('');
        setMsg('Your spiritual experience has been added!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Add a Spiritual Experience</h3>
            <p className="ap-form-desc">Share a sacred moment or inner revelation. It will appear at the top of the Spiritual Experiences page.</p>

            <SuccessBanner msg={msg} />
            {err && <div className="ap-error">{err}</div>}

            <Field label="Title *" hint="e.g. The Lamp That Stayed Lit">
                <Input value={title} onChange={setTitle} placeholder="Title of this experience" maxLength={150} />
            </Field>
            <Field label="Opening Quote" hint="A short, evocative line to begin with (optional)">
                <Input value={openingQuote} onChange={setOpeningQuote} placeholder="e.g. Not all prayers are spoken. Some are simply lived." maxLength={200} />
            </Field>
            <Field label="The Experience *" hint="Describe the experience in your own words. Leave a blank line between paragraphs.">
                <Textarea value={story} onChange={setStory} placeholder="Write your spiritual experience here..." rows={12} />
            </Field>
            <Field label="Closing Reflection" hint="A closing thought or insight from the experience (optional)">
                <Input value={closing} onChange={setClosing} placeholder="e.g. Divine grace arrives in the smallest of flames..." maxLength={300} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleAdd}>☽ Add Experience</button>

            {experiences.length > 0 && (
                <div className="ap-existing">
                    <h4 className="ap-existing-title">Existing Experiences ({experiences.length})</h4>
                    <ul className="ap-list">
                        {experiences.map(e => (
                            <li key={e.id} className="ap-list-item">
                                <span className="ap-list-name">{e.title}</span>
                                <button className="ap-delete-btn" onClick={() => deleteExperience(e.id)} title="Delete">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── Gallery Form ─────────────────────────────────────────────────────────────
function GalleryForm() {
    const { artworks, addArtwork, deleteArtwork } = useContent();
    const [title, setTitle] = useState('');
    const [medium, setMedium] = useState('');
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const fileRef = useRef();

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            setImgData(ev.target.result);
            setPreview(ev.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAdd = () => {
        if (!imgData) { setErr('Please select a painting or artwork image to upload.'); return; }
        if (!title.trim()) { setErr('Please enter a title for the artwork.'); return; }
        setErr('');
        addArtwork({ src: imgData, title: title.trim(), medium: medium.trim() || 'Mixed Media', description: description.trim() });
        setTitle(''); setMedium(''); setDescription(''); setPreview(null); setImgData(null);
        if (fileRef.current) fileRef.current.value = '';
        setMsg('Your painting has been added to the Gallery!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Add a New Painting / Artwork</h3>
            <p className="ap-form-desc">Upload an image of your painting. Any format (JPG, PNG, etc.) and any size is supported — it will be displayed beautifully in the gallery.</p>

            <SuccessBanner msg={msg} />
            {err && <div className="ap-error">{err}</div>}

            <Field label="Upload Image *" hint="Click to choose a photo of your painting from your device">
                <div className="ap-upload-wrap" onClick={() => fileRef.current?.click()}>
                    {preview ? (
                        <img src={preview} alt="Preview" className="ap-img-preview" />
                    ) : (
                        <div className="ap-upload-placeholder">
                            <span className="ap-upload-icon">🖼</span>
                            <span>Click here to choose an image</span>
                            <span className="ap-upload-sub">Supports JPG, PNG, WebP, GIF — any size</span>
                        </div>
                    )}
                </div>
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFile}
                />
                {preview && (
                    <button className="ap-btn ap-btn--ghost" onClick={() => { setPreview(null); setImgData(null); if (fileRef.current) fileRef.current.value = ''; }}>
                        ✕ Remove image
                    </button>
                )}
            </Field>

            <Field label="Title *" hint="e.g. The Lotus Meditation">
                <Input value={title} onChange={setTitle} placeholder="Title of this artwork" maxLength={150} />
            </Field>
            <Field label="Medium / Technique" hint="e.g. Watercolour, Acrylic, Pencil sketch (optional)">
                <Input value={medium} onChange={setMedium} placeholder="e.g. Watercolour" maxLength={100} />
            </Field>
            <Field label="Description" hint="A short description of the painting (optional)">
                <Textarea value={description} onChange={setDescription} placeholder="Describe what this painting means or depicts..." rows={3} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleAdd}>◯ Add to Gallery</button>

            {artworks.length > 0 && (
                <div className="ap-existing">
                    <h4 className="ap-existing-title">Existing Artworks ({artworks.length})</h4>
                    <ul className="ap-list ap-list--gallery">
                        {artworks.map(a => (
                            <li key={a.id} className="ap-list-item ap-list-item--gallery">
                                <img src={a.src} alt={a.title} className="ap-list-thumb" />
                                <span className="ap-list-name">{a.title}</span>
                                <button className="ap-delete-btn" onClick={() => deleteArtwork(a.id)} title="Delete">✕</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// ─── Home Form ────────────────────────────────────────────────────────────────
function HomeForm() {
    const { homeContent, updateHomeContent, poems } = useContent();
    const [welcomeQuote, setWelcomeQuote] = useState(homeContent.welcomeQuote);
    const [welcomeBody, setWelcomeBody] = useState(homeContent.welcomeBody);
    const [msg, setMsg] = useState('');

    const handleSave = () => {
        updateHomeContent({ welcomeQuote: welcomeQuote.trim(), welcomeBody: welcomeBody.trim() });
        setMsg('Home page text has been updated!');
        setTimeout(() => setMsg(''), 4000);
    };

    const featuredPoem = poems[0];

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Edit Home Page Text</h3>
            <p className="ap-form-desc">Change the welcome message shown on the main page. The Featured Reflection automatically shows your most recently added poem.</p>

            <SuccessBanner msg={msg} />

            <div className="ap-info-box">
                <strong>Current Featured Poem:</strong>
                <span>{featuredPoem ? featuredPoem.title : 'None yet'}</span>
                <p className="ap-hint">To change the featured poem, simply add a new poem in the Poetry tab — the newest poem is always featured.</p>
            </div>

            <Field label="Welcome Quote" hint="The italicised quote shown in the introduction section">
                <Input value={welcomeQuote} onChange={setWelcomeQuote} placeholder="Enter the welcome quote" maxLength={300} />
            </Field>
            <Field label="Welcome Body Text" hint="The paragraph below the quote">
                <Textarea value={welcomeBody} onChange={setWelcomeBody} placeholder="Enter the welcome body text..." rows={4} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleSave}>⌂ Save Home Page</button>
        </div>
    );
}

// ─── Section Descriptions Form ────────────────────────────────────────────────
function SectionsForm() {
    const { sectionDescs, updateSectionDesc } = useContent();
    const [active, setActive] = useState('poetry');
    const [subtitle, setSubtitle] = useState(sectionDescs[active]?.subtitle || '');
    const [quote, setQuote] = useState(sectionDescs[active]?.quote || '');
    const [msg, setMsg] = useState('');

    const sectionOptions = [
        { id: 'poetry', label: 'Poetry Page' },
        { id: 'spiritual', label: 'Spiritual Experiences Page' },
        { id: 'stories', label: 'Stories Page' },
        { id: 'gallery', label: 'Gallery Page' },
        { id: 'reflections', label: 'Guest Reflections Page' },
    ];

    const switchSection = (id) => {
        setActive(id);
        setSubtitle(sectionDescs[id]?.subtitle || '');
        setQuote(sectionDescs[id]?.quote || '');
        setMsg('');
    };

    const handleSave = () => {
        updateSectionDesc(active, { subtitle: subtitle.trim(), quote: quote.trim() });
        setMsg('Section description updated!');
        setTimeout(() => setMsg(''), 4000);
    };

    return (
        <div className="ap-form-section">
            <h3 className="ap-form-title">Edit Section Descriptions</h3>
            <p className="ap-form-desc">Change the banner subtitle and quote shown at the top of each section page.</p>

            <div className="ap-section-tabs">
                {sectionOptions.map(s => (
                    <button
                        key={s.id}
                        className={`ap-section-tab ${active === s.id ? 'active' : ''}`}
                        onClick={() => switchSection(s.id)}
                    >
                        {s.label}
                    </button>
                ))}
            </div>

            <SuccessBanner msg={msg} />

            <Field label="Subtitle" hint="Shown below the section title in the banner">
                <Input value={subtitle} onChange={setSubtitle} placeholder="Enter a subtitle for this section" maxLength={200} />
            </Field>
            <Field label="Banner Quote" hint="The small italic quote shown at the bottom of the banner">
                <Input value={quote} onChange={setQuote} placeholder="Enter a banner quote" maxLength={200} />
            </Field>

            <button className="ap-btn ap-btn--primary" onClick={handleSave}>✧ Save Description</button>
        </div>
    );
}

// ─── Admin Panel (main) ───────────────────────────────────────────────────────
export default function AdminPanel() {
    const [authed, setAuthed] = useState(false);
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('poetry');
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState('');
    const [showPwModal, setShowPwModal] = useState(false);

    const handleEditClick = () => {
        if (authed) {
            setOpen(true);
        } else {
            setShowPwModal(true);
        }
    };

    const handlePwSubmit = (e) => {
        e.preventDefault();
        if (pwInput === ADMIN_PASSWORD) {
            setAuthed(true);
            setShowPwModal(false);
            setPwInput('');
            setPwError('');
            setOpen(true);
        } else {
            setPwError('Incorrect password. Please try again.');
        }
    };

    const handleClose = () => setOpen(false);

    const renderTab = () => {
        switch (activeTab) {
            case 'poetry': return <PoetryForm />;
            case 'stories': return <StoriesForm />;
            case 'spiritual': return <SpiritualForm />;
            case 'gallery': return <GalleryForm />;
            case 'home': return <HomeForm />;
            case 'sections': return <SectionsForm />;
            default: return null;
        }
    };

    return (
        <>
            {/* Floating edit button */}
            <button
                className="ap-fab"
                onClick={handleEditClick}
                title={authed ? 'Open Admin Panel' : 'Admin Login'}
                aria-label="Edit website content"
            >
                <span className="ap-fab-icon">✎</span>
                <span className="ap-fab-label">Edit</span>
            </button>

            {/* Password modal */}
            {showPwModal && (
                <div className="ap-overlay" onClick={() => { setShowPwModal(false); setPwInput(''); setPwError(''); }}>
                    <div className="ap-pw-modal" onClick={e => e.stopPropagation()}>
                        <div className="ap-pw-ornament" aria-hidden="true">✦</div>
                        <h2 className="ap-pw-title">Admin Access</h2>
                        <p className="ap-pw-desc">Enter the password to edit the website content.</p>
                        <form onSubmit={handlePwSubmit}>
                            <input
                                className="ap-pw-input"
                                type="password"
                                value={pwInput}
                                onChange={e => setPwInput(e.target.value)}
                                placeholder="Enter password"
                                autoFocus
                            />
                            {pwError && <p className="ap-pw-error">{pwError}</p>}
                            <button type="submit" className="ap-btn ap-btn--primary ap-pw-btn">
                                Open Edit Panel
                            </button>
                        </form>
                        <button className="ap-pw-cancel" onClick={() => { setShowPwModal(false); setPwInput(''); setPwError(''); }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Admin drawer */}
            {open && (
                <div className="ap-overlay" onClick={handleClose}>
                    <div className="ap-drawer" onClick={e => e.stopPropagation()}>
                        <div className="ap-drawer-header">
                            <div className="ap-drawer-title-wrap">
                                <span className="ap-drawer-ornament">✦</span>
                                <h2 className="ap-drawer-title">Edit Website</h2>
                            </div>
                            <div className="ap-drawer-header-actions">
                                <button
                                    className="ap-btn ap-btn--ghost ap-logout-btn"
                                    onClick={() => { setAuthed(false); setOpen(false); }}
                                >
                                    Lock
                                </button>
                                <button className="ap-close-btn" onClick={handleClose} aria-label="Close">✕</button>
                            </div>
                        </div>

                        <div className="ap-drawer-tabs">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`ap-tab ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    <span className="ap-tab-icon">{tab.icon}</span>
                                    <span className="ap-tab-label">{tab.label.replace(`${tab.icon} `, '')}</span>
                                </button>
                            ))}
                        </div>

                        <div className="ap-drawer-body">
                            {renderTab()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
