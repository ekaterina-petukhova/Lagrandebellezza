/* ============================================================
   LA GRANDE BELLEZZA — interaction layer (LMML)
   Locations, metadata, narratives, timeline and the multimedia
   text grid all come from data.js; this file renders and wires them.
   ============================================================ */

/* ---------- 1. Boot / derived constants ---------- */
const LOCATION_IDS = LOCATIONS.map(l => l.id);
const META_AFTER = ['narratives', 'timeline', 'citymap', 'fighter', 'team', 'about', 'documentation', 'disclaimer'];
const SCREENS = ['home', 'intro', ...LOCATION_IDS, ...META_AFTER];

const LOCATION_NAMES = Object.fromEntries(LOCATIONS.map(l => [l.id, l.title]));
const ROME_PLACES = LOCATIONS.map(l => ({
    id: l.id, n: l.n, name: l.title, img: l.img.hero, lat: l.coords.lat, lng: l.coords.lng
}));

/* encode image paths that contain spaces */
const enc = p => encodeURI(p);

/* thematic "lens" prose; the locations themselves are computed from
   each place's tags in data.js, so this never falls out of sync. */
const LENS_PROSE = {
    'beauty-surface':  { lens: 'Theme', title: 'Beauty on the surface', text: 'The film revels in the glittering shell of Rome — the parties, the gloss, the flawlessness of emptiness. Here beauty does not conceal meaning; it replaces it.' },
    'sacred-spiritual':{ lens: 'Theme', title: 'The sacred & the spiritual', text: 'Beneath the noise, Jep is searching for something he has lost. Rome’s churches, gardens and hidden views hold the spiritual thread the film keeps quietly reaching for.' },
    'decadence-party': { lens: 'Theme', title: 'Decadence & the party', text: 'The “trains” of Roman high society spin through the night. The party is the stage on which vanity performs itself, dazzling and exhausted at once.' },
    'memory-loss':     { lens: 'Theme', title: 'Memory & loss', text: 'Death opens the film and shadows it throughout. Farewells, first loves and vanished years keep surfacing between the spectacles.' },
    'search-meaning':  { lens: 'Theme', title: 'The search for meaning', text: 'Rome is a labyrinth the protagonist wanders, trying to recover the meaning buried under decoration and pretense. Only by finding it again does he become able to write.' },
    'illusion-trick':  { lens: 'Theme', title: 'Illusion & the trick', text: 'A giraffe disappears; faces are remade with needles. “It’s all a trick,” the magician says — and so, perhaps, is art when it loses touch with lived beauty.' },
    'terraces':        { lens: 'Typology', title: 'Terraces & rooftops', text: 'Rome seen from above, where the city becomes a backdrop for the people who perform on it. The terrace is the film’s natural theatre.' },
    'hills-gardens':   { lens: 'Typology', title: 'Hills & gardens', text: 'The hills and their green terraces offer the panoramic, contemplative Rome — places to look out over the city and to lose oneself among trees and cobblestones.' },
    'ancient-ruins':   { lens: 'Typology', title: 'Ancient ruins', text: 'The monumental skeleton of imperial Rome — amphitheatre and baths — against which the small, modern dramas of the characters play out.' },
    'palaces':         { lens: 'Typology', title: 'Palaces & interiors', text: 'Ornate historic interiors where Roman society gathers — gilded rooms that frame both refinement and its hollow imitation.' },
    'fountains':       { lens: 'Typology', title: 'Fountains & water', text: 'Water as spectacle and as threshold — the monumental fountain that crowns the hill and opens the film.' },
    'sacred-sites':    { lens: 'Typology', title: 'Sacred sites', text: 'Basilicas, temples and a holy staircase — the consecrated places where the film’s search for the spiritual comes closest to the surface.' }
};
const locationsByTag = key => LOCATIONS
    .filter(l => l.tags.themes.includes(key) || l.tags.typology.includes(key))
    .map(l => l.id);

/* ---------- multimedia-grid state (depth × audience) ---------- */
let textDepth = localStorage.getItem('lgb-depth') || 'medium';
let textAud   = localStorage.getItem('lgb-aud')   || 'adult';

