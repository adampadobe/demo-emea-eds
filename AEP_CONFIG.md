# AEP (Adobe Experience Platform) connection

This site uses the [aem-martech](https://github.com/adobe-rnd/aem-martech) plugin to connect to AEP (Web SDK, Analytics, Target, Launch, ACDL).

## Required: set your AEP values

In **`scripts/scripts.js`**, the following are set in `loadEager` (replace if you change datastream/org):

| Placeholder           | Where to get it | This project |
|-----------------------|-----------------|---------------|
| Datastream ID         | AEP Data Collection → Datastreams → your datastream → ID | `cd2c9528-abe4-4593-aa31-56a9135be5d9` ✓ |
| Org ID               | Admin Console or AEP URL (org value) | `BF9C27AA6464801C0A495FD0@AdobeOrg` ✓ |

Both are configured; the Web SDK will send events to your datastream when the site loads.

## Optional: Launch

To load Adobe Launch scripts (e.g. for tags), add your Launch script URLs to the `launchUrls` array in the same `initMartech` call:

```js
launchUrls: [
  'https://assets.adobetarget.com/...',
  // your Launch URL(s)
],
```

## Optional: personalization (Target / AJO)

- Add document metadata **`target`** (e.g. in your sheet or doc) to enable personalization for that page.
- Or leave `getMetadata('target')` as-is; personalization runs when that metadata is present and consent is given.

## Consent

The sample uses `isConsentGiven = true` for demos. For production, replace with your consent management (e.g. OneTrust, AEM consent banner) and call `updateUserConsent()` when the user accepts/rejects.

## Docs

- [MarTech plugin README](plugins/martech/README.md)
- [AEM + MarTech integration](https://www.aem.live/developer/martech-integration)
- [Web SDK configure command](https://experienceleague.adobe.com/en/docs/experience-platform/web-sdk/commands/configure/overview)
