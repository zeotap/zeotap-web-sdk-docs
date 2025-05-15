---
sidebar_position: 5
title: ID5 Integration
description: Configure the Zeotap SDK to integrate with the ID5 Universal ID solution.
---

# ID5 Integration

The Zeotap Web SDK offers an optional integration with [ID5](https://id5.io/), a shared, neutral identity infrastructure for digital advertising. Integrating ID5 allows you to enrich user profiles tracked by the Zeotap SDK with the stable, privacy-compliant ID5 Universal ID, potentially improving user recognition and addressability across the advertising ecosystem.

## Prerequisites

*   You must have an active account with ID5.
*   You need your unique **Partner ID** provided by ID5.

## Configuration options

The ID5 integration is controlled by the following options within the SDK's `init` options:

### `enableID5`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** This is the master switch for the ID5 integration.
    *   Set to `true` to activate the integration. The SDK will attempt to fetch the ID5 ID and include it in event payloads sent to Zeotap.
    *   Set to `false` (or omit) to keep the integration disabled.

### `id5PartnerId`

*   **Type:** `Number`
*   **Default:** `null` / `undefined`
*   **Description:** Your unique numerical Partner ID assigned to you by ID5.
    *   This option is **required** if `enableID5` is set to `true`. The SDK cannot interact with the ID5 service without a valid Partner ID.
    *   Obtain this ID directly from your ID5 account manager or dashboard.

### `sendPartnerDataToID5`

*   **Type:** `Boolean`
*   **Default:** `false`
*   **Description:** Controls whether the Zeotap SDK is allowed to pass user PII (specifically, hashed email and/or phone numbers collected via `setUserIdentities`) to the ID5 API.
    *   Set to `true` **only if** you want to potentially improve ID5's ability to generate or retrieve an ID5 ID by providing these signals. This requires `enableID5` to also be `true`.
    *   Set to `false` (or omit) if you do not want the SDK to send any PII signals to ID5.
    *   **Privacy Consideration:** Enabling this option involves sending potentially sensitive (though hashed) data to a third party (ID5). Ensure this aligns with your privacy policies and that appropriate user consent has been obtained *before* enabling this.

## How it Works

When `enableID5: true` and a valid `id5PartnerId` are provided:

1.  The Zeotap SDK interacts with the ID5 API in the background.
2.  If `sendPartnerDataToID5: true`, the SDK may pass available hashed PII (from `setUserIdentities`) to ID5 to aid identification.
3.  The ID5 API attempts to retrieve or generate an ID5 Universal ID for the user.
4.  If an ID5 ID is successfully obtained, the Zeotap SDK includes it in the event payloads sent to the Zeotap backend. 

## Usage Examples

**Example: Basic ID5 Integration**

```javascript title="SDK Initialization - Basic ID5 Integration"
window.zeotap.init("YOUR_WRITE_KEY", {
  enableID5: true,         // Enable the integration
  id5PartnerId: 12345,     // Replace 12345 with YOUR actual ID5 Partner ID
  // sendPartnerDataToID5 defaults to false
});

//TODO add working exmample and guide for id5