/* ============================================================
   LA GRANDE BELLEZZA — content & data layer (LMML)
   Single source of truth. main.js renders everything from here:
     · LOCATIONS  — 13 real Roman sites, uniform metadata + the
                    multimedia text grid (depth × audience = 9 texts)
     · THEMES     — 4 switchable typographic/graphic themes
     · DEPTHS / AUDIENCES — the two axes of the multimedia grid
     · NARRATIVES — 3 guided visit routes
     · ERAS       — the required historical timeline
   ============================================================ */

/* ---- the multimedia grid axes ---- */
const DEPTHS = [
    { id: 'brief',  label: 'Brief',    note: 'A single caption' },
    { id: 'medium', label: 'Medium',   note: 'A short read' },
    { id: 'long',   label: 'In depth', note: 'The full story' }
];

const AUDIENCES = [
    { id: 'young',   label: 'Young',   note: 'Curious newcomer · introductory' },
    { id: 'adult',   label: 'Adult',   note: 'General visitor · average' },
    { id: 'scholar', label: 'Scholar', note: 'Specialist · advanced' }
];

/* ---- switchable graphic / typographic themes ---- */
const THEMES = [
    { id: 'notte',    label: 'Notte dorata', note: 'Gold on Roman night' },
    { id: 'carta',    label: 'Carta',        note: 'Exhibition print, on paper' },
    { id: 'cinema',   label: 'Cinema',       note: 'Black-and-white film' },
    { id: 'affresco', label: 'Affresco',     note: 'Warm baroque fresco' }
];

