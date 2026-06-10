/* ============================================================
   LA GRANDE BELLEZZA — interaction layer
   Order:
     1. Boot
     2. Screen router (hash based)
     3. Step indicator
     4. Side menu (burger / labyrinth)
     5. Modals (About / Documentation)
     6. The crack / glass-shatter experience
     7. Glass-break sound (Web Audio, synthesized)
     8. Scroll reveals + progress bar
     9. Parallax on location images
   ============================================================ */

/* ---------- 1. Boot ---------- */
const SCREENS = ['home', 'intro', 'loc1', 'loc2', 'loc3', 'loc4', 'loc5', 'narratives', 'citymap', 'fighter'];
const LOCATIONS = ['loc1', 'loc2', 'loc3', 'loc4', 'loc5'];

// real Rome coordinates + a representative photo for the City map
const ROME_PLACES = [
    { id: 'loc1', n: 1, name: 'The Janiculum Hill', img: 'images/1location2.png', lat: 41.8898, lng: 12.4615 },
    { id: 'loc2', n: 2, name: "Jep's Terrace & the Colosseum", img: 'images/colosseo.jpg', lat: 41.8902, lng: 12.4922 },
    { id: 'loc3', n: 3, name: 'The Aventine Hill', img: 'images/aventine.JPG', lat: 41.8836, lng: 12.4783 },
    { id: 'loc4', n: 4, name: 'The Baths of Caracalla', img: 'images/caracalla.JPG', lat: 41.8790, lng: 12.4925 },
    { id: 'loc5', n: 5, name: 'Palazzo Brancaccio', img: 'images/botox2.jpg', lat: 41.8954, lng: 12.5018 }
];

// display names used by the narrative modal's location chips
const LOCATION_NAMES = {
    loc1: 'The Janiculum Hill',
    loc2: "Jep's Terrace & the Colosseum",
    loc3: 'The Aventine Hill',
    loc4: 'The Baths of Caracalla',
    loc5: 'Palazzo Brancaccio'
};

/* The narrative threads. Each ties a reading of the film to the real
   Roman locations it surfaces in — so a single place can belong to
   several themes, types and centuries at once. */
