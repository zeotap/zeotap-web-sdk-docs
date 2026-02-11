---
sidebar_position: 5
title: Track User Properties
description: Set user attributes and properties for enhanced user profiling.
---

# Track User Properties

The `setUserProperties` method sends user properties along with default user properties. Use this to attach user information for known users.

**Key Characteristics:**

*   **Sent as Event:** Calling `setUserProperties` triggers an event with the event name `set_user_properties`.
*   **Non-Persistent:** The properties sent via this method are associated with this specific `set_user_properties` event. They are **not** automatically persisted in the storage or automatically included with subsequent, different events (like page views or custom events triggered by `setEventProperties`).
*   **Distinct from [`setUserIdentities`](./setUserIdentities):** This function is different from `setUserIdentities`, which is used for establishing and persisting core user identifiers. `setUserProperties` is for sending additional, often more dynamic or contextual, user-level attributes.

## Syntax

```java
Collect.getInstance().setUserProperties(Map<String, ?> userProperties, SDKCallback callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userProperties | `Map<String, ?>` | Yes | Key-value pairs of user properties |
| callback | `SDKCallback` | No | Callback function to handle response |

## Usage Examples

### Basic User Properties

```java
Map<String, Object> userProperties = new HashMap<>();
userProperties.put("age", 28);
userProperties.put("gender", "female");
userProperties.put("subscription_tier", "premium");
userProperties.put("location", "New York");

Collect.getInstance().setUserProperties(userProperties);
```

The detailed user properties will be passed in the payload:

```json title="User properties in payload" {7-13}
    "events": [
        {
        "event": {
            "eventName": "set_user_properties",
            "eventTimestamp": 1745959356443
        },
        "user": {
            "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            "age": 28,
            "gender": "female",
            "subscription_tier": "premium",
            "location": "New York"
        },
        "page": { /* ... */ },
        "version": "2.2.8"
        }
    ]
```

### With Callback

```java
Map<String, Object> userProperties = new HashMap<>();
userProperties.put("user_tier", "gold");
userProperties.put("preferences", "notifications_enabled");

Collect.getInstance().setUserProperties(userProperties, (response) -> {
    // Handle response
});
```

## Related Methods

- [setUserIdentities](./setUserIdentities) - Set user identities
- [setEventProperties](./setEventProperties) - Track events
