import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Default Content ─────────────────────────────────────────────────────────

const DEFAULT_POEMS = [
    {
        id: 1,
        title: 'The River That Forgot the Sea',
        subtitle: 'On stillness and remembering',
        text: `There are rivers that rush headlong toward the horizon,
their voices loud with purpose and direction.
But I have known a river that paused—
that turned in on itself in a slow, silver arc,
as though it had remembered something
the hills once whispered into its first current.

It forgot the sea for a while.
It forgot the language of arrival.
And in that forgetting,
it learned to speak in circles,
in eddies, in the soft philosophy
of water meeting itself again.

I have been that river.
I have forgotten the sea.
And in the forgetting,
I have found every shore
I ever needed to be.`,
    },
    {
        id: 2,
        title: 'Before the World Woke',
        subtitle: 'A poem of early mornings',
        text: `Not yet the crow, not yet the conch—
only the sky holding its breath,
a pewter bowl of unbegun light,
and the tulsi swaying in no wind.

In that hour, before the world
remembered it had weight,
I have felt my name dissolve
like sandalwood smoke
into something older than language.

There is a prayer that has no words,
only the folding of the hands
and the slow release of wanting.
The dew knows it.
The spider in her silver geometry knows it.

I learn it again each morning
and forget it by noon,
which is why I rise so early—
to be taught, once more,
what cannot be kept.`,
    },
    {
        id: 3,
        title: 'A Lamp Does Not Question the Dark',
        subtitle: 'On quiet courage',
        text: `She was set in the niche of the eastern wall,
a diya no taller than a child's fist,
and when the wind came she bent
but she did not argue with the wind.

She knew something the candle doesn't—
that fire is not about triumph.
It is about the willingness
to be a small, warm answer
in a very large question.

I have been afraid of much.
The dark, the silence,
the spaces between heartbeats
where doubt makes its home.

But the diya asks nothing.
She simply burns.
And in her burning,
teaches me that to shine
is not to conquer—
it is to consent,
again and again,
to giving light.`,
    },
    {
        id: 4,
        title: 'The Temple at Low Tide',
        subtitle: 'Where the sacred and the sea meet',
        text: `There is a temple on the shore
that stands with wet feet in the evening.
The priests have gone home.
The bells are silent in the salt air.

What remains is something
more ancient than ritual—
the conversation between stone and sea,
the water stroking the foundation
the way a daughter holds
her sleeping mother's hand.

The idol inside sees none of this.
She is above such tenderness.
But I imagine even the goddess
hears the ocean come and go,
and perhaps in the deepest hour of night
she steps down from her pedestal
and lets the water touch her feet.

Perhaps divinity is not
above being moved.
Perhaps it is the willingness
to be moved, and moved, and moved,
and still return each morning
to the posture of stillness.`,
    },
];