const NARRATIVES = {
    /* --- Lens 01 · Themes --- */
    'beauty-surface': {
        lens: 'Theme',
        title: 'Beauty on the surface',
        text: 'The film revels in the glittering shell of Rome — the parties, the gloss, the flawlessness of emptiness. Here beauty does not conceal meaning; it replaces it. These are the places where the surface shines brightest.',
        locations: ['loc2', 'loc5', 'loc1']
    },
    'sacred-spiritual': {
        lens: 'Theme',
        title: 'The sacred & the spiritual',
        text: 'Beneath the noise, Jep is searching for something he has lost. Rome’s churches, cloisters and hidden views hold the spiritual thread the film keeps quietly reaching for.',
        locations: ['loc3', 'loc1']
    },
    'decadence-party': {
        lens: 'Theme',
        title: 'Decadence & the party',
        text: 'The “trains” of Roman high society spin through the night. The party is the stage on which vanity performs itself, dazzling and exhausted at once.',
        locations: ['loc2', 'loc5']
    },
    'memory-loss': {
        lens: 'Theme',
        title: 'Memory & loss',
        text: 'Death opens the film and shadows it throughout. Farewells, first loves and vanished years keep surfacing between the spectacles.',
        locations: ['loc4', 'loc1']
    },
    'search-meaning': {
        lens: 'Theme',
        title: 'The search for meaning',
        text: 'Rome is a labyrinth the protagonist wanders, trying to recover the meaning buried under decoration and pretense. Only by finding it again does he become able to write.',
        locations: ['loc1', 'loc3', 'loc4']
    },
    'illusion-trick': {
        lens: 'Theme',
        title: 'Illusion & the trick',
        text: 'A giraffe disappears; faces are remade with needles. “It’s all a trick,” the magician says — and so, perhaps, is art when it loses touch with lived beauty.',
        locations: ['loc4', 'loc5']
    },

    /* --- Lens 02 · Typology --- */
    'terraces': {
        lens: 'Typology',
        title: 'Terraces & rooftops',
        text: 'Rome seen from above, where the city becomes a backdrop for the people who perform on it. The terrace is the film’s natural theatre.',
        locations: ['loc2']
    },
    'hills-gardens': {
        lens: 'Typology',
        title: 'Hills & gardens',
        text: 'The seven hills and their green terraces offer the panoramic, contemplative Rome — places to look out over the city and to lose oneself among trees and cobblestones.',
        locations: ['loc1', 'loc3']
    },
    'ancient-ruins': {
        lens: 'Typology',
        title: 'Ancient ruins',
        text: 'The monumental skeleton of imperial Rome — amphitheatres and baths — against which the small, modern dramas of the characters play out.',
        locations: ['loc2', 'loc4']
    },
    'palaces': {
        lens: 'Typology',
        title: 'Palaces & interiors',
        text: 'Ornate historic interiors where Roman society gathers — gilded rooms that frame both refinement and its hollow imitation.',
        locations: ['loc5']
    },
    'fountains': {
        lens: 'Typology',
        title: 'Fountains & water',
        text: 'Water as spectacle and as stillness — the monumental fountains that crown the hills and mark the city’s quiet thresholds.',
        locations: ['loc1']
    },
    'sacred-sites': {
        lens: 'Typology',
        title: 'Sacred sites',
        text: 'Basilicas, cloisters and the famous keyhole — the consecrated places where the film’s search for the spiritual comes closest to the surface.',
        locations: ['loc3']
    },

    /* --- Lens 03 · Through the centuries --- */
    'ancient': {
        lens: 'I–III century',
        title: 'Ancient Rome',
        text: 'Imperial Rome built to overwhelm: the Colosseum (completed c. 80 AD) and the colossal Baths of Caracalla (216 AD). Their ruins still set the scale for everything the film stages within them.',
        locations: ['loc2', 'loc4']
    },
    'early-christian': {
        lens: 'V century',
        title: 'Early Christian Rome',
        text: 'The Basilica of Santa Sabina on the Aventine (422–432 AD) carries the austere, contemplative faith that survives under the city’s later glamour.',
        locations: ['loc3']
    },
    'baroque': {
        lens: 'XVII century',
        title: 'Baroque Rome',
        text: 'The Fontana dell’Acqua Paola (1610–1612) crowns the Janiculum — the theatrical, water-drunk Rome of the Baroque, built to be admired from afar.',
        locations: ['loc1']
    },
    'enlightenment': {
        lens: 'XVIII century',
        title: 'The Enlightenment',
        text: 'Piranesi’s walled garden of the Priory of Malta (1765), with its keyhole framing St. Peter’s dome — a scholar’s witty, scenographic idea of beauty.',
        locations: ['loc3']
    },
    'belle-epoque': {
        lens: 'XIX century',
        title: 'Belle Époque Rome',
        text: 'The Rome of the new capital: the Janiculum promenade and Palazzo Brancaccio (1880s), the last great noble palace built in the city — grandeur on the eve of the modern world.',
        locations: ['loc5', 'loc1']
    },
    'contemporary': {
        lens: '2013',
        title: 'Contemporary Rome',
        text: 'Sorrentino’s present-day Rome gathers all of these centuries into a single restless night. Every location becomes a room in the same labyrinth.',
        locations: ['loc1', 'loc2', 'loc3', 'loc4', 'loc5']
    }
};