document.addEventListener('DOMContentLoaded', () => {
    renderLocations();          // build the 13 location screens from data
    renderSideMenu();
    renderNarratives();
    renderTimeline();
    renderItinerary();

    buildStepDots();
    initRouter();
    initSideMenu();
    initModals();
    initThemes();
    initTextControls();
    initNarratives();
    initFighter();
    initQuiz();
    initCrackExperience();
    initReveals();
    initProgress();
    initParallax();
    initFooterWatch();

    const start = (location.hash || '').replace('#', '');
    showScreen(SCREENS.includes(start) ? start : 'home', true);
});

/* ---------- 2. Screen router ---------- */
function showScreen(id, instant) {
    if (!SCREENS.includes(id)) id = 'home';

    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    el.classList.add('active');

    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });

    updateStepIndicator(el);
    syncMenuActive(id);
    refreshReveals(el);

    if (id === 'citymap') setTimeout(initRomeMap, 60);
}

function initRouter() {
    document.body.addEventListener('click', e => {
        const goEl = e.target.closest('[data-go]');
        if (goEl) {
            e.preventDefault();
            showScreen(goEl.dataset.go);
            closeMenu();
            closeModals();
            return;
        }
        const link = e.target.closest('a[href^="#"]');
        if (link) {
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
    if (!step) { indicator.classList.remove('show'); return; }

    const idx = parseInt(step, 10);
    const total = String(LOCATIONS.length).padStart(2, '0');
    indicator.classList.add('show');
    document.querySelectorAll('#stepDots .dot').forEach((d, i) => {
        d.classList.toggle('on', i === idx - 1);
    });
    document.getElementById('stepLabel').innerHTML =
        String(idx).padStart(2, '0') + ' / ' + total + ' · ' + screenEl.dataset.name;
}

/* ---------- 4. Side menu ---------- */
function initSideMenu() {
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);
    document.getElementById('sideScrim').addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeMenu(); closeModals(); }
    });
}
function renderSideMenu() {
    const wrap = document.getElementById('sideMenuList');
    if (!wrap) return;
    wrap.innerHTML = LOCATIONS.map(l =>
        `<div class="menu-item" data-go="${l.id}"><span class="num">${String(l.n).padStart(2, '0')}</span><span class="name">${l.title}</span></div>`
    ).join('');
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
    document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModals));
}
function closeModals() {
    document.querySelectorAll('.modal.open').forEach(m => m.classList.remove('open'));
}

/* ---------- 6. Themes (switchable graphic / typographic) ---------- */
function initThemes() {
    const saved = localStorage.getItem('lgb-theme') || 'notte';
    applyTheme(saved);

    const toggle = document.getElementById('themeToggle');
    const panel  = document.getElementById('themePanel');
    if (toggle && panel) {
        toggle.addEventListener('click', e => {
            e.stopPropagation();
            panel.classList.toggle('open');
        });
        document.addEventListener('click', () => panel.classList.remove('open'));
        panel.addEventListener('click', e => e.stopPropagation());
    }
    document.querySelectorAll('[data-theme-set]').forEach(b => {
        b.addEventListener('click', () => { applyTheme(b.dataset.themeSet); if (panel) panel.classList.remove('open'); });
    });
}
function applyTheme(id) {
    document.documentElement.setAttribute('data-theme', id);
    localStorage.setItem('lgb-theme', id);
    document.querySelectorAll('[data-theme-set]').forEach(b => b.classList.toggle('on', b.dataset.themeSet === id));
    const cur = document.getElementById('themeCurrent');
    if (cur) { const t = THEMES.find(x => x.id === id); cur.textContent = t ? t.label : id; }
    // recolour the map route if the map already exists
    if (typeof romeMap !== 'undefined' && romeMap && routeLine) {
        routeLine.setStyle({ color: accentColor() });
    }
}
const accentColor = () => getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#fecc2a';

/* ---------- 7. Locations: render from data ---------- */
function renderLocations() {
    const host = document.getElementById('locationScreens');
    host.innerHTML = LOCATIONS.map((loc, i) => locationSectionHTML(loc, i)).join('');
    LOCATIONS.forEach(l => renderLocationText(l.id));
}

