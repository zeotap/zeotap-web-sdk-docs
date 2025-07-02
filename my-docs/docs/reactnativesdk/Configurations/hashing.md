---
sidebar_position: 2
title: PII Hashing Configuration
description: Understand how to configure PII hashing behavior using hash_identities and are_identities_hashed options.
---

## `are_identities_hashed` & `hash_identities`

These two configuration options work together to control how the Zeotap React Native SDK handles Personal Identifiable Information (PII) like email addresses and phone numbers when you call the `setUserIdentities` function. Correctly configuring these options is crucial for ensuring data is processed according to your intended hashing strategy.

:::note PII
These configuration only affect PIIs sent using setUserIdentities function. Recognised PIIs are cellno, email, loginid. [Learn more about PIIs](../APIReference/setUserIdentities#pii-identifier-key-reference)
:::

## Options Definitions

*   **`are_identities_hashed`**
    *   **Type:** `Boolean`
    *   **Default:** `false`
    *   **Description:** Tells the SDK whether the PII values you are **providing** in the `setUserIdentities` call are *already* hashed. If `true`, you must use the specific hashed keys (e.g., `email_sha256_lowercase`).

*   **`hash_identities`**
    *   **Type:** `Boolean`
    *   **Default:** `false`
    *   **Description:** Tells the SDK whether **it should perform** client-side hashing (SHA-256) on raw PII values (`email`, `cellno`, `loginid`) provided to `setUserIdentities` before sending the data to the Zeotap backend.

## Default Behavior

If you do **not** explicitly set `are_identities_hashed` or `hash_identities` during SDK initialization:

*   `are_identities_hashed` defaults to `false`.
*   `hash_identities` defaults to `false`.

This means by default, the SDK sends raw PII values without any client-side hashing.

## Combined usage

| `are_identities_hashed` | `hash_identities` | Resulting Scenario                     |
| :-------------------- | :--------------- | :------------------------------------- |
| `false`               | `false`          | [**Sending Raw Identifiers**](../APIReference/setUserIdentities#sending-raw-identifiers) (Default) |
| `true`                | `false`          | [**Sending Pre-Hashed Identifiers**](../APIReference/setUserIdentities#sending-pre-hashed-identifiers)    |
| `false`               | `true`           | [**SDK Performs Hashing**](../APIReference/setUserIdentities#sdk-performs-hashing)              |
| `true`                | `true`           | **Invalid**                            |

### Scenario 1: Sending Raw Identifiers (Default)

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    are_identities_hashed: false,   // or omit (default)
    hash_identities: false          // or omit (default)
};

initialiseZeoCollect(options);

// Later in your code
import { setUserIdentities } from 'zeo-collect';

setUserIdentities({
    email: "user@example.com",     // Raw email
    cellno: "1 2345678901"         // Raw phone number
});
```

### Scenario 2: Sending Pre-Hashed Identifiers

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    are_identities_hashed: true,
    hash_identities: false
};

initialiseZeoCollect(options);

// Later in your code - using hashed keys
setUserIdentities({
    email_sha256_lowercase: "5d41402abc4b2a76b9719d911017c592",  // Pre-hashed email
    cellno_sha256: "e3b0c44298fc1c149afbf4c8996fb924"             // Pre-hashed phone
});
```

### Scenario 3: SDK Performs Hashing

```javascript
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    are_identities_hashed: false,
    hash_identities: true
};

initialiseZeoCollect(options);

// Later in your code
setUserIdentities({
    email: "user@example.com",     // Raw email - SDK will hash
    cellno: "1 2345678901"         // Raw phone - SDK will hash
});
```

:::tip Recommendation
It is **highly recommended** to explicitly set both `are_identities_hashed` and `hash_identities` in your initialization options to clearly document your intended hashing strategy and avoid potential confusion.
:::

:::warning[Invalid Configuration]
Setting both `are_identities_hashed: true` and `hash_identities: true` simultaneously is an invalid configuration.

This creates a conflict: the SDK is being told to hash data that is also being declared as already hashed. This can lead to incorrect, double-hashed data.

**Do not use this combination.** 
:::

## Hashing Algorithm

When `hash_identities` is set to `true`, the React Native SDK uses SHA-256/SHA-1/MD-5 hashing algorithm to hash PII values before transmission.

## Related Topics

*   [`setUserIdentities`](../APIReference/setUserIdentities) API Reference
*   [Configuration Overview](./configurations) for all available SDK options