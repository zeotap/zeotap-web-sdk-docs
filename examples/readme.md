# Zeotap Web SDK - Quick Start Example

This example demonstrates the fundamental setup and usage of the Zeotap Web SDK. It covers:

1.  **SDK Initialization:** How to include and initialize the SDK on your webpage.
2.  **User Identification:** Sending user identifiers to Zeotap using `setUserIdentities`.
3.  **Event Tracking:** Tracking a custom event using `setEventProperties`.
4.  **Page View Tracking:** (Implicitly, if `autoTrack.pageView` is enabled, or explicitly via `setPageProperties`).

This example is designed to get you up and running quickly with the core features of the SDK.

## Files

*   **`quickStart.html`**: The main HTML file that includes the Zeotap SDK script and calls its functions.
*   **(Optional) `quickStart.js`**: If JavaScript logic is separated into its own file, this would contain the SDK initialization and event tracking calls. For simplicity, this example might have the JavaScript directly in the HTML file within `<script>` tags.

## How to Use This Example

1.  **Get Your Write Key:**
    *   You will need a **Write Key** from your Zeotap CDP account. If you don't have one, please refer to the official documentation on obtaining a Write Key.

2.  **Update the Write Key:**
    *   Open the `quickStart.html` file (or `quickStart.js` if you have it separated).
    *   Locate the `window.zeotap.init()` function call.
    *   Replace `"YOUR_WRITE_KEY"` with your actual Write Key.

    ```jsx
    // Example snippet from quickStart.html or quickStart.js
    window.zeotap.init("YOUR_WRITE_KEY", {
        // Optional configuration
        enableLogging: true, // Recommended for debugging
        autoTrack: {
            pageView: true // Automatically tracks page views
        }
    });
    ```

3.  **Run the Example:**
    *   You can open the `quickStart.html` file directly in your web browser.

4.  **Observe the Behavior:**
    *   **Open Developer Tools:** In your browser, open the developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
    *   **Console Tab:** Look for logs from the Zeotap SDK (especially if `enableLogging: true` is set). You should see messages indicating initialization, user identification, and event tracking.
    *   **Network Tab:**
        *   Filter for requests to `spl.zeotap.com` (or your configured Zeotap endpoint).
        *   You should see network calls corresponding to:
            *   The initial page view (if `autoTrack.pageView` is true or `setPageProperties` is called).
            *   The `setUserIdentities` call.
            *   The `setEventProperties` call for the custom event.
        *   Inspect the payload of these requests to see the data being sent to Zeotap.

## Key SDK Functions Demonstrated

*   **`window.zeotap.init(writeKey, configOptions)`:**
    Initializes the SDK with your unique Write Key and any desired configuration options. This is the first SDK call you'll make on your page.

*   **`window.zeotap.setUserIdentities(identifiersObject)`:**
    Used to send user identifiers (like email, phone number, custom IDs) to Zeotap. This helps in building user profiles and enabling cross-device identity resolution.
    ```jsx
    window.zeotap.setUserIdentities({
        emailSha256: "hashed_email_example", // Example: if sending pre-hashed
        // OR
        // email: "user@example.com" // If SDK is configured to hash
    });
    ```

*   **`window.zeotap.setEventProperties(eventName, eventPropertiesObject)`:**
    Tracks custom events and their associated properties. This is crucial for understanding user behavior and interactions on your site.
    ```jsx
    window.zeotap.setEventProperties("product_viewed", {
        productId: "12345",
        category: "electronics"
    });
    ```

*   **`window.zeotap.setPageProperties(pagePropertiesObject)`:** (Implicit or Explicit)
    Sends information about the current page being viewed. If `autoTrack.pageView` is true in the SDK configuration, a basic page view event is sent automatically. You can also use `setPageProperties` to send more detailed page context.
    ```jsx
    window.zeotap.setPageProperties({
        pageName: "Homepage",
        pageCategory: "Landing"
    });
    ```

## Further Learning

*   **Full SDK Configuration Options**
*   **Detailed API Reference**
*   **Consent Management Guide**

This quick start example provides a basic foundation. Explore the full documentation to understand advanced features, configuration options, and best practices for integrating the Zeotap Web SDK.