function locationSectionHTML(loc, i) {
    const prev = i === 0
        ? { go: 'intro', dir: '← Back', dest: 'The exhibition' }
        : { go: LOCATIONS[i - 1].id, dir: '← Previous', dest: LOCATIONS[i - 1].title };
    const next = i === LOCATIONS.length - 1
        ? { go: 'citymap', dir: 'The whole map →', dest: 'Map & one-day itinerary' }
        : { go: LOCATIONS[i + 1].id, dir: 'Next passage →', dest: LOCATIONS[i + 1].title };

    const gallery = [loc.img.hero, ...(loc.img.gallery || [])];
    const galleryHTML = gallery.map((src, k) => `
        <figure><img${k === 0 ? ' data-parallax' : ''} src="${enc(src)}" alt="${loc.title}">
            <figcaption>${loc.title}</figcaption></figure>`).join('');
    const single = gallery.length < 2 ? ' single' : '';

    const dt = loc.dcterms;
    const metaRows = `
        <tr><td class="meta-prop">Director</td><td class="meta-val">Paolo Sorrentino</td></tr>
        <tr><td class="meta-prop">Film year</td><td class="meta-val">2013</td></tr>
        <tr><td class="meta-prop">Scene timestamp</td><td class="meta-val">${loc.scene.timestamp} — ${loc.scene.depictedAs}</td></tr>
        <tr><td class="meta-prop">Real location</td><td class="meta-val">${loc.realPlace}</td></tr>
        <tr><td class="meta-prop">Address</td><td class="meta-val">${loc.address}</td></tr>
        <tr><td class="meta-prop">Camera orientation</td><td class="meta-val">${loc.camera}</td></tr>
        <tr class="dc"><td class="meta-prop">dcterms:title</td><td class="meta-val">${dt.title}</td></tr>
        <tr class="dc"><td class="meta-prop">dcterms:subject</td><td class="meta-val">${dt.subject}</td></tr>
        <tr class="dc"><td class="meta-prop">dcterms:spatial</td><td class="meta-val">${dt.spatial}</td></tr>
        <tr class="dc"><td class="meta-prop">dcterms:temporal</td><td class="meta-val">${dt.temporal}</td></tr>
        <tr class="dc"><td class="meta-prop">dcterms:type</td><td class="meta-val">${dt.type}</td></tr>`;

    return `
    <section class="screen location" id="${loc.id}" data-step="${loc.n}" data-name="${loc.title}">
        <div class="loc-hero">
            <img class="loc-img" data-parallax src="${enc(loc.img.hero)}" alt="${loc.title}">
            <div class="loc-hero-text">
                <span class="kicker reveal">${loc.kicker}</span>
                <h2 class="loc-title reveal">${loc.title}</h2>
            </div>
        </div>
        <div class="loc-body">
            <div class="loc-meta reveal">
                <div class="meta-item"><div class="meta-k">Coordinates</div><div class="meta-v">${dt.spatial}</div></div>
                <div class="meta-item"><div class="meta-k">Era</div><div class="meta-v">${loc.era.period} · ${loc.era.century}</div></div>
                <div class="meta-item"><div class="meta-k">Scene</div><div class="meta-v">${loc.scene.timestamp}</div></div>
            </div>

            <div class="text-controls reveal" role="group" aria-label="Adapt the text">
                <div class="tc-group">
                    <span class="tc-label">Depth</span>
                    ${DEPTHS.map(d => `<button class="tc-btn" data-depth="${d.id}" title="${d.note}">${d.label}</button>`).join('')}
                </div>
                <div class="tc-group">
                    <span class="tc-label">Audience</span>
                    ${AUDIENCES.map(a => `<button class="tc-btn" data-aud="${a.id}" title="${a.note}">${a.label}</button>`).join('')}
                </div>
            </div>

            <div class="loc-prose reveal" id="prose-${loc.id}"></div>

            <div class="loc-gallery${single} reveal">${galleryHTML}</div>

            <div class="loc-about reveal">
                <h3 class="about-title">About this location</h3>
                <p class="about-lead"><span class="lead">${loc.realPlace}.</span> ${loc.era.period} · ${loc.era.century}${loc.era.year ? ' (' + loc.era.year + ')' : ''}.</p>
                <h4 class="meta-table-title">Metadata</h4>
                <table class="meta-table">
                    <thead><tr><th>Property</th><th>Value</th></tr></thead>
                    <tbody>${metaRows}</tbody>
                </table>
            </div>
        </div>
        <nav class="loc-nav">
            <a data-go="${prev.go}"><span class="dir">${prev.dir}</span><span class="dest">${prev.dest}</span></a>
            <a class="next" data-go="${next.go}"><span class="dir">${next.dir}</span><span class="dest">${next.dest}</span></a>
        </nav>
    </section>`;
}

