---
sidebar_position: 3
title: Tracking User Actions
---

# User Event Tracking

Learn how to track user actions in your Android app using the Zeotap SDK's event tracking methods.

## Core Event Methods

The SDK provides two main methods for tracking events:

### setEventProperties()
Standard event tracking that uses the SDK's batching system for optimal performance.

### setInstantEventProperties()
Immediate event tracking that bypasses the batch queue for time-sensitive events.

## Standard Event Tracking

### Simple Event (Event Name Only)

Track a basic user action with just an event name:

```java
import com.zeotap.collect.Collect;

// Get the Collect instance
Collect collect = Collect.getInstance();

// Track a simple event
collect.setEventProperties("Button Clicked");
```

### Event with Properties

Add context to your events by including properties:

```java
import com.zeotap.collect.Collect;
import java.util.HashMap;
import java.util.Map;

// Create event properties
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("button_name", "signup_button");
eventProperties.put("screen_name", "home");
eventProperties.put("user_type", "guest");

// Track event with properties
Collect collect = Collect.getInstance();
collect.setEventProperties("Button Clicked", eventProperties);
```

## Instant Event Tracking

For events that need immediate processing (like critical user actions):

```java
// Track instant event without properties
collect.setInstantEventProperties("Emergency Alert");

// Track instant event with properties
Map<String, Object> urgentProperties = new HashMap<>();
urgentProperties.put("alert_type", "security");
urgentProperties.put("severity", "high");

collect.setInstantEventProperties("Security Alert", urgentProperties);
```

## Event Tracking with Callbacks

Handle responses from event tracking to manage errors or confirmations:

```java
import com.zeotap.collect.SDKCallback;

// Event with callback
collect.setEventProperties("Purchase Completed", eventProperties, new SDKCallback() {
    @Override
    public void onResponse(Map<String, Object> response) {
        // Handle successful event tracking
        String status = (String) response.get("status");
        String message = (String) response.get("message");
        
        if ("success".equals(status)) {
            Log.d("EventTracking", "Event tracked successfully: " + message);
        } else {
            Log.e("EventTracking", "Event tracking failed: " + message);
        }
    }
});

// Instant event with callback
collect.setInstantEventProperties("Critical Action", properties, new SDKCallback() {
    @Override
    public void onResponse(Map<String, Object> response) {
        // Handle response for instant event
        processEventResponse(response);
    }
});
```

## Common Event Examples

### E-commerce Events

```java
// Product view event
Map<String, Object> productView = new HashMap<>();
productView.put("product_id", "12345");
productView.put("product_name", "Wireless Headphones");
productView.put("category", "Electronics");
productView.put("price", 99.99);
productView.put("currency", "USD");

collect.setEventProperties("Product Viewed", productView);

// Add to cart event
Map<String, Object> cartEvent = new HashMap<>();
cartEvent.put("product_id", "12345");
cartEvent.put("quantity", 1);
cartEvent.put("total_price", 99.99);

collect.setEventProperties("Add to Cart", cartEvent);
```

### User Engagement Events

```java
// Screen view event
Map<String, Object> screenView = new HashMap<>();
screenView.put("screen_name", "product_details");
screenView.put("previous_screen", "product_list");
screenView.put("time_spent", 45); // seconds

collect.setEventProperties("Screen Viewed", screenView);

// Feature usage event
Map<String, Object> featureUsage = new HashMap<>();
featureUsage.put("feature_name", "search");
featureUsage.put("search_query", "bluetooth headphones");
featureUsage.put("results_count", 24);

collect.setEventProperties("Feature Used", featureUsage);
```

## Data Types for Properties

Ensure you use the correct data types for event properties:

```java
Map<String, Object> properties = new HashMap<>();

// Strings
properties.put("product_name", "Example Product");
properties.put("category", "Electronics");

// Numbers
properties.put("price", 29.99);           // Double
properties.put("quantity", 2);            // Integer
properties.put("user_id", 12345L);        // Long

// Booleans
properties.put("is_premium", true);
properties.put("first_purchase", false);

// Arrays (use Lists)
List<String> tags = Arrays.asList("electronics", "wireless", "premium");
properties.put("tags", tags);
```

## Event Payload Structure

When you track an event, the SDK creates a payload like this:

```json {5-11}
{
  "events": [
    {
      "eventUUID": "4b22525c-de33-4c5f-8934-e04e682e9f6e",
      "event": {
        "eventName": "Product Viewed",
        "product_id": "12345",
        "product_name": "Wireless Headphones",
        "price": 99.99,
        "eventTimestamp": "2024-01-11 07:25:23 UTC"
      },
      "user": {
        "App_version": "1.0",
        "adid": "adid",
        "Device_ID": "device-id",
        "IP": "192.168.232.2",
        "user_zi": "user-identifier",
      },
      "version": "2.0.0"
    }
  ]
}
```

## Best Practices

### Naming Conventions
- Use clear, descriptive event names
- Follow consistent naming patterns (e.g., "Action Object" format)
- Use snake_case or camelCase consistently

```java
// Good examples
collect.setEventProperties("Product Viewed");
collect.setEventProperties("Cart Item Added");
collect.setEventProperties("Purchase Completed");

// Avoid
collect.setEventProperties("event1");
collect.setEventProperties("click");
```

### Property Guidelines
- Use descriptive property names
- Include relevant context
- Avoid sensitive information
- Keep property values simple (strings, numbers, booleans)

```java
// Good properties
Map<String, Object> properties = new HashMap<>();
properties.put("product_id", "12345");
properties.put("category_name", "Electronics");
properties.put("price_usd", 99.99);
properties.put("is_on_sale", true);

// Avoid
properties.put("p", "12345");  // Unclear name
properties.put("user_password", "secret123");  // Sensitive data
```

## Error Handling

Always handle potential errors when tracking events:

```java
try {
    collect.setEventProperties("User Action", properties);
} catch (Exception e) {
    Log.e("EventTracking", "Failed to track event", e);
    // Handle error appropriately
}
```

:::tip Performance Tip
Use `setEventProperties()` for most events as it batches requests for better performance. Only use `setInstantEventProperties()` for critical events that need immediate processing.
:::