---
sidebar_position: 3
title: Track Events
description: Send custom events with properties to Zeotap.
---

# Track Events

The `setEventProperties` method is used to send custom events to Zeotap along with specified event properties and name.

## Syntax

```java
Collect.getInstance().setEventProperties(String eventName, Map<String, Object> eventProperties, SDKCallback callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | `String` | Yes | The name of the event to track |
| eventProperties | `Map<String, Object>` | No | Key-value pairs of event properties |
| callback | `SDKCallback` | No | Callback function to handle response |

## Usage Examples

### Event Name Only

```java
// Track event with name only
Collect.getInstance().setEventProperties("app_opened");
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
            "version": "2.2.8"
        }
    ]
```

### Basic Event Tracking

```java
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("product_name", "Wireless Headphones");
eventProperties.put("category", "Electronics");
eventProperties.put("price", 99.99);
eventProperties.put("currency", "USD");

Collect.getInstance().setEventProperties("product_viewed", eventProperties);
```

The payload with event name and properties:

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
            "version": "2.2.8"
        }
    ]
```

### Event with Callback

```java
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("order_id", "ORD-12345");
eventProperties.put("total_amount", 249.99);

Collect.getInstance().setEventProperties("purchase_completed", eventProperties, (response) -> {
    // Handle success/error response
});
```

## Best Practices

### Event Naming
- Use descriptive, snake_case names: `product_viewed`, `checkout_completed`
- Be consistent across your application
- Avoid special characters and spaces

### Property Structure
```java
// Good: Flat structure with descriptive keys
Map<String, Object> props = new HashMap<>();
props.put("product_id", "PROD-123");
props.put("product_name", "Wireless Mouse");
props.put("category", "Electronics");
props.put("price", 29.99);
```

## Related Methods

- [setInstantEventProperties](./setInstantEventProperties) - Send events immediately bypassing the queue
- [setPageProperties](./setPageProperties) - Set page/screen context
- [setUserProperties](./setUserProperties) - Set user attributes

---

For more examples and advanced usage patterns, see our [Examples Guide](../Examples/examples).