/* ---------- 7b. The multimedia text grid (depth × audience) ---------- */
function initTextControls() {
    document.body.addEventListener('click', e => {
        const d = e.target.closest('[data-depth]');
        if (d) { textDepth = d.dataset.depth; localStorage.setItem('lgb-depth', textDepth); refreshAllTexts(); syncTextControls(); return; }
        const a = e.target.closest('[data-aud]');
        if (a) { textAud = a.dataset.aud; localStorage.setItem('lgb-aud', textAud); refreshAllTexts(); syncTextControls(); }
    });
    syncTextControls();
}
function refreshAllTexts() { LOCATIONS.forEach(l => renderLocationText(l.id)); }
function renderLocationText(id) {
    const loc = LOCATIONS.find(l => l.id === id);
    const el = document.getElementById('prose-' + id);
    if (!loc || !el) return;
    const txt = (loc.texts[textAud] && loc.texts[textAud][textDepth]) || '';
    el.innerHTML = `<p class="firstcap"><span class="lead"></span>${txt}</p>`;
}
function syncTextControls() {
    document.querySelectorAll('[data-depth]').forEach(b => b.classList.toggle('on', b.dataset.depth === textDepth));
    document.querySelectorAll('[data-aud]').forEach(b => b.classList.toggle('on', b.dataset.aud === textAud));
}

/* ---------- 8. Narratives: guided routes + thematic lenses ---------- */
function renderNarratives() {
    const wrap = document.getElementById('guidedNarr');
    if (wrap) {
        wrap.innerHTML = NARRATIVES_GUIDED.map(n => `
            <article class="narr-card reveal">
                <p class="narr-card-kind">${n.kind}</p>
                <h3 class="narr-card-title">${n.title}</h3>
                <p class="narr-card-blurb">${n.blurb}</p>
                <p class="narr-card-meta">${n.stops.length} stops</p>
                <button class="btn btn-ghost" data-narr-guided="${n.id}">Open the route <span class="arrow">→</span></button>
            </article>`).join('');
    }
}

function initNarratives() {
    document.querySelectorAll('.narr-tag').forEach(btn => {
        btn.addEventListener('click', () => openLens(btn.dataset.narr));
    });
    document.body.addEventListener('click', e => {
        const g = e.target.closest('[data-narr-guided]');
        if (g) openGuided(g.dataset.narrGuided);
    });
}

function openLens(key) {
    const n = LENS_PROSE[key];
    if (!n) return;
    const ids = locationsByTag(key);
    document.getElementById('narrLens').textContent = n.lens;
    document.getElementById('narrTitle').textContent = n.title;
    document.getElementById('narrText').textContent = n.text;
    document.querySelector('#modal-narrative .rel-label').textContent = 'Follow the thread to these places';
    document.getElementById('narrRelations').innerHTML = ids.map(id => {
        const l = LOCATIONS.find(x => x.id === id);
        return `<button class="rel-chip" data-go="${id}"><span class="rc-num">${String(l.n).padStart(2, '0')}</span>${l.title}</button>`;
    }).join('');
    document.getElementById('modal-narrative').classList.add('open');
}

