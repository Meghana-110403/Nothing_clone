# NOTHING — Sound Without Limits

An interactive, scroll-driven 3D product showcase for Nothing and CMF audio, built with
plain HTML, CSS and JavaScript. No build step, no dependencies.

The project started as a folder of transparent product imagery. This adds the full
front-end experience around it: a 3D hero, a pinned scroll showcase, a filterable
collection, a drag-to-rotate configurator with a working bag, and a responsive layout.

> Unofficial concept. Product imagery and brand names belong to Nothing Technology Ltd.

---

## Run it

**Option A — just open it**

```
index.html
```

Everything works from the file system. The only network request is Google Fonts
(Space Grotesk, Inter, Doto); the site falls back to system fonts offline.

**Option B — local server** (recommended for a clean origin, e.g. for the bag storage)

```bash
npx serve .
# or
python -m http.server 4173
```

Then visit `http://localhost:4173`.

---

## What's inside

```
index.html            Markup, sections and copy
css/styles.css        Design tokens, layout, 3D and motion
js/app.js             Product data and all interactions
*.webp                35 transparent product renders (originals)
```

### Sections

1. **Hero** — staggered 3D headline reveal, pointer-parallax product, orbiting rings,
   floating secondary products and spec chips.
2. **Marquee** — infinite brand ticker (pauses on hover).
3. **Technology** — pinned 340vh scroll stage. The Ear (3) rotates and scales as you
   scroll while three feature panels crossfade; colourways switch the product live.
4. **Collection** — 11 products, filterable by Earbuds / Headphones / CMF. Cards tilt in
   3D toward the cursor, have per-card colour swatches and add-to-bag.
5. **Configurator** — pick any product, drag the render to rotate it 360°, change colour,
   compare specs, add to bag. Rotatable with arrow keys too.
6. **Engineering bento** — animated ANC equaliser, LDAC waveform, charge bar and badges.
7. **Numbers** — count-up stats on first view.
8. **Drop list** — validated email capture with inline feedback.
9. **Bag drawer** — quantity controls, removal, subtotal, persistence via `localStorage`.

### Interactions

| Action | Result |
| --- | --- |
| Move pointer over hero / cards | 3D tilt with parallax product |
| Scroll through Technology | Product rotates −32° → +32°, panels and specs change |
| Click a colour dot | Crossfades to that colourway |
| Drag the configurator product | Free 360° rotation (arrow keys also work) |
| Click **Bag** | Slide-over drawer with focus trap, `Esc` to close |
| Filter nav links | Deep-links the collection to the right category |

---

## Implementation notes

- **3D** is CSS: `perspective`, `preserve-3d`, `translateZ` for depth, with smoothed
  `rotateX/Y` values driven by pointer or scroll position in `requestAnimationFrame`.
- **Scroll work** is rAF-throttled and only runs while the showcase is near the viewport.
- **Idle motion**: the hero, showcase and configurator keep a slow drift when the page is
  still, so the 3D reads even before you scroll. The showcase also cycles colourways every
  5.5s and pauses while you hover it.
- **Motion safety**: animation is on by default and turns off only via the footer
  **Motion** toggle or the "Animations are off" pill. In that mode tilt, float, marquee and
  3D transforms stop, and all content stays visible.
- **Accessibility**: skip link, landmarks, visible focus rings, `aria-pressed` swatches and
  filters, `aria-hidden` on inactive panels, dialog semantics + focus trap for the bag,
  labelled controls, and status live regions for filtering, toast and newsletter.
- **Performance**: transparent WebP art, lazy-loaded grid images, a preload for the hero,
  and idle preloading of the configurator images.
- **No-JS fallback**: loader is hidden, reveal states are neutralised and a message is
  shown where the collection would render.

## Customising

- Products, prices, specs and colourways live in the `PRODUCTS` array at the top of
  `js/app.js`. Each colour maps to an image filename in the project root.
- Colours, spacing, type and easing are CSS custom properties in `:root` in
  `css/styles.css`. Change `--accent` to re-skin the whole site.
- The bag storage key is `nothing.bag.v1`; bump it if you change the item shape.
