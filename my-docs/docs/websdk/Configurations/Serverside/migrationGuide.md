---
sidebar_position: 4
title: Migration Guide
description: How to mirgate from client side to server side
---

# Migration Guide: Client-side → Server-side Configs

## Why Migrate?
- Previously, configs were passed directly in the SDK initialization (`window.zeotap.init({...})`).
- Now, configs can be managed centrally in the **Config Panel**.
- Benefits:
  - No redeploy needed when configs change.
  - Consistent setup across environments/teams.
  - Auditability with the Change Log.

---

## Migration Steps

### Step 1 - Get your current client side configs
- Locate all existing init() calls in your codebase where configs are passed inline.
- Make a note of the current settings, this ensures you don’t miss any important options when moving to server-side configs.
 For example:
    ```js
    window.zeotap.init("YOUR_KEY", {
    areIdentitiesHashed: true,
    hashIdentities: false,
    useConsent: true,
    checkForCMP: false
    });
    ```

### Step 2 — Move Configs to Dashboard
- Go to **Corresponding Source  → Config Panel** in your Zeotap CDP account.
- Replicate your current SDK options (consent, identity, cookie usage, etc.).
- Save changes.

### Step 3 — Simplify Your SDK Init
**Before (client-side config inline):**
```js
window.zeotap.init("YOUR_KEY", {
  consentMode: "tcf",
  identityMode: "id5",
  enableTracking: true,
});
```

**After (server-side config):**
```js
window.zeotap.init("YOUR_KEY");
// Configs are now fetched from the dashboard
```

### Step 4 — Verify
- Run your app and check the SDK logs/network calls.
- Ensure configs applied match what you saved in the dashboard.
- `window.zeotap.getConfig()` can be used in console for debugging and checking if correct config is applied.

---