function openGuided(id) {
    const n = NARRATIVES_GUIDED.find(x => x.id === id);
    if (!n) return;
    document.getElementById('narrLens').textContent = n.kind;
    document.getElementById('narrTitle').textContent = n.title;
    document.getElementById('narrText').textContent = n.blurb;
    document.querySelector('#modal-narrative .rel-label').textContent = 'The route, in order — tap a stop to begin';
    document.getElementById('narrRelations').innerHTML = n.stops.map((sid, k) => {
        const l = LOCATIONS.find(x => x.id === sid);
        return `<button class="rel-chip" data-go="${sid}"><span class="rc-num">${String(k + 1).padStart(2, '0')}</span>${l.title}</button>`;
    }).join('');
    document.getElementById('modal-narrative').classList.add('open');
}

/* ---------- 8b. Historical timeline ---------- */
function renderTimeline() {
    const wrap = document.getElementById('timelineTrack');
    if (!wrap) return;
    wrap.innerHTML = ERAS.map(e => `
        <div class="era reveal">
            <div class="era-marker"><span class="era-dot"></span></div>
            <div class="era-body">
                <p class="era-span">${e.span}</p>
                <h3 class="era-label">${e.label}</h3>
                <div class="era-locs">
                    ${e.locations.map(id => {
                        const l = LOCATIONS.find(x => x.id === id);
                        return `<button class="era-loc" data-go="${id}">
                            <img src="${enc(l.img.hero)}" alt="">
                            <span class="era-loc-cap"><b>${String(l.n).padStart(2, '0')}</b> ${l.title}</span>
                        </button>`;
                    }).join('')}
                </div>
            </div>
        </div>`).join('');
}

/* ---------- 8c. One-day itinerary list (next to the map) ---------- */
function renderItinerary() {
    const wrap = document.getElementById('itineraryList');
    if (!wrap) return;
    wrap.innerHTML = LOCATIONS.map((l, i) => `
        <li class="itin-step reveal">
            <button class="itin-go" data-go="${l.id}">
                <span class="itin-num">${String(l.n).padStart(2, '0')}</span>
                <span class="itin-info">
                    <span class="itin-name">${l.title}</span>
                    <span class="itin-sub">${l.cluster}${i < LOCATIONS.length - 1 ? ' · ' + l.walkToNext : ''}</span>
                </span>
            </button>
        </li>`).join('');
}

/* ---------- 9. Choose your fighter — character graph ---------- */
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
    },
    romano: {
        name: 'Romano',
        role: "The loyal friend · the playwright who never made it",
        img: 'images/quiz_Romano.jpg',
        rel: "Jep's oldest, gentlest friend — an aspiring playwright who never staged the work he believed in, and who has loved a woman for years without ever quite saying so. Unlike the rest of the circle, Romano carries no irony, only quiet devotion. Eventually Rome wears him down, and he goes home.",
        scenes: [
            'Reading his unproduced play aloud to anyone who will listen.',
            'A small, unspoken tenderness toward a woman who never notices.',
            'His farewell — packing a single suitcase and leaving the city that never made room for him.'
        ],
        quotes: [
            '“I came to Rome at eighteen, full of hopes I didn’t even understand.”',
            '“Rome disappoints you. It makes you waste a lot of time.”',
            '“I have to go. I came here too young, and I didn’t do anything.”'
        ],
        result: "You are the quiet, faithful heart of the group — sincere where everyone else is performing. You ask little and give a great deal, and your gentleness can look like failure to people who only value spectacle."
    },
    stefania: {
        name: 'Stefania',
        role: "The committed novelist · the moralist",
        img: 'images/quiz_Stefania.jpg',
        rel: "A writer who has built her identity on political commitment, motherhood and self-described sacrifice, and who never tires of reminding the room of it. At one party she lectures Jep on his wasted talent — until he, with surgical calm, dismantles every claim she has made about her own life.",
        scenes: [
            'Holding court at a party, listing her novels and her causes.',
            'Pressing Jep about why he never wrote a second book.',
            'Sitting in silence as Jep recites, calmly and precisely, the gap between her self-image and her choices.'
        ],
        quotes: [
            '“I have eleven novels, a husband, and a complicated, profound family life.”',
            '“And you — what have you done, besides being charming?”',
            '(Jep, to her) “You have the contemptuous tone of one who is sure of herself. You are not.”'
        ],
        result: "You are principled in your own telling and quick to judge others by a standard you quietly exempt yourself from. Your conviction is real, but so is the gap between what you say and what you've actually risked."
    },
    lello: {
        name: 'Lello Cava',
        role: "The toy wholesaler · the unembarrassed one",
        img: 'images/quiz_Lello.jpg',
        rel: "A wealthy, loud, unapologetically vulgar toy merchant in Jep's circle — the one friend with no pretense of being an intellectual. He's unfaithful to his wife, Trumeau, while insisting in public that theirs is the only real marriage left in Italy. He's coarse where the others are coded, and somehow more honest for it.",
        scenes: [
            "Shouting good-naturedly across the dance floor at one of Jep's parties.",
            'Declaring, straight-faced, that he and his wife are the only couple in Italy still in love.',
            "Dismissing Italy's reputation abroad in one blunt, deflating line."
        ],
        quotes: [
            '“My wife and I are the only couple in Italy who are in love.”',
            '“Fashion and pizza. A country of weavers and grocers.”',
            '“Why use ten words when one will do the job?”'
        ],
        result: "You're the unfiltered one — blunt, a little crude, and allergic to the group's pretensions. You'll never out-talk the intellectuals at the table, but you say more true things by accident than they manage on purpose."
    }
};

