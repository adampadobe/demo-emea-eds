# Web push setup (Journey Optimizer)

This project is configured for web push with Adobe Journey Optimizer. Complete the steps below in Adobe so push can be sent to opted-in users.

**Reference:** [Configure web push – Journey Optimizer](https://experienceleague.adobe.com/en/docs/journey-optimizer/using/channels/push/push-config/push-configuration-web)

---

## Values used in this site

| Item | Value |
|------|--------|
| **App ID** | `demo-emea-eds-web` |
| **VAPID public key** | `BLHda1pyWwF9FBI-pGP0ihaMVINkpegv9aeZorxeH4qXRkqGU53W3NFgpFxQj5TQWXo9g8Y13MkDfx1oq0WUbdQ` |
| **VAPID private key** | In `vapid-private.txt` (gitignored). Paste into AJO in Step 1. |

---

## Step 1: Add push credentials in Journey Optimizer

1. Go to **Journey Optimizer** → **Channels** → **Push settings** → **Push credentials**.
2. Click **Create push credential**.
3. **Platform:** **Web**.
4. **App ID:** `demo-emea-eds-web` (must match the site).
5. **VAPID public key:**  
   `BLHda1pyWwF9FBI-pGP0ihaMVINkpegv9aeZorxeH4qXRkqGU53W3NFgpFxQj5TQWXo9g8Y13MkDfx1oq0WUbdQ`
6. **VAPID private key:** paste from `vapid-private.txt` (local file, never commit).
7. Click **Submit**.

---

## Step 2: Create channel configuration

1. **Channels** → **General settings** → **Channel configurations** → **Create channel configuration**.
2. Name (e.g. `Demo EMEA Web Push`), optional description.
3. **Channel:** **Push**.
4. **Platform:** **Web**.
5. **App id:** select `demo-emea-eds-web` (same as Step 1).
6. Add **Marketing action(s)** if required by your consent setup.
7. Save.

---

## Step 3: On the site (already implemented)

- **Web SDK** is configured via Launch (Tags) with push notifications in the extension. The push opt-in block and `sendPushSubscription` work with that.
- **Push opt-in block:** add a **push-opt-in** block in your page content; users who click it get a subscription and it is sent via `alloy('sendPushSubscription', { subscription })`.
- **Service workers:**
  - **Launch “Web Push” rule** registers the Adobe Alloy service worker for push (open/click tracking). This repo includes the worker so it can be served from your origin:
    - **`/web/alloyServiceWorker.js`** – use this path in Launch if your EDS deployment serves the `web/` folder.
    - If you get a 404 for `/web/alloyServiceWorker.js` after deploy, in Launch change the Web Push rule to register **`/alloyServiceWorker.min.js`** with scope **`/`** (file is at repo root).
  - **`/sw.js`** – custom worker used when the user opts in via the push-opt-in block (receives push, can coexist with the Alloy worker depending on scope).

---

## Step 4: Test

1. Publish a page that contains the **push-opt-in** block.
2. Open the page, click **Enable notifications**, allow when prompted.
3. In Journey Optimizer, create a journey that uses **Push** and the channel configuration from Step 2, targeting an audience that includes the test profile (e.g. by ECID or email).
4. Send a test push and confirm it appears in the browser.

---

## Where the notification text comes from (AJO + context data)

The **title** and **body** text users see in the push are set in two places:

### 1. In Journey Optimizer (primary)

When you design the **Push** message in your journey, you set the **Title** and **Message body** in the channel action. That content is what AJO sends in the payload. If you see generic text like "New Notification" / "You have a new message" or "This is your web push" / "This is the body", that is the content currently configured in the **Push** activity in your journey. To change it:

- Open the journey → select the **Push** activity → edit the message.
- Set **Title** and **Message body** to the real copy you want (e.g. "Visit Muscat" / "Book your next trip to Oman.").

### 2. In the service worker (context data override)

This repo’s **`/sw.js`** receives the push payload and builds the browser `Notification`. It supports **context/custom data** so you can override or enrich title/body from AJO’s payload.

- **Context data in payload:** If AJO sends custom fields (e.g. `customData`, `context`, or root-level keys), the service worker reads them. In **`sw.js`** it looks for:
  - `data.customData`, `data.context`, `data.contextData`, or `data.custom`
  - Then uses `custom.title`, `custom.body`, `custom.url`, `custom.icon`, `custom.tag` to override the main title/body/URL/icon/tag.
- **Where to change behaviour:** Edit **`sw.js`** in the "Context data" section. You can:
  - Map more AJO payload keys to `title` / `body` if AJO uses different names.
  - Use custom fields (e.g. personalization tokens from AJO) as the notification text.

So: set the main copy in **AJO**; use **context data** in **`sw.js`** only when you need to override or compute title/body from custom payload fields.

---

## Troubleshooting: popup on local but not on live

The browser’s “Allow notifications?” popup only appears when the user **clicks** the “Enable notifications” button (it’s not automatic). If you see it locally but not on live, check the following.

### 1. Is the push-opt-in block on the live page?

- The live URL (e.g. `main--demo-emea-eds--adampadobe.aem.live`) may be serving a **different page** or branch than preview (e.g. `*.aem.page` or Document Authoring).
- Ensure the **same page** (or a page that includes the push-opt-in section) is published and loaded on live. In your Google Doc / source, you must have a section whose first cell is **push-opt-in** (and ideally a link or button text in the next cell).
- On the live page, confirm you see the **“Enable notifications”** button. If you see **“Push not configured.”** instead, see step 2.

### 2. Is push configured on the live origin?

- The block needs `window.__pushConfig` (from `scripts/scripts.js`) and `window.alloy` (from Launch). If either is missing, the block shows “Push not configured.” and no button.
- On the **live** tab, open DevTools → Console. Reload and check:
  - No errors blocking Launch or the main script.
  - Type `window.__pushConfig` and `window.alloy` – both should be defined after the page has loaded.
- If Launch doesn’t load on live (CSP, wrong embed URL, or 404), fix that first (see AEP_CONFIG.md). The same `LAUNCH_SCRIPT_URL` in `scripts/scripts.js` is used for both preview and live unless you switch by environment.

### 3. Are you actually clicking the button on live?

- The permission prompt is shown only **in response to a user click** on “Enable notifications”. If you don’t click the button on the live page, the popup will never appear.

### 4. Has permission already been set for the live origin?

- The browser stores “Allow” or “Block” **per origin**. If you (or someone) already allowed or blocked notifications for the live domain, the browser will **not** show the popup again.
- **Check:** In Chrome, click the lock/info icon in the address bar → Site settings → Notifications. If it’s “Allow” or “Block”, the popup won’t show again on that origin.
- **To test again:** Use an **Incognito/Private** window, or another browser, or reset the site’s permissions for the live URL. Then open the live page and click “Enable notifications”.

### 5. Console: “Subscription details have not changed”

- That message means the Web SDK thinks a subscription (or permission state) for this origin is already stored and unchanged, so it doesn’t send again or re-prompt. On that origin you’ve either already granted or the SDK has a cached state. Use a fresh profile/incognito to force a new permission flow if needed.

---

## Optional: Push tracking dataset

To track push opens/clicks in AEP, create or use a dataset based on **CJM Push Tracking Experience Event** and set `trackingDatasetId` in the Web SDK `pushNotifications` config (in `scripts/scripts.js`) to that dataset’s ID.
