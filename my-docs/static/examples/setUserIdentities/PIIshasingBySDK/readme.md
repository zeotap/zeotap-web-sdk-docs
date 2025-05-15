# README: setUserIdentities_needHashing_Ex.html Example

## Purpose

This HTML file demonstrates **Scenario 3: SDK Performs Hashing** using the Zeotap Web SDK's `setUserIdentities` function. It shows how to send raw (unhashed) Personal Identifiable Information (PII) like email addresses or phone numbers to the Zeotap SDK and have the SDK perform the SHA-256 hashing client-side before sending the data to the backend.

## Key Concepts Demonstrated

*   **SDK Initialization for SDK-Side Hashing:** Configuring the SDK using `window.zeotap.init` with the specific options required for this scenario:
    *   `hashIdentities: true`: This is crucial. It instructs the SDK to hash the PII values you provide.
    *   `areIdentitiesHashed: false`: This confirms to the SDK that the input values are raw and need hashing.
*   **Calling `setUserIdentities` with Raw PII Data:** Using standard PII keys like `email`, `cellno`, `loginid` and providing the raw, unhashed string values.
*   **SDK's Internal Hashing:** The SDK will take the raw PII, normalize it (e.g., lowercase emails, format phone numbers), and then generate SHA-256 hashes (and potentially other hash types like MD5, SHA-1 for different cases) internally.
*   **Network Payload Verification:** Observing the network requests made by the SDK to confirm that the *hashed* PII values are being sent to the backend under the appropriate hashed key structures, not the raw values.
*   **Browser Storage:** Understanding that the raw PII is **not** stored in browser storage (Session Storage/Cookies). The SDK will store its own generated identifiers (like ZI, ZS) and potentially the *hashed* versions of the PII if configured for certain persistence scenarios, but never the raw input PII.

## How to Use

1.  **Open the File:** Open `setUserIdentities_needHashing_Ex.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK (if `enableLogging` is true or `logLevel` is 'debug'/'info').
    *   Navigate to the **Network** tab to inspect outgoing requests. You might want to filter for requests containing `zeotap.com` or `spl/fp?`.
    *   Navigate to the **Application** tab (or Storage tab) to inspect **Session Storage** (or **Cookies** if `persistenceInCookieStorage: true` is set).
3.  **Click the Button:** Click the "Set Raw User Identities (SDK to Hash)" button (or similar button) on the page. This will trigger the `window.zeotap.setUserIdentities` call with raw PII.

## Expected Behavior & Verification

*   **Console:** You might see logs indicating the `setUserIdentities` call was made with the raw identifiers.
*   **Network Tab:** After clicking the button, look for a network request made to the Zeotap endpoint (e.g., `https://spl.zeotap.com/fp?...`).
    *   Inspect the **Payload** (or Request Body) of this request.
    *   Within the JSON payload, find the `user` object.
    *   You should see the PII keys (e.g., `email`, `cellno`) with nested objects containing various hash types (e.g., `sha256_lowercase`, `md5_lowercase`) and their corresponding **SDK-generated hashed values**. The original raw PII should **not** be present in the network payload. For example:
        ```json
        "user": {
            // ... other IDs like zs, zi ...
            "email": {
                "sha256_lowercase": "sdk_generated_sha256_hash_of_raw_email_lowercase",
                "sha256_uppercase": "sdk_generated_sha256_hash_of_raw_email_uppercase",
                "md5_lowercase": "sdk_generated_md5_hash_of_raw_email_lowercase",
                // ... other hash types
            },
            "cellno": {
                // ... similar hashed structures for cellno
            }
            // ...
        }
        ```
*   **Application Tab (Session Storage):**
    *   Look for an item with a key like `zpstorage_ids_...` or `zeotap_ids_...`.
    *   The value might be Base64 encoded. If so, decode it.
    *   The decoded JSON should **not** contain the raw PII you sent. It will contain SDK-generated identifiers (ZI, ZS) and potentially the *hashed* versions of the PII if the SDK is configured to persist them, but **never the raw input PII**.

## Code Highlights (`setUserIdentities_needHashing_Ex.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```javascript
    window.zeotap.init("YOUR_WRITE_KEY", { // Replace with your actual Write Key
      hashIdentities: true,       // Crucial: Tells the SDK TO HASH the input.
      areIdentitiesHashed: false, // Crucial: Confirms the input IS RAW.
      // ... other potential configurations ...
    });
    ```
2.  **`setUserIdentities` Call:**
    ```javascript
    function setRawIdentitiesForSDKHashing() {
      const rawEmail = 'test.user.sdk.hash@example.com';
      const rawPhoneNumber = '15557890123'; // Example with country code

      const identities = {
        email: rawEmail,
        cellno: rawPhoneNumber,
        loginid: 'sdkHashUser123', // Login IDs are typically not hashed by default unless specific keys are used
        fpuid: 'sdk-hash-user-789'
        // Add other custom IDs if needed
      };
      console.log('Calling setUserIdentities with raw data for SDK hashing:', identities);
      window.zeotap.setUserIdentities(identities);
    }
    ```

## Related Documentation

*   Tracking User Identities (`setUserIdentities`) Main Documentation
*   PII Hashing Configuration (`hashIdentities` & `areIdentitiesHashed`)
*   Cell Phone Number Formatting and Hashing Details
