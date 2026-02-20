# Create sidebar pages in Document Authoring (da.live)

Your sidebar shows **Book**, **Manage**, **Check-in**, **Flight status**, **Plan**, **Offers**, **Loyalty**, **Help**. Those links need real pages. In EDS with Document Authoring, each **page** is a **document** you create in da.live. The **document name** becomes the URL path (e.g. document `book` → `/book`).

You already have: `index`, `nav`, `footer`, `metadata`, and folder `docs`. Create the following **eight documents** so the sidebar links work.

---

## Step 1: Create one document per sidebar item

In **da.live** → your project (`demo-emea-eds`) → click **NEW** and create a **new document** for each row below. Use the **exact** "Document name" so the URL matches.

| Sidebar label   | Document name   | URL path        |
|-----------------|-----------------|-----------------|
| Book            | `book`          | `/book`         |
| Manage          | `manage`        | `/manage`       |
| Check-in        | `check-in`      | `/check-in`     |
| Flight status   | `flight-status` | `/flight-status` |
| Plan            | `plan`          | `/plan`         |
| Offers          | `offers`        | `/offers`       |
| Loyalty         | `loyalty`       | `/loyalty`      |
| Help            | `help`          | `/help`         |

---

## Step 2: Content to add in each document

Use **Heading 1** for the page title, then add any blocks you want (tables for blocks, images, text). Minimal examples:

### Book (`book`)
- **Heading 1:** Book
- Optional: add a **booking-bar** block (table: first cell `booking-bar`, then one row with From | To | Date | Search).

### Manage (`manage`)
- **Heading 1:** Manage
- Short line of body text, e.g. "Manage your booking."

### Check-in (`check-in`)
- **Heading 1:** Check-in
- Short line of body text, e.g. "Check in for your flight."

### Flight status (`flight-status`)
- **Heading 1:** Flight status
- Short line of body text, e.g. "Check your flight status."

### Plan (`plan`)
- **Heading 1:** Plan
- Short line of body text, e.g. "Plan your trip."

### Offers (`offers`)
- **Heading 1:** Offers
- Optional: **cards** block for offers.

### Loyalty (`loyalty`)
- **Heading 1:** Loyalty
- Short line of body text, e.g. "Etihad Guest – earn and redeem."

### Help (`help`)
- **Heading 1:** Help
- Short line of body text, e.g. "Contact and support."

---

## Step 3: Update the nav document

So the sidebar links point to these pages, your **nav** document must list them. Open your **nav** document in da.live and ensure the **sections** area has one link per page, with:

- **Link text** exactly: Book, Manage, Check-in, Flight status, Plan, Offers, Loyalty, Help (so the header block can show the right icons).
- **Link URL** for each: `/book`, `/manage`, `/check-in`, `/flight-status`, `/plan`, `/offers`, `/loyalty`, `/help`.

Nav structure is typically three parts (brand, sections, tools). In the sections list, add one row/link per item above.

---

## Step 4: Publish

After creating and editing the documents, use **Update** / **Publish** in Document Authoring so the new pages are available on your EDS site. Then open your local or live site and click each sidebar item; each should load the corresponding page.

---

## Summary checklist

- [ ] Create document `book`          → `/book`
- [ ] Create document `manage`       → `/manage`
- [ ] Create document `check-in`     → `/check-in`
- [ ] Create document `flight-status` → `/flight-status`
- [ ] Create document `plan`         → `/plan`
- [ ] Create document `offers`       → `/offers`
- [ ] Create document `loyalty`      → `/loyalty`
- [ ] Create document `help`         → `/help`
- [ ] Update **nav** with links to these paths and labels above
- [ ] Publish so pages show up in EDS
