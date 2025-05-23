---
sidebar_position: 2
title: PII Hashing Configuration
description: Understand how to configure PII hashing behavior using hashIdentities and areIdentitiesHashed options.
---

## `hashIdentities` & `areIdentitiesHashed`

These two configuration options work together to control how the Zeotap SDK handles Personal Identifiable Information (PII) like email addresses and phone numbers when you call the `setUserIdentities` function. Correctly configuring these options is crucial for ensuring data is processed according to your intended hashing strategy.

:::note PII
These configuration only affect PIIs sent using setUserIdentities function. Recognised PIIs are cellno, email, loginid. [Learn more about PIIs](../APIReference/setUserIdentities#pii-identifier-key-reference)
:::

## Options Definitions

*   **`hashIdentities`**
    *   **Type:** `Boolean`
    *   **Default:** `true`
    *   **Description:** Tells the SDK whether **it should perform** client-side hashing (SHA-256, MD5, SHA-1) on raw PII values (`email`, `cellno`, `loginid`) provided to `setUserIdentities` before sending the data to the Zeotap backend.

*   **`areIdentitiesHashed`**
    *   **Type:** `Boolean`
    *   **Default:** `false`
    *   **Description:** Tells the SDK whether the PII values you are **providing** in the `setUserIdentities` call are *already* hashed. If `true`, you must use the specific hashed keys (e.g., `email_sha256_lowercase`).


## Default Behavior

If you do **not** explicitly set `hashIdentities` or `areIdentitiesHashed` during `init`:

*   `hashIdentities` defaults to `true`.
*   `areIdentitiesHashed` defaults to `false`.

See all the cases and usage in [Choosing Your Hashing Strategy](../APIReference/setUserIdentities#choosing-your-hashing-strategy).

## Combined usage

| `hashIdentities` | `areIdentitiesHashed` | Resulting Scenario                     |
| :--------------- | :-------------------- | :------------------------------------- |
| `false`          | `false`               | [**1: Sending Raw**](../APIReference/setUserIdentities#sending-raw-identifiers)                |
| `false`          | `true`                | [**2: Sending Pre-Hashed**](../APIReference/setUserIdentities#sending-pre-hashed-identifiers) |
| `true`           | `false`               | [**3: SDK Performs Hashing**](../APIReference/setUserIdentities#sdk-performs-hashing) (Default)  |
| `true`           | `true`                | **Invalid**                            |

:::tip Recommendation
While the defaults lead to [**Scenario 3: SDK Performs Hashing**](../APIReference/setUserIdentities#sdk-performs-hashing), it is **highly recommended** to explicitly set both `hashIdentities` and `areIdentitiesHashed` in your `init` configuration to clearly document your intended hashing strategy and avoid potential confusion.
:::

:::warning[Invalid Configuration]
Setting both `hashIdentities: true` and `areIdentitiesHashed: true` simultaneously is an invalid configuration.

This creates a conflict: the SDK is being told to hash data that is also being declared as already hashed. This can lead to incorrect, double-hashed data.

**Do not use this combination.** 
:::


## Related Topics

*   [`Track User Identities`](../APIReference/setUserIdentities) API Reference