/* ---- the 13 locations, in one-day itinerary order ---- */
const LOCATIONS = [
    {
        id: 'loc1', n: 1,
        title: "Fontana dell'Acqua Paola",
        kicker: 'Passage 01 · Where it begins',
        realPlace: "Fontana dell'Acqua Paola (Il Fontanone), Janiculum",
        address: 'Via Garibaldi, Gianicolo, Roma',
        coords: { lat: 41.8888, lng: 12.4626 },
        camera: 'East, out over the city — the terrace, not the fountain, holds the view',
        scene: { timestamp: '00:02:00', depictedAs: 'The opening — a tourist collapses, overwhelmed by Rome' },
        era: { period: 'Baroque', century: 'XVII c.', year: '1610–1612' },
        cluster: 'Gianicolo & Trastevere', order: 1, walkToNext: '5 min on foot to the terrace',
        img: { hero: 'images/1location2.png', gallery: ['images/1location1.png'] },
        dcterms: {
            title: "Fontana dell'Acqua Paola — opening shot",
            subject: 'Rome, Beauty, The opening, Fountains & water',
            spatial: '41.8888° N, 12.4626° E',
            temporal: 'Baroque · XVII c. (completed 1612)',
            type: 'ExteriorLocation · Monumental fountain'
        },
        tags: { themes: ['beauty-surface', 'memory-loss'], typology: ['fountains'], period: 'baroque' },
        texts: {
            young: {
                brief: 'The film starts here, at a giant fountain — and a tourist literally faints because Rome is too beautiful.',
                medium: 'This huge white fountain on the Janiculum hill opens the movie. A visiting tourist stops to take photos, the choir sings, and the beauty of Rome is so overwhelming that he collapses. Before the story even starts, beauty has already knocked someone out.',
                long: "The very first thing you see in The Great Beauty is this enormous fountain, the Fontanone, high on the Janiculum hill. Tourists wander, a choir sings, the sun is bright — and then one visitor simply faints, overcome by how beautiful everything is. It's a strange, unforgettable way to begin a film: nobody has spoken a word of the plot yet, but Rome has already proven it can stop a heart. Stand here and look east over the rooftops, and you'll understand why."
            },
            adult: {
                brief: "The Fontanone opens the film: amid a choir and tourists, one visitor collapses from Rome's sheer beauty.",
                medium: "Sorrentino opens the film on the Janiculum, at the monumental Fontana dell'Acqua Paola. Among camera-toting tourists and a singing choir, a Japanese visitor is so overwhelmed by the panorama that he collapses. It is a thesis stated before a single line of dialogue: beauty here is a physical force.",
                long: "The Great Beauty begins not with its hero but with a tourist's body. On the Janiculum terrace beside the baroque Fontana dell'Acqua Paola, a choir sings, cameras click, and a Japanese visitor, turning to photograph the panorama of Rome, collapses and dies. Sorrentino states his theme before the plot exists: in this city beauty is not decoration but a force strong enough to stop a heart. The fountain — built to be admired from afar — is the perfect threshold, and the eastward view over the rooftops, rather than the marble itself, is the real spectacle."
            },
            scholar: {
                brief: "The Fontanone prologue stages beauty as lethal affect, framing the film's aesthetic-mortal dialectic before the diegesis begins.",
                medium: "The pre-credit sequence sites itself at the Fontana dell'Acqua Paola (Flaminio Ponzio & Giovanni Fontana, 1610–12), a Pauline display fountain conceived as scenographic spectacle. Sorrentino weaponises that scenography: the tourist's fatal swoon literalises Stendhal syndrome and installs the film's governing dialectic between aesthetic rapture and death.",
                long: "Sorrentino's prologue is a deliberate act of curation. The Fontana dell'Acqua Paola — Flaminio Ponzio and Giovanni Fontana's 1610–12 mostra terminating the restored Acqua Traiana aqueduct — was from its inception a baroque machine for being admired, a façade more theatre than utility. The film appropriates that logic: the anonymous tourist's collapse before the panorama enacts a hyperbolic Stendhal syndrome and, in killing the spectator rather than a character, refuses narrative economy in favour of pure thesis. Beauty is posited as affect with mortal stakes. The eastward prospect over the city, not the marble, is the privileged object — establishing the gaze, and its dangers, as the film's true subject."
            }
        }
    },
    {
        id: 'loc2', n: 2,
        title: 'The Janiculum Terrace',
        kicker: 'Passage 02 · The whole city at once',
        realPlace: 'Passeggiata del Gianicolo, Piazzale Garibaldi',
        address: 'Piazzale Giuseppe Garibaldi, Gianicolo, Roma',
        coords: { lat: 41.8917, lng: 12.4616 },
        camera: 'North-east, panning across the rooftops toward the centro storico',
        scene: { timestamp: '00:03:00', depictedAs: "Rome's panoramic skyline behind the opening" },
        era: { period: 'Belle Époque', century: 'XIX c.', year: '1880s promenade' },
        cluster: 'Gianicolo & Trastevere', order: 2, walkToNext: '3 min to the Tempietto',
        img: { hero: 'images/1location1.png', gallery: [] },
        dcterms: {
            title: 'Janiculum panoramic terrace',
            subject: 'Panorama, Skyline, Belle Époque promenade, Rome',
            spatial: '41.8917° N, 12.4616° E',
            temporal: 'Belle Époque · XIX c. (promenade laid out 1880s)',
            type: 'ExteriorLocation · Panoramic terrace'
        },
        tags: { themes: ['beauty-surface', 'search-meaning'], typology: ['hills-gardens'], period: 'belle-epoque' },
        texts: {
            young: {
                brief: 'The best free view in Rome — the whole city spread out below you.',
                medium: "Right by the opening fountain is a long terrace where you can see almost all of Rome at once: domes, rooftops, bell towers. It's the postcard view, and the film uses it to show off the city before anything else happens.",
                long: "Walk a minute from the fountain and the whole of Rome opens up beneath you. The Janiculum terrace is the city's great balcony: domes and bell towers, ochre rooftops, the dome of St. Peter's off to one side. The film leans on this panorama in its opening minutes to make its boldest claim — that Rome is almost too much to look at. Come at sunrise or sunset and you'll have the same view the camera loves, minus the cannon that still fires here every day at noon."
            },
            adult: {
                brief: "The Janiculum promenade offers Rome's classic panorama — the skyline the film opens against.",
                medium: "Laid out as a belvedere promenade in the 1880s, the Janiculum terrace gives the most complete panorama of the historic centre. Sorrentino uses it in the opening minutes as a statement of scale: before we meet anyone, we are shown the city entire, beautiful and indifferent.",
                long: "The Passeggiata del Gianicolo, with its busts of Garibaldi's republicans and the daily noon cannon, was conceived in the 1880s as the new capital's grand belvedere. From here the historic centre reads as a single composition — the cupolas of Sant'Andrea della Valle and the Pantheon, the spread of terracotta roofs, St. Peter's anchoring the right. The film's prologue exploits this totalising view: the city is offered whole and from above, sublime and untouchable, so that the human dramas to come will always feel small against it. It is Rome as panorama before Rome as labyrinth."
            },
            scholar: {
                brief: 'The Janiculum belvedere supplies the film an Olympian establishing gaze, coding Rome as totalising spectacle.',
                medium: "Sited on the post-1870 Passeggiata del Gianicolo, the panoramic terrace furnishes an Olympian vantage. Its inclusion alongside the Fontanone constructs the prologue as a survey shot: the city apprehended as totality and composition, a sublime object that pre-empts and dwarfs the subsequent diegesis.",
                long: "The Janiculum belvedere, monumentalised after 1870 as part of the Risorgimento capital's self-fashioning, encodes a specific way of seeing Rome — from above, entire, as composition. Sorrentino's prologue mobilises this Olympian gaze in counterpoint to the human-scaled wanderings that follow: the establishing survey posits the city as sublime totality, an aesthetic object that exceeds any single observer. The conjunction with the Fontanone's fatal swoon is pointed — the panorama that the tourist dies trying to capture is precisely this one. The terrace thus operates less as a location than as a thesis about spectatorship and scale."
            }
        }
    },
    {
        id: 'loc3', n: 3,
        title: 'Tempietto del Bramante',
        kicker: 'Passage 03 · Perfect, and tiny',
        realPlace: 'Tempietto del Bramante, San Pietro in Montorio',
        address: 'Piazza di San Pietro in Montorio 2, Gianicolo, Roma',
        coords: { lat: 41.8893, lng: 12.4640 },
        camera: 'West, into the courtyard, framing the circular temple head-on',
        scene: { timestamp: '—', depictedAs: 'Renaissance perfection among the night wanderings' },
        era: { period: 'Renaissance', century: 'XVI c.', year: 'c. 1502' },
        cluster: 'Gianicolo & Trastevere', order: 3, walkToNext: '15 min downhill to Villa Farnesina',
        img: { hero: 'images/Tempietto del Bramante.jpg', gallery: [] },
        dcterms: {
            title: 'Tempietto del Bramante',
            subject: 'Renaissance architecture, Harmony, Martyrium, Rome',
            spatial: '41.8893° N, 12.4640° E',
            temporal: 'High Renaissance · XVI c. (c. 1502)',
            type: 'ExteriorLocation · Commemorative temple'
        },
        tags: { themes: ['beauty-surface', 'sacred-spiritual'], typology: ['sacred-sites'], period: 'renaissance' },
        texts: {
            young: {
                brief: "A tiny round temple that architects consider basically perfect.",
                medium: "Hidden in a small courtyard on the Janiculum is a little round temple by Bramante. It's small enough to walk around in seconds, but it's one of the most admired buildings in the world — proof that beauty isn't about being big.",
                long: "Tucked into a narrow courtyard beside the church of San Pietro in Montorio sits the Tempietto: a perfect little circular temple, ringed with columns, built around 1502. You could walk around it in under a minute, yet architects have studied it for five hundred years as a model of harmony. In a film obsessed with grand, glittering spaces, a jewel like this is a quiet counter-argument — real beauty can be small, precise and calm, the opposite of the parties."
            },
            adult: {
                brief: "Bramante's Tempietto: a perfect Renaissance miniature, beauty as harmony rather than spectacle.",
                medium: "Donato Bramante's Tempietto (c. 1502) marks the supposed site of St. Peter's crucifixion. A circular, colonnaded martyrium of almost mathematical calm, it represents the High Renaissance ideal of harmony — a deliberate foil, in the film's Rome, to the baroque excess of the parties.",
                long: "Built around 1502 over the traditional site of St. Peter's martyrdom, Bramante's Tempietto is the manifesto of the High Renaissance: a circular peripteral temple of Tuscan Doric columns, its proportions so resolved that it reads as architecture distilled to an idea. Against the film's world of baroque interiors and cosmetic surfaces, this miniature offers beauty of a wholly different order — quiet, mathematical, sacred. Sorrentino's Rome is built from such collisions of register, and the Tempietto stands for the harmony the protagonist keeps sensing he has lost."
            },
            scholar: {
                brief: "The Tempietto encodes the Albertian-Bramantesque ideal of concinnitas — beauty as resolved proportion, antithesis of baroque surface.",
                medium: "Bramante's martyrium (c. 1502) at San Pietro in Montorio is the canonical statement of High Renaissance centralised harmony, its Tuscan-Doric peristyle and modular proportion exemplifying concinnitas. Within the film's iconographic economy it functions dialectically against the baroque and cosmetic registers, indexing a lost ideal of integral beauty.",
                long: "Donato Bramante's Tempietto (c. 1502), commemorating the apocryphal site of the Petrine crucifixion, is the architectural locus classicus of the centralised Renaissance ideal — a freestanding circular cella with a Tuscan-Doric peristyle, every dimension governed by a single module, the whole legible as the built form of Albertian concinnitas. Its citation in The Great Beauty operates within a careful dialectic of period registers: against the Counter-Reformation theatricality of the Fontanone and the Belle Époque grandeur of Palazzo Brancaccio, the Tempietto stands for an integral, proportional beauty the diegesis frames as irretrievable. It is the formal correlate of the protagonist's nostalgia for meaning."
            }
        }
    },
    {
        id: 'loc4', n: 4,
        title: 'Villa Farnesina',
        kicker: 'Passage 04 · Frescoes by night',
        realPlace: 'Villa Farnesina, Trastevere',
        address: 'Via della Lungara 230, Trastevere, Roma',
        coords: { lat: 41.8936, lng: 12.4670 },
        camera: 'Interior — slow lateral tracking along the frescoed loggia',
        scene: { timestamp: '01:10:00', depictedAs: "The nocturnal tour of Rome's private palaces" },
        era: { period: 'Renaissance', century: 'XVI c.', year: '1506–1510' },
        cluster: 'Gianicolo & Trastevere', order: 4, walkToNext: '25 min / short transfer to the Aventine',
        img: { hero: 'images/villa farnesina.jpg', gallery: [] },
        dcterms: {
            title: 'Villa Farnesina — night tour',
            subject: 'Renaissance fresco, Raphael, Private Rome, Beauty after hours',
            spatial: '41.8936° N, 12.4670° E',
            temporal: 'High Renaissance · XVI c. (1506–1510)',
            type: 'InteriorLocation · Frescoed villa'
        },
        tags: { themes: ['beauty-surface', 'decadence-party'], typology: ['palaces'], period: 'renaissance' },
        texts: {
            young: {
                brief: 'A villa covered in 500-year-old paintings that the characters get to see privately, at night.',
                medium: "In one famous sequence, a man with a giant ring of keys lets Jep and his friend into Rome's most beautiful palaces after dark. This Renaissance villa, painted with frescoes by Raphael and others, is exactly the kind of secret beauty only insiders get to see.",
                long: "There's a magical scene where a discreet man — the keeper of the keys to Rome's most beautiful palaces — takes Jep and Ramona on a private night tour. The Villa Farnesina is the dream version of that idea: a Renaissance villa whose rooms are covered in frescoes by Raphael and his circle, including a ceiling of gods and a hall where the walls seem to open onto painted countryside. Seeing it empty and lit at night, with no crowds, is a kind of beauty money usually can't buy — which is exactly the film's point."
            },
            adult: {
                brief: "Villa Farnesina stands for the film's after-hours tour of Rome's frescoed private palaces.",
                medium: "Agostino Chigi's pleasure villa (1506–10), frescoed by Raphael, Peruzzi and Sodoma, embodies the film's nocturnal sequence in which a keeper of keys opens Rome's most beautiful palaces. It is beauty as privilege — accessible only to insiders, glimpsed in silence after the city sleeps.",
                long: "Built 1506–10 for the banker Agostino Chigi and later bought by the Farnese, the Villa Farnesina is one of the supreme achievements of Roman Renaissance decoration: Raphael's Loggia of Cupid and Psyche and his Galatea, Peruzzi's illusionistic Perspectives, Sodoma's bedchamber. In The Great Beauty it answers the film's most seductive conceit — the silent night tour of Rome's private palaces, led by the man who holds their keys. Beauty here is not bought but unlocked, available only to those inside the circle, and only in the small hours. The villa makes literal the film's quiet argument that the city's deepest splendours are hidden, hushed and largely unseen."
            },
            scholar: {
                brief: "The Farnesina indexes beauty-as-access: the film's nocturnal palace-tour reframes patrimony as a private, gated aesthetic economy.",
                medium: "Chigi's suburban villa (1506–10; Raphael, Peruzzi, Sodoma) epitomises Cinquecento secular fresco. Mobilised within the film's 'keeper of the keys' sequence, it allegorises beauty as restricted access — heritage privatised, the canonical patrimony rendered an after-hours privilege of an insider coterie.",
                long: "The Villa Farnesina (Baldassare Peruzzi, 1506–10) for Agostino Chigi — with Raphael's Galatea and Loggia di Amore e Psiche, Peruzzi's quadratura Sala delle Prospettive and Sodoma's Sala delle Nozze — constitutes a high point of secular Cinquecento decoration. Its narrative function in The Great Beauty is allegorical rather than touristic: as a station in the 'principe delle chiavi' sequence, it converts canonical patrimony into a gated aesthetic economy, beauty consumed privately and nocturnally by a closed elite. The film thereby interrogates the politics of access that underwrite the contemplation of beauty, exposing the social mediation of an experience the prologue had posed as universal and overwhelming."
            }
        }
    },
    {
        id: 'loc5', n: 5,
        title: 'Giardino degli Aranci',
        kicker: 'Passage 05 · The night walk',
        realPlace: 'Giardino degli Aranci (Parco Savello), Aventine',
        address: 'Piazza Pietro d\'Illiria, Aventino, Roma',
        coords: { lat: 41.8842, lng: 12.4790 },
        camera: 'North-west, framed through the orange trees toward St. Peter\'s dome',
        scene: { timestamp: '01:18:00', depictedAs: "Jep and his friends wander the quiet Aventine" },
        era: { period: 'Medieval / modern garden', century: 'XX c.', year: 'laid out 1932' },
        cluster: 'Aventine & Caracalla', order: 5, walkToNext: '2 min to Santa Sabina',
        img: { hero: 'images/aventine.JPG', gallery: [] },
        dcterms: {
            title: 'Giardino degli Aranci — Aventine night walk',
            subject: 'Wandering, Panorama, Garden, The sacred',
            spatial: '41.8842° N, 12.4790° E',
            temporal: 'Modern garden · XX c. (1932) on a medieval site',
            type: 'ExteriorLocation · Public garden & viewpoint'
        },
        tags: { themes: ['sacred-spiritual', 'search-meaning', 'memory-loss'], typology: ['hills-gardens'], period: 'contemporary' },
        texts: {
            young: {
                brief: "A quiet orange-tree garden with a dreamy view of St. Peter's dome.",
                medium: "On the calm Aventine hill, Jep and his friends wander through a garden of orange trees. At the far end, the city opens up with St. Peter's dome glowing in the distance. After all the loud parties, this is where the film slows down and breathes.",
                long: "The Aventine is Rome's quietest hill, and the Giardino degli Aranci — a walled garden of orange trees — is its most peaceful corner. Jep and his friends drift through here on one of their night walks, and at the terrace the whole city opens out, St. Peter's dome floating on the horizon. It's a turning point in the film's mood: away from the smoke and music of the parties, in the cool air among the trees, the characters seem briefly able to feel something real. Beauty here is calm, not dazzling."
            },
            adult: {
                brief: "The Aventine's orange garden hosts the film's contemplative night walk and its panorama toward St. Peter's.",
                medium: "Laid out in 1932 within the medieval Savelli enclosure, the Giardino degli Aranci crowns the Aventine with a belvedere over the Tiber bend toward St. Peter's. The film's friends wander here in a register of quiet — the contemplative counterpoint to the parties, the hill of the spiritual thread.",
                long: "The Aventine, aristocratic and hushed, is where The Great Beauty lets its characters fall silent. The Giardino degli Aranci — Raffaele de Vico's 1932 garden inside the medieval Savelli fortifications, beside the early-Christian basilica of Santa Sabina — offers a terrace framing the Tiber and the dome of St. Peter's. Jep's nocturnal wanderings bring him and his friends here, into a register of contemplation that the film opposes to the smoke and noise of high society. On this hill, among the orange trees and the cloisters, the spiritual undercurrent the film keeps reaching for comes closest to the surface."
            },
            scholar: {
                brief: "The Aventine sequence stages a contemplative topography opposing the film's party-spaces, foregrounding the spiritual register via sacred adjacency.",
                medium: "The Giardino degli Aranci (R. de Vico, 1932), set within the medieval Savelli circuit adjacent to Santa Sabina, supplies a belvedere coded as contemplative. The film deploys the Aventine's patrician quiet and sacred adjacency as structural antithesis to the bacchic interiors, modulating its tonal architecture toward the spiritual.",
                long: "The Aventine furnishes The Great Beauty its contemplative pole. The Giardino degli Aranci — Raffaele de Vico's 1932 park inscribed within the medieval Savelli enceinte, flanked by the paleochristian Santa Sabina and the Priory of the Knights of Malta — assembles a topography saturated with sacrality and aristocratic quietude. Sorrentino exploits this against the film's bacchic interiors: the nocturnal passeggiata across the hill operates as tonal modulation, the score thinning, the cutting slowing, the panorama toward the Petrine dome reasserting a transcendent axis. The hill thus performs structurally what the dialogue only gestures at — the persistence, beneath the chatter, of a spiritual longing."
            }
        }
    },
    {
        id: 'loc6', n: 6,
        title: 'Basilica di Santa Sabina',
        kicker: 'Passage 06 · Early Christian calm',
        realPlace: 'Basilica di Santa Sabina all\'Aventino',
        address: 'Piazza Pietro d\'Illiria 1, Aventino, Roma',
        coords: { lat: 41.8843, lng: 12.4793 },
        camera: 'East along the nave, light raking from the clerestory windows',
        scene: { timestamp: '01:19:00', depictedAs: 'The sacred thread of the night wanderings' },
        era: { period: 'Early Christian', century: 'V c.', year: '422–432' },
        cluster: 'Aventine & Caracalla', order: 6, walkToNext: '15 min to the Baths of Caracalla',
        img: { hero: 'images/santa sabina.jpg', gallery: [] },
        dcterms: {
            title: 'Basilica di Santa Sabina',
            subject: 'Early Christian basilica, The sacred, Light, Rome',
            spatial: '41.8843° N, 12.4793° E',
            temporal: 'Early Christian · V c. (422–432)',
            type: 'InteriorLocation · Paleochristian basilica'
        },
        tags: { themes: ['sacred-spiritual', 'search-meaning'], typology: ['sacred-sites'], period: 'early-christian' },
        texts: {
            young: {
                brief: 'One of the oldest churches in Rome, almost 1,600 years old, and incredibly peaceful.',
                medium: "Right next to the orange garden stands Santa Sabina, a church from the 400s. It's plain and bright inside, with rows of pale columns and soft light. After the gold and glitter elsewhere in the film, its simple beauty feels almost like a relief.",
                long: "Santa Sabina is one of the oldest and purest churches in Rome, built in the 420s when the city was only just becoming Christian. Step inside and it's all calm: a single wide hall, rows of matching marble columns, white walls and light pouring through windows of thin selenite. There are almost no decorations — and that's the point. In a film crowded with baroque excess and cosmetic 'beauty', this ancient room offers the opposite: stillness, clarity, and a sense of the sacred that doesn't need to shout."
            },
            adult: {
                brief: "Santa Sabina (422–432): a luminous early-Christian basilica embodying the film's sacred, unadorned register.",
                medium: "The Aventine basilica of Santa Sabina, built 422–432, is the best-preserved paleochristian church in Rome: a single luminous hall of spoliated Corinthian columns under selenite windows. Its austere clarity offers the film a model of sacred beauty wholly opposed to baroque display.",
                long: "Founded by Peter of Illyria between 422 and 432, Santa Sabina is the paradigmatic early-Christian basilica and the best preserved in Rome — a broad, light-filled nave separated by twenty-four reused Corinthian columns, the upper walls once gleaming with opus sectile, the windows glazed in translucent selenite. Its famous fifth-century carved cypress doors include one of the earliest known Crucifixions. Within The Great Beauty's Aventine sequence, Santa Sabina supplies the sacred pole of the city: a beauty of proportion, light and restraint that stands as the antithesis of the cosmetic and the baroque, and the visual home of the film's spiritual longing."
            },
            scholar: {
                brief: "Santa Sabina exemplifies the Theodosian basilica type; the film recruits its luminous asceticism as the sacred antipode to baroque/cosmetic surface.",
                medium: "Santa Sabina (422–432) is the locus classicus of the Theodosian-era columnar basilica: a unitary nave on spoliated Proconnesian Corinthian columns, opus-sectile spandrels and selenite fenestration producing a calibrated luminism. Its fifth-century cypress doors preserve an incunabular Crucifixion. The film enlists this ascetic clarity as the structural antipode to its baroque and cosmetic registers.",
                long: "The basilica of Santa Sabina, erected 422–432 under Peter of Illyria, is the canonical exemplar of the Theodosian columnar basilica and Rome's most intact paleochristian interior: a unitary hall articulated by twenty-four homogeneous spoliated Corinthian columns, the clerestory and spandrels once sheathed in marble and opus sectile, the windows glazed with selenite to yield a controlled, immaterial light; the cypress-wood west doors (c. 432) transmit one of the earliest monumental Crucifixions. The Great Beauty integrates this fabric into its Aventine topography as the sacral antipode to the cosmetic-baroque axis: the basilica's reductive luminism and proportional clarity furnish a counter-model of beauty — transcendent, unadorned — against which the film measures the hollowness of spectacle."
            }
        }
    },
    {
        id: 'loc7', n: 7,
        title: 'Terme di Caracalla',
        kicker: 'Passage 07 · Where the giraffe vanishes',
        realPlace: 'Terme di Caracalla (Baths of Caracalla)',
        address: 'Viale delle Terme di Caracalla 52, Roma',
        coords: { lat: 41.8790, lng: 12.4925 },
        camera: 'South, across the brick ruins toward the standing vaults',
        scene: { timestamp: '01:35:00', depictedAs: 'The trick of the disappearing giraffe' },
        era: { period: 'Ancient Rome', century: 'III c.', year: '212–216 AD' },
        cluster: 'Aventine & Caracalla', order: 7, walkToNext: '20 min to Piazza del Colosseo',
        img: { hero: 'images/caracalla.JPG', gallery: [] },
        dcterms: {
            title: 'Terme di Caracalla — the disappearing giraffe',
            subject: 'Illusion, The trick, Archaeological Rome, Farewell',
            spatial: '41.8790° N, 12.4925° E',
            temporal: 'Ancient Rome · III c. (212–216 AD)',
            type: 'ExteriorLocation · Imperial ruins'
        },
        tags: { themes: ['illusion-trick', 'memory-loss'], typology: ['ancient-ruins'], period: 'ancient' },
        texts: {
            young: {
                brief: "Ancient Roman baths so huge a magician makes a real giraffe disappear inside them.",
                medium: "These are the colossal ruins of an ancient Roman spa. At night, a magician friend of Jep's makes a live giraffe vanish here. 'It's all a trick,' he admits — a line that quietly explains the whole film: a lot of beauty is just illusion.",
                long: "The Baths of Caracalla were once an enormous public spa for 1,600 people; today their brick walls still tower like cliffs. In one of the film's strangest, most beautiful scenes, Jep visits at night and his friend, a stage magician, makes a real giraffe disappear among the ruins. When Jep asks how, the magician shrugs: 'It's just a trick.' That line echoes through everything — the parties, the surgery, the art. Maybe a lot of what looks like 'great beauty' is exactly that: a trick, dazzling and empty, unless something real stands behind it."
            },
            adult: {
                brief: "At Caracalla's ruins a magician vanishes a giraffe — 'it's a trick', the film's quiet thesis on illusion.",
                medium: "Inaugurated 216 AD, the Baths of Caracalla survive as monumental ruins. The film stages here its emblematic scene: a magician makes a giraffe disappear, then admits 'it's a trick.' Set against farewell and loss, the sequence crystallises the film's meditation on beauty as illusion.",
                long: "Completed under Caracalla in 216 AD, the thermae were among imperial Rome's grandest public buildings — vast vaulted halls for bathing, exercise and study. In The Great Beauty their floodlit ruins host the film's most quoted scene: Jep's magician friend appears to vanish a live giraffe, and when pressed explains, almost sadly, that it is only 'a trick' (un trucco). The line resonates outward — the parties, the cosmetic 'cures', the careers built on poses are all tricks too. Staged amid imperial grandeur and shadowed by an old friend's departure from Rome, the scene fuses illusion, mortality and the longing for a beauty that is more than sleight of hand."
            },
            scholar: {
                brief: "The Caracalla 'trucco' sequence allegorises the cinematic apparatus itself, folding illusion, mortality and ruin into a single mise en abyme.",
                medium: "The Antonine thermae (dedicated 216 AD) frame the film's magician sequence, whose disappearing giraffe and the confession 'è solo un trucco' constitute a mise en abyme of cinematic illusionism. Conjoined with a narrative of departure and death amid imperial ruin, the scene articulates the film's central equation of beauty, artifice and transience.",
                long: "The Terme di Caracalla — the Antonine thermae dedicated in 216 AD, a 25-hectare complex of vaulted frigidaria and natationes — provide the ruinous theatre for The Great Beauty's most self-reflexive episode. The illusionist's vanishing of a live giraffe, capped by the admission 'è solo un trucco', functions as mise en abyme: the trick names cinema's own apparatus and, by extension, the film's recurring artifices — the cosmetic 'cure', the performed careers, the social spectacle. Embedded in a register of farewell (the friend's departure from Rome) and staged against imperial entropy, the sequence binds illusion to mortality, positing that spectacle absent lived substance is mere prestidigitation — the negative against which the film's authentic 'great beauty' is defined."
            }
        }
    },
    {
        id: 'loc8', n: 8,
        title: "Jep's Terrace",
        kicker: 'Passage 08 · The king of the night',
        realPlace: "Jep's penthouse terrace, facing the Colosseum",
        address: 'Piazza del Colosseo 9, Roma',
        coords: { lat: 41.8902, lng: 12.4922 },
        camera: 'West, the terrace railing in foreground, Colosseum filling the frame',
        scene: { timestamp: '00:18:00', depictedAs: "Jep's 65th-birthday party above the Colosseum" },
        era: { period: 'Contemporary', century: '2013', year: 'Jep\'s apartment' },
        cluster: 'Colosseo & Celio', order: 8, walkToNext: '2 min to the Colosseum',
        img: { hero: 'images/terasse.jpg', gallery: [] },
        dcterms: {
            title: "Jep's terrace party",
            subject: 'Decadence, The party, Jep Gambardella, The Colosseum',
            spatial: '41.8902° N, 12.4922° E',
            temporal: 'Contemporary · 2013 (overlooking a I c. monument)',
            type: 'ExteriorLocation · Private terrace'
        },
        tags: { themes: ['decadence-party', 'beauty-surface'], typology: ['terraces'], period: 'contemporary' },
        texts: {
            young: {
                brief: "Jep's party terrace, with the Colosseum lit up right behind the dancers.",
                medium: "Jep, the main character, lives in a flat with a terrace looking straight at the Colosseum. His wild 65th-birthday party happens here, with a conga line of glamorous, exhausted guests dancing against the ancient ruin. It's the film's picture of glittering, empty fun.",
                long: "Jep Gambardella — writer, charmer, 'king of the high life' — lives in a penthouse whose terrace faces the Colosseum head-on. The film introduces him at his own 65th-birthday party here: pounding music, dancers, a conga line of beautiful people who look slightly dead behind the eyes. Sorrentino calls these party trains 'the best trains in Rome — because they go nowhere.' With the world's most famous monument glowing behind the revelry, the terrace becomes the film's perfect image of spectacle: dazzling on the surface, hollow underneath."
            },
            adult: {
                brief: "Jep's terrace above the Colosseum hosts the birthday party that opens the film's social world.",
                medium: "Jep Gambardella's penthouse faces the Colosseum directly; his 65th-birthday party here introduces the film's decadent milieu — the famous conga line, the 'trains that go nowhere'. The juxtaposition of frantic revelry and ancient permanence frames Sorrentino's critique of contemporary Roman society.",
                long: "The terrace of Jep's penthouse, set squarely opposite the Colosseum, is the film's social epicentre. Here Sorrentino stages the bravura sequence of Jep's 65th-birthday party: strobing lights, a thumping score, and the celebrated conga lines Jep wryly calls the finest in Rome 'because they go nowhere.' The guests — surgically smoothed, beautifully dressed, profoundly bored — perform a vitality none of them feels. Behind them the Colosseum stands floodlit and indifferent, two thousand years of permanence mocking the evening's frenzy. The terrace thus distils the film's central irony: a society dancing brilliantly, and emptily, in the lap of eternity."
            },
            scholar: {
                brief: "The terrace party deploys spatial montage — bacchic foreground against the Colosseum's permanence — to indict contemporary Roman sociality.",
                medium: "Jep's terrace, framed against the Flavian Amphitheatre, anchors the film's inaugural set-piece. The 65th-birthday party — its centrifugal 'trenini' choreographies and surgically homogenised guests — is constructed through a spatial montage opposing ephemeral revelry to monumental durée, an indictment of post-historical Roman sociality.",
                long: "Sited at Piazza del Colosseo, Jep's terrace operationalises a spatial montage fundamental to the film's rhetoric: the bacchic foreground — strobing choreographies, the centrifugal conga 'trenini' Jep glosses as going 'nowhere', a clientele rendered uniform by cosmetic intervention — is set against the immobile durée of the Flavian Amphitheatre behind. The sequence introduces protagonist and milieu simultaneously while staging an ironic dialectic of transience and permanence. Sorrentino's debt to Fellini (La dolce vita's revelries) is explicit, but the affect is colder: the party performs a vitality it does not possess, and the monument's indifferent floodlit mass converts spectacle into a memento mori. The terrace is thus less setting than argument about a society dancing, brilliantly, in eternity's shadow."
            }
        }
    },
    {
        id: 'loc9', n: 9,
        title: 'The Colosseum',
        kicker: 'Passage 09 · Eternity, floodlit',
        realPlace: 'Colosseo (Flavian Amphitheatre)',
        address: 'Piazza del Colosseo 1, Roma',
        coords: { lat: 41.8902, lng: 12.4922 },
        camera: 'South-west from Jep\'s terrace, the arena in the middle distance',
        scene: { timestamp: '00:20:00', depictedAs: 'The permanent backdrop to the revelry' },
        era: { period: 'Ancient Rome', century: 'I c.', year: '70–80 AD' },
        cluster: 'Colosseo & Celio', order: 9, walkToNext: '15 min to Palazzo Brancaccio',
        img: { hero: 'images/colosseo.jpg', gallery: [] },
        dcterms: {
            title: 'The Colosseum as backdrop',
            subject: 'Ancient Rome, Monument, Permanence, Spectacle',
            spatial: '41.8902° N, 12.4922° E',
            temporal: 'Ancient Rome · I c. (70–80 AD)',
            type: 'ExteriorLocation · Ancient monument'
        },
        tags: { themes: ['beauty-surface', 'memory-loss'], typology: ['ancient-ruins'], period: 'ancient' },
        texts: {
            young: {
                brief: "The Colosseum — 2,000 years old, glowing behind every party scene.",
                medium: "The most famous monument in the world sits right outside Jep's window. The film keeps it in the background of the parties on purpose: while the guests chase fun that fades by morning, the ancient arena just stands there, calm and eternal.",
                long: "Everyone knows the Colosseum — the giant arena where ancient Romans watched gladiators almost two thousand years ago. In this film it's not a tourist stop but a silent witness. From Jep's terrace it glows behind the music and the dancing, night after night. The contrast is the whole idea: the people partying will be gone and forgotten, while the stone amphitheatre has already outlasted empires. It quietly asks the film's biggest question — what, if anything, that we make will actually last?"
            },
            adult: {
                brief: "The Flavian Amphitheatre is the film's image of permanence against which modern Rome's frenzy plays out.",
                medium: "Completed around 80 AD, the Colosseum dominates the view from Jep's terrace. Sorrentino keeps it constantly in frame as a measure of permanence: a monument that has outlasted empires, set behind a society obsessed with the fleeting pleasures of the night.",
                long: "The Flavian Amphitheatre, inaugurated c. 80 AD as a 50,000-seat arena for the spectacles of imperial Rome, is the most recognisable monument on earth — and in The Great Beauty it functions as a constant, eloquent backdrop rather than a destination. Visible from Jep's terrace through every revel, it embodies durée: stone that has survived earthquakes, plunder and two millennia. Against it, the film sets a culture of the ephemeral — parties, gossip, cosmetic renewal — and lets the juxtaposition pose its central question about permanence and meaning. The monument's very familiarity is exploited; it is less seen than felt, an eternity humming behind the noise."
            },
            scholar: {
                brief: "As perpetual establishing backdrop, the Colosseum supplies the film a figure of durée against the diegesis of the ephemeral.",
                medium: "The Flavian Amphitheatre (c. 70–80 AD) operates in the film not as object of touristic regard but as recurrent horizon. Its monumental durée, persistently co-framed with the party-spaces, instantiates a chronotope of permanence against which the culture of the ephemeral is critically measured.",
                long: "Sorrentino's treatment of the Colosseo (inaugurated c. 80 AD under Titus) is deliberately anti-touristic: the Flavian Amphitheatre is never approached, only co-framed — a perpetual horizon behind the terrace revelries. It thereby supplies the film a chronotope of durée, a figure of monumental permanence against which the diegesis of the ephemeral (the parties, the cosmetic cures, the recyclable careers) is measured and found wanting. Its iconic over-familiarity is itself instrumentalised: too known to be seen afresh, it registers as ambient eternity, a memento of survival that silently frames the film's interrogation of what human making, if anything, withstands time."
            }
        }
    },
    {
        id: 'loc10', n: 10,
        title: 'Palazzo Brancaccio',
        kicker: 'Passage 10 · The beauty cure',
        realPlace: 'Palazzo Brancaccio',
        address: 'Via Merulana, Esquilino, Roma',
        coords: { lat: 41.8954, lng: 12.5018 },
        camera: 'Interior — frontal, the queue receding into the gilded hall',
        scene: { timestamp: '01:02:00', depictedAs: 'The botox party / beauty cure' },
        era: { period: 'Belle Époque', century: 'XIX c.', year: '1880s' },
        cluster: 'Esquilino & Laterano', order: 10, walkToNext: '10 min to the Scala Santa',
        img: { hero: 'images/botox1.jpg', gallery: ['images/botox2.jpg'] },
        dcterms: {
            title: 'Palazzo Brancaccio — the botox party',
            subject: 'Vanity, Beauty as a trick, The party, Decadence',
            spatial: '41.8954° N, 12.5018° E',
            temporal: 'Belle Époque · XIX c. (1880s)',
            type: 'InteriorLocation · Noble palace hall'
        },
        tags: { themes: ['illusion-trick', 'decadence-party', 'beauty-surface'], typology: ['palaces'], period: 'belle-epoque' },
        texts: {
            young: {
                brief: "A fancy palace where rich people line up to get beauty injections at a party.",
                medium: "Inside this grand palace, Rome's wealthy queue up at a glamorous party to get 'miracle' beauty injections from a smug doctor. Their faces are already frozen from surgery. It's the film's sharpest joke: beauty here is literally needles and money.",
                long: "Palazzo Brancaccio hosts the film's so-called 'botox party'. In a gilded hall, fashionable Romans line up to pay a self-important doctor for injections that promise youth and beauty, while he chats and judges them. Their faces are already smoothed and frozen. It's funny and a little horrifying at once — beauty reduced to a chemical bought with a credit card. The scene sets up Jep's final realisation: that life and art are 'just a trick' if they're only about the surface, disconnected from anything genuinely felt or lived."
            },
            adult: {
                brief: "At Palazzo Brancaccio the 'botox party' reduces beauty to needles — the film's bluntest satire of vanity.",
                medium: "Rome's last great noble palace stages the 'beauty cure': society figures queue in an ornate hall for cosmetic injections dispensed by a preening doctor. The sequence literalises beauty as artifice and commodity, anticipating Jep's verdict that art and life are 'a trick' without lived substance.",
                long: "Built in the 1880s as the last great patrician palace of the new capital, Palazzo Brancaccio supplies the gilded interior for the film's 'botox party' or 'beauty cure'. Beneath frescoed ceilings, Rome's surgically altered elite queue to receive injections from a complacent doctor who dispenses youth and condescension in equal measure. The scene is Sorrentino's most caustic: beauty here is needle-work and invoice, vanity laid bare as transaction. It crystallises the film's argument about the cosmetic surface — and prepares Jep's closing reflection that life and art collapse into mere 'trick' the moment they lose contact with authentic, lived experience."
            },
            scholar: {
                brief: "The 'cura della bellezza' sequence renders beauty as commodified biopolitical surface, the satirical pendant to the film's authentic-beauty thesis.",
                medium: "Palazzo Brancaccio (1880s), the capital's last great noble palace, frames the 'beauty cure'. The clinic-as-soirée — surgically homogenised clients, the officiant-doctor's condescension — stages beauty as commodified, biopolitical surface, the satirical counter-term to Gambardella's closing valorisation of lived, authentic beauty.",
                long: "Palazzo Brancaccio (Gaetano Koch and Luca Carimini, 1880s), the terminal example of Roman patrician palace-building under the Umbertine capital, furnishes the ornate mise-en-scène for the 'cura della bellezza'. Sorrentino stages the cosmetic clinic as society soirée: a queue of surgically homogenised notables submits to injectables administered by a complacent officiant whose patter mingles flattery and contempt. The sequence formalises beauty as commodity and biopolitical surface — the body remade by capital and needle — and stands as the satirical pendant to the film's redemptive thesis. It directly subtends Gambardella's coda, in which art and existence are pronounced mere 'trucco' absent reconnection to authentic, embodied experience; the botox hall is the negative image of that ethics."
            }
        }
    },
    {
        id: 'loc11', n: 11,
        title: 'Scala Santa',
        kicker: 'Passage 11 · On her knees',
        realPlace: 'Scala Santa, San Giovanni in Laterano',
        address: 'Piazza di San Giovanni in Laterano 14, Roma',
        coords: { lat: 41.8866, lng: 12.5060 },
        camera: 'Up the staircase, low angle following the ascent step by step',
        scene: { timestamp: '02:00:00', depictedAs: "'La Santa' climbs the Holy Stairs on her knees" },
        era: { period: 'Relic / Counter-Reformation', century: 'XVI c.', year: 'translated 1589' },
        cluster: 'Esquilino & Laterano', order: 11, walkToNext: '25 min / transfer to the centro storico',
        img: { hero: 'images/scala santa.jpg', gallery: [] },
        dcterms: {
            title: 'Scala Santa — the Saint\'s ascent',
            subject: 'Faith, Penitence, The sacred, Roots',
            spatial: '41.8866° N, 12.5060° E',
            temporal: 'Relic (Roman) · staircase translated 1589 by Sixtus V',
            type: 'InteriorLocation · Pilgrimage staircase'
        },
        tags: { themes: ['sacred-spiritual', 'search-meaning'], typology: ['sacred-sites'], period: 'baroque' },
        texts: {
            young: {
                brief: "A holy staircase that a 104-year-old saint climbs slowly on her knees.",
                medium: "Near the end of the film, 'the Saint' — a tiny, ancient holy woman the whole city reveres — climbs this sacred staircase painfully on her knees. After all the parties and fake beauty, her struggling, sincere faith is one of the few completely honest things in the movie.",
                long: "The Scala Santa is a staircase pilgrims climb only on their knees, believing it's the very stairs Christ climbed before his trial. In one of the film's last and most moving images, 'La Santa' — a frail 104-year-old missionary the whole of Rome treats like a living saint — slowly, painfully drags herself up step by step. It's the opposite of everything else we've seen: no glamour, no irony, no trick. Just an old woman and her belief in 'roots'. The film doesn't mock her; it lets her quiet sincerity stand as a kind of answer."
            },
            adult: {
                brief: "'La Santa' ascends the Holy Stairs on her knees — the film's image of unironic, rooted faith.",
                medium: "The Scala Santa, venerated as the steps Christ ascended to Pilate, is climbed only on the knees. The film's centenarian 'Saint' makes this penitential ascent near the close — a gesture of austere sincerity set against the cosmetic and the decadent, embodying her creed that 'roots are important.'",
                long: "Tradition holds that the twenty-eight marble steps of the Scala Santa, translated to the Lateran by Sixtus V in 1589, are those Christ climbed to Pilate's praetorium; pilgrims ascend them only on their knees. In The Great Beauty the ancient missionary known as 'La Santa' — frail, near-silent, treated by Rome as a living saint — undertakes this penitential climb in the film's closing movement. The image is the antithesis of the botox hall and the terrace conga: stripped of irony, glamour and trick, it offers austere, embodied faith. Her insistence that 'roots are important' reframes the protagonist's search, sending Jep back toward origins and the possibility of genuine beauty."
            },
            scholar: {
                brief: "The Saint's genuflectory ascent installs an ascetic-penitential register that dialectically negates the film's cosmetic and bacchic economies.",
                medium: "The Scala Santa — relic stair translated to the Lateran by Sixtus V (1589), ascended only genuflectory — frames the centenarian missionary's penitential climb. The sequence introduces an ascetic register that negates the cosmetic and bacchic economies, its rhetoric of 'roots' recoding the protagonist's aesthetic quest as a spiritual return.",
                long: "The Scala Santa, the twenty-eight marble gradus venerated as the staircase of Pilate's praetorium and relocated to the Sancta Sanctorum by Sixtus V in 1589, is ascended exclusively on the knees — a choreography of penitential humility. The Great Beauty stages 'La Santa's' genuflectory ascent in its closing movement as the structural negation of the film's dominant economies: against the cosmetic surface of Palazzo Brancaccio and the centrifugal revelry of the terrace, it posits an ascetic, embodied, unironic faith. The Saint's gnomic insistence on 'radici' (roots) operates as the film's ethical pivot, recoding Gambardella's aestheticist quest as a problem of origin and return, and licensing the coda's tentative recovery of authentic beauty."
            }
        }
    },
    {
        id: 'loc12', n: 12,
        title: 'Palazzo Sacchetti',
        kicker: 'Passage 12 · Aristocratic interiors',
        realPlace: 'Palazzo Sacchetti, Via Giulia',
        address: 'Via Giulia 66, Roma',
        coords: { lat: 41.8985, lng: 12.4665 },
        camera: 'Interior — symmetrical, down the enfilade of frescoed rooms',
        scene: { timestamp: '01:25:00', depictedAs: 'The faded world of Roman nobility' },
        era: { period: 'Renaissance / Mannerist', century: 'XVI c.', year: 'from 1542' },
        cluster: 'Centro storico', order: 12, walkToNext: '12 min to Galleria Doria Pamphilj',
        img: { hero: 'images/palazzo sacchetti.jpg', gallery: [] },
        dcterms: {
            title: 'Palazzo Sacchetti interiors',
            subject: 'Nobility, Mannerist fresco, Faded grandeur, Rome',
            spatial: '41.8985° N, 12.4665° E',
            temporal: 'Renaissance / Mannerist · XVI c. (from 1542)',
            type: 'InteriorLocation · Noble palace'
        },
        tags: { themes: ['decadence-party', 'memory-loss'], typology: ['palaces'], period: 'renaissance' },
        texts: {
            young: {
                brief: "A grand old palace where Rome's faded aristocrats still live among frescoes.",
                medium: "This Renaissance palace stands for the world of Rome's old noble families in the film — beautiful, frescoed rooms and titled people whose glory days are long gone. Jep moves through these circles too, half-charmed, half-aware that it's all a bit of a museum.",
                long: "Palazzo Sacchetti is a sixteenth-century mansion on the elegant Via Giulia, its rooms heavy with frescoes and the weight of old money. In The Great Beauty it represents the strange, fading world of Rome's hereditary aristocracy — counts and princesses who can be 'rented' to lend prestige to a party, surviving on titles and memories more than money. Jep drifts through these gilded interiors as an amused insider-outsider. The palace's beauty is real, but it's the beauty of something already half-embalmed: grandeur that has outlived its purpose, kept alive for show."
            },
            adult: {
                brief: "Palazzo Sacchetti embodies the film's faded Roman aristocracy — frescoed grandeur outliving its purpose.",
                medium: "The Mannerist Palazzo Sacchetti on Via Giulia, begun 1542 for Antonio da Sangallo, supplies the film's aristocratic interiors. It evokes a hereditary Rome of titles and frescoes surviving on prestige — the 'rentable' counts and princesses Jep observes with affectionate irony.",
                long: "Begun in 1542 to designs by Antonio da Sangallo the Younger and richly frescoed by Francesco Salviati, Palazzo Sacchetti on Via Giulia is among the most intact noble residences of Cinquecento Rome. In The Great Beauty its enfilade of grand rooms stands for the city's hereditary aristocracy — a caste reduced to letting its titles and bloodlines to social events, living off prestige in beautiful, embalmed interiors. Jep traverses this world as an affectionate ironist, registering both its genuine splendour and its obsolescence. The palace becomes an image of grandeur outliving its function: beauty preserved as spectacle, a nobility that survives chiefly as décor."
            },
            scholar: {
                brief: "Palazzo Sacchetti figures the aristocracy as residual spectacle — patrimonial beauty surviving as performative décor.",
                medium: "Sangallo's Palazzo Sacchetti (from 1542; Salviati frescoes) on Via Giulia furnishes the film's patrician interiors. It indexes the Roman nobility as a residual class, its hereditary prestige commodified into performance — the 'rentable' aristocrat — and its frescoed grandeur reduced to embalmed spectacle.",
                long: "Palazzo Sacchetti (Antonio da Sangallo the Younger, from 1542; later the architect's own residence), with Francesco Salviati's Storie di David in the piano nobile, is a paradigmatic Cinquecento patrician palace. The Great Beauty recruits its interiors to figure the contemporary Roman aristocracy as a residual formation: a caste whose hereditary capital has devolved into performative prestige — Sorrentino's motif of nobles 'rented' to authenticate social events. The fabric's authentic splendour is thereby ironised; patrimonial beauty persists only as embalmed décor, a spectacle of obsolescence. Gambardella's affectively ambivalent traversal — insider and ethnographer at once — encodes the film's larger diagnosis of a culture in which beauty has detached from function and survives as pure, melancholy display."
            }
        }
    },
    {
        id: 'loc13', n: 13,
        title: 'Galleria Doria Pamphilj',
        kicker: 'Passage 13 · Beauty under glass',
        realPlace: 'Galleria Doria Pamphilj',
        address: 'Via del Corso 305, Roma',
        coords: { lat: 41.8979, lng: 12.4818 },
        camera: 'Interior — slow track down the mirrored picture gallery',
        scene: { timestamp: '01:12:00', depictedAs: "Art on the private night tour" },
        era: { period: 'Baroque', century: 'XVII c.', year: 'gallery from 1650s' },
        cluster: 'Centro storico', order: 13, walkToNext: 'End of the one-day route',
        img: { hero: 'images/palazzo doria pamphilj.jpg', gallery: [] },
        dcterms: {
            title: 'Galleria Doria Pamphilj',
            subject: 'Old Masters, Collecting, Private beauty, Rome',
            spatial: '41.8979° N, 12.4818° E',
            temporal: 'Baroque · XVII c. (collection from 1650s)',
            type: 'InteriorLocation · Private picture gallery'
        },
        tags: { themes: ['beauty-surface', 'search-meaning'], typology: ['palaces'], period: 'baroque' },
        texts: {
            young: {
                brief: "A private palace stuffed with masterpieces, including a famous portrait of a pope.",
                medium: "This is a private palace still owned by a noble family, with rooms full of Old Master paintings and mirrors. In the film it's part of the dreamlike night tour of Rome's hidden art — beauty kept behind closed doors, seen by candlelight when the city is asleep.",
                long: "The Galleria Doria Pamphilj is one of Rome's great private art collections, still owned by the family, its mirrored halls crammed with masterpieces — most famously Velázquez's piercing portrait of Pope Innocent X. In The Great Beauty it belongs to the magical night-tour idea: the keeper of the keys leading Jep and Ramona through Rome's hidden galleries after dark. Surrounded by centuries of beauty in the silence, the characters seem to glimpse something deeper than the parties offer. It's beauty as private treasure — overwhelming, a little melancholy, and almost entirely unseen by the world outside."
            },
            adult: {
                brief: "The Doria Pamphilj gallery represents the film's private, after-hours encounter with Old Master beauty.",
                medium: "Rome's foremost private collection, the Galleria Doria Pamphilj — home to Velázquez's Innocent X — embodies the film's nocturnal art tour. Walking these mirrored halls in silence, the characters meet a beauty that is genuine and historic, yet sealed off, available only as private privilege.",
                long: "Housed in the family's palace on Via del Corso and assembled from the 1650s, the Galleria Doria Pamphilj is Rome's pre-eminent private collection still in noble hands — a sequence of mirrored galleries hung with Caravaggio, Titian, Lorrain and, supremely, Velázquez's portrait of Innocent X. In The Great Beauty it anchors the seductive conceit of the after-hours tour, the keeper of keys guiding Jep and Ramona through the city's hidden art while Rome sleeps. Here beauty is authentic, historic and overwhelming — but also enclosed, a privilege of access rather than a public good. The gallery thus rhymes with the film's larger meditation: the great beauty exists, but mostly behind locked doors, glimpsed in silence by the few."
            },
            scholar: {
                brief: "The Doria Pamphilj gallery stages the canon as privatised encounter, binding authentic beauty to restricted access and melancholy.",
                medium: "The Galleria Doria Pamphilj (collection from the 1650s; Velázquez's Innocent X) supplies the film's nocturnal museological set-piece. The mirrored quadreria stages canonical Old Master painting as privatised, after-hours encounter — beauty authenticated by tradition yet sequestered, indexing the social enclosure of aesthetic experience.",
                long: "The Galleria Doria Pamphilj, sedimented from the 1650s within the dynasty's Corso palace and still privately held, presents the Roman quadreria in its most intact form — Caravaggio, Titian, Claude Lorrain, and the apical Velázquez portrait of Innocent X. The Great Beauty integrates it into the 'keeper of the keys' nocturne, framing the encounter with the canon as silent, after-hours privilege. The sequence advances the film's dialectic of access: here beauty is unequivocally authentic and historically sedimented, yet sequestered behind hereditary ownership and darkness, apprehensible only by the initiated few. The mirrored enfilade — reflection multiplying the masterpieces into near-unreality — visualises the film's melancholy thesis that the great beauty persists, but as enclosed, attenuated, and largely unwitnessed splendour."
            }
        }
    }
];

