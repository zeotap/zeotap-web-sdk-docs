---
sidebar_position: 4
title: Setting User Properties
description: Send user attributes as a dedicated event.
---

# Setting User Properties

The `setUserProperties` method is used to set persistent attributes about a user. These properties should represent relatively stable characteristics of your users, such as subscription status, preferences, or demographic information.

**Key Characteristics:**

*   **Sent as Event:** Calling `setUserProperties` triggers an event with the event name `set_user_properties`.
*   **Non-Persistent:** The properties sent via this method are associated with this specific `set_user_properties` event. They are **not** automatically persisted in the storage or automatically included with subsequent, different events (like page views or custom events triggered by `setEventProperties`).
*   **Distinct from [`setUserIdentities`](./setUserIdentities):** This function is different from `setUserIdentities`, which is used for establishing and persisting core user identifiers. `setUserProperties` is for sending additional, often more dynamic or contextual, user-level attributes.

## Syntax

```swift
Collect.getInstance().setUserProperties(_ properties: [String: Any], _ callback: ResponseCallback?)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| properties | [String: Any] | Yes | A dictionary containing user property key-value pairs |
| callback | ResponseCallback? | Optional | Callback to handle function response |

## Usage Examples

```swift
Collect.getInstance()?.setUserProperties([
    "subscription": "premium",
    "age": 28,
    "city": "San Francisco"
])
```
The detailed user properties will be passed in the payload:

```json title="Detailed page properties in payload" {7-12}
    "events": [
        {
        "event": {
            "eventName": "set_user_properties",
            "eventTimestamp": 1745959356443
        },
        "user": {
            "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            "subscription": "premium",
            "age": 28,
            "city": "San Francisco"
        },
        "page": { /* ... */ },
        "version": "1.3.8"
        }
    ]
```

## Set User properties with callbacks

You can also set user properties with Callback function as shown below. The data parameter is an object that contains `status` and `message` which helps to debug the status of the function call. 

```swift
Collect.getInstance()?.setUserProperties([
    "subscription": "premium",
    "age": 28,
    "city": "San Francisco"
    ], {data in 
        // Implement function to handle response
        // [status: "SUCCESS", message: "User properties set successfully"]
    }
)
```

## Best Practices

1. **Use Descriptive Keys**: Use clear, consistent naming conventions for property keys.

2. **Avoid Frequent Changes**: User properties should represent stable attributes. For frequently changing data, use event tracking instead.

3. **Consistent Data Types**: Keep the same data type for each property key across all calls.

4. **Limit Property Count**: While there's no strict limit, avoid setting hundreds of properties for performance reasons.
