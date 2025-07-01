---
sidebar_position: 4
title: Custom Consent Management
description: Manually manage user consent using the Zeotap iOS SDK's setConsent API when not using a TCFv2 CMP.
---

# Custom Consent Management (setConsent API)

This approach allows you to manage user consent using your own custom logic and user interface (like a custom consent dialog or integration with a non-TCF CMP) and then communicate the user's choices directly to the Zeotap iOS SDK using the [`setConsent`](../APIReference/setConsent) API call.

This method is suitable when:

*   You are not using an IAB TCF v2.x compliant Consent Management Platform (CMP).
*   You have built your own consent collection mechanism.
*   You need fine-grained control over when and how consent signals are passed to the SDK.
*   You are implementing consent requirements for regulations other than GDPR (though it can be used for GDPR if implemented correctly).
*   You want to integrate with a non-TCF CMP or custom privacy solution.

## How it Works

1.  **SDK Configuration:** You initialize the Zeotap SDK with specific options to indicate you will be managing consent manually.
2.  **User Interaction:** Your app presents a consent mechanism (e.g., a dialog, settings screen) to the user.
3.  **Capture Consent:** Your app's code captures the user's consent choices (e.g., accepting tracking, accepting specific data uses).
4.  **Call `setConsent`:** Your code calls the `setConsent()` function, passing a dictionary representing the user's consent status.
5.  **SDK Action:** The Zeotap SDK receives this consent object, stores it locally, and uses it to determine whether subsequent tracking calls should proceed.

## Configuration

To enable Custom Consent Management, you **must** configure the SDK during initialization as follows:

```swift
// SDK Initialization for Custom Consent
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    // --- Configuration for Custom Consent ---
    .useConsent(value: true)           // REQUIRED: Enables consent features
    .checkForCMP(value: false)         // REQUIRED: Tells the SDK *not* to look for TCF CMP data
    .build()

Collect.initialize(option: collectOptions)
```

## Testing Custom Consent

```swift
// Test granting consent
Collect.getInstance()?.setConsent(["track": true]) 
        
// Test denying consent
Collect.getInstance()?.setConsent(["track": false])
        
// Test mixed consent
Collect.getInstance()?.setConsent([
    "track": true,
    "marketingConsent": false
])
```

## Related Documentation

- [Consent Configuration Options](../Configurations/consentOptions): Detailed configuration options for consent management
- [Set Consent API](../APIReference/setConsent): Complete API reference for the setConsent method
- [Choosing a Consent Strategy](./consentStrategy): Guide to choosing the right consent approach
- [GDPR/TCF Integration](./gdpr): Alternative approach using TCF-compliant CMPs