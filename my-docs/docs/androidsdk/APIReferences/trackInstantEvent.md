---
sidebar_position: 4
title: Track Instant Event
description: Send events immediately to Zeotap without waiting for the batch queue.
---

# Track Instant Event

The `setInstantEventProperties` method sends an event immediately to Zeotap, bypassing the normal batching queue. Use this for high-priority events that need to be delivered without delay.

## Syntax

```java
Collect.getInstance().setInstantEventProperties(String eventName, Map<String, Object> eventProperties, SDKCallback callback)
```

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| eventName | `String` | Yes | The name of the event to track |
| eventProperties | `Map<String, Object>` | No | Key-value pairs of event properties |
| callback | `SDKCallback` | No | Callback function to handle response |

## Usage Examples

### Simple Instant Event

```java
Collect.getInstance().setInstantEventProperties("payment_completed");
```

### Instant Event with Properties

```java
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("transaction_id", "TXN-12345");
eventProperties.put("amount", 99.99);
eventProperties.put("currency", "USD");

Collect.getInstance().setInstantEventProperties("payment_completed", eventProperties);
```

### With Callback

```java
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("transaction_id", "TXN-12345");
eventProperties.put("amount", 99.99);

Collect.getInstance().setInstantEventProperties("payment_completed", eventProperties, (response) -> {
    // Handle response
});
```

## When to Use

- **Critical conversion events** (purchases, sign-ups) where real-time delivery matters
- **Time-sensitive events** that need immediate processing
- **App termination events** where the batch queue may not have time to flush

## Related Methods

- [setEventProperties](./setEventProperties) - Track events using the normal batch queue
