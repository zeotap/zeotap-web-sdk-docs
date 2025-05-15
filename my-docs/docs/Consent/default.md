---
sidebar_position: 1
title: Default Behavior (No Explicit Consent Management)
description: Understand how the Zeotap SDK operates regarding consent when no specific consent mechanism is configured.
---

# Default Consent Behavior

This section describes the default behavior of the Zeotap Web SDK when you initialize it **without** explicitly enabling consent management features (i.e., when the `useConsent` configuration option is `false`, which is its default value).

## How it Works

In this default mode, the SDK's tracking and data collection activities are primarily controlled by the `optOut` configuration option.

*   **`optOut: false` (Default):**
    *   If you initialize the SDK without specifying `useConsent: true` or `optOut: true`, the SDK assumes it has permission to operate fully.
    *   It **will** track user activities (page views, events).
    *   It **will** perform cookie syncing.
    *   It **will** process and store user identities provided via `setUserIdentities`.

*   **`optOut: true`:**
    *   If you explicitly set `optOut: true` during initialization, the SDK will be significantly restricted, effectively acting as a global "do not track" for the SDK on that page load.
    *   No tracking events will be sent to Zeotap.
    *   Cookie syncing will be disabled.
    *   User identification calls will ignored.

## Interaction with `setConsent` API

When the SDK is operating in this default mode (`useConsent: false`), calls to the `window.zeotap.setConsent()` function have limited effect:

*   The `track` and `cookieSync` parameters within the `setConsent` object are **ignored**. Setting them to `true` or `false` will have no impact on the SDK's tracking or cookie syncing behavior, which remains governed by the `optOut` option.
*   However, any **Brand Consents** included in the `setConsent` call (e.g., `{ myBrandConsent: true }`) **will** still be processed, stored, and sent with subsequent events under the `z_p` query parameter of spl requests.


## Example

```javascript title="SDK Initialization (Default Mode - Tracking Enabled)"
// Initializes the SDK with default settings:
// useConsent: false (implied)
// optOut: false (implied)
// Tracking and cookie syncing will be active by default.
window.zeotap.init("YOUR_WRITE_KEY");
```


Try out this <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/consent/defaultConsent" target="_blank">example</a>. 


