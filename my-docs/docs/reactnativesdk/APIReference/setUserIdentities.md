---
sidebar_position: 1
title: Track User Identities
description: Persistently identify users by associating various identifiers with their activity.
---

# Track User Identities

The `setUserIdentities` method is used to identify users by associating them with specific identifiers (like email, phone number, or your own internal IDs). This is crucial for cross-session user tracking and building comprehensive user profiles.

**Why use it?**

*   **User Stitching:** Allows Zeotap to link user activity across different sessions or devices when a known identifier is provided.
*   **Data Enrichment:** Provides key identifiers needed for potential data enrichment processes.
*   **Audience Building:** Enables creating audiences based on specific known identifiers.

:::tip[Persistence]
Identifiers set using `setUserIdentities()` are persisted and automatically included in the `user` node of the payload for all subsequent events sent during the user's session(s).
:::

## Syntax

```javascript
import { setUserIdentities } from 'zeo-collect';

setUserIdentities(identities, callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| identities | Object | Yes | An object containing user identity key-value pairs |
| callback | Function | Optional | Callback to handle function response |

## Understanding Identifier Types

You can send different categories of identifiers:

1.  **Personal Identifiable Information (PII):** Standardized identifiers like email or phone number. These can be sent raw or pre-hashed.
2.  **Custom Identities:** Your own first-party identifiers (e.g., `crmId`, `loyaltyId`). Hashing configurations don't apply to these.

## Choosing Your Hashing Strategy

Before using `setUserIdentities`, you must decide how PII (like email and phone numbers) will be handled regarding hashing. This choice affects your SDK configuration and the keys you use in the `setUserIdentities` call. Click on each scenario below for details:

<!-- Raw Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### Sending Raw Identifiers
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 1: Sending Raw Identifiers (Implementation Steps)</strong></summary>
<p>This approach involves sending the user's actual, readable identifiers (like email or phone number) directly to the Zeotap SDK. It's often the simplest method as you don't handle hashing yourself; Zeotap's backend takes care of processing.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    To use this scenario, you **must** explicitly tell the SDK *not* to perform hashing itself and confirm that the data you will provide is *not* already hashed. This is done during the `initialiseZeoCollect` call:

    ```javascript title="SDK Initialization for Raw Identifiers"
    import { initialiseZeoCollect } from 'zeo-collect';

    const options = {
        android_write_key: "YOUR_ANDROID_WRITE_KEY",
        ios_write_key: "YOUR_IOS_WRITE_KEY",
        hash_identities: false,      // Crucial: Tells the SDK *NOT* to hash the values itself.
        are_identities_hashed: false // Crucial: Confirms the values you'll provide are *NOT* already hashed.
    };

    initialiseZeoCollect(options);
    ```
    *This configuration ensures the SDK passes the raw values you provide directly to the Zeotap backend without attempting client-side hashing.*

2.  **Send Identifiers Using Standard Keys and Raw Values:**
    Once the SDK is initialized correctly for this scenario, call `setUserIdentities`. Use the standard, recognized keys for PII (like `email`, `cellno`, `loginid`) and provide the **actual, raw user data** as the values. You can also include any custom identifiers.

    **Implementation Example:**
    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Email (Raw)</strong></summary>
    ```javascript title="Sending Raw Email"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        email: "example@gmail.com" // Provide the actual email address
    });
    ```

    The email will be passed in the payload of the network call:

    ```json title="Identities in payload" {9-9}
        "events": [
            {
            "event": {
                "eventName": "goToHome",
                "eventTimestamp": 1745959356443
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "email": "example@gmail.com" //raw email sent
            },
            "page": { /* ... */ },
            "version": "1.3.8"
            }
        ]
    ```
    </details>

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Cell phone (Raw)</strong></summary>
    <p>To send the user's raw cell phone number in Scenario 1:</p>
        <ul>
            <li>Use the standard key: <code>cellno</code>.</li>
            <li>Provide the actual, unhashed phone number string as the value.</li>
            <li><strong>Highly Recommended Format:</strong> Use <code>'[code] [number]'</code> (e.g., <code>'1 5551234567'</code>). While the SDK sends the raw value in this scenario, this format ensures the best processing and matching on the Zeotap backend.</li>
        </ul>
    ```javascript title="Sending Raw Cell Phone"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        cellno: "1 5551234567" // Provide the actual phone number
    });
    ```

    The `cellno` will be passed in the payload:

    ```json title="Identities in payload" {9-9}
        "events": [
            {
            "event": {
                "eventName": "pageView",
                "eventTimestamp": 1745960123456
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "cellno": "1 5551234567" // Raw cellno sent
            },
            "page": { /* ... */ },
            "version": "1.3.8"
            }
        ]
    ```
    </details>
    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Login ID (Raw)</strong></summary>
    ```javascript title="Sending Raw Login ID"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        loginid: "testuser" // Provide the actual login ID
    });
    ```

    The `loginid` will be passed in the payload:

    ```json title="Identities in payload" {6-6}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "loginid": "testuser" // Raw loginid sent
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

