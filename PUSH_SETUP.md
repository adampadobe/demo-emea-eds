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

- **Web SDK** is configured with `pushNotifications` (vapidPublicKey, applicationId) in `scripts/scripts.js`.
- **Push opt-in block:** add a **push-opt-in** block in your page content; users who click it get a subscription and it is sent via `alloy('sendPushSubscription', { subscription })`.
- **Service worker:** `/sw.js` is registered when the user opts in and is used to receive push messages.

---

## Step 4: Test

1. Publish a page that contains the **push-opt-in** block.
2. Open the page, click **Enable notifications**, allow when prompted.
3. In Journey Optimizer, create a journey that uses **Push** and the channel configuration from Step 2, targeting an audience that includes the test profile (e.g. by ECID or email).
4. Send a test push and confirm it appears in the browser.

---

## Optional: Push tracking dataset

To track push opens/clicks in AEP, create or use a dataset based on **CJM Push Tracking Experience Event** and set `trackingDatasetId` in the Web SDK `pushNotifications` config (in `scripts/scripts.js`) to that dataset’s ID.
