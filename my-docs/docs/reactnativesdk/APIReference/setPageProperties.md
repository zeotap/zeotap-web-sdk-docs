---
sidebar_position: 2
title: Track Page View Events
description: Send page view events and page-specific properties to Zeotap.
---

# Track Page View Events

After integrating the SDK, you can log the users' page view events by calling `setPageProperties(properties)` and sending all page related information as key=value properties.

**How persistence works:**

The SDK does not store or persist any default page properties. However, once `setPageProperties` is called with values, those properties are **persisted and automatically included** in the `page` node of all subsequent SDK calls — including events, user properties, and other payloads — until they are explicitly changed. To update page properties, call `setPageProperties` again with the new values. To remove page properties, pass empty values.

**Why use it?**

*   **Page Context:** Provides context about what page or screen the user is viewing when events occur.
*   **User Journey Tracking:** Enables tracking user navigation patterns through your app.
*   **Content Analytics:** Helps analyze which pages/screens are most engaging for users.

:::tip[Note]
If page properties are never set, no `page` property is included in the event payload. Once set, they persist across subsequent calls until updated or cleared.
:::

## Available Methods

| Method | Description |
|--------|-------------|
| `setPageProperties` | Set page/screen properties |
| `setPagePropertiesWithCallback` | Set page/screen properties with a response callback |

---

## setPageProperties

### Syntax

```javascript
import { setPageProperties } from 'zeo-collect';

setPageProperties(properties);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| properties | Object | Yes | This indicates the page specific properties |

### Example

```javascript
import { setPageProperties } from 'zeo-collect';

const pageProperties = {
    name: "Product Details",
    category: "E-commerce"
};

setPageProperties(pageProperties);
```

The detailed page properties will be passed in the payload:

```json title="Detailed page properties in payload" {10-13}
    "events": [
        {
        "event": {
            "eventName": "pageView",
            "eventTimestamp": 1745959356443
        },
        "user": {
            "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
        },
        "page": {
            "name": "Product Details",
            "category": "E-commerce"
        },
        "version": "1.3.8"
        }
    ]
```

---

## setPagePropertiesWithCallback

Sets page properties and provides a callback to handle the response. The data parameter is an object that contains `status` and `message` which helps to debug the status of the function call.

### Syntax

```javascript
import { setPagePropertiesWithCallback } from 'zeo-collect';

setPagePropertiesWithCallback(properties, callback);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| properties | Object | Yes | This indicates the page specific properties |
| callback | Function | Yes | Callback function to handle the response |

### Example

```javascript
import { setPagePropertiesWithCallback } from 'zeo-collect';

setPagePropertiesWithCallback({
    name: "Product Details",
    category: "E-commerce"
}, (data) => {
    // Implement function to handle response
    // {status: "SUCCESS", message: "Page properties set successfully"}
});
```

## Best Practices

1. **Call on Screen Load**: Set page properties when a new screen/view becomes visible to the user.

2. **Consistent Naming**: Use consistent naming conventions for similar screens across your app.

3. **Relevant Context**: Include properties that provide meaningful context about the current screen.

4. **Avoid Sensitive Data**: Don't include sensitive information like passwords or personal details.

5. **Update on Navigation**: Update page properties each time the user navigates to a different screen.