/* ---- 3 guided visit narratives (ordered routes) ---- */
const NARRATIVES_GUIDED = [
    {
        id: 'one-day',
        kind: 'Itinerary',
        title: 'The one-day walk',
        blurb: 'All thirteen locations in a single, walkable day — from the dawn fountain on the Janiculum to the hushed galleries of the centro storico.',
        stops: ['loc1','loc2','loc3','loc4','loc5','loc6','loc7','loc8','loc9','loc10','loc11','loc12','loc13']
    },
    {
        id: 'sacred-rome',
        kind: 'Narrative',
        title: "Jep's sacred Rome",
        blurb: 'The spiritual thread under the noise: fountains, gardens, ancient basilicas and a saint on her knees — the search for meaning the film keeps reaching for.',
        stops: ['loc1','loc3','loc5','loc6','loc11']
    },
    {
        id: 'decadence-trick',
        kind: 'Narrative',
        title: 'Decadence & the trick',
        blurb: 'Beauty as spectacle and illusion: the terrace party, the botox hall, the vanishing giraffe and the gilded palaces where surface reigns.',
        stops: ['loc8','loc10','loc7','loc4','loc12','loc13']
    }
];

/* ---- the required historical timeline ---- */
const ERAS = [
    { id: 'ancient',        label: 'Ancient Rome',        span: 'I–III century',   locations: ['loc9','loc7'] },
    { id: 'early-christian',label: 'Early Christian Rome',span: 'V century',       locations: ['loc6'] },
    { id: 'renaissance',    label: 'Renaissance Rome',    span: 'XVI century',     locations: ['loc3','loc4','loc12'] },
    { id: 'baroque',        label: 'Baroque Rome',        span: 'XVII century',    locations: ['loc1','loc11','loc13'] },
    { id: 'belle-epoque',   label: 'Belle Époque Rome',   span: 'XIX century',     locations: ['loc2','loc10'] },
    { id: 'contemporary',   label: 'Sorrentino\'s Rome',  span: '2013',            locations: ['loc8'] }
];
