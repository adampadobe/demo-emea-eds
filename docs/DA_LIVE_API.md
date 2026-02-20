# Document Authoring (da.live) API

Yes. Document Authoring exposes APIs you can use to read and update content (including the nav document) instead of editing only in the da.live UI.

---

## 1. DA Admin API (content sources)

**Docs:** [https://opensource.adobe.com/da-admin/](https://opensource.adobe.com/da-admin/)

- **Get source content:** `GET /source/{org}/{repo}/{path}`  
  - Path must include file extension (e.g. `nav.html`).
- **Create/update source content:** `POST /source/{org}/{repo}/{path}`  
  - Request: `multipart/form-data` with the document content.
  - Response: 201 when the source is created/updated.
- **Auth:** **Bearer** token (required).

**Example (once you have base URL and token):**

```bash
# Get current nav (replace BASE_URL, org, repo, and add .html if needed)
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "BASE_URL/source/adampadobe/demo-emea-eds/nav.html"

# Update nav (multipart/form-data with updated HTML)
curl -X POST -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "data=@nav-updated.html" \
  "BASE_URL/source/adampadobe/demo-emea-eds/nav.html"
```

The exact **base URL** for the DA Admin API (e.g. `https://api.da.live` or an admin endpoint) is in the full OpenAPI spec at opensource.adobe.com/da-admin (download the spec or check the “Servers” section).

---

## 2. Document API (DA2) – alternative

**Docs:** [Document API (DA2)](https://docs.da.live/drafts/cmilar/da2) (draft)

- **Format:** `{org}/sites/{site}/source/{path}.html`
- **Base:** `https://api.aem.live` (referenced in EDS contexts).
- **GET / HEAD** – retrieve document.
- **PUT** – store document (`Content-Type: text/html` or `application/json`).
- **DELETE** – remove document.

**Example:**

```bash
# Get nav
curl "https://api.aem.live/adampadobe/sites/demo-emea-eds/source/nav.html"

# Update nav (may require auth depending on deployment)
curl -X PUT -H "Content-Type: text/html" \
  -d @nav-updated.html \
  "https://api.aem.live/adampadobe/sites/demo-emea-eds/source/nav.html"
```

DA2 may use session/cookie auth when called from the browser; for server/script use, check the latest docs for auth (e.g. bearer token or API key).

---

## 3. Getting an access token (DA Admin API)

The DA Admin API requires a **Bearer** token. Common options:

- **Adobe IMS:** Create an integration in [Adobe Developer Console](https://developer.adobe.com/console) and use OAuth 2.0 or JWT to obtain an access token for the Document Authoring / content services that da.live uses.
- **Admin / product context:** Your org admin may have an integration that already has “Document Authoring” or “Content Authoring” entitlements; use that integration’s client id/secret to get a token.

Use the token in the `Authorization: Bearer <token>` header for GET and POST to `/source/{org}/{repo}/{path}`.

---

## 4. Using the API to update the nav

1. **GET** the current `nav` document (path like `nav.html` or whatever your repo uses).
2. **Edit** the HTML (or JSON) to add the eight sidebar links (Book, Manage, Check-in, Flight status, Plan, Offers, Loyalty, Help) with the correct URLs (`/book`, `/manage`, etc.). Structure must match what your header block expects (e.g. three areas: brand, sections, tools).
3. **POST** (DA Admin) or **PUT** (DA2) the updated content back to the same path.
4. **Publish** the document (publishing may be a separate API call or step in the da.live UI, depending on your setup).

---

## 5. Script: update_da_nav.py (Option 2 with your Adobe auth)

A script at the repo root **`update_da_nav.py`** (in the parent ExperienceManager folder) uses your existing **01_Core_Setup_Authentication/adobe_auth** to get a bearer token and call the DA2 API:

```bash
cd /path/to/ExperienceManager
python3 update_da_nav.py              # GET nav (tries api.aem.live)
python3 update_da_nav.py --out nav.html   # GET and save to file
```

**Result:** With the current AEP token (client credentials for Adobe Experience Platform), **api.aem.live** returns **401 Unauthorized**. So the same integration that works for `platform.adobe.io` does not yet have access to Document Authoring.

**To get API access to da.live:**

- In **Adobe Developer Console**, add an integration that includes **Document Authoring** or **AEM Edge Delivery Services** (or the product that backs da.live) and use the scopes/token from that integration for `update_da_nav.py`, or  
- Continue editing the nav document in the **da.live UI** (see `NAV_CONTENT_REFERENCE.md`).

Once you have a token that returns 200 from GET, we can add the `--update` flow to merge the eight sidebar links and PUT the nav back.
