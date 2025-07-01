---
sidebar_position: 2
title: PII Hashing Configuration
description: Understand how to configure PII hashing behavior using hashIdentities and areIdentitiesHashed options.
---

## `areIdentitiesHashed` & `hashIdentities`

These two configuration options work together to control how the Zeotap iOS SDK handles Personal Identifiable Information (PII) like email addresses and phone numbers when you call the `setUserIdentities` function. Correctly configuring these options is crucial for ensuring data is processed according to your intended hashing strategy.

:::note PII
These configuration only affect PIIs sent using setUserIdentities function. Recognised PIIs are cellno, email, loginid. [Learn more about PIIs](../APIReference/setUserIdentities#pii-identifier-key-reference)
:::

## Options Definitions

*   **`areIdentitiesHashed`**
    *   **Type:** `Boolean`
    *   **Default:** `false`
    *   **Description:** Tells the SDK whether the PII values you are **providing** in the `setUserIdentities` call are *already* hashed. If `true`, you must use the specific hashed keys (e.g., `email_sha256_lowercase`).

*   **`hashIdentities`**
    *   **Type:** `Boolean`
    *   **Default:** `false`
    *   **Description:** Tells the SDK whether **it should perform** client-side hashing (SHA-256) on raw PII values (`email`, `cellno`, `loginid`) provided to `setUserIdentities` before sending the data to the Zeotap backend.


## Default Behavior

If you do **not** explicitly set `areIdentitiesHashed` or `hashIdentities` during SDK initialization:

*   `areIdentitiesHashed` defaults to `false`.
*   `hashIdentities` defaults to `false`.

This means by default, the SDK sends raw PII values without any client-side hashing.

## Combined usage

| `areIdentitiesHashed` | `hashIdentities` | Resulting Scenario                     |
| :-------------------- | :--------------- | :------------------------------------- |
| `false`               | `false`          | [**Sending Raw Identifiers**](../APIReference/setUserIdentities#sending-raw-identifiers) (Default) |
| `true`                | `false`          | [**Sending Pre-Hashed Identifiers**](../APIReference/setUserIdentities#sending-pre-hashed-identifiers)    |
| `false`               | `true`           | [**SDK Performs Hashing**](../APIReference/setUserIdentities#sdk-performs-hashing)              |
| `true`                | `true`           | **Invalid**                            |

### Scenario 1: Sending Raw Identifiers (Default)

```swift
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .areIdentitiesHashed(false)   // or omit (default)
    .hashIdentities(false)        // or omit (default)
    .build()

Collect.initialize(option: collectOptions)

// Later in your code
Collect.getInstance()?.setUserIdentities([
    "email": "user@example.com",     // Raw email
    "cellno": "+1234567890"          // Raw phone number
])
```

### Scenario 2: Sending Pre-Hashed Identifiers

```swift
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .areIdentitiesHashed(true)
    .hashIdentities(false)
    .build()

Collect.initialize(option: collectOptions)

// Later in your code - using hashed keys
Collect.getInstance()?.setUserIdentities([
    "email_sha256_lowercase": "5d41402abc4b2a76b9719d911017c592",  // Pre-hashed email
    "cellno_sha256": "e3b0c44298fc1c149afbf4c8996fb924"             // Pre-hashed phone
])
```

### Scenario 3: SDK Performs Hashing

```swift
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .areIdentitiesHashed(false)
    .hashIdentities(true)
    .build()

Collect.initialize(option: collectOptions)

// Later in your code
Collect.getInstance()?.setUserIdentities([
    "email": "user@example.com",     // Raw email - SDK will hash
    "cellno": "+1234567890"          // Raw phone - SDK will hash
])
```

:::tip Recommendation
It is **highly recommended** to explicitly set both `areIdentitiesHashed` and `hashIdentities` in your `CollectOption` configuration to clearly document your intended hashing strategy and avoid potential confusion.
:::

:::warning[Invalid Configuration]
Setting both `areIdentitiesHashed: true` and `hashIdentities: true` simultaneously is an invalid configuration.

This creates a conflict: the SDK is being told to hash data that is also being declared as already hashed. This can lead to incorrect, double-hashed data.

**Do not use this combination.** 
:::

## Hashing Algorithm

When `hashIdentities` is set to `true`, the iOS SDK uses SHA-256 hashing algorithm to hash PII values before transmission.

## Related Topics

*   [`setUserIdentities`](../APIReference/setUserIdentities) API Reference
*   [Configuration Overview](./configurations) for all available SDK options