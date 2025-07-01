---
sidebar_position: 3
title: TCF v2.x / GDPR Compliance
description: Integrating the Zeotap iOS SDK with IAB TCF v2.x compliant Consent Management Platforms (CMPs) for GDPR compliance.
---

# Integrating with TCF v2.x CMPs (GDPR Compliance)

For iOS apps needing to comply with GDPR and similar regulations, integrating the Zeotap iOS SDK with an IAB Transparency and Consent Framework (TCF) v2.x compliant Consent Management Platform (CMP) is the recommended approach.

This method leverages the standardized TCF framework to automatically manage user consent for data processing activities performed by the SDK.

## How it Works

1.  **CMP Implementation:** You must first implement a TCF v2.x compliant CMP (like OneTrust, TrustArc, Didomi, Sourcepoint, etc.) in your iOS app. This CMP is responsible for displaying the consent UI to users and storing their preferences locally.
2.  **SDK Detection:** When the Zeotap iOS SDK initializes with the correct configuration ([see below](#configuration)), it automatically detects the presence of TCF data stored by the CMP in UserDefaults or other local storage.
3.  **Consent Retrieval:** The SDK reads the stored TCF consent data including:
    *   The user's current consent status (encoded in the TC String).
    *   Purpose consents and legitimate interests.
    *   Vendor consents (if `checkZeotapVendorConsent` is enabled).
4.  **Decision Making:** Based on the retrieved TC String and the SDK's configuration, the SDK determines whether it has consent for specific actions:
    *   **Purpose Consent:** Checks if consent has been granted for the specific IAB TCF Purposes required for tracking (`purposesForTracking`).
5.  **Action Execution:**
    *   If the necessary consents are present, the SDK will proceed with tracking events (`setEventProperties`, `setUserProperties`, etc.).
    *   If the necessary consents are *not* present, the SDK will block those specific actions and won't queue any events until consent is obtained.

## Configuration

To enable TCF v2.x integration, configure the SDK during initialization:

```swift
// SDK Initialization for TCF v2.x Integration
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    // --- Core TCF Configuration ---
    .useConsent(value: true)           // REQUIRED: Enables consent management features
    .checkForCMP(value: true)          // REQUIRED: Tells the SDK to look for TCF data
    
    // --- Optional TCF Fine-tuning ---
    // Define which TCF Purposes are required for tracking
    // Defaults may vary, but explicitly setting is recommended
    .purposesForTracking(value: [1, 3, 4]) // Purpose 1 (Store/Access Info), 3 (Ad Selection), 4 (Content Selection)
    
    // Optional: Check for Zeotap vendor consent in addition to purpose consent
    .checkZeotapVendorConsent(value: true)
    .build()

Collect.initialize(option: collectOptions)
```

The below table describes the configuration parameters for GDPR/TCF integration:

| Parameter                | Type      | Default Value | Description  |
|-------------------------|-----------|---------------|--------------|
| `useConsent` | Boolean | false | If this option is set to true, then the SDK waits to receive a consent signal and uses that consent to manage actions. |
| `checkForCMP` | Boolean | false | If this option is set to true, then we check for the presence of TCF data stored by a CMP. |
| `purposesForTracking` | [Int] | [1,3,4] | This option is used to pass a list of purpose IDs, based on which you can manage the consent for tracking. |
| `checkZeotapVendorConsent` | Boolean | false | If true, also checks for Zeotap vendor consent in addition to purpose consents. |

## Common TCF Purpose IDs

Here are some commonly used TCF v2.x purpose IDs:

- **Purpose 1:** Store and/or access information on a device
- **Purpose 2:** Select basic ads  
- **Purpose 3:** Create a personalised ads profile
- **Purpose 4:** Select personalised ads
- **Purpose 5:** Create a personalised content profile
- **Purpose 6:** Select personalised content
- **Purpose 7:** Measure ad performance
- **Purpose 8:** Measure content performance
- **Purpose 9:** Apply market research to generate audience insights
- **Purpose 10:** Develop and improve products

## Interaction with `setConsent` API

When the SDK is configured to use a TCF CMP (`useConsent: true` and `checkForCMP: true`), calls to the `setConsent()` method behave differently compared to the Custom Consent mode:

*   The `track` parameter within the `setConsent` object is **ignored** as tracking consent is determined by the TCF data.
*   However, any **Brand Consents** included in the `setConsent` call (e.g., `{ "myBrandConsent": true }`) **will** still be processed, stored, and sent with subsequent events under the `z_p` query parameter. This allows you to manage non-TCF consents alongside TCF integration.

```swift
// Example: Even with TCF enabled, this call will still store 'brandConsent'
// but the 'track: true' will be ignored in favor of the TCF signal
Collect.getInstance()?.setConsent([
    "track": true, // This value is IGNORED when checkForCMP is true
    "brandConsent": true // This custom/brand consent IS processed
])
```

## CMP Integration Considerations

### Timing
- Initialize your CMP before initializing the Zeotap SDK
- Ensure TCF data is available when the SDK starts
- The SDK may queue events until valid consent is determined

### Data Storage
- TCF data is typically stored in UserDefaults by the CMP
- The SDK looks for standard TCF keys like `IABTCF_TCString`, `IABTCF_PurposeConsents`, etc.
- Ensure your CMP correctly writes TCF data to these standard locations

### Consent Updates
- When users update their consent preferences through your CMP, the SDK will automatically detect the changes
- No additional API calls are needed for basic tracking consent
- Use `setConsent()` only for brand-specific consents

## Best Practices

1. **CMP First:** Always initialize and configure your CMP before the Zeotap SDK
2. **Purpose Selection:** Carefully choose which TCF purposes are required for your use case
3. **Vendor Consent:** Consider enabling `checkZeotapVendorConsent` for stricter compliance
4. **Testing:** Test with different consent scenarios (all accepted, all rejected, mixed)
5. **Documentation:** Document which purposes your app requires and why

## Troubleshooting

**SDK not respecting consent:**
- Verify TCF data is being written to UserDefaults by your CMP
- Check that `useConsent: true` and `checkForCMP: true` are set
- Ensure purpose IDs in `purposesForTracking` match your CMP configuration

**Events not being sent:**
- Check if required purposes have consent in the TCF data
- Verify Zeotap vendor consent if `checkZeotapVendorConsent` is enabled
- Review SDK logs for consent-related messages

## Related Documentation

- [Consent Configuration Options](../Configurations/consentOptions): Detailed configuration options for consent management
- [Set Consent API](../APIReference/setConsent): API reference for managing user consent
- [Choosing a Consent Strategy](./consentStrategy): Guide to choosing the right consent approach
- [Custom Consent Management](./customConsent): Alternative approach using manual consent