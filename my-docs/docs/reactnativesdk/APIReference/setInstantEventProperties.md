---
sidebar_position: 4
title: Track Instant Events
description: Send events immediately bypassing the queue for critical real-time tracking.
---

# Track Instant Events

The `setInstantEventProperties` method is used to send events immediately to Zeotap, bypassing the normal queuing and batching mechanism. This is ideal for critical events that require real-time tracking.

**Why use it?**

*   **Immediate Delivery:** Events are sent instantly without waiting for batch processing.
*   **Critical Events:** Perfect for tracking urgent events like errors, crashes, or time-sensitive actions.
*   **Real-time Analytics:** Ensures important events are captured immediately even if the app closes.

:::tip[When to Use]
Use instant events sparingly for critical events only, as they bypass performance optimizations like batching and may impact network usage.
:::

## Syntax

```javascript
import { setInstantEventProperties } from 'zeo-collect';

setInstantEventProperties(eventName, eventProperties, callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event to track immediately |
| eventProperties | Object | No | Key-value pairs of event properties |
| callback | Function | No | Callback function to handle response |

## Usage Examples

### Instant Event Name Only

If you only need to track the event name without additional properties for critical events:

```javascript
import { setInstantEventProperties } from 'zeo-collect';

// Track instant event with name only
setInstantEventProperties("app_crash");
```

The payload with instant event name only:

```json title="Instant event name only in payload" {3-6}
    "events": [
        {
            "event": {
                "eventName": "app_crash",
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

### Basic Instant Event Tracking

```javascript
import { setInstantEventProperties } from 'zeo-collect';

// Track a critical event with properties
setInstantEventProperties("critical_error", {
    error_type: "network_failure",
    error_code: "ERR_CONN_TIMEOUT",
    error_message: "Connection timeout after 30 seconds",
    user_action: "checkout_attempt"
});
```

The payload with instant event that is sent immediately:

```json title="Instant event with properties in payload" {3-10}
    "events": [
        {
            "event": {
                "eventName": "critical_error",
                "error_type": "network_failure",
                "error_code": "ERR_CONN_TIMEOUT",
                "error_message": "Connection timeout after 30 seconds",
                "user_action": "checkout_attempt",
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

### Instant Event with Callback

```javascript
import { setInstantEventProperties } from 'zeo-collect';

setInstantEventProperties("payment_failed", {
    payment_id: "PAY-12345",
    failure_reason: "insufficient_funds",
    amount: 99.99,
    currency: "USD",
    retry_attempt: 2
}, (response) => {
    console.log("Instant event tracked:", response);
    // Handle success/error response
});
```

## Performance Impact

### Network Usage
- Instant events create immediate network requests
- Consider batching multiple instant events if they occur simultaneously
- Monitor data usage in your analytics

### Battery Life
- Frequent instant events can impact battery life
- Use only for truly critical events
- Consider user's network conditions

## Related Methods

- [setEventProperties](./setEventProperties) - Track regular events with batching
- [setEventNameProperties](./setEventNameProperties) - Track events with name only
- [setPageProperties](./setPageProperties) - Set page/screen context
- [setUserProperties](./setUserProperties) - Set user attributes

---

For more examples and integration patterns, see our [Examples Guide](../Examples/examples).