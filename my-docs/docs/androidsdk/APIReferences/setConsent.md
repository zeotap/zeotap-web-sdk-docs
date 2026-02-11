---
sidebar_position: 6
title: Track User Consent
description: Send consent and/or brand consents.
---

# Track User Consent

The `setConsent` method is used to manage user consent for data collection and processing. This is essential for compliance with privacy regulations like GDPR, CCPA, and other data protection laws.

## Syntax

```java
Collect.getInstance().setConsent(Map<String, Object> consentData, SDKCallback callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| consentData | `Map<String, Object>` | Yes | Map of consent properties and their status |
| callback | `SDKCallback` | Optional | Callback to handle function response |


## Consent Properties

The consent properties is a map containing key-value pairs. It includes:

### Primary Consent Keys

#### `track` (`boolean`)
- `true`: Allows the SDK to send tracking events (e.g., from `setEventProperties`, page views).
- `false`: Prevents the SDK from sending tracking events.

### Brand Consent Keys

- Any additional key-value pairs in the map.
- Used for tracking consent related to marketing (e.g., `newsletterOptIn`, `personalizationConsent`).
- Passed as query parameters in spl call under `z_p`.
- Do **not** directly control SDK tracking or cookie behavior.

:::note
Brand consents are processed and sent to Zeotap independently of the track settings. Even if primary tracking consent is denied, brand consent information can still be transmitted.
:::

---

## Usage Examples

### Example 1: Grant Consent

```java
Map<String, Object> consentData = new HashMap<>();
consentData.put("track", true);

Collect.getInstance().setConsent(consentData);
```

### Example 2: Deny Consent

```java
Map<String, Object> consentData = new HashMap<>();
consentData.put("track", false);

Collect.getInstance().setConsent(consentData);
```

### Example 3: Passing Brand Consent

```java
Map<String, Object> consentData = new HashMap<>();
consentData.put("zeotapVendorConsent", true);
consentData.put("abcVendorConsent", false);

Collect.getInstance().setConsent(consentData);
```

### Example 4: Passing Brand Consent with Primary Consent

```java
Map<String, Object> consentData = new HashMap<>();
consentData.put("track", true);
consentData.put("zeotapVendorConsent", true);
consentData.put("abcVendorConsent", false);

Collect.getInstance().setConsent(consentData);
```

:::tip[Note]
In case of default consent (`optOut: false`) or CMP consent (`useConsent: true` and `checkForCMP: true`), setting primary consent flag will be ignored even if it was sent as part of `setConsent` method.
:::

### Passing Consent with Callback

```java
Map<String, Object> consentData = new HashMap<>();
consentData.put("track", true);
consentData.put("zeotapVendorConsent", true);

Collect.getInstance().setConsent(consentData, (response) -> {
    // Handle response
    // {status: "SUCCESS", message: "Consent set successfully"}
});
```

## Best Practices

1. **Request Consent Early**: Ask for consent before collecting any data.

2. **Provide Clear Information**: Explain what each consent category means and how data will be used.

3. **Respect User Choices**: Honor the user's consent decisions and don't repeatedly ask.

4. **Store Consent Locally**: Save consent preferences locally to avoid asking repeatedly.

5. **Allow Easy Updates**: Provide an easy way for users to change their consent preferences.

6. **Default to Denied**: When in doubt, default to denying consent rather than assuming consent.