document.addEventListener('DOMContentLoaded', () => {
    buildStepDots();
    initRouter();
    initSideMenu();
    initModals();
    initNarratives();
    initFighter();
    initQuiz();
    initCrackExperience();
    initReveals();
    initProgress();
    initParallax();
    initFooterWatch();

    // honour any deep link, else land on home
    const start = (location.hash || '').replace('#', '');
    showScreen(SCREENS.includes(start) ? start : 'home', true);
});

/* ---------- 2. Screen router ---------- */
function showScreen(id, instant) {
    if (!SCREENS.includes(id)) id = 'home';

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    el.classList.add('active');

    if (location.hash !== '#' + id) {
        history.replaceState(null, '', '#' + id);
    }

    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });

    updateStepIndicator(el);
    syncMenuActive(id);
    refreshReveals(el);

    // the Rome map needs a visible, sized container to render
    if (id === 'citymap') setTimeout(initRomeMap, 60);
}

function initRouter() {
    // any element with data-go drives the router
    document.body.addEventListener('click', e => {
        const goEl = e.target.closest('[data-go]');
        if (goEl) {
            e.preventDefault();
            showScreen(goEl.dataset.go);
            closeMenu();
            closeModals();
        }
        // in-page anchor links (#home, #intro, #loc1 ...)
        const link = e.target.closest('a[href^="#"]');
        if (link && !goEl) {
            const target = link.getAttribute('href').slice(1);
            if (SCREENS.includes(target)) {
                e.preventDefault();
                showScreen(target);
                closeMenu();
            }
        }
    });

    window.addEventListener('hashchange', () => {
        const id = location.hash.replace('#', '');
        if (SCREENS.includes(id) && !document.getElementById(id).classList.contains('active')) {
            showScreen(id);
        }
    });
}

/* ---------- 3. Step indicator ---------- */
function buildStepDots() {
    const wrap = document.getElementById('stepDots');
    wrap.innerHTML = LOCATIONS.map(() => '<span class="dot"></span>').join('');
}

function updateStepIndicator(screenEl) {
    const indicator = document.getElementById('stepIndicator');
    const step = screenEl.dataset.step;

    if (!step) {
        indicator.classList.remove('show');
        return;
    }

    const idx = parseInt(step, 10);
    indicator.classList.add('show');
    document.querySelectorAll('#stepDots .dot').forEach((d, i) => {
        d.classList.toggle('on', i === idx - 1);
    });
    document.getElementById('stepLabel').innerHTML =
        String(idx).padStart(2, '0') + ' / 05 · ' + screenEl.dataset.name;
}

/* ---------- 4. Side menu ---------- */
function initSideMenu() {
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    document.getElementById('sideScrim').addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeMenu(); closeModals(); }
    });
}

function toggleMenu() { document.body.classList.toggle('menu-open'); }
function closeMenu() { document.body.classList.remove('menu-open'); }

function syncMenuActive(id) {
    document.querySelectorAll('.menu-item').forEach(m => {
        m.classList.toggle('active', m.dataset.go === id);
    });
}

/* ---------- 5. Modals ---------- */
function initModals() {
    document.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const m = document.getElementById(btn.dataset.modal);
            if (m) m.classList.add('open');
        });
    });
    document.querySelectorAll('[data-close]').forEach(el => {
        el.addEventListener('click', closeModals);
    });
}

function closeModals() {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
}

/* ---------- 5b. Narratives ---------- */
function initNarratives() {
    document.querySelectorAll('.narr-tag').forEach(btn => {
        btn.addEventListener('click', () => openNarrative(btn.dataset.narr));
    });
}

function openNarrative(key) {
    const n = NARRATIVES[key];
    if (!n) return;

    document.getElementById('narrLens').textContent = n.lens;
    document.getElementById('narrTitle').textContent = n.title;
    document.getElementById('narrText').textContent = n.text;

    // build clickable location chips that jump straight into the labyrinth
    const wrap = document.getElementById('narrRelations');
    wrap.innerHTML = n.locations.map(id => {
        const step = String(LOCATIONS.indexOf(id) + 1).padStart(2, '0');
        return `<button class="rel-chip" data-go="${id}">
                    <span class="rc-num">${step}</span>${LOCATION_NAMES[id]}
                </button>`;
    }).join('');

    document.getElementById('modal-narrative').classList.add('open');
}

