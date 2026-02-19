# AEP (Adobe Experience Platform) connection

This site loads the Web SDK (Alloy) via **Adobe Launch (Tags)** instead of calling the SDK directly. The Launch script is loaded from `scripts/scripts.js` (to satisfy CSP); all datastream, consent, and push configuration is done in the Launch property.

## 1. Set your Launch embed URL

In **`scripts/scripts.js`**, set `LAUNCH_SCRIPT_URL` to your Launch property embed URL (loaded from JS to satisfy CSP strict-dynamic). To get the URL:

- In **Data Collection** (experience.adobe.com/data-collection), open your property → **Install** (or **Environments**).
- Copy the script URL from the embed code (e.g. `https://assets.adobedtm.com/.../launch-xxx-development.min.js`).
- In **`scripts/scripts.js`**, set `LAUNCH_SCRIPT_URL` to that URL.

## 2. Configure in Launch

In your Launch property, configure the following so events and push work correctly.

### Web SDK extension (Adobe Experience Platform Web SDK)

- **Datastream:** Select your datastream (e.g. ID `cd2c9528-abe4-4593-aa31-56a9135be5d9`).
- **Org ID:** `BF9C27AA6464801C0A495FD0@AdobeOrg` (or your org).
- **Consent:** Set default consent or use a CMP; call `alloy("updateUserConsent", { ... })` when the user accepts (e.g. in a rule that runs after consent).
- **Push notifications (optional):** If you use the push-opt-in block and want open/click tracking in AEP, in the Web SDK extension configure Push notifications with:
  - VAPID public key (same as in this repo: see `scripts/scripts.js` → `VAPID_PUBLIC_KEY`).
  - Application ID: `demo-emea-eds-web`.
  - Tracking dataset ID: your AJO Push Tracking Experience Event dataset (e.g. `64f5c1ce8a5c5f28d3434c44`).

### Schema validation (_demoemea)

If your datastream uses a schema that requires `_demoemea` and `_demoemea.identification`, add a rule in Launch that runs before events are sent and sets these (e.g. **Custom Code** that runs on Library Loaded and uses the Web SDK’s `onBeforeEventSend` equivalent, or a Data Layer / XDM override that includes `_demoemea.identification`). Otherwise streaming validation may fail with DCVS-1106-400.

## 3. On the site (already done)

- **`head.html`** loads your Launch script (after you set the URL).
- **`scripts/scripts.js`** sets `window.__pushConfig` with `applicationId` and `vapidPublicKey` so the **push-opt-in** block can subscribe and call `alloy("sendPushSubscription", { subscription })` when the user enables notifications. No direct SDK configure or MarTech plugin is used.

## Optional: personalization (Target / AJO)

- Add document metadata **`target`** to enable personalization for that page.
- Configure personalization in Launch (Target/AJO) as needed.

## Docs

- [Web SDK configure command](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/commands/configure/overview)
- [Push notifications (Web SDK)](https://experienceleague.adobe.com/en/docs/experience-platform/collection/js/commands/configure/pushnotifications)
- [PUSH_SETUP.md](PUSH_SETUP.md) for Journey Optimizer push credentials and channel config
