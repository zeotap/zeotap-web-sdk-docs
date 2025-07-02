---
sidebar_position: 4
title: Custom Consent Management
description: Manually manage user consent using the Zeotap React Native SDK's setConsent API when not using a TCFv2 CMP.
---

# Custom Consent Management (setConsent API)

This approach allows you to manage user consent using your own custom logic and user interface (like a custom consent dialog or integration with a non-TCF CMP) and then communicate the user's choices directly to the Zeotap React Native SDK using the [`setConsent`](../APIReference/setConsent) API call.

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
4.  **Call `setConsent`:** Your code calls the `setConsent()` function, passing an object representing the user's consent status.
5.  **SDK Action:** The Zeotap SDK receives this consent object, stores it locally, and uses it to determine whether subsequent tracking calls should proceed.

## Configuration

To enable Custom Consent Management, you **must** configure the SDK during initialization as follows:

```javascript
// SDK Initialization for Custom Consent
import { initialiseZeoCollect } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    // --- Configuration for Custom Consent ---
    use_consent: true,           // REQUIRED: Enables consent features
    check_for_cmp: false         // REQUIRED: Tells the SDK *not* to look for TCF CMP data
};

initialiseZeoCollect(options);
```

## Testing Custom Consent

```javascript
import { setConsent } from 'zeo-collect';

// Test granting consent
setConsent({ track: true });
        
// Test denying consent
setConsent({ track: false });
        
// Test mixed consent
setConsent({
    track: true,
    marketingConsent: false
});
```

## Related Documentation

- [Consent Configuration Options](../Configurations/consentOptions): Detailed configuration options for consent management
- [Set Consent API](../APIReference/setConsent): Complete API reference for the setConsent method
- [Choosing a Consent Strategy](./consentStrategy): Guide to choosing the right consent approach
- [GDPR/TCF Integration](./gdpr): Alternative approach using TCF-compliant CMPs