</details>

<!-- Raw Identifiers Section END --------------------->

<!-- Pre hashed Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### Sending Pre-Hashed Identifiers
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 2: Sending Pre-Hashed Identifiers (Implementation Steps)</strong></summary>

<p>In this scenario, your application (e.g., server-side or separate client-side logic) hashes PII *before* sending it to the SDK. You must use specific keys corresponding to the hash type you generated.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    Tell the SDK *not* to hash again and that the values you provide *are* already hashed.

    ```javascript title="SDK Initialization for Pre-Hashed Identifiers"
    import { initialiseZeoCollect } from 'zeo-collect';

    const options = {
        android_write_key: "YOUR_ANDROID_WRITE_KEY",
        ios_write_key: "YOUR_IOS_WRITE_KEY",
        hash_identities: false,      // Optional but good practice: Tell SDK NOT to hash again.
        are_identities_hashed: true  // Crucial: Tells the SDK the values ARE pre-hashed.
    };

    initialiseZeoCollect(options);
    ```
    *This configuration ensures the SDK expects hashed keys and values.*

2.  **Send Identifiers using `setUserIdentities`:**
    Use the specific **hashed keys** that match your hashing algorithm and format, providing the pre-computed hash value.

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Email (Hashed)</strong></summary>

    ```javascript title="Sending Pre-Hashed Email (SHA-256 Lowercase)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        // SHA-256 hash of the lowercase email
        email_sha256_lowercase: "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"
    });
    ```

    The specific hashed email key and value will be passed in the payload:

    ```json title="Identities in payload" {6-6}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "email": { "sha256_lowercase": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2" } // Hashed key/value sent
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Cell Phone (Hashed)</strong></summary>

    ```javascript title="Sending Pre-Hashed Cell Phone (SHA-256 with Country Code)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        // SHA-256 hash of the phone including country code (e.g., '1 5551234567')
        cellno_with_country_code_sha256: "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4",
        // SHA-256 hash of the phone without country code (e.g., '5551234567')
        cellno_without_country_code_sha256: "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"
    });
    ```

    The specific hashed cell phone key and value will be passed in the payload:

    ```json title="Identities in payload" {8-9}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "zi_domain": ".zeotap.com",
                "cellno_with_country_code": {"sha256": "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"}, // Hashed key/value sent
                "cellno_without_country_code": {"sha256": "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"} // Hashed key/value sent
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Login ID (Hashed)</strong></summary>
    ```javascript title="Sending Pre-Hashed Login ID (SHA-256 Lowercase)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        // SHA-256 hash of the lowercase login ID
        loginid_sha256_lowercase: "g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a3b4c5d6e7f8"
    });
    ```

    The specific hashed login ID key and value will be passed in the payload:

    ```json title="Identities in payload" {6-6}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "loginid": {"sha256_lowercase": "g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a3b4c5d6e7f8"} // Hashed key/value sent
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

</details>

<!-- Pre hashed Identifiers Section END --------------------->

<!-- SDK Performs Hashing Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### SDK Performs Hashing
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 3: SDK Performs Hashing (Client-Side Implementation)</strong></summary>

<p>In this scenario, you provide raw PII to the SDK function, but configure the SDK to hash these values *before* sending the data over the network. This enhances privacy by preventing raw PII from leaving the device via SDK network requests.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    Enable the SDK's built-in hashing and confirm that the values you will provide are raw.

    ```javascript title="SDK Initialization for SDK Hashing"
    import { initialiseZeoCollect } from 'zeo-collect';

    const options = {
        android_write_key: "YOUR_ANDROID_WRITE_KEY",
        ios_write_key: "YOUR_IOS_WRITE_KEY",
        hash_identities: true,       // Crucial: Tells the SDK TO perform hashing.
        are_identities_hashed: false // Crucial: Confirms the values you'll provide are RAW.
    };

    initialiseZeoCollect(options);
    ```
    *This configuration activates the SDK's internal hashing mechanism for specific PII keys.*

2.  **Send Identifiers using `setUserIdentities`:**
    Use the standard, recognized **raw keys** for PII and provide the **actual, raw user data**. The SDK will hash `email`, `cellno`, and `loginid` internally before sending.

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Email (Raw - SDK Hashes)</strong></summary>
    ```javascript title="Sending Raw Email (SDK will hash)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        email: "user@example.com" // Provide RAW email
    });
    ```

    The SDK will hash the email (SHA-256 lowercase by default) and send the hashed value in the payload:

    ```json title="Identities in payload (SDK Hashed)" {6-13}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "email": {
                    "sha256_lowercase": "sha256_hash_of_user@example.com", // SDK generated
                    "sha256_uppercase": "sha256_hash_of_USER@EXAMPLE.COM", // SDK generated
                    "md5_lowercase": "md5_hash_of_user@example.com",   // SDK generated
                    "md5_uppercase": "md5_hash_of_USER@EXAMPLE.COM",   // SDK generated
                    "sha1_lowercase": "sha1_hash_of_user@example.com",  // SDK generated
                    "sha1_uppercase": "sha1_hash_of_USER@EXAMPLE.COM"   // SDK generated
                }
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Cell Phone (Raw - SDK Hashes)</strong></summary>
    ```javascript title="Sending Raw Cell Phone (SDK will hash)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        cellno: "1 5551234567" // Provide RAW phone in correct format
    });
    ```

    The SDK will generate multiple hashes (SHA-256, MD5, SHA-1) for each representation (without country code, with country code, E.164) and send them in the payload:

    ```json title="Identities in payload (SDK Hashed - Cellno)" {6-20}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "cellno_without_country_code": { // Hashes of '5551234567'
                    "sha256": "sha256_hash_of_5551234567",
                    "md5": "md5_hash_of_5551234567",
                    "sha1": "sha1_hash_of_5551234567"
                },
                "cellno_with_country_code": { // Hashes of '1 5551234567'
                    "sha256": "sha256_hash_of_15551234567",
                    "md5": "md5_hash_of_15551234567",
                    "sha1": "sha1_hash_of_15551234567"
                },
                "cellphone_number_e164": { // Hashes of '1 5551234567'
                    "sha256": "sha256_hash_of_15551234567",
                    "md5": "md5_hash_of_15551234567",
                    "sha1": "sha1_hash_of_15551234567"
                }
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

    <details style={{marginLeft: "1rem"}}>
    <summary><strong>Login ID (Raw - SDK Hashes)</strong></summary>
    ```javascript title="Sending Raw Login ID (SDK will hash)"
    import { setUserIdentities } from 'zeo-collect';

    setUserIdentities({
        loginid: "UserLogin123" // Provide RAW login ID
    });
    ```

    The SDK will generate multiple standard hashes (SHA-256, MD5, SHA-1, lower/upper case) and send them nested under the `loginid` key in the payload:

    ```json title="Identities in payload (SDK Hashed - Login ID)" {6-12}
        "events": [
            {
             "event": { /* ... */ },
             "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                "loginid": {
                    "sha256_lowercase": "hash_of_userlogin123", // SDK generated
                    "sha256_uppercase": "hash_of_USERLOGIN123", // SDK generated
                    "md5_lowercase": "md5_hash_of_userlogin123",   // SDK generated
                    "md5_uppercase": "md5_hash_of_USERLOGIN123",   // SDK generated
                    "sha1_lowercase": "sha1_hash_of_userlogin123",  // SDK generated
                    "sha1_uppercase": "sha1_hash_of_USERLOGIN123"   // SDK generated
                }
             },
             "page": { /* ... */ }
            }
        ]
    ```
    </details>

</details>

<!-- SDK Performs Hashing Identifiers Section END --------------------->

### PII Identifier Key Reference

| PII Property     | Key to Use if Sending RAW <br/> *(Scenarios 1 & 3)* | Key to Use if Sending PRE-HASHED <br/> *(Scenario 2 Only)*                                                                                                                                                                                             | Description & Important Notes                                                                                                                                                                                                                                                           |
| :--------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email**        | `email`                                             | `email_sha256_lowercase`,`email_sha256_uppercase`, `email_md5_lowercase`, `email_md5_uppercase`, `email_sha1_lowercase`, `email_sha1_uppercase`                                                                                      | User's email address. Use the `email` key for raw input. Use one of the specific hashed keys (like `email_sha256_lowercase`) if you provide a pre-hashed value.                                                                                                                            |
| **Cell Phone**   | `cellno`                                            | `cellno_without_country_code_sha256`, `cellno_without_country_code_md5`, `cellno_without_country_code_sha1`, `cellno_with_country_code_sha256`, `cellno_with_country_code_md5`,`cellno_with_country_code_sha1`     | User's cell phone number. <br/> **For Raw:** Use `cellno`. **Recommended Format:** For best results, use `'[code] [number]'` (e.g., `'1 5551234567'`). <br/> **For Pre-Hashed:** Use the specific key matching your hash type (e.g., `cellno_with_country_code_sha256`). |
| **Login ID**     | `loginid`                                           |  `loginid_sha256_lowercase`,`loginid_sha256_uppercase`, `loginid_md5_lowercase`, `loginid_md5_uppercase`, `loginid_sha1_lowercase`, `loginid_sha1_uppercase` | User's login ID. Use the `loginid` key for raw input. Use one of the specific hashed keys if you provide a pre-hashed value.                                                                                                                                                            |

**How to Use This Table:**

1.  **Identify the PII Property** you want to send (e.g., Email, Cell Phone).
2.  **Determine your Hashing Scenario:**
    *   **Scenario 1 (Raw) or 3 (SDK Hashing):** Look at the "Key to Use if Sending RAW" column. Use that key (e.g., `email`, `cellno`) and provide the *raw* value. Pay attention to the recommended format for `cellno`.
    *   **Scenario 2 (Pre-Hashed):** Look at the "Key to Use if Sending PRE-HASHED" column. Choose the key that matches the *exact* hashing algorithm and format you used (e.g., `email_sha256_lowercase`, `cellno_with_country_code_sha256`) and provide the *pre-computed hash* value.
3.  **Remember:** For a single PII property (like email), you will use *either* the raw key *or* a hashed key in your `setUserIdentities` call, never both simultaneously for the same piece of information.

## Custom Identities

You can include any other key-value pairs representing your own first-party identifiers. These are sent as-is and are not affected by the PII hashing configurations.

```javascript
import { setUserIdentities } from 'zeo-collect';

