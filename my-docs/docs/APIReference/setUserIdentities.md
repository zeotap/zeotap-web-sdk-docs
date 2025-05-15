---
sidebar_position: 1
title: Tracking User Identities
description: Persistently identify users by associating various identifiers with their activity.
---

# Tracking User Identities

This is a core function used to **associate specific identifiers** (like email, phone number, or your own internal IDs) with the current user's session and subsequent activities tracked by the Zeotap SDK.

**Why use it?**

*   **User Stitching:** Allows Zeotap to link user activity across different sessions or devices when a known identifier is provided.
*   **Data Enrichment:** Provides key identifiers needed for potential data enrichment processes.
*   **Audience Building:** Enables creating audiences based on specific known identifiers.

:::tip[Persistence]
Identifiers set using `setUserIdentities()` are persisted (based on your <a href="../FAQs/whereIsDataStamped">`persistenceInCookieStorage`</a> configuration) and automatically included in the `user` node of the payload for all subsequent events sent during the user's session(s).
:::

## Understanding Identifier Types

You can send different categories of identifiers:

1.  **Personal Identifiable Information (PII):** Standardized identifiers like email or phone number. These can be sent raw or pre-hashed.
2.  **Custom Identities:** Your own first-party identifiers (e.g., `crmId`, `loyaltyId`). Hashing configurations don't apply to these.

## Choosing Your Hashing Strategy

Before using `setUserIdentities`, you must decide how PII (like email and phone numbers) will be handled regarding hashing. This choice affects your SDK configuration and the keys you use in the `setUserIdentities` call. Click on each scenario below for details:


<!-- Raw Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### Sending Raw Identifiers
<a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/rawPIIs" target="_blank">View Example</a>
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 1: Sending Raw Identifiers (Implementation Steps)</strong></summary>
<p>This approach involves sending the user's actual, readable identifiers (like email or phone number) directly to the Zeotap SDK. It's often the simplest method as you don't handle hashing yourself; Zeotap's backend takes care of processing.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    To use this scenario, you **must** explicitly tell the SDK *not* to perform hashing itself and confirm that the data you will provide is *not* already hashed. This is done during the `init` call:

    ```javascript title="SDK Initialization for Raw Identifiers"
    window.zeotap.init("YOUR_WRITE_KEY", {
      // --- Configuration for Scenario 1 ---
      hashIdentities: false,      // Crucial: Tells the SDK *NOT* to hash the values itself.
      areIdentitiesHashed: false  // Crucial: Confirms the values you'll provide are *NOT* already hashed.
      
    });
    ```
    *This configuration ensures the SDK passes the raw values you provide directly to the Zeotap backend without attempting client-side hashing.*

