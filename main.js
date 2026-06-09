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
const SCREENS = ['home', 'intro', 'loc1', 'loc2', 'loc3', 'loc4', 'loc5', 'narratives', 'citymap'];
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