setUserIdentities({
    // PII Keys (Raw or Hashed depending on scenario)
    email: "user@example.com",
    // Custom Keys
    crmId: "12345-ABC",
    visitorId: "analytics_client_id_here"
});
```

## Set User identities with callbacks

You can also set Identities with Callback function as shown below. The data parameter is an object that contains `status` and `message` which helps to debug the status of the function call. 

```javascript
import { setUserIdentities } from 'zeo-collect';

setUserIdentities({
    // PII Keys (Raw or Hashed depending on scenario)
    email: "user@example.com",
    // Custom Keys
    crmId: "12345-ABC",
    visitorId: "analytics_client_id_here"
}, (data) => {
    // Implement function to handle response
    // {status: "SUCCESS", message: "User identities set successfully"}
});
```

## Removing User identities

This method is used to remove user identities that are set by the `setUserIdentities` method. This will remove all the identities from the storage as well from all subsequent events that made by SDK.

```javascript
import { unSetUserIdentities } from 'zeo-collect';

unSetUserIdentities();
```

## Best Practices

1. **Call Early**: Set user identities as soon as they are available, typically after user login or app launch if the user is already authenticated.

2. **Use Consistent Identifiers**: Ensure the same identifiers are used across all platforms (Web, iOS, Android) for the same user.

3. **Include Multiple Identities**: Provide multiple identity types when available to improve user matching accuracy.

4. **Handle Privacy**: Ensure you have proper user consent before collecting and sending personal identifiers.

## Privacy Considerations

- Always ensure you have user consent before collecting personal identifiers
- Follow local privacy regulations (GDPR, CCPA, etc.)
- Consider hashing sensitive identifiers if required by your privacy policy

## Error Handling

The method will fail silently if:
- The SDK is not initialized
- Invalid data types are provided
- Network connectivity issues occur (data will be queued for later transmission)