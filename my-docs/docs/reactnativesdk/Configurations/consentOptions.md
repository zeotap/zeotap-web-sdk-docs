---
sidebar_position: 3
title: Consent Configuration Options
description: Detailed explanation of the SDK configuration options related to user consent management.
---

# Consent Configuration Options

The Zeotap React Native SDK provides several configuration options within the initialization options object to manage how user consent is handled across both Android and iOS platforms. These settings are crucial for ensuring compliance with privacy regulations like GDPR, CCPA, and other regional data protection laws. Understanding these options helps you tailor the SDK's behavior to match your chosen consent strategy, whether you're using a consent management platform, a custom consent solution, or operating under specific regional requirements.

---

### `opt_out`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** This is the flag to completely disable or enable data collection in the app if no consent configuration was setup.
    *   **`false` (Default):** The SDK operates normally and collects data.
    *   **`true`:** Completely disables all data collection. No events are tracked, and no data is sent to Zeotap servers.

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    opt_out: true  // Disable all tracking
};

initialiseZeoCollect(options);
```

---

### `use_consent`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** This is the primary flag to enable or disable data collection based on custom consent management of the application.
    *   **`false` (Default):** The SDK operates in its default mode. Tracking behavior is primarily controlled by the `opt_out` flag. The SDK assumes consent unless explicitly opted out.
    *   **`true`:** Activates custom consent. The SDK will now expect and respect consent signals provided by the app before performing tracking actions. It will either look for CMP data (if `check_for_cmp` is `true`) or wait for [`setConsent`](../APIReference/setConsent) calls. Events may be queued until consent is determined.

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true  // Enable consent management
};

initialiseZeoCollect(options);
```

---

### `check_for_cmp`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** This option is only relevant when `use_consent` is set to `true`. It tells the SDK to honor CMP (Consent Management Platform) data to set the consent for tracking.
    *   **`false` (Default):** The SDK will rely solely on explicit calls to the `setConsent()` function to receive consent signals. This is used for custom consent implementations.
    *   **`true`:** The SDK will look for CMP (Consent Management Platform) data that might be stored by other CMPs or consent frameworks. If found, it will use the signals provided to determine consent for tracking based on the configured purposes.

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: true  // Look for CMP data
};

initialiseZeoCollect(options);
```

---

### `check_zeotap_vendor_consent`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** Adds an additional layer of validation when using a CMP (`use_consent: true` and `check_for_cmp: true`).
    *   **`false` (Default):** The SDK only checks for consent against the configured `purposes_for_tracking`.
    *   **`true`:** In addition to checking purpose consents, the SDK will also explicitly check if consent has been granted for Zeotap as a vendor within the consent data. Tracking will only proceed if both the required purpose consents *and* vendor consent for Zeotap are present.

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: true,
    check_zeotap_vendor_consent: true  // Require Zeotap vendor consent
};

initialiseZeoCollect(options);
```

---

### `purposes_for_tracking`

*   **Type:** `Array of Integers`
*   **Default:** `[1, 3, 4]`
*   **Description:** Specifies the list of purpose IDs for which the user must have granted consent in order for the SDK to perform tracking actions (e.g., sending events via `setEventProperties`, automatic lifecycle events). This option is only used when `use_consent: true` and `check_for_cmp: true`. The SDK checks if consent is granted for *all* purposes listed in this array.
    *   *Example TCF Purposes:*
        *   `1`: Store and/or access information on a device
        *   `3`: Create a personalized profile
        *   `4`: Select personalized content

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: true,
    purposes_for_tracking: [1, 3, 5]  // Require consent for specific purposes
};

initialiseZeoCollect(options);
```

---

## Combined Usage

| `use_consent` | `check_for_cmp` | `setConsent()` call | Description of SDK Behavior |
| :----------: | :-----------: | :------------------ | :--------------------------- |
| *Not Set* | *Not Set* | Optional (Only called for passing brand consents.) | **Default Behavior:** Consent management is disabled. The SDK assumes consent is granted and performs tracking unless `opt_out` is true. |
| `true` | `false` | Required | **Custom Consent Management:** Consent management is enabled, and the SDK relies on manual `setConsent()` calls to receive consent signals. The tracking behavior is directly controlled by these calls. |
| `true` | `true` | Optional (Only called for passing brand consents.) | **CMP Integration:** Consent management is enabled, and the SDK looks for CMP data to determine consent. Manual `setConsent()` calls can be used to send other consent data. |

## Consent Configuration Examples

### Basic Consent Management

```javascript
// Simple consent management with manual control
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: false
};

initialiseZeoCollect(options);

// Later, when user provides consent
import { setConsent } from 'zeo-collect';

// if user opts in
setConsent({
    track: true,
    identify: true
});
```

## Best Practices

1. **Choose the Right Strategy**: Select the consent strategy that matches your legal requirements and user experience goals.

2. **Provide Clear Information**: Always explain to users what data you're collecting and why.

3. **Honor User Choices**: Respect user consent decisions and provide easy ways to change them.

4. **Regular Audits**: Regularly review and audit your consent implementation to ensure compliance.

5. **Test Thoroughly**: Test all consent scenarios, including edge cases and state transitions on both platforms.

6. **Platform Parity**: Ensure consent behavior is identical across Android and iOS builds.

## Related Documentation

- [Write Key Configuration](./writeKey): Learn how to configure your write keys
- [Set Consent API](../APIReference/setConsent): API reference for consent management
- [Consent Strategy Guide](../Consent/consentStrategy): Choose the right consent approach