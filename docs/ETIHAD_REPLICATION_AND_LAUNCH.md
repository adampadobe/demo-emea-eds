# Replicating Etihad look & feel, Launch custom HTML, and icons in EDS

This doc covers: (1) matching Etihad’s menu in/out behavior, (2) loading custom HTML via Adobe Launch, and (3) adding and using icons in your EDS project.

---

## 1. Menu in/out (like Etihad)

Etihad’s nav uses:
- A **left sidebar** that can be **open** (full width, labels visible) or **closed** (narrow, icons only).
- A **toggle button** (arrow) on the right edge of the sidebar to expand/collapse.
- **Icons + text** per item; when collapsed, only icons show.

**What we already do in EDS:**
- Sidebar is fixed left; **collapsed** (72px, icons only) vs **expanded** (260px, icon + label).
- **Collapse/expand** button (chevron) on the right edge of the sidebar.
- CSS transition on `width` and label visibility.

**To get even closer to Etihad:**
- The sidebar already uses `transition: width 0.25s ease` so it animates in/out.
- You can add a **slide** feel by ensuring the main content area uses `margin-left` with the same transition (already in `styles.css`: `main { margin-left: 260px; transition: margin-left 0.25s ease; }` when collapsed `72px`).
- No extra Launch or “custom HTML” is required for the menu behavior; it’s all in the block CSS/JS.

**Mobile:** Etihad uses a hamburger that opens a full-screen or overlay menu. Our header already has a hamburger and expandable nav for small screens; you can style it to full-screen/overlay in `blocks/header/header.css` if you want to match that exactly.

---

## 2. Loading custom HTML in Adobe Launch

To inject **custom HTML** (or custom DOM nodes) from Launch:

### Option A: Custom Code action (recommended)

1. In your Launch property, open a **Rule** (e.g. “Library Loaded” or “Page Bottom”).
2. Add an action: **Core – Custom Code** (or **Extensions → Custom Code**).
3. In the custom code, create elements and insert them into the page, e.g.:

```javascript
(function() {
  var div = document.createElement('div');
  div.id = 'my-custom-banner';
  div.innerHTML = '<p>Your custom HTML here</p>';
  document.body.appendChild(div);
})();
```

- Use `document.querySelector('...')` and `insertAdjacentHTML('beforeend', '...')` or `.appendChild()` to inject into a specific container.
- Avoid `document.write`. Run after DOM is ready (e.g. “Page Bottom” or “Library Loaded” with “Execute in sequence” if you depend on other rules).

### Option B: Third-party / Post-script extension

- Some setups use a “Custom HTML” or “HTML” extension that lets you paste a snippet.
- If you have one, add your HTML there and set the rule to fire at the right event (e.g. Page Bottom).

### Option C: Fetch + inject

- In a Custom Code action, `fetch(yourUrl)` a fragment of HTML, then inject the text into a container with `container.innerHTML = html` or `insertAdjacentHTML`. Same as above, but the HTML is loaded from a URL.

**Important:** Launch runs in the page context. Any custom HTML you inject is subject to your site’s **CSP**. If you load external scripts, they must be allowed by CSP or loaded in a way your CSP permits (e.g. nonce or strict-dynamic).

---

## 3. Adding icons to your EDS project

### Where icons live

- **Path:** Put SVG files under the **`icons/`** folder at the project root (e.g. `icons/plane.svg`, `icons/check-in.svg`).
- EDS serves them from the site root, so the URL is **`/icons/{name}.svg`**.

### How EDS uses icons

**In content (Document Authoring / Markdown):**

- Use a **span** with classes **`icon`** and **`icon-{name}`** (e.g. `icon icon-plane`). The EDS script **decorateIcons** (in `aem.js`) turns these into `<img>` tags that load `/icons/{name}.svg`.
- Example: in a table or text block, add:  
  `<span class="icon icon-plane"></span>`  
  and after decoration it becomes an `<img>` pointing to `/icons/plane.svg`.

**In blocks (JavaScript):**

- **Option 1 – Image tag:**  
  `const img = document.createElement('img'); img.src = '/icons/plane.svg'; img.alt = 'Book';`
- **Option 2 – Code base path (for portability):**  
  `img.src = `${window.hlx.codeBasePath}/icons/plane.svg`;`  
  so it works on preview and production.
- **Option 3 – Inline SVG:**  
  You can still inject SVG markup directly in JS (as in the header nav) for full control over size and color.

### Etihad-style nav icons

- The **header** block currently uses **inline SVG** in `blocks/header/header.js` (NAV_ICONS) so each menu item gets an icon without extra files.
- To switch to **file-based** icons (like Etihad’s DAM URLs): add SVGs under `icons/` (e.g. `plane.svg`, `manage.svg`, `check-in.svg`, `flight-status.svg`, `plan.svg`, `offers.svg`, `loyalty.svg`, `help.svg`) and in the header block use `<img src=".../icons/plane.svg" alt="Book">` instead of the inline SVG for each label.

### Summary

| Goal                         | Approach |
|-----------------------------|----------|
| Menu expand/collapse        | Already in place; optional tweaks in `header.css` / `styles.css` for transition. |
| Load custom HTML from Launch| Custom Code action that creates nodes and appends them (or insertAdjacentHTML). |
| Add icons in EDS             | Add SVGs to `icons/`; use `span.icon.icon-{name}` in content or `<img src=".../icons/{name}.svg">` in blocks. |