const DEFAULT_STORIES = [
    {
        id: 1,
        title: 'The Last Jar of Mango Pickle',
        description: 'A story about inheritance, memory, and the women who carry both.',
        fullText: `The jar arrived in a cardboard box padded with old newspaper and wrapped twice in a cotton sari that smelled of trunk-wood and time. Meena held it in both hands for a long moment before she thought to read the note taped to its lid.

"This is the last batch. You know how to make it. You just don't know you know." — Paati.

It was a peculiar inheritance. Meena was thirty-four, living alone in a city nine hundred kilometers from the home where this jar had been made, in a kitchen so modern it barely remembered what fire was. She had a dishwasher. She had a coffee machine that knew her name, she thought, more intimately than some of her colleagues did.

She placed the jar on her kitchen counter and didn't open it for three days.

On the fourth morning she woke before dawn—unusual for her, she who was not a morning person. In the blue-grey hour before the city remembered to be loud, she stood at her counter and unscrewed the lid.

The smell did what scent always does: broke through every door.

She was in Paati's kitchen again. She was seven. She was watching two brown hands move with a sureness she had never learned to name. The mustard seeds popping, the turmeric and chilli in their exact proportions, the raw mango cut in precise pieces with a knife that had been sharpened on the same stone for forty years.

She closed the jar again. Found a notebook. And began, slowly, to write down everything she remembered.`
    },
    {
        id: 2,
        title: 'The Cartographer of Small Sorrows',
        description: 'He mapped everything except the country inside himself.',
        fullText: `My uncle Raman spent thirty-one years as a cartographer for the Survey of India. He had mapped coastlines that dissolved into the sea each monsoon and reformed slightly differently each dry season. He had mapped mountains that geologists told him were still technically rising—imperceptibly, improbably, stubbornly rising, millimeter by millimeter, into the thinning air.

He retired to a one-room flat and hung his maps on every available wall.

My aunt Leela, who had preceded him in death by a decade, appeared in none of the maps. She had lived in them anyway—in the notes kept in his field journals, in the towns whose names he'd shade more carefully after they'd visited together, in a river system in Himachal Pradesh that he'd told me once, quietly, during a power cut, he'd privately renamed for her.

After his death, we found, beneath the Survey maps, beneath the topographic surveys and the coastal delineations, a single hand-drawn map. Unlabeled. No scale. No legend.

But I recognized it immediately.

It was their street. It was the radius of their married life—the temple, the school, the market, the park where he'd proposed to her under a gulmohar tree in 1971. Every landmark precise. Every route between them exact.

He had mapped everything. Including, in the end, the only territory that had mattered.`
    },
    {
        id: 3,
        title: 'What the Peacock Knew',
        description: 'During the rains, even silence is a conversation.',
        fullText: `The peacock arrived the morning of my father's forty-ninth day—the day of the final rite.

My mother and I had been sitting on the front steps in the early grey of morning, too tired for speech, too present for sleep, existing in the particular exhaustion of extended grief. The rains had not yet come, but the sky had the look of a person who has decided to cry and is simply summoning the courage for it.

The peacock walked from around the corner of the garden wall with the extraordinary self-possession that peacocks have, as though they are visiting you as a favour.

It stopped roughly four feet from where we sat. It looked at us with one orange eye. Then the other.

My mother made a sound I had not heard from her in all the weeks since the death—a sound between a laugh and a sob, a sound the body makes when it has been holding something for too long and has finally been given permission to put it down.

The peacock spread its tail. Not in full display—just enough. Just the first suggestion of colour in a morning that had forgotten colour was possible.

Then it folded itself back up, turned, and walked away with the same unhurried certainty with which it had arrived.

"He always loved peacocks," my mother said—the first full sentence she had offered in four days.

"I know," I said.

And we sat there, and the sky made its decision to rain, and we let it.`
    },
];

