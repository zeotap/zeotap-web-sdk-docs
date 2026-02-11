---
sidebar_position: 4
title: Custom Consent Management
description: Manually manage user consent using the Zeotap Android SDK's setConsent API when not using a TCFv2 CMP.
---

# Custom Consent Management (setConsent API)

This approach allows you to manage user consent using your own custom logic and user interface (like a custom consent dialog or integration with a non-TCF CMP) and then communicate the user's choices directly to the Zeotap Android SDK using the [`setConsent`](../APIReferences/setConsent) API call.

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
4.  **Call `setConsent`:** Your code calls the `setConsent()` function, passing a map representing the user's consent status.
5.  **SDK Action:** The Zeotap SDK receives this consent object, stores it locally, and uses it to determine whether subsequent tracking calls should proceed.

## Configuration

To enable Custom Consent Management, you **must** configure the SDK during initialization as follows:

```java
// SDK Initialization for Custom Consent
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    // --- Configuration for Custom Consent ---
    .useConsent(true)           // REQUIRED: Enables consent features
    .checkForCMP(false)         // REQUIRED: Tells the SDK *not* to look for TCF CMP data
    .build();

Collect.init(options);
```

## Testing Custom Consent

```java
// Test granting consent
Map<String, Object> grantConsent = new HashMap<>();
grantConsent.put("track", true);
Collect.getInstance().setConsent(grantConsent);

// Test denying consent
Map<String, Object> denyConsent = new HashMap<>();
denyConsent.put("track", false);
Collect.getInstance().setConsent(denyConsent);

// Test mixed consent
Map<String, Object> mixedConsent = new HashMap<>();
mixedConsent.put("track", true);
mixedConsent.put("marketingConsent", false);
Collect.getInstance().setConsent(mixedConsent);
```

## Related Documentation

- [Consent Configuration Options](../configurations/consentOptions): Detailed configuration options for consent management
- [Set Consent API](../APIReferences/setConsent): Complete API reference for the setConsent method
- [Choosing a Consent Strategy](./consentStrategy): Guide to choosing the right consent approach
- [GDPR/TCF Integration](./gdpr): Alternative approach using TCF-compliant CMPs
