---
sidebar_position: 3
title: Consent Configuration Options
description: Detailed explanation of the SDK configuration options related to user consent management.
---

# Consent Configuration Options

The Zeotap Web SDK provides several configuration options within the `init` method to manage how user consent is handled. These settings are crucial for ensuring compliance with privacy regulations like GDPR. Understanding these options helps you tailor the SDK's behavior to match your chosen consent strategy, whether you're using a TCF v2.x compliant Consent Management Platform (CMP), a custom consent solution, or operating under specific regional requirements.

Refer to the [Choosing Your Consent Management Strategy guide](../Consent/consentStrategy) for an overview of the different approaches.

---


### `useConsent`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** This is the primary flag to enable or disable the SDK's consent management features.
    *   **`false` (Default):** The SDK operates in its default mode. Tracking and cookie syncing behavior are primarily controlled by the `optOut` flag. The SDK  assumes consent unless explicitly opted out.
    *   **`true`:** Activates consent management. The SDK will now expect and respect consent signals before performing actions like tracking or cookie syncing. It will either look for a TCF CMP (if `checkForCMP` is `true`) or wait for [`setConsent`](../APIReference/setConsent) calls (if `checkForCMP` is `false`). Events may be queued until consent is determined.

---



### `checkForCMP`

*   **Type:** `Boolean`
*   **Default:** `true`
*   **Description:** This option is only relevant when `useConsent` is set to `true`. It tells the SDK *how* to determine consent status.
    *   **`true` (Default):** The SDK will actively look for the IAB TCF v2.x `__tcfapi` framework on the page. If found, it will use the signals (TC String) provided by the CMP to determine consent for tracking and cookie syncing based on the configured `purposesForTracking` and `purposesForCookieSyncing`.
    *   **`false`:** The SDK will *not* look for the TCF `__tcfapi`. Instead, it will rely solely on explicit calls to the `window.zeotap.setConsent()` function to receive consent signals. This is used for [custom consent implementations](../Consent/consentStrategy).

---

### `purposesForTracking`

*   **Type:** `Number[]` (Array of numbers)
*   **Default:** `[1, 3, 4]` (Common TCF v2.0/2.1 defaults)
*   **Description:** Specifies the list of IAB TCF Purpose IDs for which the user must have granted consent (via a TCF CMP) in order for the SDK to perform tracking actions (e.g., sending events via `setEventProperties`, automatic page views). This option is only used when `useConsent: true` and `checkForCMP: true`. The SDK checks if consent is granted for *all* purposes listed in this array.
    *   *Example TCF Purposes:*
        *   `1`: Store and/or access information on a device
        *   `3`: Create a personalised advertising profile
        *   `4`: Select personalised advertisements

Refer [TCF/GDPR consent strategy](../Consent/gdpr) for usage and more details.

---

### `purposesForCookieSyncing`

*   **Type:** `Number[]` (Array of numbers)
*   **Default:** `[1, 3, 4]` (Common TCF v2.0/2.1 defaults)
*   **Description:** Specifies the list of IAB TCF Purpose IDs for which the user must have granted consent (via a TCF CMP) in order for the SDK to perform cookie syncing operations. This option is only used when `useConsent: true`, `checkForCMP: true`, and `allowCookieSync: true`. The SDK checks if consent is granted for *all* purposes listed in this array before initiating syncs.
    *   *Example TCF Purposes:* (Often the same as `purposesForTracking`)
        *   `1`: Store and/or access information on a device
        *   `3`: Create a personalised advertising profile
        *   `4`: Select personalised advertisements

Refer [TCF/GDPR consent strategy](../Consent/gdpr) for usage and more details.

---

### `includeTCFString`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** Determines whether the full TCF consent string (TC String), if available from a CMP, should be included in the payload of events sent to the Zeotap backend.
    *   **`false` (Default):** The TC String is not included in the event payload.
    *   **`true`:** If the SDK detects a TCF CMP and retrieves a TC String, that string will be added to the event payload under the key `tc_string`. This can be useful for auditing and debugging purposes.
    * ***note*** tc_string is by default passed in the payload if [TCF/GDPR consent strategy](../Consent/gdpr) is chosen.

---

### `shouldCheckZeotapVendorConsent`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** Adds an additional layer of validation when using a TCF CMP (`useConsent: true` and `checkForCMP: true`).
    *   **`false` (Default):** The SDK only checks for consent against the configured `purposesForTracking` and `purposesForCookieSyncing`.
    *   **`true`:** In addition to checking purpose consents, the SDK will also explicitly check if consent has been granted for Zeotap as a vendor (Vendor ID 301) within the TCF consent string. Tracking and/or cookie syncing will only proceed if both the required purpose consents *and* vendor consent for Zeotap are present.

---


## Combined usage 

| `useConsent` | `checkForCMP` | `setConsent()` call | Description of SDK Behavior                                                                                                                                                                                                                                                                                                                                      |
| :----------: | :-----------: | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  *Not Passed*   | *Not Passed* | Only called for passing brand consents. | [**Default Behavior:**](../Consent/default) Consent management is disabled. The SDK assumes consent is granted and performs tracking and cookie syncing.                                                                                                                                                                                       |
| `true`     | `true`     | Only called for passing brand consents. | [**TCF Integration:**](../Consent/gdpr) Consent management is enabled, and the SDK expects to interact with a TCF v2.x compliant CMP. The SDK reads consent signals (TC String) from the CMP to determine tracking and cookie syncing permissions. The `track` and `cookieSync` parameters within `setConsent` (if called) are ignored, but Brand Consents are processed. |
| `true`     | `false`    | Required for passing consent signals and/or brand consents. | [**Custom Consent Management:**](../Consent/customConsent) Consent management is enabled, and the SDK relies on manual `setConsent()` calls to receive consent signals. The `track` and `cookieSync` parameters directly control tracking and cookie syncing behavior, respectively. Additional properties (brand consents) are also processed and sent.                                                                                                                                   |



## Consent Configuration Combinations and SDK Behavior

*   **`useConsent`:** If `useConsent` is `false`, the SDK essentially ignores any subsequent consent signals and leads to [default consent mode](../Consent/default). It's the main configuration to enable/disable consent management.
*   **`checkForCMP` for [TCF](../Consent/gdpr) vs. [Custom](../Consent/customConsent):** When `useConsent: true`, this flag dictates whether the SDK *automatically* listens for a TCF CMP (`checkForCMP: true`) or relies on *manual* calls to `setConsent()` (`checkForCMP: false`).
*   **`setConsent()` Behavior:** The `setConsent()` function's behavior is highly dependent on the `useConsent` and `checkForCMP` settings:
    *   **[TCF](../Consent/gdpr) (`checkForCMP: true`):** The `track` and `cookieSync` parameters in `setConsent` are ignored; the TC String from the CMP is the source of truth. However, non-standard properties (brand consents) are still processed.
    *   **[Custom](../Consent/customConsent) (`checkForCMP: false`):** The `track` and `cookieSync` parameters *directly* control SDK tracking and cookie syncing actions.




By configuring these options correctly, you can ensure the Zeotap Web SDK aligns with your specific consent requirements and respects user privacy choices.
