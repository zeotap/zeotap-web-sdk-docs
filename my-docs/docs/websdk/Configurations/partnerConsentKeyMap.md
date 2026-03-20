---
sidebar_position: 6
title: Consent Based cookie syncing
description: Consent to channels to cookie sync to.
---

# Consent based cookie syncing

## Overview

`partnerConsentKeyMap` lets you control Zeotap's cookie syncing feature on a per-channel-partner basis. By default, the `cookieSync` key in `setConsent` enables or disables cookie syncing globally across all partners. With `partnerConsentKeyMap`, you can grant or deny cookie sync consent for individual partners (e.g. Google, Meta) independently.

You define a mapping of **Zeotap Partner ID** → **key you use in your `setConsent` call**. When `setConsent` is called, the SDK reads those keys and determines which partners are consented for cookie syncing.

This feature is only active in **custom consent mode** (`useConsent: true`, `checkForCMP: false`).

---

## How It Works

1. Define `partnerConsentKeyMap` in your `init` options — a map of Zeotap Partner ID to the key you will pass in `setConsent`.
2. Call `setConsent` with those keys set to `true` or `false`.
3. The SDK extracts the partner-specific values and uses them to control cookie syncing for each partner individually.
4. These keys are forwarded to Zeotap as **Consented Channel Partners (CCP)**.

---

## Setup

### Step 1 — Configure during `init`

```js
zeotap.init('YOUR_WRITE_KEY', {
  useConsent: true,
  checkForCMP: false,
  partnerConsentKeyMap: {
    "22": "google_cookie_sync_consent",
    "35": "meta_cookie_sync_consent"
  }
});
```

| Option | Type | Description |
|---|---|---|
| `useConsent` | `boolean` | Must be `true` to enable custom consent mode |
| `checkForCMP` | `boolean` | Must be `false` to use custom consent (not TCF/CMP) |
| `partnerConsentKeyMap` | `object` | Map of Zeotap Partner ID → key used in `setConsent` to control cookie sync consent for that partner |

### Step 2 — Call `setConsent` with partner cookie sync keys

```js
zeotap.setConsent({
  track: true,
  cookieSync: true,                      // global cookie sync consent
  google_cookie_sync_consent: true,      // cookie sync consented for partner ID "22"
  meta_cookie_sync_consent: false        // cookie sync denied for partner ID "35"
});
```

---

## How the SDK Processes the Consent Object

Given the above example:

| Key | Value | Processed As |
|---|---|---|
| `track` | `true` | Primary consent — controls event tracking |
| `cookieSync` | `true` | Primary consent — controls global cookie syncing |
| `google_cookie_sync_consent` | `true` | Cookie sync consented for partner ID `"22"` |
| `meta_cookie_sync_consent` | `false` | Cookie sync denied for partner ID `"35"` |

---

## Full Example

```html
<script>
  window.zeotap = window.zeotap || { _q: [] };

  zeotap.init('YOUR_WRITE_KEY', {
    useConsent: true,
    checkForCMP: false,
    partnerConsentKeyMap: {
      "22": "google_cookie_sync_consent",
      "35": "meta_cookie_sync_consent"
    }
  });

  // Call after user makes a consent choice via your CMP/consent UI
  zeotap.setConsent({
    track: true,
    cookieSync: true,
    google_cookie_sync_consent: true,
    meta_cookie_sync_consent: false
  });
</script>
```

---

## Notes

- `partnerConsentKeyMap` must be a plain object. Keys are Zeotap Partner IDs and values are the corresponding keys in your `setConsent` call.
- Partner consent keys are extracted before the consent object is processed, so they will not appear in the brand consent payload.
- If `partnerConsentKeyMap` is not set or is not a valid object, the SDK skips partner-level cookie sync consent extraction.
- This feature has **no effect** when `useConsent` is `false` or `checkForCMP` is `true` (TCF/CMP mode).

---

## Supported Channel Partners

:::note
To get the full list of supported Zeotap Partner IDs contact support.
:::