const DEFAULT_EXPERIENCES = [
    {
        id: 1,
        title: 'The Lamp That Stayed Lit',
        openingQuote: 'Not all prayers are spoken. Some are simply lived.',
        story: `It was the morning of an ordinary Tuesday—no festival, no vow, no particular occasion. I had gone to the small temple at the edge of our neighbourhood more out of habit than faith. The silver doors were open, and the priest had just completed the early aarti.

The smell hit me first: camphor and marigold and the old stone itself, which holds a dampness all its own. I stood before the form of the goddess, not really looking, not really praying. My mind was elsewhere—in the middle of a disagreement I was rehearsing for later, in a list of things undone.

And then the deepam beside me flickered.

There was no wind. The air was perfectly still. Yet the flame bent, turned toward me, and held.

I don't know how long I stood there. I know that when I stepped out, the disagreement had dissolved somewhere in the camphor smoke, and the list didn't seem important anymore.

I have heard people speak of miracles as large events—healings, appearances, voices from clouds. But I think the divine speaks most fluently in small adjustments: a flame that turns just so, a moment in which the mind, suddenly tired of its own noise, goes quiet.`,
        closing: 'Divine grace arrives in the smallest of flames, turning gently toward us when we least expect it.'
    },
    {
        id: 2,
        title: 'Silence at the Arunachala',
        openingQuote: 'The mountain does not speak. It does not need to.',
        story: `I came to Tiruvannamalai during the full moon, as so many do. But I arrived late, after the crowds had thinned, when most pilgrims had completed their circumambulation and returned to their lodges.

The path around the hill was nearly empty. A few oil lamps flickered at the base of trees. The mountain itself rose against the darkening sky—dusky and enormous and unmoved by anything human time could measure.

I began to walk.

I don't know what I expected to feel. I had read of the Ramana Maharshi, of his years of silence on this very hill, of his teaching that the deepest question a human being can ask is "Who am I?" I had come, I suppose, with a tourist's curiosity and perhaps a pilgrim's secret hope.

What happened instead was simply this: I stopped thinking.

Not out of effort. Not through meditation technique. The thoughts simply became quieter and quieter, the way a stream becomes quieter as it nears a larger body of water—not ending, but absorbed into something vaster.

I completed the circumambulation in what felt like a timeless hour. When I reached the starting point again, I sat on a stone and wept. Not from sadness. From relief.

The mountain had not given me answers. It had simply shown me that beneath all questions is a stillness that has always been there, waiting.`,
        closing: 'Some pilgrimages end not in arrival, but in the recognition that we never left the sacred ground.'
    },
    {
        id: 3,
        title: "My Grandmother's Kolam",
        openingQuote: 'She drew the world into order each morning, then let it wash away.',
        story: `Every morning before sunrise, my grandmother would come out onto the front step with a small bowl of rice flour in one hand and a pinch of the earth's own colour in the other.

She never looked at what she was doing. Her hands moved from memory—memory older than herself, older perhaps than any single life. The kolam grew outward from the center: conch, lotus, the interlocking chains that in our tradition represent the unbroken flow of time.

When it was done, she would stand, brush the rice flour from her hands, and walk back inside without a backward glance.

It took me thirty years to understand what she was doing.

She was not decorating the threshold. She was practising release.

Each morning she created something intricate and beautiful. Each morning the sun rose, the ants came, the feet passed over, the rain erased. And each morning she returned to do it again, without attachment to the permanence of what she had made.

I have written poems I was afraid to publish, held on to ideas past their time, kept letters from people who needed to move on. My grandmother, who never owned a book of philosophy, understood something I am still learning: that beauty is not diminished by impermanence. It may, in fact, depend upon it.`,
        closing: 'In creation without attachment, we find the deepest form of devotion.'
    },
];

const DEFAULT_ARTWORKS = [
    {
        id: 1,
        src: '/art1.png',
        title: 'The Lotus Meditation',
        medium: 'Watercolour',
        description: 'A figure in stillness, surrounded by the soft bloom of lotus petals and inner light.',
    },
    {
        id: 2,
        src: '/art2.png',
        title: 'The Banyan at Dawn',
        medium: 'Watercolour',
        description: 'A lone ancient banyan reflected in still water, at the threshold of morning.',
    },
    {
        id: 3,
        src: '/art3.png',
        title: 'The Diya',
        medium: 'Watercolour',
        description: 'A single lamp offering its warmth to the surrounding darkness — an act of quiet courage.',
    },
    {
        id: 4,
        src: '/art4.png',
        title: 'The River Self',
        medium: 'Watercolour',
        description: 'A woman in meditation between river and mountain — both landscape and portrait.',
    },
];

const DEFAULT_HOME = {
    welcomeQuote: '"This is a quiet corner of reflections where poetry, stories, spiritual experiences, and art come together."',
    welcomeBody: 'Each piece is born from moments of stillness, nature, and inner contemplation. This space invites readers to pause, breathe, and connect with the gentle whispers of the soul.',
};

