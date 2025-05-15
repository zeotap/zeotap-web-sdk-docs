# README: setUserIdentities_preHashedPII_Ex.html Example

## Purpose

This HTML file demonstrates **Scenario 2: Sending Pre-Hashed Identifiers** using the Zeotap Web SDK's `setUserIdentities` function. It shows how to send Personal Identifiable Information (PII) like email addresses or phone numbers that have already been hashed by your application (e.g., on your server-side) to the Zeotap SDK.

## Key Concepts Demonstrated

*   **SDK Initialization for Pre-Hashed PII:** Configuring the SDK using `window.zeotap.init` with the specific options required for this scenario:
    *   `areIdentitiesHashed: true`: This is crucial. It informs the SDK that the identifier values you are providing are already hashed.
    *   `hashIdentities: false`: While often set to `false` in this scenario to prevent any potential re-hashing by the SDK, the primary flag is `areIdentitiesHashed: true`.
*   **Calling `setUserIdentities` with Hashed Data:** Using specific PII keys that denote the hashing algorithm and case (e.g., `email_sha256_lowercase`, `cellno_with_country_code_sha256`) and providing the pre-computed hash strings as values.
*   **Network Payload Verification:** Observing the network requests made by the SDK to confirm that the hashed PII values are being sent correctly under the appropriate hashed key structures.
*   **Browser Storage:** Seeing how the pre-hashed identifiers are persisted in browser storage (Session Storage by default).

## How to Use

1.  **Open the File:** Open `setUserIdentities_preHashedPII_Ex.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK (if `enableLogging` is true or `logLevel` is 'debug'/'info').
    *   Navigate to the **Network** tab to inspect outgoing requests. You might want to filter for requests containing `zeotap.com` or `spl/fp?`.
    *   Navigate to the **Application** tab (or Storage tab) to inspect **Session Storage** (or **Cookies** if `persistenceInCookieStorage: true` is set).
3.  **Click the Button:** Click the "Set Pre-Hashed User Identities" button (or similar button) on the page. This will trigger the `window.zeotap.setUserIdentities` call.

## Expected Behavior & Verification

*   **Console:** You might see logs indicating the `setUserIdentities` call was made with the hashed identifiers.
*   **Network Tab:** After clicking the button, look for a network request made to the Zeotap endpoint (e.g., `https://spl.zeotap.com/fp?...`).
    *   Inspect the **Payload** (or Request Body) of this request.
    *   Within the JSON payload, find the `user` object.
    *   You should see the PII keys (e.g., `email`, `cellno`) with nested objects containing the specific hash type and the corresponding hashed value you provided. For example:
        ```json
        "user": {
            // ... other IDs like zs, zi ...
            "email": {
                "sha256_lowercase": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2"
            },
            "cellno_with_country_code": {
                "sha256": "f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4"
            }
            // ...
        }
        ```
*   **Application Tab (Session Storage):**
    *   Look for an item with a key like `zpstorage_ids_...` or `zeotap_ids_...`.
    *   The value would be Base64 encoded. So, decode it.
    *   The decoded JSON should contain the **hashed keys and their corresponding hashed values** that were passed to `setUserIdentities`, confirming they are being persisted. For example, you'd see `email_sha256_lowercase: "a1b2c3d4..."`.

## Code Highlights (`setUserIdentities_preHashedPII_Ex.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```javascript
    window.zeotap.init("YOUR_WRITE_KEY", { // Replace with your actual Write Key
      areIdentitiesHashed: true, // Crucial: Tells the SDK the values ARE pre-hashed.
      hashIdentities: false,     // Recommended: Tells the SDK NOT to hash again.
      // ... other potential configurations ...
    });
    ```
2.  **`setUserIdentities` Call:**
    ```javascript
    function setPreHashedIdentities() {
      // These values would typically be generated server-side or through a secure hashing process.
      const hashedEmail = 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2'; // Example SHA-256 lowercase hash
      const hashedPhoneNumber = 'f6e5d4c3b2a1a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4'; // Example SHA-256 hash of phone with country code

      const identities = {
        email_sha256_lowercase: hashedEmail,
        cellno_with_country_code_sha256: hashedPhoneNumber,
        fpuid: 'prehashed-user-456'
        // Add other custom IDs if needed
      };
      console.log('Calling setUserIdentities with pre-hashed data:', identities);
      window.zeotap.setUserIdentities(identities);
    }
    ```

## Related Documentation

*   Tracking User Identities (`setUserIdentities`) Main Documentation
*   PII Hashing Configuration (`hashIdentities` & `areIdentitiesHashed`)
*   Cell Phone Number Formatting and Hashing Details
