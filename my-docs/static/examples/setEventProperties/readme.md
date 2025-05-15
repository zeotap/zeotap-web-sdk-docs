# README: setEventProperties Example (E-commerce)

## Purpose

This HTML file (`example.html`) demonstrates how to use the `window.zeotap.setEventProperties()` function from the Zeotap Web SDK to track a custom user event. Specifically, it simulates an "add_to_cart" event on a simplified e-commerce product page.

This example showcases:
1.  Integrating the Zeotap SDK snippet into an HTML page.
2.  Initializing the SDK with your unique Write Key.
3.  Defining a JavaScript function (`addToCart`) that prepares event data (product ID, name, price, etc.).
4.  Calling `setEventProperties` with a specific event name (`add_to_cart`) and a properties object when a user clicks an "Add to Cart" button.

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
    *   Open the file directly in the browser (`file:///...`) might work for the SDK calls but could cause issues with loading the local images.

5.  **Observe the Behavior:**
    *   **Open Developer Tools:** In your web browser, open the developer tools (usually by pressing F12 or right-clicking and selecting "Inspect").
    *   **Console Tab:** Look for log messages. The `logToPage` function in the example will output messages here, as well as to the on-page console area.
    *   **Network Tab:** Filter for requests to your Zeotap endpoint (e.g., `content.zeotap.com` or `spl.zeotap.com`).

6.  **Click "Add to Cart":**
    *   Click one of the "Add to Cart" buttons on the page.

## Expected Behavior & Verification

*   **On-Page Log:** When you click an "Add to Cart" button, you should see a message like "Attempting to track event: 'add_to_cart' with properties: {...}" in the "Console output" section on the page.
*   **Browser Console:** You'll see the same log message in the browser's developer console.
*   **Network Tab:**
    *   A `POST` request should be sent to the Zeotap endpoint.
    *   Inspect the **Payload** (or Request Body) of this request. You should find:
        *   An `eventName` field (or similar, depending on payload structure) with the value `"add_to_cart"`.
        *   A `properties` object (or similar structure) containing the details you passed (e.g., `productId`, `productName`, `price`, `currency`, `quantity`, `category`).

## Code Highlights

*   **SDK Integration Snippet (`<!-- 1. ... -->`):**
    This is the standard Zeotap SDK loader script. Note that this example uses a QA version of the SDK (`https://content.zeotap.com/sdk/qa/zeotap.min.js`). For production, use the appropriate production SDK URL.
*   **SDK Initialization (`<!-- 2. ... -->`):**
    ```javascript
    const writeKey = "YOUR_WRITE_KEY"; // Replace with your actual key
    window.zeotap.init(writeKey);
    ```
    This initializes the SDK with your specific Write Key.
*   **`addToCart` Function:**
    ```javascript
    function addToCart(productId, productName, price, quantity) {
        const eventName = 'add_to_cart';
        const eventProperties = {
            productId: productId,
            productName: productName,
            price: price,
            currency: 'USD', // Example currency
            quantity: quantity,
            category: 'Furniture' // Example category
        };
        window.zeotap.setEventProperties(eventName, eventProperties); // Core SDK call
        logToPage(`Attempting to track event: '${eventName}' with properties: ${JSON.stringify(eventProperties)}`);
    }
    ```
    This function is called on button click. It prepares the event data and then calls `window.zeotap.setEventProperties()` to send the event to Zeotap.

## Further Learning

*   Zeotap API Reference: `setEventProperties`
*   Zeotap SDK Configuration Options
*   Zeotap Quick Start Guide