/* ---------- 5c. Choose your fighter — character graph ---------- */
const CHARACTERS = {
    jep: {
        name: 'Jep Gambardella',
        role: 'The writer · the king of the high life',
        img: 'images/quiz_Jep.jpg',
        rel: "The still centre of it all. At sixty-five, Jep is a journalist and one-time novelist who long ago wrote a single, perfect book — and never another. He reigns over Rome's nightlife with irony and impeccable taste, while quietly searching for the great beauty he can no longer find.",
        scenes: [
            'His sixty-fifth birthday party on the terrace facing the Colosseum.',
            'Wandering the sleeping city at dawn, past palaces and fountains.',
            'The closing monologue, where the long search finally becomes a novel.'
        ],
        quotes: [
            '“I was looking for the great beauty, but I didn’t find it.”',
            '“I was destined for sensibility. I was destined to become a writer.”',
            '“This is how it always ends. With death. But first, there was life.”'
        ],
        result: "You are a disillusioned aesthete. You've achieved everything socially, yet you keep searching for that one glimpse of real beauty amid the emptiness of small talk. Your strength is irony and impeccable taste."
    },
    ramona: {
        name: 'Ramona',
        role: 'The dancer · the honest one',
        img: 'images/quiz_Ramona.jpg',
        rel: "The daughter of an old friend, a forty-two-year-old dancer Jep takes under his wing. Theirs is the film's tenderest bond — unromantic, unguarded, true. She spends her money on a secret she carries quietly: she is dying.",
        scenes: [
            'Night walks through Rome and a private, after-hours viewing of a palazzo’s art.',
            'Her performance, and the unexpected stillness Jep finds beside her.',
            'The quiet revelation of her illness, and her death.'
        ],
        quotes: [
            '“I’m forty-two years old and I’ve led a dissolute life.”',
            '“I spend all my money. On what, I can’t tell you.”',
            '(Jep, of her) “You’re nobody’s fool, Ramona.”'
        ],
        result: "You are a deep, sincere person hiding an inner fragility behind a weary surface. You value genuine intimacy over glitter, and you're not afraid to look the truth in the eye — even when it's sad."
    },
    dadina: {
        name: 'Dadina',
        role: "The editor · Jep's anchor",
        img: 'images/quiz_Dadina.jpg',
        rel: "Jep's editor-in-chief and fiercest friend. Sharp-tongued, clear-eyed and loyal, she keeps him working and keeps him honest. What she lacks in height she returns many times over in authority and warmth.",
        scenes: [
            'Editorial sparring in the magazine office.',
            'Cutting through Jep’s poses with a single dry remark.',
            'Standing by him, unglamorous and steadfast, through the long Roman nights.'
        ],
        quotes: [
            '“Jep, write something. Anything.”',
            '“We’re all disappointed — and still we keep each other company.”',
            '“Don’t waste my time with nonsense.”'
        ],
        result: "You are a realist and a professional. You stand firmly on your feet, with a sharp mind and loyalty to your principles. You are the foundation that keeps order within life's chaos."
    },
    elisa: {
        name: 'Elisa',
        role: 'The first love · the lost paradise',
        img: 'images/quiz_Elisa.jpg',
        rel: "The girl Jep loved as a young man by the sea — the memory that has shadowed every glittering year since. He learns of her again, decades later, only when her husband comes to say she has died, and that she loved Jep her whole life.",
        scenes: [
            'Flashbacks to the lighthouse, the sea, and a single night of almost.',
            'Her widower’s visit, and the confession that reopens everything.',
            'The image Jep keeps returning to when the noise finally falls away.'
        ],
        quotes: [
            '“She loved you. Only you. Her whole life.”',
            '“The most important thing is not to waste time on what you don’t want.”',
            'A first love, a sea breeze, an innocence that never comes back.'
        ],
        result: "You are a symbol of purity and lost paradise. A nostalgia for the perfect moment lives in you. You remind those around you of who they were before life made them complex and cynical."
    },
    maria: {
        name: 'Sister Maria — “La Santa”',
        role: 'The saint · the conscience',
        img: 'images/quiz_Saint.jpg',
        rel: "A one-hundred-and-four-year-old missionary the whole city calls the Saint. Frail and unflinching, she sees straight through Jep's emptiness and asks the question no one dares: why did he never write a second novel? Her answer — about roots — sends him back to where meaning began.",
        scenes: [
            'The hushed dinner where she barely speaks, and everyone leans in.',
            'Climbing the Holy Stairs on her knees at dawn.',
            'The flamingos resting on Jep’s terrace as the sun comes up.'
        ],
        quotes: [
            '“Do you know why I only eat roots? Because roots are important.”',
            '“Poverty is not to be spoken of — it is to be lived.”',
            '“Why did you never write another book?”'
        ],
        result: "You are a person of spirit and discipline. You believe in the importance of “roots” and you despise excess. Your presence makes others think about the eternal — even when they aren't ready for it."
    }
};

