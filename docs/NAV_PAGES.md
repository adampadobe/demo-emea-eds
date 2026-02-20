# Side menu navigation and pages (Etihad-style)

The header uses a left sidebar on desktop with icon + label links. To match Etihad’s menu and have working navigation, set up your **nav fragment** and **pages** as below.

## 1. Nav fragment content (e.g. `/nav`)

Your nav is loaded from a fragment (e.g. `/nav`). The fragment should expose **three areas**: brand, sections, tools.

### Suggested structure (Etihad-style items)

- **Brand:** One link (e.g. homepage) with your logo or site name.
- **Sections:** A list of main menu items. Each item is a **single link** with the exact label below so the block can show the right icon:

| Label (exact text) | Icon shown | Suggested path |
|--------------------|------------|-----------------|
| Book               | Plane      | `/book` or `/`  |
| Manage             | Ticket     | `/manage`      |
| Check-in           | Calendar   | `/check-in`    |
| Flight status      | Clock      | `/flight-status` |
| Plan               | Document   | `/plan`        |
| Offers             | Tag        | `/offers`      |
| Loyalty            | Star       | `/loyalty`     |
| Help               | Question   | `/help`        |

- **Tools:** Optional links (e.g. region/language, search, account). These stay in the bottom “tools” area of the sidebar.

### How the block uses labels

The header block matches the **link text** to choose an icon. Use the labels in the table above (e.g. `Book`, `Manage`, `Check-in`) so the correct Etihad-style icon appears. Other labels fall back to the “book” (plane) icon.

## 2. Adding pages for each menu item

In EDS, “pages” are usually defined in your **content source** (e.g. Google Doc + sheet that maps URLs to docs).

- Create one **document** (or sheet row) per path, for example:
  - `/` or `/index` → Home
  - `/book` → Book (e.g. booking bar + content)
  - `/manage` → Manage booking
  - `/check-in` → Check-in
  - `/flight-status` → Flight status
  - `/plan` → Plan (destinations, etc.)
  - `/offers` → Offers / deals
  - `/loyalty` → Loyalty programme
  - `/help` → Help / contact

- In your **nav fragment** (e.g. in the doc that backs `/nav`), add one link per item with:
  - **URL:** The path above (e.g. `/book`, `/offers`).
  - **Text:** The exact label (e.g. `Book`, `Offers`) so the sidebar shows the right icon.

After publishing, the sidebar links will go to these pages and the menu will have both Etihad-style look and working navigation.

## 3. Collapse button (desktop)

On desktop, a **collapse** button (chevron) appears on the right edge of the sidebar. Clicking it narrows the sidebar to icons only and widens the main content; clicking again restores the full sidebar.
