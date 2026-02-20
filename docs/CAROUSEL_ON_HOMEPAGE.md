# Show the carousel on the homepage

The carousel is a **block** – it only appears when your **content** includes it. The homepage is the **index** document in Document Authoring (da.live).

## Why the carousel might not show

- The **index** document may not have a carousel section, or that section was removed/edited.
- The carousel block needs at least **one row** of content (image, title, CTA text, CTA link). If the section is empty or the first row doesn’t have the right structure, the block won’t render.

## How to add the carousel to the homepage

1. In **da.live** open your project → open the **index** document.
2. Add a **new section** (new table or block area).
3. In that section, the **first cell** of the first row must be the block name: **`carousel`**.
4. Add **one row per slide**. Each row has 4 columns:
   - **Column 1:** Image (paste or upload an image).
   - **Column 2:** Title (e.g. "Visit Muscat").
   - **Column 3:** CTA text (e.g. "Book now").
   - **Column 4:** CTA link (e.g. `/book` or full URL).

Example (3 slides):

| carousel |        |         |      |
|----------|--------|---------|------|
| [image1] | Visit Muscat | Book now | /book |
| [image2] | Deals from London | Explore | /offers |
| [image3] | Etihad Guest | Join now | /loyalty |

5. **Save** and **Publish** the index document.

After publishing, the homepage will show the carousel (and it will appear on localhost:3000 when you run the dev server with the same content source).

## Order on the page

- If you want the carousel **above** the hero: put the carousel section **before** the content that has the first Heading 1 + image (that pair is auto-turned into the hero).
- If you want the carousel **below** the hero: put the carousel section **after** that content.