function initFighter() {
    const nodes = document.querySelectorAll('.char-node');
    if (!nodes.length) return;
    nodes.forEach(n => n.addEventListener('click', () => showCharacter(n.dataset.char)));
    showCharacter('jep'); // default
}

function showCharacter(key) {
    const c = CHARACTERS[key];
    const panel = document.getElementById('charDetail');
    if (!c || !panel) return;

    document.querySelectorAll('.char-node').forEach(n => {
        n.classList.toggle('active', n.dataset.char === key);
    });

    panel.innerHTML = `
        <p class="cd-role">${c.role}</p>
        <h3 class="cd-name">${c.name}</h3>
        <p class="cd-rel">${c.rel}</p>
        <p class="cd-block-label">Significant scenes</p>
        <ul class="cd-scenes">${c.scenes.map(s => `<li>${s}</li>`).join('')}</ul>
        <p class="cd-block-label">Lines that linger</p>
        <div class="cd-quotes">${c.quotes.map(q => `<p class="cd-quote">${q}</p>`).join('')}</div>
    `;
    panel.classList.remove('swap');
    void panel.offsetWidth;
    panel.classList.add('swap');
}

/* ---------- 5d. The quiz — "Who are you in The Great Beauty?" ---------- */
const QUIZ = [
    {
        q: 'How do you usually behave at large social events or parties?',
        a: [
            "I'm the life of the party — the king (or queen) of the night. I set the rhythm, but deep down I'm bored to death.",
            "I feel like a stranger at this feast of life; I'd rather watch from the side or have one heart-to-heart.",
            "I'm here on business: observing, gathering information, running things, analysing what's happening.",
            "I'm not here at all. I exist only in someone's bright and distant memories.",
            'Parties are vanity. I prefer silence, asceticism, and focus on something eternal.'
        ]
    },
    {
        q: 'What, to you, is the true "great beauty"?',
        a: [
            "An elusive moment that can't be put into words — though I've spent my whole life trying.",
            'Sincerity and honesty, even when they come with sadness or physical decay.',
            'Professionalism, devotion to your craft, and seeing the essence of things beneath the gloss.',
            'First love, a sea breeze, and an innocence that can never be regained.',
            'Roots. We must remember where we came from and feed on that soil.'
        ]
    },
    {
        q: 'What is your relationship with your own past?',
        a: [
            'A baggage of disappointments and one bright flash I keep returning to in my mind.',
            'The past is what made me a tired but understanding person.',
            'My past is my experience, my authority, and my principles.',
            'I am the past itself — pure, idealised, and frozen in time.',
            "The past doesn't matter unless it's tied to eternity and the spiritual path."
        ]
    },
    {
        q: 'What would you say to someone who asks you the meaning of life?',
        a: [
            '"I looked for it everywhere, but found it only in emptiness and beautiful scenery."',
            '"It’s simply to be near someone who understands you, until the lights go out."',
            '"It’s in the work, and in staying true to yourself in this mad world."',
            '"It’s in that single glance we exchanged so many years ago."',
            '"Do you know why I eat only roots? Because roots are important."'
        ]
    },
    {
        q: 'What is your main role in your circle of friends?',
        a: [
            'The cynical intellectual who can both amuse you and prick you with the truth.',
            'The one you can trust with a secret, and stay silent with about what matters.',
            'The wise mentor — or the strict but fair critic.',
            'The muse, whose image inspires but stays out of reach.',
            'The conscience, reminding everyone that all earthly things are dust.'
        ]
    }
];

