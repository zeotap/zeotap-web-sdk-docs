---
sidebar_position: 2
title: PII Hashing Configuration
description: Understand how to configure PII hashing behavior using hashIdentities and areIdentitiesHashed options.
---

## `areIdentitiesHashed` & `hashIdentities`

These two configuration options work together to control how the Zeotap Android SDK handles Personal Identifiable Information (PII) like email addresses and phone numbers when you call the `setUserIdentities` function. Correctly configuring these options is crucial for ensuring data is processed according to your intended hashing strategy.

:::note PII
These configuration only affect PIIs sent using setUserIdentities function. Recognised PIIs are cellno, email, loginid. [Learn more about PIIs](../APIReferences/setUserIdentities#pii-identifier-key-reference)
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
| `false`               | `false`          | [**Sending Raw Identifiers**](../APIReferences/setUserIdentities#sending-raw-identifiers) (Default) |
| `true`                | `false`          | [**Sending Pre-Hashed Identifiers**](../APIReferences/setUserIdentities#sending-pre-hashed-identifiers)    |
| `false`               | `true`           | [**SDK Performs Hashing**](../APIReferences/setUserIdentities#sdk-performs-hashing)              |
| `true`                | `true`           | **Invalid**                            |

### Scenario 1: Sending Raw Identifiers (Default)

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    .areIdentitiesHashed(false)   // or omit (default)
    .hashIdentities(false)        // or omit (default)
    .build();

Collect.init(options);

// Later in your code
Map<String, String> identities = new HashMap<>();
identities.put("email", "user@example.com");     // Raw email
identities.put("cellno", "1234567890");           // Raw phone number

Collect.getInstance().setUserIdentities(identities);
```

### Scenario 2: Sending Pre-Hashed Identifiers

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    .areIdentitiesHashed(true)
    .hashIdentities(false)
    .build();

Collect.init(options);

// Later in your code - using hashed keys
Map<String, String> identities = new HashMap<>();
identities.put("email_sha256_lowercase", "5d41402abc4b2a76b9719d911017c592");  // Pre-hashed email
identities.put("cellno_sha256", "e3b0c44298fc1c149afbf4c8996fb924");           // Pre-hashed phone

Collect.getInstance().setUserIdentities(identities);
```

### Scenario 3: SDK Performs Hashing

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    .areIdentitiesHashed(false)
    .hashIdentities(true)
    .build();

Collect.init(options);

// Later in your code
Map<String, String> identities = new HashMap<>();
identities.put("email", "user@example.com");     // Raw email - SDK will hash
identities.put("cellno", "1234567890");           // Raw phone - SDK will hash

Collect.getInstance().setUserIdentities(identities);
```

:::tip Recommendation
It is **highly recommended** to explicitly set both `areIdentitiesHashed` and `hashIdentities` in your `CollectOptions` configuration to clearly document your intended hashing strategy and avoid potential confusion.
:::

:::warning[Invalid Configuration]
Setting both `areIdentitiesHashed: true` and `hashIdentities: true` simultaneously is an invalid configuration.

This creates a conflict: the SDK is being told to hash data that is also being declared as already hashed. This can lead to incorrect, double-hashed data.

**Do not use this combination.**
:::

## Hashing Algorithm

When `hashIdentities` is set to `true`, the Android SDK uses SHA-256/SHA-1/MD-5 hashing algorithm to hash PII values before transmission.

## Related Topics

*   [`setUserIdentities`](../APIReferences/setUserIdentities) API Reference
*   [Configuration Overview](./configurations) for all available SDK options
