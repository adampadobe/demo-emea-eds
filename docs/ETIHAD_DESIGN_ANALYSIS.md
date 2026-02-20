# Etihad.com design analysis & replication options

This document summarizes how Etihad’s site is structured (from public info and design patterns), how your EDS site is built, and practical options for replicating the Etihad look and feel.

---

## 1. How Etihad’s site appears to be built

### Technology & architecture (from public sources)

- **Adobe partnership:** Etihad uses Adobe Marketing Cloud / Creative Cloud; the main site may use Adobe Experience Manager (AEM) or another Adobe stack, but this isn’t confirmed for etihad.com specifically.
- **Design (2025):** Dark “midnight dune” theme, white and gold accents, left-hand navigation, prominent booking at top.
- **Content patterns:** Hero carousels, destination/offer cards, loyalty (Etihad Guest), experiential content (lounges, cabins, services).

### Design patterns to replicate

| Pattern | Description | EDS equivalent |
|--------|-------------|-----------------|
| **Left-hand nav** | Side menu on desktop; booking/management at top | Header block (currently top bar); can be restyled or extended |
| **Hero carousel** | Full-width rotating hero with multiple slides | New **carousel** block or enhanced hero |
| **Dark theme** | Midnight dune background, gold/white accents | Already applied in `styles.css` and block CSS |
| **Prominent CTAs** | Gold buttons: “Explore”, “Learn more”, “View benefits”, “Join now” | `.button` styles (gold) + content in blocks |
| **Card grids** | Offer/destination cards with image + text | **Cards** block (already styled for dark theme) |
| **Sectioned layout** | Clear sections with generous spacing | EDS **sections** + section metadata (e.g. `style: light`) |
| **Booking strip** | Top-of-page booking/search | Optional **booking-bar** or **search** block |

### Likely page structure (inferred)

- **Header:** Logo, left nav (desktop), hamburger (mobile), top-right tools (e.g. login, booking).
- **Above the fold:** Booking widget or primary CTA strip.
- **Hero:** Large carousel (image/video + headline + CTA per slide).
- **Body:** Multiple sections — feature grids (cards), columns (image + copy), promos, loyalty, footer.

---

## 2. How your EDS site is built

### Content flow

- **Source:** Google Doc (or Word) → EDS converts to HTML.
- **Structure:** Doc headings / tables become **sections**; first row (or first cell) often defines the **block name** (e.g. `cards`, `columns`, `hero`).

### Runtime flow

1. **HTML** is fetched (e.g. `index.plain.html` from GitHub/source).
2. **`decorateMain(main)`** (in `scripts.js`):
   - `decorateButtons` / `decorateIcons`
   - **`buildAutoBlocks`** — e.g. builds **hero** from first `h1` + `picture`
   - **`decorateSections(main)`** — each direct child `div` of `main` becomes a **section**; content is wrapped in `default-content-wrapper`; **section metadata** (e.g. `style: light`) is read from a `section-metadata` block.
   - **`decorateBlocks(main)`** — each `div.section > div > div` is treated as a **block**; its **first class name** = block name (e.g. `cards`, `columns`).
3. **`loadBlock(block)`** (in `aem.js`):
   - Loads `blocks/{blockName}/{blockName}.js` and runs `decorate(block)`.
   - Block can load its own CSS; section gets class `{blockName}-container`.

### Block naming rule

- In the doc, the **first row** of a block is typically a table row whose **first cell** contains the block name (e.g. `cards`, `columns`).
- That becomes the class on the block’s root div, e.g. `<div class="cards block">`, and maps to `blocks/cards/cards.js` + `blocks/cards/cards.css`.

### What you already have

- **Blocks:** header, footer, hero, cards, columns, fragment, push-opt-in.
- **Auto-block:** Hero is built from first `h1` + `picture` in `main`.
- **Theme:** Etihad-style dark theme and gold accents are already in global and block CSS.

---

## 3. Options for replicating Etihad’s design

### Option A — CSS-only (already largely done)

**Idea:** Keep current EDS structure; refine styling so it *feels* like Etihad.

**Done:**

- Dark background, gold links/buttons, silver secondary text.
- Header/footer/cards/hero/buttons aligned with Etihad look.
- Source Sans Pro for an Altis-like feel.

**You can still:**

- Tweak colors/fonts in `styles/styles.css` and block CSS.
- Use **section metadata** in the doc (e.g. `style: light, highlight`) to get alternate section backgrounds.
- Add more section styles (e.g. “dark”, “gold-border”) and style them in CSS.

**Pros:** No new blocks; authors keep using the same doc structure.  
**Cons:** No carousel, no left sidebar nav; layout stays “top nav + vertical sections”.

---

### Option B — New blocks that mirror Etihad components

**Idea:** Add blocks that behave like Etihad’s building blocks.

