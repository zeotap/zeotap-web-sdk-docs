---
sidebar_position: 2
title: Track Page View Events
description: Send page view events and page-specific properties to Zeotap.
---

# Track Page View Events

After integrating the SDK, you can log the users' page view events by calling `setPageProperties(properties)` and sending all page related information as key=value properties on the page load event. All further user events on the same page are then attached with these page properties.

**Why use it?**

*   **Page Context:** Provides context about what page or screen the user is viewing when events occur.
*   **User Journey Tracking:** Enables tracking user navigation patterns through your app.
*   **Content Analytics:** Helps analyze which pages/screens are most engaging for users.

:::tip[Note]
If page properties are not defined, then by default, no page property is available on an event payload.
:::

## Syntax

```javascript
import { setPageProperties } from 'zeo-collect';

setPageProperties(properties, callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| properties | Object | Yes | This indicates the page specific properties |
| callback | Function | Optional | Callback to handle function response |

## Usage Examples

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

## Set page properties with callbacks

You can also set page properties with Callback function as shown below. The data parameter is an object that contains `status` and `message` which helps to debug the status of the function call. 

```javascript
import { setPageProperties } from 'zeo-collect';

setPageProperties({
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