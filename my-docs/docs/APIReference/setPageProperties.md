---
sidebar_position: 2
title: Tracking Page Views
description: Send page view events to Zeotap.
---

**Description:**  
Track information about the web pages users view in your application. This helps provide valuable context for analyzing user interactions.

:::tip[Note]
By default, the SDK includes the page `URL`, `path`, and `referrer URL` in the payload.
:::

**Parameters:**

- `properties`: `object` *(optional)* – Key-value pairs describing the page being viewed:
  - `pageName`: `string` *(optional)* – Name of the page.
  - `url`: `string` *(optional)* – Full URL of the page.
  - `title`: `string` *(optional)* – Title of the page.
  - `category`: `string` *(optional)* – Page category.
  - *(Add other relevant parameters as needed.)*

**Usage Example:**

```javascript
window.zeotap.setPageProperties({
  pageName: "Product Page",
  url: "https://test.zeotap.com/product1",
  path: "/products"
});
```

**Verification:**

The page properties will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call:

```json title="Page properties in payload" {5,14-18}
            "events": [
                {
                "event": {
                    "id": "m9Tva77fUH4ILi3SPBBVn",
                    "eventName": "pageView", //pageView event triggered
                    "eventTimestamp": 1745959356443
                },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "email": "jane.doe@email.com"
                },
                "page": { //Page Properties being sent
                    "pageName": "Product Page",
                    "path": "/products",
                    "referrer": "https://test.zeotap.com/",
                    "url": "https://test.zeotap.com/product1"
                },
                "version": "4.4.3"
                }
            ]
```

To verify that page view tracking is working:

1. Open your browser's **Developer Tools** (`F12` or right-click → *Inspect*).
2. Go to the **Network** tab.
3. Trigger a page view in your application.
4. Look for a network `POST` request sent to ```https://spl.zeotap.com/fp?```.
5. Check for the request with ```eventName: pageView```.
5. Check the request payload — it should contain a `page` node with the following fields:
   - `url`
   - `path`
   - `referrer`
   - Any custom values you passed (e.g., `pageName`, `title`, `category`).

This confirms that the SDK is successfully capturing and transmitting the page view data.
