---
sidebar_position: 1
title: Server Side Overview
description: blah blah
---

## What Are Server-Side Configs?
Server-side configs let you manage your SDK configuration centrally through the dashboard, instead of hardcoding options directly into your application code.

When you initialize the SDK with your project key, it automatically fetches the latest configuration from our servers. This means your team can update settings in real time without needing to redeploy code.

---

## Why We Moved From Client-Side to Server-Side
Previously, SDK options were set directly in the app code during initialization. While simple, this had some drawbacks:

- **Code redeploys required** - any configuration change meant editing code and redeploying your app.
- **Inconsistent setups** - teams managing multiple apps/environments risked mismatched configs.
- **Limited agility** - quick experimentation or turning features on/off required engineering effort.

With server-side configs:
- **Centralized control** - manage configs from a single dashboard.
- **No redeploys needed** - update settings instantly without touching code.
- **Consistency** - all apps using the same key automatically get the same config.
- **Flexibility** - toggle features or change consent/identity options with a single click.

---

## How It Works
1. Log in to [Zeotap CDP](https://app.zeotap.com/), go to your web js source and select your desired configurations.
2. When you save, the config is stored on our servers and linked to your API key.
3. When your app initializes the SDK:

```js
window.zeotap.init("YOUR_KEY");
```

- The SDK fetches the latest configuration from our servers.
- Your selected options are applied automatically.

This ensures your SDK always runs with the latest settings you’ve defined.

---

## Example: Before vs After

**Old way (Client-side config):**

```js
window.zeotap.init("YOUR_KEY", {
  useConsent: true,
  checkForCMP: true,
  persistenceInCookieStorage: true,
});
```

**New way (Server-side config):**

```js
window.zeotap.init("YOUR_KEY");
// All configs automatically applied from server
```
