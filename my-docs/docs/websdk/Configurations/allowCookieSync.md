---
sidebar_position: 6
title: allowCookieSync
description: Enable/Disable cookie syncing functionality.
---

## allowCookieSync

**Type:** `Boolean`

**Default:** `true`

**Description:**

This option controls whether the Zeotap Web SDK is permitted to perform **cookie syncing** operations. Cookie syncing is a background process used to match the Zeotap user identifier (ZI) with identifiers from approved third-party advertising platforms or data partners. This matching typically happens via pixel fires or redirects initiated by the SDK.

*   **`true` (Default):** When set to `true`, the SDK will automatically initiate cookie syncing processes with all partners. To restrict reach out to Zeotap represtative or Support team. 
*   **`false`:** When set to `false`, the SDK will **not** perform any automatic cookie syncing operations, regardless of consent status.

**Usage:**

You configure `allowCookieSync` within the options object passed to the `window.zeotap.init` method.

**Example: Disabling Cookie Sync**

If you want to prevent the SDK from initiating any cookie syncs:

```jsx title="SDK Initialization - Disabling Cookie Sync"
window.zeotap.init("YOUR_WRITE_KEY", {
  allowCookieSync: false // Explicitly disable cookie syncing
  // ... other configurations
});