2.  **Send Identifiers Using Standard Keys and Raw Values:**
    Once the SDK is initialized correctly for this scenario, call `setUserIdentities`. Use the standard, recognized keys for PII (like `email`, `cellno`, `fpuid`, `loginid`) and provide the **actual, raw user data** as the values. You can also include any custom identifiers.

    <details style={{"marginLeft": "20px" }}>
        <summary><strong>Email (Raw)</strong></summary>

        <p>To send the user's raw email address in Scenario 1:</p>
        <ul>
            <li>Use the standard key: <code>email</code>.</li>
            <li>Provide the actual, unhashed email address string as the value.</li>
        </ul>

        **Implementation Example:**
        ```javascript title="Sending Raw Email"
        window.zeotap.setUserIdentities({
        email: 'jane.doe@email.com' // Provide the actual email address
        });
        ```

        The email will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call:

        ```json title="Identities in payload" {12-12}
            "events": [
                {
                "event": {
                    "id": "m9Tva77fUH4ILi3SPBBVn",
                    "eventName": "goToHome",
                    "eventTimestamp": 1745959356443
                },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "email": "jane.doe@email.com" //raw email sent
                },
                "page": {
                    "path": "/product1",
                    "referrer": "https://test.zeotap.com/",
                    "url": "https://test.zeotap.com/product1"
                },
                "version": "4.4.3"
                }
            ]
        ```

        **Verification:**

        After calling `setUserIdentities` with the raw email:

        1.  **Network Call:**
            *   Open your browser's Developer Tools (usually F12) and go to the **Network** tab.
            *   Trigger an action that sends an event to Zeotap (e.g., a page view, a custom event).
            *   Find the network request going to the Zeotap endpoint (e.g., `spl/fp?`).
            *   Inspect the **Payload** or **Request Body** of that request.
            *   Look for a `user`. You should see the key-value pair `"email": "jane.doe@email.com"` (the raw email you sent). Since `hashIdentities` is `false`, the SDK sends the value as-is.

        2.  **Browser Storage:**
            *   Go to the **Application** tab in your browser's Developer Tools.
            *   Check either **Session Storage** or **Cookies**, depending on your `persistenceInCookieStorage` configuration (default is `false`, meaning Session Storage).
            *   Look for keys related to Zeotap (e.g., `zpstorage*...*identities).
            *   Inspect the stored Base64 encoded JSON object. You should find the `email` key with the raw value `"jane.doe@email.com"` stored as part of the user's persisted identity profile.

    </details>
       <details style={{"marginLeft": "20px" }}>
        <summary><strong>Cell Phone (Raw)</strong></summary>

        <p>To send the user's raw cell phone number in Scenario 1:</p>
        <ul>
            <li>Use the standard key: <code>cellno</code>.</li>
            <li>Provide the actual, unhashed phone number string as the value.</li>
            <li><strong>Highly Recommended Format:</strong> Use <code>'[code] [number]'</code> (e.g., <code>'1 5551234567'</code>). While the SDK sends the raw value in this scenario, this format ensures the best processing and matching on the Zeotap backend.</li>
        </ul>

        **Implementation Example:**
        ```javascript title="Sending Raw Cell Phone (Recommended Format)"
        window.zeotap.setUserIdentities({
          cellno: '1 5551234567' // Provide the actual phone number
        });
        ```
        <p><em>Note: The <code>cellno_cc</code> key is deprecated. Always use <code>cellno</code> for raw phone numbers. See <a href="../FAQs/howToSendCellno">Cellno Handling Details</a> for more information on formatting implications, especially for other scenarios.</em></p>


        The `cellno` will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call, within the `user` object:

        ```json title="Identities in payload" {12-12}
            "events": [
                {
                "event": {
                    "id": "k8Lwb88gVI5JMj4TQCCWo",
                    "eventName": "pageView",
                    "eventTimestamp": 1745960123456
                },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "cellno": "1 5551234567" // Raw cellno sent
                },
                "page": {
                    "path": "/contact",
                    "referrer": "https://test.zeotap.com",
                    "url": "https://test.zeotap.com/contact"
                },
                "version": "4.4.3"
                }
            ]
        ```

        **Verification:**

        After calling `setUserIdentities` with the raw cell phone number:

        1.  **Network Call:**
            *   Open your browser's Developer Tools (usually F12) and go to the **Network** tab.
            *   Trigger an action that sends an event to Zeotap (e.g., a page view, a custom event).
            *   Find the network request going to the Zeotap endpoint (e.g., `spl/fp?`).
            *   Inspect the **Payload** or **Request Body** of that request.
            *   Look for a `user` object. You should see the key-value pair `"cellno": "1 5551234567"` (the raw phone number you sent), as highlighted above. Since `hashIdentities` is `false`, the SDK sends the value as-is.

        2.  **Browser Storage:**
            *   Go to the **Application** tab in your browser's Developer Tools.
            *   Check either **Local Storage** or **Cookies**, depending on your `persistenceInCookieStorage` configuration (default is `false`, meaning Local Storage).
            *   Look for keys related to Zeotap (e.g., `zpstorage*...*identities` or similar).
            *   Inspect the stored value (it might be Base64 encoded). Once decoded (if necessary), you should find the `cellno` key with the raw value `"1 5551234567"` stored as part of the user's persisted identity profile.

    </details>

    
       <details style={{"marginLeft": "20px" }}>
        <summary><strong>Login ID (Raw)</strong></summary>

        <p>To send the user's raw login ID in Scenario 1:</p>
        <ul>
            <li>Use the standard key: <code>loginid</code>.</li>
            <li>Provide the actual, unhashed login identifier string as the value.</li>
        </ul>

        **Implementation Example:**
        ```javascript title="Sending Raw Login ID"
        window.zeotap.setUserIdentities({
          loginid: 'janedoe99' // Provide the actual login ID
        });
        ```

        The `loginid` will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call, within the `user` object:

        ```json title="Identities in payload" {12-12}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "loginid": "janedoe99" // Raw loginid sent
                },
                 { /* ... */ }
                }
            ]
        ```

        **Verification:**

        After calling `setUserIdentities` with the raw login ID:

        1.  **Network Call:**
            *   Open your browser's Developer Tools (usually F12) and go to the **Network** tab.
            *   Trigger an action that sends an event to Zeotap (e.g., a page view, a custom event after login).
            *   Find the network request going to the Zeotap endpoint (e.g., `spl/fp?`).
            *   Inspect the **Payload** or **Request Body** of that request.
            *   Look for a `user` object. You should see the key-value pair `"loginid": "janedoe99"` (the raw login ID you sent), as highlighted above. Since `hashIdentities` is `false`, the SDK sends the value as-is.

        2.  **Browser Storage:**
            *   Go to the **Application** tab in your browser's Developer Tools.
            *   Check either **Local Storage** or **Cookies**, depending on your `persistenceInCookieStorage` configuration (default is `false`, meaning Local Storage).
            *   Look for keys related to Zeotap (e.g., `zpstorage*...*identities` or similar).
            *   Inspect the stored value (it might be Base64 encoded). Once decoded (if necessary), you should find the `loginid` key with the raw value `"janedoe99"` stored as part of the user's persisted identity profile.

    </details>


</details>

<!-- Raw Identifiers Section END --------------------->



<!-- Pre hashed Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### Sending Pre-Hashed Identifiers
<a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/preHashedPIIs" target="_blank">View Example</a>
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 2: Sending Pre-Hashed Identifiers (Implementation Steps)</strong></summary>


<p>In this scenario, your application (e.g., server-side or separate client-side logic) hashes PII *before* sending it to the SDK. You must use specific keys corresponding to the hash type you generated.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    Tell the SDK *not* to hash again and that the values you provide *are* already hashed.

    ```javascript title="SDK Initialization for Pre-Hashed Identifiers"
    window.zeotap.init("YOUR_WRITE_KEY", {
      // --- Configuration for Scenario 2 ---
      hashIdentities: false,      // Optional but good practice: Tell SDK NOT to hash again.
      areIdentitiesHashed: true   // Crucial: Tells the SDK the values ARE pre-hashed.
      
    });
    ```
    *This configuration ensures the SDK expects hashed keys and values.*

2.  **Send Identifiers using `setUserIdentities`:**
    Use the specific **hashed keys** that match your hashing algorithm and format, providing the pre-computed hash value. Expand the relevant PII type below:

    <details style={{"marginLeft": "20px" }}>
        <summary><strong>Email (Hashed)</strong></summary>

        <p>To send a pre-hashed email address in Scenario 2:</p>
        <ul>
            <li>Use the key corresponding exactly to your hash method and case (e.g., <code>email_sha256_lowercase</code>, <code>email_md5_uppercase</code>).</li>
            <li>Provide the pre-computed hash string as the value.</li>
        </ul>
        <p><em>Supported hash types: SHA-256, MD5, SHA-1 (lowercase/uppercase variants).</em></p>

        **Implementation Example:**
        ```javascript title="Sending Pre-Hashed Email (SHA-256 Lowercase)"
        // Assume 'hashedEmailValue' contains the SHA-256 hash of the lowercase email
        const hashedEmailValue = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2';

        window.zeotap.setUserIdentities({
          email_sha256_lowercase: hashedEmailValue
        });
        ```

        The specific hashed email key and value will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call:

        ```json title="Identities in payload" {8-8}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "email": { "sha256_lowercase": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2" } // Hashed key/value sent
                },
                 { /* ... */ },
                }
            ]
        ```

        **Verification:**

        After calling `setUserIdentities` with the pre-hashed email:

        1.  **Network Call:**
            *   Open Developer Tools (F12) -> **Network** tab.
            *   Trigger an event. Find the request to the Zeotap endpoint (e.g., `spl/fp?`).
            *   Inspect the **Payload**. Look for the `user` object. You should see the specific PII key (e.g., `"email"`) and the corresponding hash value you provided.

        2.  **Browser Storage:**
            *   Go to the **Application** tab -> **Local Storage** or **Cookies** (based on `persistenceInCookieStorage`).
            *   Find the Zeotap storage key (e.g., `zpstorage*...*identities`).
            *   Inspect the stored value (decode if needed). You should find the specific hashed key (e.g., `email_sha256_lowercase`) and its hash value persisted.

    </details>

    <details style={{"marginLeft": "20px" }}>
        <summary><strong>Cell Phone (Hashed)</strong></summary>

        <p>To send a pre-hashed cell phone number in Scenario 2:</p>
        <ul>
            <li>Use the key matching exactly how you hashed the number (e.g., <code>cellno_with_country_code_sha256</code>, <code>cellno_without_country_code_md5</code>).</li>
            <li>Provide the pre-computed hash string as the value.</li>
        </ul>
        <p><em>It's crucial to use the key that reflects your hashing source (with/without country code, E.164) and algorithm (SHA-256, MD5, SHA-1). See <a href="../FAQs/howToSendCellno">Cellno Handling Details</a>.</em></p>

        **Implementation Example:**
        ```javascript title="Sending Pre-Hashed Cell Phone (SHA-256 with Country Code)"
        // Assume 'hashedPhoneValue' contains the SHA-256 hash of the phone including country code (e.g., '15551234567')
        const hashedPhoneValue = 'f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4';

        window.zeotap.setUserIdentities({
          cellno_with_country_code_sha256: hashedPhoneValue
        });
        ```

        The specific hashed cell phone key and value will be passed in the payload:

        ```json title="Identities in payload" {8-8}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "cellno_with_country_code": {"sha256": "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"} // Hashed key/value sent
                },
                 { /* ... */ },
                }
            ]
        ```

        **Verification:**

        1.  **Network Call:** Check the payload for the specific PII key (e.g., `"cellno_with_country_code"`) and the hash value.
        2.  **Browser Storage:** Check the persisted identity profile for the specific hashed key and value.

    </details>


    <details style={{"marginLeft": "20px" }}>
        <summary><strong>Login ID (Hashed)</strong></summary>

        <p>To send a pre-hashed login ID in Scenario 2:</p>
        <ul>
            <li>Use the key corresponding exactly to your hash method and case (e.g., <code>loginid_sha256_lowercase</code>, <code>loginid_md5_uppercase</code>).</li>
            <li>Provide the pre-computed hash string as the value.</li>
        </ul>
        <p><em>Supported hash types: SHA-256, MD5, SHA-1 (lowercase/uppercase variants).</em></p>

        **Implementation Example:**
        ```javascript title="Sending Pre-Hashed Login ID (SHA-256 Lowercase)"
        // Assume 'hashedLoginIdValue' contains the SHA-256 hash of the lowercase login ID
        const hashedLoginIdValue = 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a3b4c5d6e7f8';

        window.zeotap.setUserIdentities({
          loginid_sha256_lowercase: hashedLoginIdValue
        });
        ```

        The specific hashed login ID key and value will be passed in the payload:

        ```json title="Identities in payload" {7-7}
            "events": [
                { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    {"loginid":{"sha256_lowercase":"g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2a3b4c5d6e7f8"}} // Hashed key/value sent
                },
                { /* ... */ }
            ]
        ```

        **Verification:**

        1.  **Network Call:** Check the payload for the specific PII key (e.g., `"loginide"`) and the hash value.
        2.  **Browser Storage:** Check the persisted profile for the specific hashed key and value.

    </details>

</details>

<!-- Pre hashed Identifiers Section END --------------------->



<!-- SDK Performs Hashing Identifiers Section START --------------------->
<div style={{"display": "flex", "alignItems": "baseline", "gap": "15px"}}>
### SDK Performs Hashing
<a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/PIIshasingBySDK" target="_blank">View Example</a>
</div>
<details style={{marginLeft: "1rem"}}>
<summary><strong>Scenario 3: SDK Performs Hashing (Client-Side Implementation)</strong></summary>


<p>In this scenario, you provide raw PII to the SDK function, but configure the SDK to hash these values *before* sending the data over the network. This enhances privacy by preventing raw PII from leaving the browser via SDK network requests.</p>

**Implementation Steps:**

1.  **Configure the SDK Initialization:**
    Enable the SDK's built-in hashing and confirm that the values you will provide are raw.

    ```javascript title="SDK Initialization for SDK Hashing"
    window.zeotap.init("YOUR_WRITE_KEY", {
      // --- Configuration for Scenario 3 ---
      hashIdentities: true,       // Crucial: Tells the SDK TO perform hashing.
      areIdentitiesHashed: false  // Crucial: Confirms the values you'll provide are RAW.
    });
    ```
    *This configuration activates the SDK's internal hashing mechanism for specific PII keys.*

2.  **Send Identifiers using `setUserIdentities`:**
    Use the standard, recognized **raw keys** for PII and provide the **actual, raw user data**. The SDK will hash `email`, `cellno`, and `loginid` internally before sending. Expand the relevant PII type below:

    <details style={{"marginLeft": "20px"}}>
        <summary><strong>Email (Raw - SDK Hashes)</strong></summary>

        <p>To have the SDK hash the user's email address in Scenario 3:</p>
        <ul>
            <li>Use the standard key: <code>email</code>.</li>
            <li>Provide the actual, unhashed email address string as the value.</li>
        </ul>

        **Implementation Example:**
        ```javascript title="Sending Raw Email (SDK will hash)"
        window.zeotap.setUserIdentities({
          email: 'user@example.com' // Provide RAW email
        });
        ```

        The SDK will hash the email (SHA-256 lowercase by default) and send the hashed value in the payload of the ```https://spl.zeotap.com/fp?``` call:

        ```json title="Identities in payload (SDK Hashed)" {8-15}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "email": {
                        "sha256_lowercase": "sha256_hash_of_user@example.com", // SDK generated
                        "sha256_uppercase": "sha256_hash_of_USER@EXAMPLE.COM", // SDK generated
                        "md5_lowercase": "md5_hash_of_user@example.com",   // SDK generated
                        "md5_uppercase": "md5_hash_of_USER@EXAMPLE.COM",   // SDK generated
                        "sha1_lowercase": "sha1_hash_of_user@example.com",  // SDK generated
                        "sha1_uppercase": "sha1_hash_of_USER@EXAMPLE.COM"   // SDK generated
                    }
                },
                 { /* ... */ }
                }
            ]
        ```

        **Verification:**

        After calling `setUserIdentities` with the raw email:

        1.  **Network Call:**
            *   Open Developer Tools (F12) -> **Network** tab.
            *   Trigger an event. Find the request to the Zeotap endpoint (e.g., `spl/fp?`).
            *   Inspect the **Payload**. Look for the `user` object. You should see the `"email"` key containing an object with **multiple** SDK-generated hash key-value pairs (e.g., `"sha256_lowercase": "..."`, `"sha256_uppercase": "..."`, `"md5_lowercase": "..."`, etc.), as highlighted above. You should **not** see the raw email address in the network payload under these keys.

        2.  **Browser Storage:**
            *   Go to the **Application** tab -> **Local Storage** or **Cookies** (based on `persistenceInCookieStorage`).
            *   Find the Zeotap storage key (e.g., `zpstorage*...*identities`).
            *   Inspect the stored value (decode if needed). You should find the **raw** `email` key and the original value you provided (e.g., `"User@Example.COM"`) stored, as persistence typically happens with the input provided to the function.


    </details>

    <details style={{"marginLeft": "20px"}}>
        <summary><strong>Cell Phone (Raw - SDK Hashes)</strong></summary>

        <p>To have the SDK hash the user's cell phone number in Scenario 3:</p>
        <ul>
            <li>Use the standard key: <code>cellno</code>.</li>
            <li>Provide the actual, unhashed phone number string as the value.</li>
            <li><strong>CRITICAL Format:</strong> Use <code>'[code] [number]'</code> (e.g., <code>'1 5551234567'</code>). This specific format is **essential** for the SDK to correctly identify the country code and national number, enabling it to generate multiple required hash types accurately.</li>
        </ul>
        <p><em>Using other formats (like `1555...` or just `555...`) will lead to incorrect or incomplete hashes being generated by the SDK. See <a href="../FAQs/howToSendCellno">Cellno Handling Details</a>.</em></p>

        **Implementation Example:**
        ```javascript title="Sending Raw Cell Phone (SDK will hash - Format is CRITICAL)"
        window.zeotap.setUserIdentities({
          cellno: '1 5551234567' // Provide RAW phone in '[code] [number]' format
        });
        ```

        The SDK will generate multiple hashes (SHA-256, MD5, SHA-1) for each representation (without country code, with country code, E.164) based on the correctly formatted input and send them in the payload:

        ```json title="Identities in payload (SDK Hashed - Cellno Complete Example)" {8-22}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "cellno_without_country_code": { // Hashes of '5551234567'
                        "sha256": "sha256_hash_of_5551234567",
                        "md5": "md5_hash_of_5551234567",
                        "sha1": "sha1_hash_of_5551234567"
                    },
                    "cellno_with_country_code": { // Hashes of '15551234567'
                        "sha256": "sha256_hash_of_15551234567",
                        "md5": "md5_hash_of_15551234567",
                        "sha1": "sha1_hash_of_15551234567"
                    },
                    "cellphone_number_e164": { // Hashes of '15551234567'
                        "sha256": "sha256_hash_of_15551234567",
                        "md5": "md5_hash_of_15551234567",
                        "sha1": "sha1_hash_of_15551234567"
                    }
                },
                 { /* ... */ }
                }
            ]
        ```
        *(Note: Hash values shown are placeholders representing the different hashes generated by the SDK from '1 5551234567').*

        **Verification:**

        1.  **Network Call:**
            *   Check the **Payload** of the Zeotap network request (e.g., `spl/fp?`).
            *   Look for the `user` object. You should see the keys for each representation (`"cellno_without_country_code"`, `"cellno_with_country_code"`, `"cellphone_number_e164"`). Each of these should contain a nested object with keys for `"sha256"`, `"md5"`, and `"sha1"` and their corresponding hash values, as highlighted above. You should **not** see the raw phone number (`1 5551234567`) in the payload for these keys.

        2.  **Browser Storage:**
            *   Check the persisted identity profile in **Local Storage** / **Cookies** (based on `persistenceInCookieStorage`).
            *   You should find the **raw** `cellno` key and value (`"1 5551234567"`) stored.

    </details>



    <details style={{"marginLeft": "20px"}}>
        <summary><strong>Login ID (Raw - SDK Hashes)</strong></summary>

        <p>To have the SDK hash the user's login ID in Scenario 3:</p>
        <ul>
            <li>Use the standard key: <code>loginid</code>.</li>
            <li>Provide the actual, unhashed login identifier string as the value. The SDK handles case variations for different hash types.</li>
        </ul>

        **Implementation Example:**
        ```javascript title="Sending Raw Login ID (SDK will hash)"
        window.zeotap.setUserIdentities({
          loginid: 'UserLogin123' // Provide RAW login ID (case doesn't matter for input)
        });
        ```

        The SDK will generate multiple standard hashes (SHA-256, MD5, SHA-1, lower/upper case) and send them nested under the `loginid` key in the payload:

        ```json title="Identities in payload (SDK Hashed - Login ID)" {8-14}
            "events": [
                {
                 { /* ... */ },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "loginid": {
                        "sha256_lowercase": "hash_of_userlogin123", // SDK generated
                        "sha256_uppercase": "hash_of_USERLOGIN123", // SDK generated
                        "md5_lowercase": "md5_hash_of_userlogin123",   // SDK generated
                        "md5_uppercase": "md5_hash_of_USERLOGIN123",   // SDK generated
                        "sha1_lowercase": "sha1_hash_of_userlogin123",  // SDK generated
                        "sha1_uppercase": "sha1_hash_of_USERLOGIN123"   // SDK generated
                    }
                },
                 { /* ... */ }
                }
            ]
        ```
        *(Note: Hash values shown are placeholders representing the different hashes generated by the SDK from the input login ID).*

        **Verification:**

        1.  **Network Call:**
            *   Check the **Payload** of the Zeotap network request (e.g., `spl/fp?`).
            *   Look for the `user` object. You should see the `"loginid"` key containing an object with **multiple** SDK-generated hash key-value pairs (e.g., `"sha256_lowercase": "..."`, `"sha256_uppercase": "..."`, etc.), as highlighted above. You should **not** see the raw login ID in the network payload under these keys.

        2.  **Browser Storage:**
            *   Check the persisted identity profile in **Local Storage** / **Cookies** (based on `persistenceInCookieStorage`).
            *   You should find the **raw** `loginid` key and the original value you provided (e.g., `"UserLogin123"`) stored.

    </details>

