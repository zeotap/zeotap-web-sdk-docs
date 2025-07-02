---
sidebar_position: 3
title: Track Events
description: Send custom events with properties to Zeotap.
---

# Track Events

The `setEventProperties` method is used to send custom events to Zeotap along with specified event properties and name.

## Syntax

```javascript
setEventProperties(eventName, eventProperties, callback)
setEventNameProperties(eventName, callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track |
| eventProperties | Object | No | Key-value pairs of event properties |
| callback | Function | No | Callback function to handle response |

## Usage Examples

### Event Name Only

If you only need to track the event name without additional properties, use `setEventNameProperties`:

```javascript
import { setEventNameProperties } from 'zeo-collect';

// Track event with name only
setEventNameProperties("app_opened");

// With callback
setEventNameProperties("user_logout", (response) => {
    console.log("Logout event tracked:", response);
});
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

### Basic Event Tracking

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

### Event with Callback

```javascript
import { setEventProperties } from 'zeo-collect';

setEventProperties("purchase_completed", {
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
- [trackInstantEvent](./trackInstantEvent) - Send events immediately bypassing the queue
- [setPageProperties](./setPageProperties) - Set page/screen context
- [setUserProperties](./setUserProperties) - Set user attributes

## Error Handling

Common issues and solutions:

- **Invalid event name**: Ensure event names are strings and follow naming conventions
- **Large payloads**: Limit property object size to avoid network issues
- **Network failures**: Implement callback error handling for critical events

---

For more examples and advanced usage patterns, see our [Examples Guide](../Examples/examples).