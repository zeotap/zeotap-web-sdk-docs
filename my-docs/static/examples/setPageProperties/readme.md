# README: setPageProperties Example (E-commerce)

## Purpose

This HTML file (`example.html`) demonstrates how to use the `window.zeotap.setPageProperties()` function from the Zeotap Web SDK. It shows how to send contextual information about the current web page to Zeotap, which then gets associated with subsequent events tracked on that page.

This example showcases:
1.  Integrating the Zeotap SDK snippet.
2.  Initializing the SDK with your unique Write Key.
3.  Calling `setPageProperties` on page load with various page attributes (name, category, URL, custom properties).
4.  Demonstrating how these page properties are included with a subsequent custom event (e.g., "add\_to\_cart").

## Files

*   **`example.html`**: The single HTML file containing the page structure, SDK integration, and JavaScript logic.
*   **`../../img/product1.png`**: Image for the "Good Couch" product (relative path).
*   **`../../img/product2.png`**: Image for the "Super Sofa" product (relative path).

## How to Use

1.  **Get Your Write Key:**
    *   You will need a **Write Key** from your Zeotap CDP account. If you don't have one, please refer to the official Zeotap documentation on obtaining it.

2.  **Update the Write Key:**
    *   Open the `example.html` file.
    *   Locate the SDK initialization script block (marked with `<!-- 2. Initialize the SDK -->`).
    *   Replace `"YOUR_WRITE_KEY"` with your actual Zeotap Write Key:
        ```javascript
        // IMPORTANT: Replace "YOUR_WRITE_KEY" with your actual Zeotap Write Key
        const writeKey = "YOUR_WRITE_KEY"; // <--- REPLACE THIS
        window.zeotap.init(writeKey);
        ```

3.  **Ensure Images are Accessible:**
    *   The example uses relative paths for product images: `../../img/product1.png` and `../../img/product2.png`.
    *   Make sure these image files exist at the correct location relative to where you are serving or opening the `example.html` file.
    *   Alternatively, you can update the `src` attributes in the `<img>` tags to point to valid online image URLs.

4.  **Run the Example:**
    *   Open the file directly in the browser (`file:///...`). Might cause issues with loading the local images.

5.  **Observe the Behavior:**
    *   **Open Developer Tools:** In your web browser, open the developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
    *   **Console Tab:** Look for log messages. The `logToPage` function in the example will output messages here, as well as to the on-page console area.
    *   **Network Tab:** Filter for requests to your Zeotap endpoint (e.g., `content.zeotap.com` or `spl.zeotap.com`).

## Expected Behavior & Verification

1.  **On Page Load:**
    *   **Network Tab:**
        *   You should see an initial network request (often a `pageView` event if `autoTrack.pageView` is enabled in your SDK's default configuration, or if you explicitly track a page view).
        *   Inspect the payload of this request. It should contain a `page` object (or similar structure) with the properties you defined in the `pageProps` object (e.g., `pageName: "Product Listing"`, `pageCategory: "E-commerce"`, `url`, `itemCount`, etc.).
    *   **Console:** The `logToPage` function is not explicitly called after `setPageProperties` in this version, but you can add it for debugging if needed.

2.  **After Clicking "Add to Cart":**
    *   **On-Page Log:** You should see a message like "Called window.zeotap.setEventProperties for event: add\_to\_cart with properties: {...}" in the "Console output" section.
    *   **Network Tab:**
        *   A new `POST` request should be sent to the Zeotap endpoint for the `add_to_cart` event.
        *   Inspect the payload of this `add_to_cart` event. Crucially, it should **also** contain the same `page` object with the properties set by `setPageProperties` earlier. This demonstrates that page properties are associated with subsequent events on that page.

## Code Highlights

*   **SDK Integration Snippet (`<!-- 1. ... -->`):**
    This is the Zeotap SDK loader script. It creates a `window.zeotap` object with a command queue (`_q`), allowing you to call SDK functions like `init` and `setPageProperties` immediately. These calls are queued and executed once the full SDK script (`zeotap.min.js`) is loaded.
*   **SDK Initialization (`<!-- 2. ... -->`):**
    ```javascript
    const writeKey = "YOUR_WRITE_KEY"; // Replace with your actual key
    window.zeotap.init(writeKey);
    ```
    This initializes the SDK with your specific Write Key.
*   **`setPageProperties` Call (`<!-- 3. ... -->`):**
    ```javascript
    const pageProps = {
            pageName: "Product Listing",
            pageCategory: "E-commerce",
            pageType: "Listing", // Custom property
            url: window.location.href,
            path: window.location.pathname,
            title: document.title,
            itemCount: 2 // Hardcoded for simplicity, could be dynamic
        };
    window.zeotap.setPageProperties(pageProps);
    ```
    This is called directly on page load to set the context for the current page.
*   **`addToCart` Function:**
    ```javascript
    function addToCart(productId, productName, price, quantity) {
        // ... prepares eventName and eventProperties ...
        window.zeotap.setEventProperties(eventName, eventProperties);
        logToPage(...);
    }
    ```
    When this function is called, the `add_to_cart` event it sends will automatically include the page properties set earlier.

## Further Learning

*   Zeotap API Reference: `setPageProperties`
*   Zeotap API Reference: `setEventProperties`
*   Zeotap SDK Configuration Options
*   Zeotap Quick Start Guide
