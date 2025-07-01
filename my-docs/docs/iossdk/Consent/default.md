---
sidebar_position: 2
title: Default Behavior (No Explicit Consent Management)
description: Understand how the Zeotap iOS SDK operates regarding consent when no specific consent mechanism is configured.
---

# Default Consent Behavior

This section describes the default behavior of the Zeotap iOS SDK when you initialize it **without** explicitly enabling consent management features (i.e., when the `useConsent` configuration option is `false`, which is its default value).

## How it Works

In this default mode, the SDK's tracking and data collection activities are primarily controlled by the `optOut` configuration option.

*   **`optOut: false` (Default):**
    *   If you initialize the SDK without specifying `useConsent: true` or `optOut: true`, the SDK assumes it has permission to operate fully.
    *   It **will** track user activities (screen views, events).
    *   It **will** process and store user identities provided via `setUserIdentities`.
    *   It **will** send user properties and page properties.

*   **`optOut: true`:**
    *   If you explicitly set `optOut: true` during initialization, the SDK will be significantly restricted, effectively acting as a global "do not track" for the SDK in your app.
    *   No tracking events will be sent to Zeotap.
    *   User identification calls will be ignored.
    *   All data collection functions will be disabled.

## Interaction with `setConsent` API

When the SDK is operating in this default mode (`useConsent: false`), calls to the `setConsent()` function have limited effect:

*   The `track` parameter within the `setConsent` object is **ignored**. Setting it to `true` or `false` will have no impact on the SDK's tracking behavior, which remains governed by the `optOut` option.
*   However, any **Brand Consents** included in the `setConsent` call (e.g., `{ "myBrandConsent": true }`) **will** still be processed, stored, and sent with subsequent events under the `z_p` query parameter of tracking requests.

## Example

```swift
// SDK Initialization (Default Mode - Tracking Enabled)
// Initializes the SDK with default settings:
// useConsent: false (implied)
// optOut: false (implied)
// Tracking will be active by default.

var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .build()

Collect.initialize(option: collectOptions)

// The SDK will start tracking immediately after initialization
```

## Default Mode with OptOut

```swift
// SDK Initialization with Global Opt-Out
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .optOut(value: true) // Disable all tracking
    .build()

Collect.initialize(option: collectOptions)

// No tracking will occur, even if setConsent is called
Collect.getInstance()?.setConsent([
    "track": true // This will be ignored due to optOut: true
])
```

## Brand Consent in Default Mode

```swift
// Even in default mode, brand consents are processed
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .build()

Collect.initialize(option: collectOptions)

// Brand consents will be collected and sent
Collect.getInstance()?.setConsent([
    "track": false, // Ignored in default mode
    "newsletterOptIn": true, // This will be processed
    "marketingConsent": false // This will be processed
])
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