const QUIZ_KEY = { A: 'jep', B: 'ramona', C: 'dadina', D: 'elisa', E: 'maria' };
const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const quizAnswers = {};

function initQuiz() {
    const wrap = document.getElementById('quizQuestions');
    if (!wrap) return;

    wrap.innerHTML = QUIZ.map((item, i) => `
        <div class="quiz-q" data-i="${i}">
            <p class="quiz-q-num">${String(i + 1).padStart(2, '0')} / 05</p>
            <h4 class="quiz-q-text">${item.q}</h4>
            <div class="quiz-opts">
                ${item.a.map((opt, j) => `
                    <button class="quiz-opt" data-q="${i}" data-letter="${LETTERS[j]}">
                        <span class="opt-letter">${LETTERS[j]}</span>
                        <span class="opt-text">${opt}</span>
                    </button>`).join('')}
            </div>
        </div>`).join('');

    wrap.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => selectOption(btn));
    });

    document.getElementById('quizReveal').addEventListener('click', revealResult);
}

function selectOption(btn) {
    const q = btn.dataset.q;
    // single choice per question
    document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    quizAnswers[q] = btn.dataset.letter;

    const answered = Object.keys(quizAnswers).length;
    document.getElementById('quizProgress').textContent = answered + ' / 5 answered';
    document.getElementById('quizReveal').disabled = answered < QUIZ.length;
}