function initFighter() {
    const nodes = document.querySelectorAll('.char-node');
    if (!nodes.length) return;
    nodes.forEach(n => n.addEventListener('click', () => showCharacter(n.dataset.char)));
    showCharacter('jep');
}
function showCharacter(key) {
    const c = CHARACTERS[key];
    const panel = document.getElementById('charDetail');
    if (!c || !panel) return;
    document.querySelectorAll('.char-node').forEach(n => n.classList.toggle('active', n.dataset.char === key));
    panel.innerHTML = `
        <p class="cd-role">${c.role}</p>
        <h3 class="cd-name">${c.name}</h3>
        <p class="cd-rel">${c.rel}</p>
        <p class="cd-block-label">Significant scenes</p>
        <ul class="cd-scenes">${c.scenes.map(s => `<li>${s}</li>`).join('')}</ul>
        <p class="cd-block-label">Lines that linger</p>
        <div class="cd-quotes">${c.quotes.map(q => `<p class="cd-quote">${q}</p>`).join('')}</div>`;
    panel.classList.remove('swap');
    void panel.offsetWidth;
    panel.classList.add('swap');
}

/* ---------- 9b. The quiz ---------- */
const QUIZ = [
    {
        q: 'How do you usually behave at large social events or parties?',
        a: [
            "I'm the life of the party — the king (or queen) of the night. I set the rhythm, but deep down I'm bored to death.",
            "I feel like a stranger at this feast of life; I'd rather watch from the side or have one heart-to-heart.",
            "I'm here on business: observing, gathering information, running things, analysing what's happening.",
            "I'm not here at all. I exist only in someone's bright and distant memories.",
            'Parties are vanity. I prefer silence, asceticism, and focus on something eternal.',
            "I quietly stand by my best friend's side — the loyal one nobody really notices.",
            "I dominate the conversation with my opinions and judge everyone else's lack of commitment.",
            'I shout across the room, say something crude, and somehow everyone laughs anyway.'
        ]
    },
    {
        q: 'What, to you, is the true "great beauty"?',
        a: [
            "An elusive moment that can't be put into words — though I've spent my whole life trying.",
            'Sincerity and honesty, even when they come with sadness or physical decay.',
            'Professionalism, devotion to your craft, and seeing the essence of things beneath the gloss.',
            'First love, a sea breeze, and an innocence that can never be regained.',
            'Roots. We must remember where we came from and feed on that soil.',
            'A simple home, a few good books, and a friendship that never asked anything in return.',
            "Beauty has to serve a cause — otherwise it's just decoration for the privileged.",
            "A loud, honest marriage nobody else believes is real — but it is."
        ]
    },
    {
        q: 'What is your relationship with your own past?',
        a: [
            'A baggage of disappointments and one bright flash I keep returning to in my mind.',
            'The past is what made me a tired but understanding person.',
            'My past is my experience, my authority, and my principles.',
            'I am the past itself — pure, idealised, and frozen in time.',
            "The past doesn't matter unless it's tied to eternity and the spiritual path.",
            'My past is full of small failures and a play I never managed to stage.',
            "My past is a list of causes I've championed — though I admit I've sacrificed little for them.",
            "My past is full of deals, a few affairs, and zero regrets I'd ever admit to."
        ]
    },
    {
        q: 'What would you say to someone who asks you the meaning of life?',
        a: [
            '"I looked for it everywhere, but found it only in emptiness and beautiful scenery."',
            '"It’s simply to be near someone who understands you, until the lights go out."',
            '"It’s in the work, and in staying true to yourself in this mad world."',
            '"It’s in that single glance we exchanged so many years ago."',
            '"Do you know why I eat only roots? Because roots are important."',
            '"It\'s in showing up for the people you love, even when nothing ever changes."',
            '"It\'s commitment — though don\'t ask me to actually give anything up for it."',
            '"Why use ten words when one will do the job?"'
        ]
    },
    {
        q: 'What is your main role in your circle of friends?',
        a: [
            'The cynical intellectual who can both amuse you and prick you with the truth.',
            'The one you can trust with a secret, and stay silent with about what matters.',
            'The wise mentor — or the strict but fair critic.',
            'The muse, whose image inspires but stays out of reach.',
            'The conscience, reminding everyone that all earthly things are dust.',
            'The quiet, faithful one who always answers the phone.',
            'The self-appointed conscience, quick to criticize everyone but myself.',
            "The blunt one who says the thing nobody else will say out loud."
        ]
    }
];
const QUIZ_KEY = { A: 'jep', B: 'ramona', C: 'dadina', D: 'elisa', E: 'maria', F: 'romano', G: 'stefania', H: 'lello' };
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
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
    wrap.querySelectorAll('.quiz-opt').forEach(btn => btn.addEventListener('click', () => selectOption(btn)));
    document.getElementById('quizReveal').addEventListener('click', revealResult);
}
function selectOption(btn) {
    const q = btn.dataset.q;
    document.querySelectorAll(`.quiz-opt[data-q="${q}"]`).forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    quizAnswers[q] = btn.dataset.letter;
    const answered = Object.keys(quizAnswers).length;
    document.getElementById('quizProgress').textContent = answered + ' / 5 answered';
    document.getElementById('quizReveal').disabled = answered < QUIZ.length;
}
function revealResult() {
    const counts = {};
    LETTERS.forEach(l => counts[l] = 0);
    Object.values(quizAnswers).forEach(l => counts[l]++);
    let best = LETTERS[0];
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

/* ---------- 10. The crack / glass-shatter experience ---------- */
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
        btn.classList.add('swing');
        setTimeout(() => {
            playGlassBreak();
            stage.classList.add('shake');
            flash.classList.add('go');
            drawCracks(svg);
            stage.classList.add('shattered');
        }, 230);
        setTimeout(() => stage.classList.remove('shake'), 900);
        setTimeout(() => stage.classList.add('healed'), 1400);
    });
}
function drawCracks(svg) {
    const W = window.innerWidth, H = window.innerHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = '';
    const cx = W * 0.5, cy = H * 0.48;
    const NS = 'http://www.w3.org/2000/svg';
    const paths = [];
    const point = (ang, r) => [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    const jagged = (x1, y1, x2, y2, segs, jit) => {
        let d = `M ${x1.toFixed(1)} ${y1.toFixed(1)}`;
        for (let i = 1; i <= segs; i++) {
            const t = i / segs;
            let x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
            if (i < segs) { x += (Math.random() - 0.5) * jit; y += (Math.random() - 0.5) * jit; }
            d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return d;
    };
    const rays = 11 + Math.floor(Math.random() * 4);
    const angles = [];
    const maxR = Math.hypot(W, H);
    for (let i = 0; i < rays; i++) {
        const ang = (i / rays) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
        angles.push(ang);
        const len = maxR * (0.55 + Math.random() * 0.5);
        const [ex, ey] = point(ang, len);
        paths.push({ d: jagged(cx, cy, ex, ey, 7, 26), w: 1.4 });
        if (Math.random() > 0.45) {
            const br = len * (0.35 + Math.random() * 0.35);
            const [bx, by] = point(ang, br);
            const [tx, ty] = point(ang + (Math.random() - 0.5) * 1.1, br + len * 0.3);
            paths.push({ d: jagged(bx, by, tx, ty, 4, 18), w: 0.8 });
        }
    }
    const rings = [60, 130, 230, 360];
    rings.forEach(r => {
        for (let i = 0; i < angles.length; i++) {
            const a1 = angles[i], a2 = angles[(i + 1) % angles.length];
            const rr = r * (0.85 + Math.random() * 0.3);
            const [x1, y1] = point(a1, rr);
            const [x2, y2] = point(a2, rr);
            paths.push({ d: jagged(x1, y1, x2, y2, 3, 14), w: 0.7 });
        }
    });
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
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.strokeDashoffset = 0; }));
    });
}

