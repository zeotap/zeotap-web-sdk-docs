---
sidebar_position: 3
title: Custom Consent Management
description: Manually manage user consent using the Zeotap SDK's setConsent API when not using a TCFv2 CMP.
---

# Custom Consent Management (setConsent API)

This approach allows you to manage user consent using your own custom logic and user interface (like a custom consent banner or integration with a non-TCF CMP) and then communicate the user's choices directly to the Zeotap Web SDK using the [`setConsent`](../APIReference/setConsent)) API call.

This method is suitable when:

*   You are not using an IAB TCF v2.x compliant Consent Management Platform (CMP).
*   You have built your own consent collection mechanism.
*   You need fine-grained control over when and how consent signals are passed to the SDK.
*   You are implementing consent requirements for regulations other than GDPR (though it can be used for GDPR if implemented correctly).

## How it Works

1.  **SDK Configuration:** You initialize the Zeotap SDK with specific options to indicate you will be managing consent manually.
2.  **User Interaction:** Your website presents a consent mechanism (e.g., a banner) to the user.
3.  **Capture Consent:** Your website's code captures the user's consent choices (e.g., accepting tracking, accepting specific data uses).
4.  **Call `setConsent`:** Your code calls the `window.zeotap.setConsent()` function, passing an object representing the user's consent status.
5.  **SDK Action:** The Zeotap SDK receives this consent object, stores it (based on configuration), and uses it to determine whether subsequent tracking calls (like `setEventProperties`) or cookie syncing should proceed.

## Configuration

To enable Custom Consent Management, you **must** configure the SDK during initialization as follows:

```jsx title="SDK Initialization for Custom Consent"
window.zeotap.init("YOUR_WRITE_KEY", {
  // --- Configuration for Custom Consent ---
  useConsent: true,           // REQUIRED: Enables consent features.
  checkForCMP: false,         // REQUIRED: Tells the SDK *not* to look for a TCF CMP API.

  // --- Other SDK Configurations ---
});
```

See detailed guide about [```window.zeotap.setConsent()```](../APIReference/setConsent)

To control cookie syncing consent per individual channel partner, you can also configure [`partnerConsentKeyMap`](../Configurations/partnerConsentKeyMap) during `init`. This lets you grant or deny Zeotap's cookie syncing for specific partners (e.g. Google, Meta) independently, by mapping partner IDs to keys in your `setConsent` call.

```jsx title="Using partnerConsentKeyMap with Custom Consent"
window.zeotap.init("YOUR_WRITE_KEY", {
  useConsent: true,
  checkForCMP: false,
  partnerConsentKeyMap: {
    "22": "google_cookie_sync_consent",
    "35": "meta_cookie_sync_consent"
  }
});

window.zeotap.setConsent({
  track: true,
  cookieSync: true,                      // global cookie sync consent
  google_cookie_sync_consent: true,      // cookie sync consented for partner ID "22"
  meta_cookie_sync_consent: false        // cookie sync denied for partner ID "35"
});
```

Try out this <a href="https://github.com/zeotap/zeotap-web-sdk-docs/tree/main/my-docs/static/examples/consent/customConsent" target="_blank">example</a>.

