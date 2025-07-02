---
sidebar_position: 2
title: Default Behavior (No Explicit Consent Management)
description: Understand how the Zeotap React Native SDK operates regarding consent when no specific consent mechanism is configured.
---

# Default Consent Behavior

This section describes the default behavior of the Zeotap React Native SDK when you initialize it **without** explicitly enabling consent management features (i.e., when the `use_consent` configuration option is `false`, which is its default value).

## How it Works

In this default mode, the SDK's tracking and data collection activities are primarily controlled by the `opt_out` configuration option.

*   **`opt_out: false` (Default):**
    *   If you initialize the SDK without specifying `use_consent: true` or `opt_out: true`, the SDK assumes it has permission to operate fully.
    *   It **will** track user activities (screen views, events).
    *   It **will** process and store user identities provided via `setUserIdentities`.
    *   It **will** send user properties and page properties.

*   **`opt_out: true`:**
    *   If you explicitly set `opt_out: true` during initialization, the SDK will be significantly restricted, effectively acting as a global "do not track" for the SDK in your app.
    *   No tracking events will be sent to Zeotap.
    *   User identification calls will be ignored.
    *   All data collection functions will be disabled.

## Interaction with `setConsent` API

When the SDK is operating in this default mode (`use_consent: false`), calls to the `setConsent()` function have limited effect:

*   The `track` parameter within the `setConsent` object is **ignored**. Setting it to `true` or `false` will have no impact on the SDK's tracking behavior, which remains governed by the `opt_out` option.
*   However, any **Brand Consents** included in the `setConsent` call (e.g., `{ "myBrandConsent": true }`) **will** still be processed, stored, and sent with subsequent events under the `z_p` query parameter of tracking requests.

## Example

```javascript
// SDK Initialization (Default Mode - Tracking Enabled)
// Initializes the SDK with default settings:
// use_consent: false (implied)
// opt_out: false (implied)
// Tracking will be active by default.

import { initialiseZeoCollect } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY"
};

initialiseZeoCollect(options);

// The SDK will start tracking immediately after initialization
```

## Default Mode with OptOut

```javascript
// SDK Initialization with Global Opt-Out
import { initialiseZeoCollect } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    opt_out: true // Disable all tracking
};

initialiseZeoCollect(options);

// No tracking will occur, even if setConsent is called
import { setConsent } from 'zeo-collect';

setConsent({
    track: true // This will be ignored due to opt_out: true
});
```

## Brand Consent in Default Mode

```javascript
// Even in default mode, brand consents are processed
import { initialiseZeoCollect, setConsent } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY"
};

initialiseZeoCollect(options);

// Brand consents will be collected and sent
setConsent({
    track: false, // Ignored in default mode
    newsletterOptIn: true, // This will be processed
    marketingConsent: false // This will be processed
});
```

## When to Use Default Mode

**Recommended for:**
*   Apps that don't operate under strict privacy regulations
*   Internal/enterprise apps with pre-agreed data collection terms
*   Apps in regions without explicit consent requirements
*   Development and testing environments

**Not recommended for:**
*   Apps distributed in EU/GDPR regions
*   Apps subject to CCPA or similar privacy laws
*   Consumer-facing apps that prioritize user privacy
*   Apps that need granular consent management

## Related Documentation

- [Consent Configuration Options](../Configurations/consentOptions): Detailed configuration options for consent management
- [Set Consent API](../APIReference/setConsent): API reference for managing user consent
- [Choosing a Consent Strategy](./consentStrategy): Guide to choosing the right consent approach