const DEFAULT_SECTION_DESCS = {
    poetry: {
        subtitle: 'Verses that arise from the space between breath and word',
        quote: 'In stillness, even silence becomes a poem.',
    },
    spiritual: {
        subtitle: 'Moments where the veil between ordinary and sacred grew thin',
        quote: 'The divine does not announce itself. It simply waits to be noticed.',
    },
    stories: {
        subtitle: 'Narratives woven from small, significant human moments',
        quote: 'Every story begins with a single moment of noticing.',
    },
    gallery: {
        subtitle: 'Colour as contemplation — visual expressions of inner landscapes',
        quote: 'What the words could not hold, the brush remembered.',
    },
    reflections: {
        subtitle: 'A shared journal — leave your thoughts, carry someone else\'s',
        quote: 'In sharing what moves us, we discover we are not alone.',
    },
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function load(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : fallback;
    } catch {
        return fallback;
    }
}

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Could not save to localStorage:', e);
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
    const [poems, setPoems] = useState(() => load('deeparam_poems', DEFAULT_POEMS));
    const [stories, setStories] = useState(() => load('deeparam_stories', DEFAULT_STORIES));
    const [experiences, setExperiences] = useState(() => load('deeparam_experiences', DEFAULT_EXPERIENCES));
    const [artworks, setArtworks] = useState(() => load('deeparam_artworks', DEFAULT_ARTWORKS));
    const [homeContent, setHomeContent] = useState(() => load('deeparam_home', DEFAULT_HOME));
    const [sectionDescs, setSectionDescs] = useState(() => load('deeparam_sections', DEFAULT_SECTION_DESCS));

    // Persist on every change
    useEffect(() => { save('deeparam_poems', poems); }, [poems]);
    useEffect(() => { save('deeparam_stories', stories); }, [stories]);
    useEffect(() => { save('deeparam_experiences', experiences); }, [experiences]);
    useEffect(() => { save('deeparam_artworks', artworks); }, [artworks]);
    useEffect(() => { save('deeparam_home', homeContent); }, [homeContent]);
    useEffect(() => { save('deeparam_sections', sectionDescs); }, [sectionDescs]);

    // ── Add functions (newest first) ──────────────────────────────────────────
    const addPoem = (poem) => {
        const entry = { ...poem, id: Date.now() };
        setPoems(prev => [entry, ...prev]);
    };

    const deletePoem = (id) => setPoems(prev => prev.filter(p => p.id !== id));

    const addStory = (story) => {
        const entry = { ...story, id: Date.now() };
        setStories(prev => [entry, ...prev]);
    };

    const deleteStory = (id) => setStories(prev => prev.filter(s => s.id !== id));

    const addExperience = (exp) => {
        const entry = { ...exp, id: Date.now() };
        setExperiences(prev => [entry, ...prev]);
    };

    const deleteExperience = (id) => setExperiences(prev => prev.filter(e => e.id !== id));

    const addArtwork = (art) => {
        const entry = { ...art, id: Date.now() };
        setArtworks(prev => [entry, ...prev]);
    };

    const deleteArtwork = (id) => setArtworks(prev => prev.filter(a => a.id !== id));

    const updateHomeContent = (updates) => setHomeContent(prev => ({ ...prev, ...updates }));

    const updateSectionDesc = (section, updates) =>
        setSectionDescs(prev => ({ ...prev, [section]: { ...prev[section], ...updates } }));

    return (
        <ContentContext.Provider value={{
            poems, addPoem, deletePoem,
            stories, addStory, deleteStory,
            experiences, addExperience, deleteExperience,
            artworks, addArtwork, deleteArtwork,
            homeContent, updateHomeContent,
            sectionDescs, updateSectionDesc,
        }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const ctx = useContext(ContentContext);
    if (!ctx) throw new Error('useContent must be used inside ContentProvider');
    return ctx;
}
