---
sidebar_position: 2
title: TCF v2.x / GDPR Compliance
description: Integrating the Zeotap Web SDK with IAB TCF v2.x compliant Consent Management Platforms (CMPs) for GDPR compliance.
---

# Integrating with TCF v2.x CMPs (GDPR Compliance)

For websites needing to comply with GDPR and similar regulations, integrating the Zeotap Web SDK with an IAB Transparency and Consent Framework (TCF) v2.x compliant Consent Management Platform (CMP) is the recommended approach.

This method leverages the standardized TCF framework to automatically manage user consent for data processing activities performed by the SDK.

## How it Works

1.  **CMP Implementation:** You must first implement a TCF v2.x compliant CMP (like OneTrust, TrustArc, Didomi, Sourcepoint, etc.) on your website. This CMP is responsible for displaying the consent banner/modal to users and storing their preferences.
2.  **SDK Detection:** When the Zeotap Web SDK initializes with the correct configuration ([see below](#configuration)), it automatically detects the presence of the TCF `__tcfapi` function provided by the CMP.
3.  **Consent Retrieval:** The SDK uses the `__tcfapi` to:
    *   Retrieve the user's current consent status (encoded in the TC String).
    *   Listen for changes to the consent status (e.g., if the user updates their preferences).
4.  **Decision Making:** Based on the retrieved TC String and the SDK's configuration, the SDK determines whether it has consent for specific actions:
    *   **Purpose Consent:** Checks if consent has been granted for the specific IAB TCF Purposes required for tracking (`purposesForTracking`) and cookie syncing (`purposesForCookieSyncing`).
5.  **Action Execution:**
    *   If the necessary consents are present, the SDK will proceed with tracking events (`setEventProperties`, `setPageProperties`) and performing cookie syncs (if `allowCookieSync` is enabled).
    *   If the necessary consents are *not* present, the SDK will block those specific actions.

## Configuration

To enable TCF v2.x integration, configure the SDK during initialization using the `window.zeotap.init` method:

```javascript title="SDK Initialization for TCF v2.x Integration"
window.zeotap.init("YOUR_WRITE_KEY", {
  // --- Core TCF Configuration ---
  useConsent: true,           // REQUIRED: Enables consent management features.
  checkForCMP: true,          // REQUIRED (and default): Tells the SDK to look for the TCF API.

  // --- Optional TCF Fine-tuning ---
  // Define which TCF Purposes are required for tracking.
  // Defaults may vary, but explicitly setting is recommended.
  purposesForTracking: [1, 3, 4], // Example: Purpose 1 (Store/Access Info), 3 (Ad Selection), 4 (Content Selection)

  // Define which TCF Purposes are required for cookie syncing.
  // Defaults may vary, but explicitly setting is recommended.
  purposesForCookieSyncing: [1, 3, 4], // Example: Same as tracking

  // --- Other SDK Configurations ---
});
```

The below table describes the keys/parameters that need to be configured while using the GDPR consent module.

| Function                | Type      | Value     | Description  |
|-------------------------|-----------|-----------|--------------|
| useConsent | Boolean | true | If this option is set to true, then the SDK waits to receive a consent signal and uses that consent to manage actions. |
| checkForCMP | Boolean | true | If this option is set to true, then we check for the presence of the TCF API. If the TCF 2.0 API is present, then we query the CMP API. |
| purposesForTracking | number[] | [1,3,4] | This option is used to pass a list of purpose IDs, based on which you can manage the consent for tracking. |
| purposesForCookieSyncing | number[] | [1,3,4] | This option is used to pass a list of purpose IDs, based on which you can manage the consent for cookie syncing. |


## Interaction with `setConsent` API

When the SDK is configured to use a TCF CMP (`useConsent: true` and `checkForCMP: true`), calls to the `window.zeotap.setConsent()` method behave differently compared to the Custom Consent mode:

*   The `track` and `cookieSync` parameters within the `setConsent` object are **ignored**.
*   However, any **Brand Consents** included in the `setConsent` call (e.g., `{ myBrandConsent: true }`) **will** still be processed, stored, and sent with subsequent events under the `z_p` query parameter of spl requests.
*   However, any **Brand Consents** (custom key-value pairs other than `track` or `cookieSync`) included in the `setConsent` call **will still be processed**, stored, and sent with subsequent events under the `z_p` query parameter of spl requests. This allows you to manage non-TCF consents alongside TCF integration.

```javascript
// Example: Even with TCF enabled, this call will still store 'brand1Consent'
// but the 'track: true' will be ignored in favor of the TCF signal.
window.zeotap.setConsent({
  track: true, // This value is IGNORED when checkForCMP is true
  brand1Consent: true // This custom/brand consent IS processed
});


//TODO need to add example for gdpr