function revealResult() {
    // tally the letters, break ties by A→E order
    const counts = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    Object.values(quizAnswers).forEach(l => counts[l]++);
    let best = 'A';
    LETTERS.forEach(l => { if (counts[l] > counts[best]) best = l; });

    const key = QUIZ_KEY[best];
    const c = CHARACTERS[key];
    const box = document.getElementById('quizResult');

    box.innerHTML = `
        <img class="result-img" src="${c.img}" alt="${c.name}">
        <div class="result-body">
            <p class="kicker">You are</p>
            <h3 class="result-name">${c.name}</h3>
            <p class="result-role">${c.role}</p>
            <p class="result-text">${c.result}</p>
            <div class="result-actions">
                <button class="btn" id="resultMeet">Meet them in the constellation <span class="arrow">→</span></button>
                <button class="btn btn-ghost" id="quizRetake">Retake the quiz</button>
            </div>
        </div>`;
    box.hidden = false;
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });

    document.getElementById('resultMeet').addEventListener('click', () => {
        showCharacter(key);
        document.querySelector('#fighter .constellation').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    document.getElementById('quizRetake').addEventListener('click', resetQuiz);
}

function resetQuiz() {
    Object.keys(quizAnswers).forEach(k => delete quizAnswers[k]);
    document.querySelectorAll('.quiz-opt.selected').forEach(b => b.classList.remove('selected'));
    document.getElementById('quizProgress').textContent = '0 / 5 answered';
    document.getElementById('quizReveal').disabled = true;
    const box = document.getElementById('quizResult');
    box.hidden = true;
    box.innerHTML = '';
    document.querySelector('.quiz-head').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- 6. The crack / glass-shatter experience ---------- */
function initCrackExperience() {
    const stage = document.getElementById('crackStage');
    const btn = document.getElementById('hammerBtn');
    const svg = document.getElementById('crackSvg');
    const flash = document.getElementById('flash');
    if (!stage || !btn) return;

    let used = false;

    btn.addEventListener('click', () => {
        if (used) return;
        used = true;

        // 1. swing the hammer
        btn.classList.add('swing');

        // 2. impact a beat later: shake + flash + sound + draw cracks
        setTimeout(() => {
            playGlassBreak();
            stage.classList.add('shake');
            flash.classList.add('go');
            drawCracks(svg);
            stage.classList.add('shattered');   // cracks appear, old text fades, bg swaps
        }, 230);

        // 3. settle onto the intact "after" screen, then dissolve the cracks
        setTimeout(() => {
            stage.classList.remove('shake');
        }, 900);

        setTimeout(() => {
            stage.classList.add('healed');       // reveal after-text, fade cracks out
        }, 1400);
    });
}

/* Procedurally draw a pane of cracked glass into the SVG. */
function drawCracks(svg) {
    const W = window.innerWidth;
    const H = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';

    const cx = W * 0.5;
    const cy = H * 0.48;
    const NS = 'http://www.w3.org/2000/svg';
    const paths = [];

    const point = (ang, r) => [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];

    // jagged line between two points, returned as an SVG "d" string
    const jagged = (x1, y1, x2, y2, segs, jit) => {
        let d = `M ${x1.toFixed(1)} ${y1.toFixed(1)}`;
        for (let i = 1; i <= segs; i++) {
            const t = i / segs;
            let x = x1 + (x2 - x1) * t;
            let y = y1 + (y2 - y1) * t;
            if (i < segs) {
                x += (Math.random() - 0.5) * jit;
                y += (Math.random() - 0.5) * jit;
            }
            d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return d;
    };

    // main radial fractures
    const rays = 11 + Math.floor(Math.random() * 4);
    const angles = [];
    const maxR = Math.hypot(W, H);
    for (let i = 0; i < rays; i++) {
        const ang = (i / rays) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        angles.push(ang);
        const len = maxR * (0.55 + Math.random() * 0.5);
        const [ex, ey] = point(ang, len);
        paths.push({ d: jagged(cx, cy, ex, ey, 7, 26), w: 1.4 });

        // small branch offshoots
        if (Math.random() > 0.45) {
            const br = len * (0.35 + Math.random() * 0.35);
            const [bx, by] = point(ang, br);
            const [tx, ty] = point(ang + (Math.random() - 0.5) * 1.1, br + len * 0.3);
            paths.push({ d: jagged(bx, by, tx, ty, 4, 18), w: 0.8 });
        }
    }

    // concentric web rings linking the radials
    const rings = [60, 130, 230, 360];
    rings.forEach(r => {
        for (let i = 0; i < angles.length; i++) {
            const a1 = angles[i];
            const a2 = angles[(i + 1) % angles.length];
            const rr = r * (0.85 + Math.random() * 0.3);
            const [x1, y1] = point(a1, rr);
            const [x2, y2] = point(a2, rr);
            paths.push({ d: jagged(x1, y1, x2, y2, 3, 14), w: 0.7 });
        }
    });

    // build, measure, and stagger-animate each fracture
    paths.forEach((p, i) => {
        const el = document.createElementNS(NS, 'path');
        el.setAttribute('d', p.d);
        el.setAttribute('class', 'crack-line');
        el.style.strokeWidth = p.w;
        svg.appendChild(el);

        const len = el.getTotalLength();
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        el.style.transition = `stroke-dashoffset 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.012}s`;
        // next frame -> draw in
        requestAnimationFrame(() => requestAnimationFrame(() => {
            el.style.strokeDashoffset = 0;
        }));
    });
}

/* ---------- 7. Glass-break sound (synthesized, no asset needed) ---------- */
let audioCtx = null;
function playGlassBreak() {
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        const ctx = audioCtx;
        const now = ctx.currentTime;

        // a) sharp noise burst = the shatter
        const dur = 0.6;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.4);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 1800;
        const ng = ctx.createGain();
        ng.gain.value = 0.35;
        noise.connect(hp).connect(ng).connect(ctx.destination);
        noise.start(now);

        // b) a few high "tinkles" = falling shards
        [2400, 3100, 4200, 5200].forEach((f, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = f;
            const t = now + 0.04 + i * 0.06;
            g.gain.setValueAtTime(0.0001, t);
            g.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
            osc.connect(g).connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.3);
        });
    } catch (e) {
        /* audio is a nicety; ignore failures */
    }
}