</details>


<!-- SDK Performs Hashing Identifiers Section END --------------------->




### PII Identifier Key Reference

| PII Property     | Key to Use if Sending RAW <br/> *(Scenarios 1 & 3)* | Key to Use if Sending PRE-HASHED <br/> *(Scenario 2 Only)*                                                                                                                                                                                             | Description & Important Notes                                                                                                                                                                                                                                                           |
| :--------------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **First-Party ID** | `fpuid`                                             | `fpuid`                                                                                                                                                                                                                                                 | Your primary first-party user ID (e.g., CRM ID, DB ID). Typically sent raw using the `fpuid` key regardless of the hashing scenario for other PII.                                                                                                                                         |
| **Email**        | `email`                                             | `email_sha256_lowercase`,`email_sha256_uppercase`, `email_md5_lowercase`, `email_md5_uppercase`, `email_sha1_lowercase`, `email_sha1_uppercase`                                                                                      | User's email address. Use the `email` key for raw input. Use one of the specific hashed keys (like `email_sha256_lowercase`) if you provide a pre-hashed value.                                                                                                                            |
| **Cell Phone**   | `cellno`                                            | `cellno_without_country_code_sha256`, `cellno_without_country_code_md5`, `cellno_without_country_code_sha1`, `cellno_with_country_code_sha256`, `cellno_with_country_code_md5`,`cellno_with_country_code_sha1`     | User's cell phone number. <br/> **For Raw:** Use `cellno`. **Recommended Format:** For best results, use `'[code] [number]'` (e.g., `'1 5551234567'`).** See Cellno Handling Details for specifics. <br/> **For Pre-Hashed:** Use the specific key matching your hash type (e.g., `cellno_with_country_code_sha256`). <br/> *Note: `cellno_cc` for raw is deprecated, instead use `cellno`.* |
| **Login ID**     | `loginid`                                           |  `loginid_sha256_lowercase`,`loginid_sha256_uppercase`, `loginid_md5_lowercase`, `loginid_md5_uppercase`, `loginid_sha1_lowercase`, `loginid_sha1_uppercase` | User's login ID. Use the `loginid` key for raw input. Use one of the specific hashed keys if you provide a pre-hashed value.                                                                                                                                                            |