/* ---------- 11. Glass-break sound (synthesized) ---------- */
let audioCtx = null;
function playGlassBreak() {
    try {
        audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
        const ctx = audioCtx, now = ctx.currentTime;
        const dur = 0.6;
        const buffer = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2.4);
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 1800;
        const ng = ctx.createGain();
        ng.gain.value = 0.35;
        noise.connect(hp).connect(ng).connect(ctx.destination);
        noise.start(now);
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
    } catch (e) { /* audio is a nicety */ }
}

/* ---------- 12. Scroll reveals + progress ---------- */
let revealObserver;
function initReveals() {
    revealObserver = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) { en.target.classList.add('in'); revealObserver.unobserve(en.target); }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}
function refreshReveals(screenEl) {
    screenEl.querySelectorAll('.reveal:not(.in)').forEach(el => {
        revealObserver.observe(el);
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
function initFooterWatch() {
    const footer = document.querySelector('.site-footer');
    const indicator = document.getElementById('stepIndicator');
    if (!footer || !indicator) return;
    new IntersectionObserver(entries => {
        indicator.classList.toggle('near-footer', entries[0].isIntersecting);
    }, { threshold: 0 }).observe(footer);
}

/* ---------- 13. Interactive Rome map + one-day route ---------- */
let romeMap = null;
let routeLine = null;
function initRomeMap() {
    const el = document.getElementById('romeMap');
    if (!el || typeof L === 'undefined') return;
    if (romeMap) { romeMap.invalidateSize(); return; }

    romeMap = L.map(el, { scrollWheelZoom: false, zoomControl: true, attributionControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(romeMap);

    // the one-day itinerary, drawn as an ordered route
    routeLine = L.polyline(ROME_PLACES.map(p => [p.lat, p.lng]), {
        color: accentColor(), weight: 2.5, opacity: 0.65, dashArray: '1 9', lineCap: 'round'
    }).addTo(romeMap);

    const markers = ROME_PLACES.map(p => {
        const icon = L.divIcon({
            className: 'rome-marker',
            html: `<span class="rm-dot">${p.n}</span>`,
            iconSize: [34, 34], iconAnchor: [17, 17]
        });
        const marker = L.marker([p.lat, p.lng], { icon }).addTo(romeMap);
        const num = String(p.n).padStart(2, '0');
        marker.bindTooltip(
            `<div class="rome-tip-inner"><img src="${enc(p.img)}" alt="">
                <span class="rome-tip-cap"><b>${num}</b>${p.name}</span></div>`,
            { direction: 'top', offset: [0, -16], className: 'rome-tip', opacity: 1 }
        );
        marker.on('click', () => { showScreen(p.id); closeMenu(); });
        return marker;
    });

    romeMap.fitBounds(L.featureGroup(markers).getBounds().pad(0.2));
    setTimeout(() => romeMap.invalidateSize(), 200);
    window.addEventListener('resize', () => {
        if (romeMap && document.getElementById('citymap').classList.contains('active')) romeMap.invalidateSize();
    });
}

/* ---------- 14. Parallax on location images ---------- */
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
