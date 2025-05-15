# README: persistenceInCookieStorage_Ex.html Example

## Purpose

This HTML file demonstrates how to configure the Zeotap Web SDK to use **cookie storage** for persisting user identities and consent information, instead of the default (Session Storage). This is achieved by setting the `persistenceInCookieStorage: true` option during SDK initialization.

Using cookie storage is particularly useful when you need identity and consent information to be accessible across different subdomains of your main website (e.g., `blog.example.com` and `shop.example.com` sharing information from `example.com`).

## Key Concepts Demonstrated

*   **SDK Initialization with `persistenceInCookieStorage: true`:**
    *   Initializing the SDK using `window.zeotap.init` and passing the `persistenceInCookieStorage: true` option.
*   **Storing Data in Cookies:**
    *   When `setUserIdentities` (or `setConsent`) is called, the SDK will store the relevant data (like hashed identifiers or consent flags) in first-party cookies associated with the current domain (or a specified `domain` if configured).
*   **Verification in Browser Developer Tools:**
    *   How to inspect browser cookies to confirm that Zeotap SDK data is being stored there.
    *   How to confirm that the data is *not* being primarily stored in Session Storage when this option is active.

## How to Use

1.  **Open the File:** Open `persistenceInCookieStorage_Ex.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
    *   **Important:** For cookie domain settings to work as intended (especially across subdomains), you would typically run this example on a proper domain (e.g., `localhost` might behave differently than `yourdomain.com`). For simple verification of cookie vs. Session storage, `localhost` is usually fine.
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK.
    *   Navigate to the **Application** tab (in Chrome/Edge) or **Storage** tab (in Firefox).
3.  **Click the Button:** Click the "Set User Identity (Store in Cookies)" button on the page. This will trigger the `window.zeotap.setUserIdentities` call.

## Expected Behavior & Verification

*   **Console:**
    *   You should see a log message "Called window.zeotap.setUserIdentities with: ..." after clicking the button.
*   **Application/Storage Tab (Developer Tools):**
    *   **Cookies:**
        *   Expand the "Cookies" section in the left panel.
        *   Select the origin for the current page (e.g., `http://localhost:xxxx`).
        *   You **should** find cookies with names starting like `zpstorage` (e.g., `zpstorage_YOUR_WRITE_KEY_identity`, `zpstorage_YOUR_WRITE_KEY_consent`). These cookies will contain the identity and/or consent data.
    *   **Session Storage:**
        *   Expand the "Session Storage" section.
        *   Select the origin for the current page.
        *   You should **NOT** find the primary Zeotap identity/consent data stored here under keys like `zpstorage_YOUR_WRITE_KEY_identity`. (Note: The SDK might still use Session Storage for some internal, non-persistent operational data, but the main identity/consent persistence should be in cookies).

## Code Highlights (`persistenceInCookieStorage_Ex.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```javascript
    // IMPORTANT: Replace "YOUR_WRITE_KEY" with your actual Zeotap Write Key
    const writeKey = "YOUR_WRITE_KEY";

    // Configure SDK to use Cookie Storage
    const sdkOptions = {
      persistenceInCookieStorage: true, // Use cookie storage instead of Session Storage
      // domain: '.your-main-domain.com' // Optional: Specify domain for cross-subdomain cookies
    };

    window.zeotap.init(writeKey, sdkOptions);
    console.log("Zeotap SDK Initialized (persistenceInCookieStorage: true).");
    ```
    *   The `domain` option (commented out) would be used if you need cookies to be accessible across subdomains (e.g., set to `.example.com`).

2.  **`setUserIdentities` Call (Button Handler):**
    ```javascript
    document.getElementById('storeIdentityButton').addEventListener('click', function() {
        const userIds = {
          email: 'cookie.test@example.com',
          userId: 'cookie-user-123'
        };
        window.zeotap.setUserIdentities(userIds);
        console.log('Called window.zeotap.setUserIdentities with:', userIds);
    });
    ```

## Important Considerations

*   **Domain Configuration:** If you need cross-subdomain persistence, ensure you correctly set the `domain` option in `sdkOptions` to your top-level domain (e.g., `.example.com`).
*   **Cookie Size Limits:** Cookies have size limitations. While generally sufficient for SDK data, be mindful if you are storing an exceptionally large number of custom identities or very long consent strings.
*   **Privacy Implications:** Storing data in cookies has privacy implications. Ensure your cookie policy and consent mechanisms accurately reflect this usage.

## Related Documentation

*   Configuration Option: `persistenceInCookieStorage`
*   Configuration Option: `domain`
*   Tracking User Identities (`setUserIdentities`)
*   Consent Management
