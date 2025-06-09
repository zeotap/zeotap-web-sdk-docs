---
sidebar_position: 4
title: Tracking User Properties
---

# setUserProperties

## Overview

The `setUserProperties` method allows you to attach additional user information and attributes to a known user. This information is sent with all subsequent events and helps enrich user profiles.

## Method Signature

```java
Collect.getInstance().setUserProperties(Map<String, ?> userProperties, SDKCallback cb)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userProperties` | `Map<String, ?>` | Yes | Map containing user attributes as key-value pairs |
| `cb` | `SDKCallback` | No | Optional callback to handle the response |

## Usage Examples

### Basic Usage
```java
Map<String, ?> userProperties = new HashMap<>();
userProperties.put("age", 25);
userProperties.put("gender", "male");
userProperties.put("subscription", "premium");
userProperties.put("location", "New York");

Collect.getInstance().setUserProperties(userProperties);
```

### With Callback
```java
Map<String, ?> userProperties = new HashMap<>();
userProperties.put("profileLevel", "gold");
userProperties.put("lastLogin", "2024-01-15");

Collect.getInstance().setUserProperties(userProperties, (res) -> {
    // Handle response
    if (res.get("status").equals("success")) {
        Log.d("SDK", "User properties set successfully");
    }
});
```

## When to Use

Call `setUserProperties` in these scenarios:

- **User Registration**: When a new user signs up
- **Profile Updates**: When user updates their profile information
- **Subscription Changes**: When user upgrades/downgrades their plan
- **Preference Updates**: When user changes app preferences


## setUserProperties vs setUserIdentities

| Aspect | setUserProperties | setUserIdentities |
|--------|------------------|-------------------|
| **Purpose** | Store user attributes and profile data | Store user identification data |
| **Data Type** | Demographics, preferences, profile info | Email, phone, login ID |
| **Examples** | `age`, `gender`, `subscription`, `location` | `email`, `cellno`, `loginid` |
| **Hashing** | No automatic hashing | Automatic hashing for PIIs |
| **When to Use** | Profile enrichment, user attributes | User identification, login scenarios |
| **Persistence** | Attached to user profile | Used for cross-device identification |

### Example Comparison

```java
// setUserProperties - for profile attributes
Map<String, ?> userProperties = new HashMap<>();
userProperties.put("age", 30);
userProperties.put("subscription", "premium");
userProperties.put("city", "Mumbai");
Collect.getInstance().setUserProperties(userProperties);

// setUserIdentities - for identification
Map<String, String> userIdentities = new HashMap<>();
userIdentities.put("email", "john@example.com");
userIdentities.put("cellno", "9876543210");
userIdentities.put("loginid", "john123");
Collect.getInstance().setUserIdentities(userIdentities);
```

## Best Practices

1. **Use Meaningful Keys**: Choose descriptive property names
2. **Consistent Data Types**: Maintain consistent data types for the same properties
3. **Avoid Sensitive Data**: Don't include sensitive information in properties
4. **Regular Updates**: Update properties when user information changes

## Sample Payload

When you set user properties, they appear in the event payload under the `user` node:

```json {9-12}
{
  "events": [{
    "event": {
      "eventName": "set_user_properties",
      "eventTimestamp": "2024-01-15 10:30:00 UTC"
    },
    "user": {
      "zi": "unique-user-id",
      "age": 25,
      "gender": "male",
      "subscription": "premium",
      "location": "New York"
    }
  }]
}
```