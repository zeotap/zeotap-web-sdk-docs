---
sidebar_position: 3
title: Track Events
description: Send custom events with properties to Zeotap.
---

# Track Events

The `setEventProperties` method is used to send custom events to Zeotap along with specified event properties and name.

## Available Methods

| Method | Description |
|--------|-------------|
| `setEventNameProperties` | Track an event with name only |
| `setEventNamePropertiesWithCallback` | Track an event with name only and a response callback |
| `setEventProperties` | Track an event with name and properties |
| `setEventPropertiesWithCallback` | Track an event with name, properties, and a response callback |

---

## setEventNameProperties

Sends an event with only the event name, without any additional properties.

### Syntax

```javascript
import { setEventNameProperties } from 'zeo-collect';

setEventNameProperties(eventName);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track |

### Example

```javascript
import { setEventNameProperties } from 'zeo-collect';

// Track event with name only
setEventNameProperties("app_opened");
```

The payload with event name only:

```json title="Event name only in payload" {3-6}
    "events": [
        {
            "event": {
                "eventName": "app_opened",
                "eventTimestamp": 1745959356443
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
            },
            "page": { /* ... */ },
            "version": "1.3.8"
        }
    ]
```

---

## setEventNamePropertiesWithCallback

Sends an event with only the event name and provides a callback to handle the response.

### Syntax

```javascript
import { setEventNamePropertiesWithCallback } from 'zeo-collect';

setEventNamePropertiesWithCallback(eventName, callback);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track |
| callback | Function | Yes | Callback function to handle the response |

### Example

```javascript
import { setEventNamePropertiesWithCallback } from 'zeo-collect';

setEventNamePropertiesWithCallback("user_logout", (response) => {
    console.log("Logout event tracked:", response);
});
```

---

## setEventProperties

Sends an event with the event name and additional event properties.

### Syntax

```javascript
import { setEventProperties } from 'zeo-collect';

setEventProperties(eventName, eventProperties);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track |
| eventProperties | Object | Yes | Key-value pairs of event properties |

### Example

```javascript
import { setEventProperties } from 'zeo-collect';

// Track a simple event with properties
setEventProperties("product_viewed", {
    product_name: "Wireless Headphones",
    category: "Electronics",
    price: 99.99,
    currency: "USD"
});
```

The payload with event name and properties that passed to the function:

```json title="Event with properties in payload" {3-10}
    "events": [
        {
            "event": {
                "eventName": "product_viewed",
                "product_name": "Wireless Headphones",
                "category": "Electronics",
                "price": 99.99,
                "currency": "USD",
                "eventTimestamp": 1745959356443
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
            },
            "page": { /* ... */ },
            "version": "1.3.8"
        }
    ]
```

---

## setEventPropertiesWithCallback

Sends an event with the event name, event properties, and a callback to handle the response.

### Syntax

```javascript
import { setEventPropertiesWithCallback } from 'zeo-collect';

setEventPropertiesWithCallback(eventName, eventProperties, callback);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track |
| eventProperties | Object | Yes | Key-value pairs of event properties |
| callback | Function | Yes | Callback function to handle the response |

### Example

```javascript
import { setEventPropertiesWithCallback } from 'zeo-collect';

setEventPropertiesWithCallback("purchase_completed", {
    order_id: "ORD-12345",
    total_amount: 249.99,
    payment_method: "credit_card",
    items_count: 3
}, (response) => {
    console.log("Event tracked:", response);
    // Handle success/error response
});
```

## Best Practices

### Event Naming
- Use descriptive, snake_case names: `product_viewed`, `checkout_completed`
- Be consistent across your application
- Avoid special characters and spaces

### Property Structure
```javascript
// Good: Flat structure with descriptive keys
{
    "product_id": "PROD-123",
    "product_name": "Wireless Mouse",
    "category": "Electronics",
    "price": 29.99
}

// Avoid: Deeply nested objects
{
    "product": {
        "details": {
            "info": {
                "name": "Wireless Mouse"
            }
        }
    }
}
```

## Related Methods

- [setEventNameProperties](./setEventNameProperties) - Track events with name only
- [setInstantEventProperties](./setInstantEventProperties) - Send events immediately bypassing the queue
- [setPageProperties](./setPageProperties) - Set page/screen context
- [setUserProperties](./setUserProperties) - Set user attributes

## Error Handling

Common issues and solutions:

- **Invalid event name**: Ensure event names are strings and follow naming conventions
- **Large payloads**: Limit property object size to avoid network issues
- **Network failures**: Implement callback error handling for critical events

---

For more examples and advanced usage patterns, see our [Examples Guide](../Examples/examples).