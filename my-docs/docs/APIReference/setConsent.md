---
sidebar_position: 5
title: Tracking User Consent
description: Send consent and/or brand consents.
---

## Description

Once the SDK is initialized for, you can use the `setConsent` function to provide the user's consent status.

For [custom consent](../Consent/customConsent) it is needed to specifiy the consent status.

It can also be used to specify any brand consents.

```javascript
window.zeotap.setConsent(consentObject);
```


## consentObject Structure

The `consentObject` is a JavaScript object containing key-value pairs. It includes:

### Primary Consent Keys

#### `track` (`boolean`)
- `true`: Allows the SDK to send tracking events (e.g., from `setEventProperties`, page views).
- `false`: Prevents the SDK from sending tracking events.

#### `cookieSync` (`boolean`)
- `true`: Allows cookie syncing.
- `false`: Disables cookie syncing.

### Brand Consent Keys

- Any additional key-value pairs in the object.
- Used for tracking consent related to marketing (e.g., `newsletterOptIn`, `personalizationConsent`).
- Passed as query parameters in spl call under `z_p`.
- Do **not** directly control SDK tracking or cookie behavior.

:::note
 Brand consents are processed and sent to Zeotap independently of the track and cookieSync settings. Even if primary tracking consent is denied, brand consent information can still be transmitted.
:::

---

## Examples

### Example 1: Grant full consent
```javascript
window.zeotap.setConsent({
  track: true,
  cookieSync: true
});
```

### Example 2: Track but no cookie sync, with brand consent
```javascript
window.zeotap.setConsent({
  track: true,
  cookieSync: false,
  newsletterOptIn: true // Brand consent
});
```

### Example 3: Deny all primary consents
```javascript
window.zeotap.setConsent({
  track: false,
  cookieSync: false
});
```

### Example 4: Brand consents only
```javascript
window.zeotap.setConsent({
  analyticsConsent: true,
  personalizationConsent: false
});
```

:::note
setConsent call triggers a GET call to ```https://spl.zeotap.com/fp?``` with   ```event_eventName: "setConsent"/"updateConsent"```.
:::

---

## SDK Behavior Based on `setConsent`

- **Before `setConsent` is called:**  
  If `useConsent` is `true`, the SDK queues events until `setConsent` provides a `track` value (or a timeout occurs).

- **After `setConsent({ track: true })`:**  
  Events are sent to Zeotap.

- **After `setConsent({ track: false })`:**  
  Events are ignored; no data is sent.

- **After `setConsent({ cookieSync: false })`:**  
  Cookie syncing is disabled.

- **Brand Consents:**  
  Stored and included in future event payloads under `z_p` query parameters.

---

## Persistence

- By default, consent is hashed and stored in **Session Storage**.
- If `persistenceInCookieStorage: true` is set during init, consent is stored in a **first-party cookie** — useful for cross-subdomain persistence. [Learn more about ```persistenceInCookieStorage```](../Configurations/persistenceInCookieStorage)

---

## Timing Considerations

- Call `setConsent` **as early as possible** after SDK init:
  - Based on stored preferences, or
  - Right after the user makes a consent choice via your UI.
- The SDK supports `setConsent` being called at **any time** and adapts behavior for future events.


