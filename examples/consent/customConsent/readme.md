# README: consent_customEx.html Example

## Purpose

This HTML file demonstrates how to use the **Custom Consent Management** approach with the Zeotap Web SDK. It shows how to manually provide consent signals to the SDK using the `window.zeotap.setConsent()` API, typically after a user interacts with a custom consent banner or mechanism on your website.

This scenario is used when you are not integrating with an IAB TCF v2.x compliant Consent Management Platform (CMP) and want to manage consent logic yourself.

## Key Concepts Demonstrated

*   **SDK Initialization for Custom Consent:**
    *   Initializing the SDK using `window.zeotap.init` with specific options:
        *   `useConsent: true`: This is **required** to enable the SDK's consent management features.
        *   `checkForCMP: false`: This is **required** to tell the SDK *not* to automatically look for a TCF CMP, and instead rely on manual `setConsent` calls.
*   **Using `window.zeotap.setConsent()`:**
    *   Calling `setConsent` with an object to grant or deny consent for specific SDK actions. In this example, we focus on the `track` property:
        *   `{ track: true }`: Allows the SDK to send tracking events.
        *   `{ track: false }`: Prevents the SDK from sending tracking events.
*   **Conditional Event Tracking:**
    *   Showing how calls to `window.zeotap.setEventProperties` are affected by the consent status set via `setConsent`. Events are only sent if the necessary consent (e.g., `track: true`) has been provided.

## How to Use

1.  **Open the File:** Open `consent_customEx.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK and the `setConsent` calls.
    *   Navigate to the **Network** tab to inspect outgoing requests. You might want to filter for requests containing `zeotap.com` or `spl/fp?`.
3.  **Interact with Consent Buttons:**
    *   Click the "Allow track" button. This calls `window.zeotap.setConsent({ track: true })`.
    *   Click the "Deny track" button. This calls `window.zeotap.setConsent({ track: false })`.
4.  **Trigger Test Event:**
    *   After setting a consent state, click the "'Test Event' (Requires track)" button. This attempts to send an event using `window.zeotap.setEventProperties`.

## Expected Behavior & Verification

1.  **Initial State:** Before any consent buttons are clicked, if you try to track an event, it might be queued or dropped by the SDK because `useConsent: true` is active and no explicit consent has been given yet.
2.  **After Clicking "Allow track":**
    *   **Console:** You'll see a log "Called window.zeotap.setConsent (Allowing track)".
    *   **Click "'Test Event'":**
        *   **Console:** You'll see a log "Called window.zeotap.setEventProperties('Test Event')...".
        *   **Network Tab:** A network `POST` request to the Zeotap endpoint (e.g., `https://spl.zeotap.com/fp?...`) **should be visible**, containing the "Test Event" data. This confirms tracking is active.
3.  **After Clicking "Deny track":**
    *   **Console:** You'll see a log "Called window.zeotap.setConsent (Denying track)".
    *   **Click "'Test Event'":**
        *   **Console:** You'll see a log "Called window.zeotap.setEventProperties('Test Event')...".
        *   **Network Tab:** A network `POST` request to the Zeotap endpoint **should NOT be visible** for this "Test Event". This confirms tracking is blocked due to denied consent.

## Code Highlights (`consent_customEx.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```jsx
    // IMPORTANT: Replace "YOUR_WRITE_KEY" with your actual Zeotap Write Key
    const writeKey = "YOUR_WRITE_KEY";

    const sdkOptions = {
      useConsent: true,          // Enable consent features
      checkForCMP: false,        // Disable automatic TCF CMP detection
    };

    window.zeotap.init(writeKey, sdkOptions);
    console.log("Zeotap SDK Initialized (Consent Enabled, Manual Set Mode).");
    ```

2.  **`setConsent` Calls (Button Handlers):**
    ```jsx
    document.getElementById('allowButton').addEventListener('click', function() {
        window.zeotap.setConsent({track: true});
        console.log("Called window.zeotap.setConsent (Allowing track)");
    });

    document.getElementById('denyButton').addEventListener('click', function() {
        window.zeotap.setConsent({track: false});
        console.log("Called window.zeotap.setConsent (Denying track)");
    });
    ```

3.  **`setEventProperties` Call (Event Button Handler):**
    ```jsx
    document.getElementById('eventButton').addEventListener('click', function() {
        const eventName = 'Test Event';
        const eventProps = { scenario: 'Manual Set Consent', timestamp: Date.now() };
        window.zeotap.setEventProperties(eventName, eventProps);
        console.log(`Called window.zeotap.setEventProperties('${eventName}') with:`, eventProps);
    });
    ```

## Related Documentation

*   Custom Consent Management (`setConsent` API)
*   Choosing Your Consent Management Strategy
*   API Reference: `window.zeotap.setConsent()`
*   Configuration Option: `useConsent`
*   Configuration Option: `checkForCMP`
