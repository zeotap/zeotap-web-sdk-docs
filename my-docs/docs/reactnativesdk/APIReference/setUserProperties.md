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

## Available Methods

| Method | Description |
|--------|-------------|
| `setUserProperties` | Set user properties |
| `setUserPropertiesWithCallback` | Set user properties with a response callback |

---

## setUserProperties

### Syntax

```javascript
import { setUserProperties } from 'zeo-collect';

setUserProperties(userProperties);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userProperties | Object | Yes | Key-value pairs of user properties |

### Example

```javascript
import { setUserProperties } from 'zeo-collect';

setUserProperties({
    age: 28,
    gender: "female",
    subscription_tier: "premium",
    location: "New York"
});
```
The detailed user properties will be passed in the payload:

```json title="Detailed page properties in payload" {7-13}
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
        "version": "1.3.8"
        }
    ]
```

---

## setUserPropertiesWithCallback

Sets user properties and provides a callback to handle the response.

### Syntax

```javascript
import { setUserPropertiesWithCallback } from 'zeo-collect';

setUserPropertiesWithCallback(userProperties, callback);
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userProperties | Object | Yes | Key-value pairs of user properties |
| callback | Function | Yes | Callback function to handle the response |

### Example

```javascript
import { setUserPropertiesWithCallback } from 'zeo-collect';

setUserPropertiesWithCallback({
    user_tier: "gold",
    preferences: "notifications_enabled",
    theme: "dark"
}, (response) => {
    console.log("User properties set:", response);
});
```

## Related Methods

- [setUserIdentities](./setUserIdentities) - Set user identities
- [setEventProperties](./setEventProperties) - Track events