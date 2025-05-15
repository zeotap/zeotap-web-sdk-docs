---
sidebar_position: 4
title: Setting User Properties
description: Send user attributes as a dedicated event.
---

# Setting User Properties

The `window.zeotap.setUserProperties()` function allows you to send specific user attributes to Zeotap as a dedicated event named `set_user_properties`. This is useful for capturing and transmitting user-level information that might not be directly tied to a specific page view or action, but is still valuable for understanding the user.

:::note PII Behaviour
PIIs (like `cellno`, `email`, `loginid`) sent via `setUserProperties` are always hashed by the SDK before being sent to the backend. This behavior is similar to [Scenario 3. SDK Perform Hashing](./setUserIdentities/#sdk-performs-hashing) of the `setUserIdentities` function.
:::

**Key Characteristics:**

*   **Immediate Event:** Calling `setUserProperties` immediately triggers an event with the name `set_user_properties`.
*   **Non-Persistent:** The properties sent via this method are associated with this specific `set_user_properties` event. They are **not** automatically persisted in the browser's local storage or cookies by the SDK, nor are they automatically included with subsequent, different events (like page views or custom events triggered by `setEventProperties`).
*   **Distinct from [`setUserIdentities`](./setUserIdentities):** This function is different from `setUserIdentities`, which is used for establishing and persisting core user identifiers. `setUserProperties` is for sending additional, often more dynamic or contextual, user-level attributes.

**Parameters**

*   `properties` (Object): An object containing key-value pairs representing the user properties.
    *   Keys should be strings.
    *   Values can be strings, numbers, or booleans.

**Usage Example**

```javascript title="Sending user segment and a custom preference"

window.zeotap.setUserProperties({
  userSegment: 'loyal_customer',
  communicationPreference: 'email_only',
  lastPurchaseCategory: 'electronics',
  email: 'user@example.com'
});
```

**Verification**

```json title="Event properties in payload" {5,12-22}
            "events": [
                {
                "event": {
                    "id": "m9Tva77fUH4ILi3SPBBVn",
                    "eventName": "set_user_properties", //set_user_properties event name,
                    "eventTimestamp": 1745959356443
                },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "userSegment": "loyal_customer",
                    "communicationPreference": "email_only",
                    "lastPurchaseCategory": "electronics",
                    "email": {
                        "sha256_lowercase": "sha256_hash_of_user@example.com", // SDK generated
                        "sha256_uppercase": "sha256_hash_of_USER@EXAMPLE.COM", // SDK generated
                        "md5_lowercase": "md5_hash_of_user@example.com",   // SDK generated
                        "md5_uppercase": "md5_hash_of_USER@EXAMPLE.COM",   // SDK generated
                        "sha1_lowercase": "sha1_hash_of_user@example.com",  // SDK generated
                        "sha1_uppercase": "sha1_hash_of_USER@EXAMPLE.COM"   // SDK generated
                    }
                },
                "page": { 
                    "path": "/products",
                    "referrer": "https://test.zeotap.com/",
                    "url": "https://test.zeotap.com/product1"
                },
                "version": "4.4.3"
                }
            ]
```

To verify that user property setting is working:

1. Open your browser's **Developer Tools** (`F12` or right-click → *Inspect*).
2. Go to the **Network** tab.
3. Trigger a page view in your application.
4. Look for a network `POST` request sent to ```https://spl.zeotap.com/fp?```.
5. Check for the request with `eventName`: `set_user_properties`.
6. The payload should contain a `user` object with the key-value pairs you passed to `setUserProperties`.
7. After the `setUserProperties` call, trigger a different event (e.g., using `setEventProperties('another_event', { some_data: 'value' })`).
8. Inspect the network request for this new event.
9. Verify that the properties sent via `setUserProperties` are *not* present in the payload of this subsequent event, confirming their non-persistent nature for other event types.


# Use Cases

*   **Capturing User Preferences:** Sending user-defined preferences like "newsletter_opt_in: true" or "preferred_language: 'en'".
*   **Demographic Information:** Transmitting demographic data like "age_group: '25-34'" or "gender: 'female'" if collected with consent.
*   **User Segmentation Data:** Sending segment information derived from your system, e.g., "customer_tier: 'Gold'".
*   **Profile Updates:** Updating specific attributes about a user that are not core identifiers.


# setUserProperties vs setUserIdentities
| Feature | setUserProperties | setUserIdentities | 
|---|---|---|
| Triggers Event? | Yes, immediately (set_user_properties event) | No, updates internal state |
| Persistence | Not persisted in browser storage | Persisted in browser storage (session/local/cookie) |
| Event Association | Sent with its own `set_user_properties` event | Sent with all subsequent events until cleared/updated |
| Primary Use | Sending specific, non-persistent user attributes | Establishing and maintaining stable user identifiers |