| New block | Purpose | Content source (in doc) |
|-----------|---------|--------------------------|
| **Carousel** | Hero or promo carousel (image + title + CTA per slide) | Table: rows = slides; columns = image, title, CTA text, CTA link |
| **Booking bar** | Strip with “From”, “To”, “Date”, “Search” (visual only or wired to a form) | Table or fixed config in block |
| **Feature grid** | 3–4 feature cards in a row (icon/title/description) | Table: one row per feature |
| **Promo banner** | Full-width strip with background image, headline, CTA | Table: image, headline, CTA text, link |

**Implementation:**

- Add `blocks/carousel/`, `blocks/booking-bar/`, etc.
- Each block: `{name}.js` (decorate DOM, optional JS for carousel/slider) and `{name}.css` (Etihad-like layout/colors).
- In the doc, add tables whose first cell is `carousel`, `booking-bar`, etc., and follow a simple column convention.

**Pros:** Closer to Etihad layout and components; still 100% EDS (no new backend).  
**Cons:** Some dev work; content authors need to follow the new table formats.

---

### Option C — Header/nav layout (left sidebar on desktop)

**Idea:** Change the header so on desktop it looks like Etihad’s left-hand nav.

**Options:**

1. **CSS-only:** Keep current header markup; use CSS (e.g. `@media (min-width: 900px)`) to:
   - Make the header a fixed left sidebar (narrow width, full height).
   - Stack logo + nav links vertically.
   - Reserve a left margin on `main` so content doesn’t sit under the sidebar.
2. **Header block change:** In `blocks/header/header.js`, optionally output different markup for “sidebar” mode (e.g. wrap nav in a sidebar container, add a main-content wrapper). Then style that in `header.css`.

**Pros:** Big visual win; feels like Etihad without changing the rest of the site.  
**Cons:** Header block is shared everywhere; need to keep mobile hamburger behavior.

---

### Option D — Carousel hero (highest impact)

**Idea:** Replace or complement the single-picture hero with a **carousel** that has multiple slides (image + headline + optional CTA).

**Ways to do it:**

1. **New “carousel” block**
   - Content: table with one row per slide; columns e.g. Image, Title, CTA Text, CTA Link.
   - JS: build slides into DOM; optional auto-rotate; prev/next buttons; optional dots.
   - CSS: full-width, same dark overlay and typography as current hero.
2. **Extend “hero” block**
   - If first section has multiple pictures + multiple headings, treat them as slides and add carousel behavior in `hero.js` + `hero.css`.
   - More coupled to hero; a dedicated carousel block is usually clearer.

**Pros:** Matches Etihad’s hero pattern; strong for demos.  
**Cons:** Need to define slide schema and implement rotation/accessibility.

---

### Option E — Content and structure in the doc

**Idea:** Replicate Etihad’s *information architecture* in your Google Doc so the same EDS blocks produce an Etihad-like flow.

**Suggested page order:**

1. **Hero** (auto-built from first h1 + picture, or from a carousel block).
2. **Section: “Booking” or “Search”** (optional booking-bar or CTA block).
3. **Section: “Offers” or “Highlights”** — cards block (e.g. 3 cards).
4. **Section: “Experience” or “Why us”** — columns block (image + text).
5. **Section: “Loyalty” or “Guest”** — cards or columns.
6. **Section: “Footer”** — footer block.

Use **section metadata** where needed (e.g. `style: light` for a slightly lighter band). No new code; only content and order.

**Pros:** Quick; uses existing blocks; good for storytelling in the demo.  
**Cons:** No carousel or left nav unless you add those (Options C/D).

---

## 4. Recommended combination

- **Short term (for your demo):**
  - **Option A:** Keep and refine current CSS (already Etihad-like).
  - **Option E:** Restructure the homepage doc to mirror Etihad’s section order and use cards/columns for offers and experience.
- **Next step for maximum impact:**
  - **Option D:** Add a **carousel** block for the hero (and optionally for a “promos” section).
  - **Option C:** Adjust header to a left sidebar on desktop for a closer Etihad feel.

If you tell me which option you want to implement first (e.g. “carousel block” or “left sidebar header”), I can outline the exact steps and code changes for your repo.

---

## 5. New blocks added + local preview

The following are implemented for **local preview** (do not deploy until you're happy).

### New blocks (Option B)

| Block | Doc: first cell | Content structure |
|-------|-----------------|-------------------|
| **Carousel** | `carousel` | Each row = slide. Cols: Image, Title, CTA text, CTA link. |
| **Booking bar** | `booking-bar` | One row: From, To, Date, Search (button text). |
| **Feature grid** | `feature-grid` | Rows = features. Cols: Icon/Image, Title, Description, optional Link. |
| **Promo banner** | `promo-banner` | One row: Image, Headline, CTA text, CTA link. |

### Left sidebar nav (Option C)

- **Desktop (≥900px):** Header is a fixed left sidebar (240px). Main content has margin-left: 240px.
- **Mobile:** Unchanged (hamburger, full-width top bar).

### Local preview (no deploy)

1. From repo root run: `npx --yes @adobe/aem-cli up --port 3000` (no global install needed; see [README](../README.md#local-development)).
2. Open `http://localhost:3000` and load a page that uses the new blocks.

Add sections in your Google Doc with tables whose first cell is the block name above and the column structure listed.
