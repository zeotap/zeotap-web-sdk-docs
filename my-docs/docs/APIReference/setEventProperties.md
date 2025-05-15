---
sidebar_position: 3
title: Tracking User Actions
description: Track user activities.
---

**Description:**  
Use this method to track specific user interactions on your website. These interactions can include product views, action button clicks and other custom behaviors relevant to your application.


**Parameters:**

- `eventName`: `string` – A name that describes the user action (e.g., `'Checkout'`, `'productViewed'`, `'AddToCart'`).
- `properties`: `object` *(optional)* – Key-value pairs with details about the event:
  Eg: 
    - `productId`
    - `cartValue`
    - `quantity`, etc

**Usage Example:**

```javascript
window.zeotap.setEventProperties('AddToCart', {
  productId: 'PQR-222',
  quantity: 1,
  cartValue: 29.99
});
```


**Verification:**

The page properties will be passed in the payload of the ```https://spl.zeotap.com/fp?``` call:

```json title="Event properties in payload" {5-8}
            "events": [
                {
                "event": {
                    "id": "m9Tva77fUH4ILi3SPBBVn",
                    "eventName": "AddToCart", //AddToCart event name,
                    "productId": "PQR-222", //EventProperties
                    "quantity": 1,
                    "cartValue": 29.99,
                    "eventTimestamp": 1745959356443
                },
                "user": {
                    "zs": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                    "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
                    "zi_domain": ".zeotap.com",
                    "email": "jane.doe@email.com"
                },
                "page": { 
                    "path": "/products",
                    "referrer": "https://test.zeotap.com/",
                    "url": "https://test.zeotap.com/product1"
                },
                "version": "4.4.3"
                }
            ]
```


**Verification:**

To verify that the user action tracking is working:

1. Open your browser's **Developer Tools** (`F12` or right-click → *Inspect*).
2. Go to the **Network** tab.
3. Perform the action you’re tracking (e.g., add an item to a cart or view a product).
4. Look for a network `POST` request sent to ```https://spl.zeotap.com/fp?```.
5. Check the request payload — it should contain:
   - An `event` node with the `eventName` (e.g., `"AddToCart"`)
   - A `properties` object with the custom values you passed (e.g., `productId`, `quantity`, `price`)

This confirms that the SDK is successfully capturing and sending user action events.