/* ---------- 8. Scroll reveals + progress bar ---------- */
let revealObserver;
function initReveals() {
    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('in');
                revealObserver.unobserve(en.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// when a screen activates, (re)observe its reveal items
function refreshReveals(screenEl) {
    screenEl.querySelectorAll('.reveal:not(.in)').forEach(el => {
        revealObserver.observe(el);
        // anything already in view on load gets revealed immediately
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) el.classList.add('in');
    });
}

function initProgress() {
    const bar = document.getElementById('progress');
    const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h) * 100 + '%' : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* hide the step pill once the footer comes into view */
function initFooterWatch() {
    const footer = document.querySelector('.site-footer');
    const indicator = document.getElementById('stepIndicator');
    if (!footer || !indicator) return;
    new IntersectionObserver(entries => {
        indicator.classList.toggle('near-footer', entries[0].isIntersecting);
    }, { threshold: 0 }).observe(footer);
}

/* ---------- 8b. Interactive Rome map (Leaflet) ---------- */
let romeMap = null;
function initRomeMap() {
    const el = document.getElementById('romeMap');
    if (!el || typeof L === 'undefined') return;

    // already built — just make sure it's sized correctly
    if (romeMap) {
        romeMap.invalidateSize();
        return;
    }

    romeMap = L.map(el, {
        scrollWheelZoom: false,   // let the page scroll naturally
        zoomControl: true,
        attributionControl: true
    });

    // dark, editorial basemap that matches the site
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(romeMap);

    const markers = ROME_PLACES.map(p => {
        const icon = L.divIcon({
            className: 'rome-marker',
            html: `<span class="rm-dot">${p.n}</span>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17]
        });
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(romeMap);

        const num = String(p.n).padStart(2, '0');
        marker.bindTooltip(
            `<div class="rome-tip-inner">
                <img src="${p.img}" alt="">
                <span class="rome-tip-cap"><b>${num}</b>${p.name}</span>
             </div>`,
            { direction: 'top', offset: [0, -16], className: 'rome-tip', opacity: 1 }
        );

        marker.on('click', () => { showScreen(p.id); closeMenu(); });
        return marker;
    });

    // frame all five places nicely
    romeMap.fitBounds(L.featureGroup(markers).getBounds().pad(0.35));
    setTimeout(() => romeMap.invalidateSize(), 200);

    // keep the map correctly sized when the window changes
    window.addEventListener('resize', () => {
        if (romeMap && document.getElementById('citymap').classList.contains('active')) {
            romeMap.invalidateSize();
        }
    });
}

/* ---------- 9. Parallax on location images ---------- */
function initParallax() {
    let ticking = false;
    const update = () => {
        document.querySelectorAll('.screen.active [data-parallax]').forEach(img => {
            const rect = img.getBoundingClientRect();
            const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -0.06;
            img.style.transform = `translateY(${offset.toFixed(1)}px)`;
        });
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
}
