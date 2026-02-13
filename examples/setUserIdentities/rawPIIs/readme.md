# README: setUserIdentities_rawEx.html Example

## Purpose

This HTML file demonstrates **Scenario 1: Sending Raw Identifiers** using the Zeotap Web SDK's `setUserIdentities` function. It shows the simplest approach where you provide raw, unhashed Personal Identifiable Information (PII) like email addresses or phone numbers directly to the SDK, letting the Zeotap backend handle subsequent processing and hashing.

## Key Concepts Demonstrated

*   **SDK Initialization for Raw PII:** Configuring the SDK using `window.zeotap.init` with the specific options required for Scenario 1:
    *   `hashIdentities: false` (Tells the SDK *not* to perform client-side hashing).
    *   `areIdentitiesHashed: false` (Confirms that the values being provided are *not* already hashed).
*   **Calling `setUserIdentities` with Raw Data:** Using standard PII keys (`email`, `cellno`, `loginid`, `fpuid`) and providing the actual, readable user data as string values.
*   **Network Payload Verification:** Observing the network requests made by the SDK to confirm that the raw PII values are being sent as provided.
*   **Browser Storage:** Seeing how the raw identities are persisted in browser storage (Local Storage by default).

## How to Use

1.  **Open the File:** Open `setUserIdentities_rawEx.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK (if `enableLogging` is true or `logLevel` is 'debug'/'info').
    *   Navigate to the **Network** tab to inspect outgoing requests. You might want to filter for requests containing `zeotap.com` or `spl/fp?`.
    *   Navigate to the **Application** tab (or Storage tab) to inspect **Local Storage** (or **Cookies** if `persistenceInCookieStorage: true` is set).
3.  **Click the Button:** Click the "Set Raw User Identities" button (or similar button) on the page. This will trigger the `window.zeotap.setUserIdentities` call.

## Expected Behavior & Verification

*   **Console:** You might see logs indicating the `setUserIdentities` call was made.
*   **Network Tab:** After clicking the button, look for a network request made to the Zeotap endpoint (e.g., `https://spl.zeotap.com/fp?...`).
    *   Inspect the **Payload** (or Request Body) of this request.
    *   Within the JSON payload, find the `user` object.
    *   You should see the **raw keys and raw values** you provided, for example:
        ```jsxon
        "user": {
            // ... other IDs like zs, zi ...
            "email": "test.user@example.com",
            "cellno": "1 5551234567",
            "fpuid": "raw-user-123"
            // ...
        }
        ```
    *   Crucially, you will **not** see hashed values or nested hash objects for `email`, `cellno`, etc., in this scenario's network payload.
*   **Application Tab (Local Storage):**
    *   Look for an item with a key like `zpstorage_ids_...` or `zeotap_ids_...`.
    *   The value might be Base64 encoded. If so, decode it.
    *   The decoded JSON should contain the **raw keys and raw values** that were passed to `setUserIdentities`, confirming they are being persisted.

## Code Highlights (`setUserIdentities_rawEx.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```jsx
    window.zeotap.init("YOUR_WRITE_KEY", { // Replace with your actual Write Key
      hashIdentities: false,      // Explicitly disable SDK hashing
      areIdentitiesHashed: false, // Confirm input is raw
      // ... other potential configurations ...
    });
    ```
2.  **`setUserIdentities` Call:**
    ```jsx
    function setRawIdentities() {
      const identities = {
        email: 'test.user@example.com',
        cellno: '1 5551234567', // Using recommended format
        fpuid: 'raw-user-123',
        loginid: 'testUserRaw'
        // Add other custom IDs if needed
      };
      console.log('Calling setUserIdentities with:', identities);
      window.zeotap.setUserIdentities(identities);
    }
    ```

## Related Documentation

*   Tracking User Identities (`setUserIdentities`) Main Documentation
*   Hashing Configuration (`hashIdentities` & `areIdentitiesHashed`)
*   Cellno Handling Details