:::warning Depracated
cellno_cc is depreacted. It is recommened to use cellno for all cellphone number related scenarios.
:::

**How to Use This Table:**

1.  **Identify the PII Property** you want to send (e.g., Email, Cell Phone).
2.  **Determine your Hashing Scenario:**
    *   **Scenario 1 (Raw) or 3 (SDK Hashing):** Look at the "Key to Use if Sending RAW" column. Use that key (e.g., `email`, `cellno`) and provide the *raw* value. Pay attention to the recommended format for `cellno`.
    *   **Scenario 2 (Pre-Hashed):** Look at the "Key to Use if Sending PRE-HASHED" column. Choose the key that matches the *exact* hashing algorithm and format you used (e.g., `email_sha256_lowercase`, `cellno_with_country_code_sha256`) and provide the *pre-computed hash* value.
3.  **Remember:** For a single PII property (like email), you will use *either* the raw key *or* a hashed key in your `setUserIdentities` call, never both simultaneously for the same piece of information.




## Custom Identities

You can include any other key-value pairs representing your own first-party identifiers. These are sent as-is and are not affected by the PII hashing configurations.

```javascript
window.zeotap.setUserIdentities({
  // PII Keys (Raw or Hashed depending on scenario)
  email: 'user@example.com',
  // Custom Keys
  crmId: '12345-ABC',
  loyaltyTier: 'Gold',
  visitorId: 'ga_client_id_here'
});
```





