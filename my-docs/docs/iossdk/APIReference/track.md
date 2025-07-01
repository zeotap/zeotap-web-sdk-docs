---
sidebar_position: 3
title: Track User Events
description: Track user activities.
---

# Track User Events

The `setEventProperties` method is used to record specific user actions or events in your iOS app. This is essential for understanding user behavior, measuring feature adoption, and building comprehensive user journeys.

## Syntax

```swift
Collect.getInstance()?.setEventProperties(_ eventName: String, _ properties: [String: Any]? = nil, _ callback: ResponseCallback?)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | String | Yes | The name of the event being tracked |
| properties | [String: Any]? | Optional | Additional data associated with the event |
| callback | ResponseCallback? | Optional | Callback to handle function response |

## Usage Examples

### Set User Event

```swift
// Simple event without properties
Collect.getInstance()?.setEventProperties( "view_cart")
```

The payload with event name that passed to the function:

```json title="Detailed page properties in payload" {3-6}
    "events": [
        {
            "event": {
                "eventName": "view_cart",
                "eventTimestamp": 1745959356443
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            },
            "page": { /* ... */ },
            "version": "1.3.8"
        }
    ]
```

### Set User Event with properties
```swift
Collect.getInstance()?.setEventProperties( "add_to_cart", [
    "productName": "xyz",
    "productId": "124"
])
```

The payload with event name and properties that passed to the function:

```json title="Detailed page properties in payload" {3-8}
    "events": [
        {
            "event": {
                "eventName": "add_to_cart",
                "productName": "xyz",
                "productId": "124",
                "eventTimestamp": 1745959356443,
            },
            "user": {
                "zi": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
            },
            "page": { /* ... */ },
            "version": "1.3.8"
        }
    ]
```

## Set Event properties with callbacks

You can also set event properties with Callback function as shown below. The data parameter is an object that contains `status` and `message` which helps to debug the status of the function call. 

```swift
Collect.getInstance()?.setEventProperties("add_to_cart", [
    "productName": "xyz",
    "productId": "124"
    ], {data in 
        // Implement function to handle response
        // [status: "SUCCESS", message: "User properties set successfully"]
    }
)
```

:::tip[Note]
If page properties are not defined, then by default, no page property is available on an event payload.
:::

## Event Naming Best Practices

### Recommended Naming Convention

```swift
// Use descriptive, action-based names
Collect.getInstance()?.setEventProperties( "Product Purchased")
Collect.getInstance()?.setEventProperties( "Video Watched")

// Use same format across the app
Collect.getInstance()?.setEventProperties( "form_submitted")
Collect.getInstance()?.setEventProperties( "profile_updated")

// Be specific and consistent
Collect.getInstance()?.setEventProperties( "Payment Method Added")
Collect.getInstance()?.setEventProperties( "Payment Method Removed")
```

### Avoid These Patterns

```swift
// Too generic
Collect.getInstance()?.setEventProperties( "Action")
Collect.getInstance()?.setEventProperties( "Event")

// Inconsistent naming across the app
Collect.getInstance()?.setEventProperties( "ProductView")
Collect.getInstance()?.setEventProperties( "product_purchase")
Collect.getInstance()?.setEventProperties( "ITEM_ADDED") 
```