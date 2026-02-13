# README: consent_defaultEx.html Example

## Purpose

This HTML file demonstrates the **Default Consent Behavior** of the Zeotap Web SDK. It shows how the SDK operates when consent management features are **not explicitly enabled** (i.e., when the `useConsent` configuration option is `false`, which is its default value).

## Key Concepts Demonstrated

*   **SDK Initialization (Default Consent Mode):**
    *   Initializing the SDK using `window.zeotap.init` without setting `useConsent: true`.
    *   The SDK operates assuming consent is granted unless explicitly configured with `optOut: true`.
*   **Event Tracking in Default Mode:**
    *   Calling `window.zeotap.setEventProperties` to track an event.
    *   Observing that the event is sent to the Zeotap backend because consent management is not actively blocking it.
*   **Impact of `optOut` (Conceptual):**
    *   While this example doesn't explicitly set `optOut: true`, it's important to understand that if `optOut` were `true`, tracking would be disabled even in this default consent mode.

## How to Use

1.  **Open the File:** Open `consent_defaultEx.html` directly in a web browser that has developer tools (like Chrome, Firefox, Edge).
2.  **Open Developer Tools:** Open your browser's Developer Tools (usually by pressing F12).
    *   Navigate to the **Console** tab to see log messages from the SDK.
    *   Navigate to the **Network** tab to inspect outgoing requests. You might want to filter for requests containing `zeotap.com` or `spl/fp?`.
3.  **Click the Button:** Click the "setEventProperties 'Test Event'" button on the page. This will trigger the `window.zeotap.setEventProperties` call.

## Expected Behavior & Verification

*   **Console:**
    *   You should see a log message "Zeotap SDK Initialized (Consent Management Disabled)."
    *   After clicking the button, you should see a log message like "Called window.zeotap.setEventProperties('Test Event') with: { scenario: 'No Consent Management', ... }".
*   **Network Tab:**
    *   After clicking the button, you should see a network `POST` request made to the Zeotap endpoint (e.g., `https://spl.zeotap.com/fp?...`).
    *   Inspect the **Payload** (or Request Body) of this request. It should contain the "Test Event" data you triggered. This confirms that tracking is active because `useConsent` is `false` (and `optOut` is implicitly `false`).

## Code Highlights (`consent_defaultEx.html`)

Look for these key sections in the HTML file's `<script>` tags:

1.  **SDK Initialization:**
    ```jsx
    // IMPORTANT: Replace "YOUR_WRITE_KEY" with your actual Zeotap Write Key
    const writeKey = "YOUR_WRITE_KEY";

    // Initialize WITHOUT enabling consent management (`useConsent: false` is default)
    const sdkOptions = {
      // useConsent: false // Explicitly false or omitted
      // optOut: false    // Ensure optOut is false to allow tracking
    };

    window.zeotap.init(writeKey, sdkOptions);
    console.log("Zeotap SDK Initialized (Consent Management Disabled).");
    ```
    *   Note that `useConsent: false` is the default, so omitting it has the same effect.
    *   `optOut: false` is also the default.

2.  **`setEventProperties` Call:**
    ```jsx
    document.getElementById('eventButton').addEventListener('click', function() {
        const eventName = 'Test Event';
        const eventProps = { scenario: 'No Consent Management', timestamp: Date.now() };

        // Call track
        window.zeotap.setEventProperties(eventName, eventProps);

        // Log to console for verification
        console.log(`Called window.zeotap.setEventProperties('${eventName}') with:`, eventProps);
        alert(`Track event called! Check Console & Network tabs. Event should be sent as useConsent=false.`);
    });
    ```

## Important Considerations

*   **Compliance:** This default mode (without explicit consent management) is **generally NOT recommended** for websites subject to privacy regulations like GDPR or CCPA/CPRA, as it doesn't provide mechanisms for explicit user consent.
*   **`optOut` Flag:** If you were to initialize the SDK with `optOut: true`, no events would be sent, even with `useConsent: false`.

## Related Documentation

*   Default Consent Behavior
*   Choosing Your Consent Management Strategy
*   Configuration Option: `useConsent`
*   Configuration Option: `optOut`
