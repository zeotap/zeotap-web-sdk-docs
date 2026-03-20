---
title: Partner Consent Key Map
sidebar_position: 4
description: Map channel partner IDs to consent keys to control per-partner cookie sync consent in custom consent mode.
---

# Partner Consent Key Map

The **Partner Consent Key Map** feature lets you control Zeotap's cookie syncing on a per-channel-partner basis. By default, the `cookieSync` key in the **Set Custom Consent** action enables or disables cookie syncing globally. With this feature, you can grant or deny cookie sync consent for individual partners (e.g. Google, Meta) independently.

## Prerequisites

This feature is only available when **Custom Consent** is selected as the consent resolution mechanism in the extension configuration.

## Configuration

### Step 1 — Open Extension Configuration

In Adobe Experience Platform Tags, navigate to your property and open the **Zeotap Collect** extension configuration.

### Step 2 — Select Custom Consent

In the **Choose primary consent resolution mechanism** dropdown, select **Custom**.

### Step 3 — Enable Partner Consent Key Map

Once Custom consent is selected, a **Partner Consent Key Map** checkbox appears. Check it to expand the mapping editor.

### Step 4 — Add Mappings

Use the key-value editor to add your mappings:

| Field | Description |
|---|---|
| **Channel Partner ID** | The Zeotap Partner ID assigned to the channel partner (e.g. `22`, `35`) |
| **Consent Key** | The key name you will pass in the Set Custom Consent action (e.g. `google_cookie_sync_consent`) |

Click **Add Row** to add more mappings as needed.

### Step 5 — Save

Click **Save** to persist the configuration. Rows with a missing key or value are automatically ignored.

## How It Works

When the extension initializes the Zeotap SDK, the saved mappings are automatically passed as `partnerConsentKeyMap` behind the scenes — no manual `init` call is needed. You only need to configure the mappings in the extension configuration UI (Steps 1–5 above).

Once configured, trigger consent from your page using `_satellite.track` with a Direct Call Rule:

```js
_satellite.track("setConsent", {
  track: true,
  cookieSync: true,                       // global cookie sync consent
  google_cookie_sync_consent: true,       // cookie sync consented for partner ID "22"
  meta_cookie_sync_consent: false         // cookie sync denied for partner ID "35"
});
```

The Direct Call Rule in Adobe Launch listens for the `"setConsent"` identifier and triggers the **Set Custom Consent** action, which passes the consent object (including the partner keys) to the Zeotap SDK.

The SDK uses this map to look up the correct consent key when evaluating cookie sync consent for each channel partner.

## Notes

- The Partner Consent Key Map section is **hidden** when the consent mechanism is not set to **Custom**.
- Unchecking the **Partner Consent Key Map** checkbox removes all mappings from the saved configuration.
- This setting works alongside the [**Set Custom Consent**](./Actions/setCustomConsent) action configured under your tag Rules.
