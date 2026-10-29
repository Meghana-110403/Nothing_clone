# Nothing Clone — 3D Animation Practice

A scroll-driven, interactive 3D product showcase inspired by [Nothing](https://nothing.tech) and its CMF audio line. Built with plain **HTML, CSS and JavaScript** — no frameworks, no build step, no dependencies.

> **This is a practice project.** I made it to learn and experiment with 3D and animation techniques on the web. It is not affiliated with, endorsed by, or connected to Nothing Technology Ltd. It is not a store and nothing can actually be bought.

---

## Why I built this

I wanted hands-on practice with:

- CSS 3D transforms (`perspective`, `preserve-3d`, `translateZ`, `rotateX/Y`)
- Scroll-linked animation and pinned ("sticky") scroll stages
- Pointer-driven tilt and parallax effects
- Drag-to-rotate interactions
- Smooth animation loops with `requestAnimationFrame`
- Building a full, responsive, accessible page without any libraries

Nothing's site is a great reference for this style of product storytelling, so I used its look and product lineup as the subject.

---

## Preview of what's inside

| Section | What it shows |
| --- | --- |
| **Hero** | Staggered 3D headline reveal, a product that follows the pointer, orbiting rings, floating secondary products and spec chips |
| **Marquee** | Infinite brand ticker that pauses on hover |
| **Technology** | A pinned scroll stage — the Ear (3) rotates and scales as you scroll while feature panels crossfade; colourways switch live |
| **Collection** | 11 products, filterable by Earbuds / Headphones / CMF, with cards that tilt in 3D toward the cursor and per-card colour swatches |
| **Configurator** | Pick a product, drag it to rotate 360°, change colour, compare specs, add to bag (arrow keys also rotate) |
| **Engineering bento** | Animated ANC equaliser, LDAC waveform and charge bar cards |
| **Numbers** | Count-up stats that animate on first view |
| **Drop list** | Email sign-up form with inline validation |
| **Bag drawer** | Slide-over cart with quantity controls, removal, subtotal and `localStorage` persistence |

---

## Tech stack

- **HTML5** — semantic markup and landmarks
- **CSS3** — custom properties, grid/flexbox, 3D transforms, keyframe animation (~2,900 lines)
- **Vanilla JavaScript (ES6+)** — product data, interactions, rendering (~1,250 lines)
- **Google Fonts** — Space Grotesk, Inter and Doto (falls back to system fonts offline)

---

## Getting started

**Option 1 — open the file**

Double-click `index.html`. Everything runs straight from the file system.

**Option 2 — local server**

```bash
# with Node
npx serve .

# or with Python
python -m http.server 4173
```

Then open `http://localhost:4173` in your browser.

---

## Project structure

```
3d animated/
├── index.html        Markup, sections and copy
├── css/
│   └── styles.css    Design tokens, layout, 3D effects and motion
├── js/
│   └── app.js        Product data and all interactions
├── *.webp            Product images
└── README.md
```

---

## How the 3D works

There is no WebGL or 3D library here — the depth is built with CSS and a little JavaScript:

- **Depth:** `perspective` on a parent plus `transform-style: preserve-3d` and `translateZ` on children.
- **Pointer tilt:** `pointermove` events feed target `rotateX/rotateY` values, which are smoothed each frame in `requestAnimationFrame` so movement feels fluid rather than snappy.
- **Scroll-driven rotation:** the Technology section is a tall container with a sticky stage. Scroll progress through that container maps to the product's rotation and scale, and decides which feature panel is visible.
- **Drag to rotate:** pointer drag in the configurator updates the rotation angle directly, with keyboard arrow support as an alternative.
- **Idle motion:** a slow drift keeps the scene feeling 3D even when you aren't interacting.

---

## Customising

- **Products, prices, specs and colours** live in the `PRODUCTS` array near the top of `js/app.js`. Each colour points to an image filename in the project root.
- **Colours, spacing, type and easing** are CSS custom properties in `:root` in `css/styles.css`. Changing `--accent` re-skins the whole site.
- **Bag storage** uses the key `nothing.bag.v1`. Bump the version if you change the shape of a bag item.

---

## Accessibility and performance

- Skip link, landmarks, visible focus rings and labelled controls
- `aria-pressed` on swatches and filters, dialog semantics and focus trap on the bag, `Esc` to close
- Live regions for filtering, toasts and the newsletter form
- A **Motion** toggle in the footer turns off tilt, float, marquee and 3D transforms while keeping all content visible
- Transparent WebP images, lazy-loaded grid images, a hero preload, and idle preloading of configurator images
- A no-JS fallback message where the collection would render

---

## Image credits and disclaimer

- All product images were downloaded from the official Nothing website and are used **only for personal learning and practice**.
- Product names, logos, designs and imagery belong to **Nothing Technology Ltd.** and their respective owners.
- This project is non-commercial and is not intended for redistribution or public deployment as a real store. If you fork it, please replace the images with your own before publishing anywhere.
- If a rights holder would like anything removed, I'm happy to take it down.

---

## What I learned / next steps

Ideas I'd like to explore next:

- [ ] Rebuild the hero with **Three.js** or WebGL using real 3D models
- [ ] Add scroll smoothing (e.g. a lightweight lerp-based scroller)
- [ ] Try GSAP ScrollTrigger and compare it with the hand-written scroll logic
- [ ] Add a light theme
- [ ] Convert product data into a JSON file loaded at runtime

---

## Author

Made by me as a front-end practice exercise. Feel free to explore the code and use the techniques in your own projects.
