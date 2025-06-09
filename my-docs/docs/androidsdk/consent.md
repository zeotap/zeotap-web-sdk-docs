---
sidebar_position: 5
title: Consent Management
description: How to manage user consent using the Zeotap Android SDK, including support for TCF 2.0 and custom consent flows.
---

# Consent Management

## Overview

The Android SDK provides three different ways to manage user consent for data collection and user identification, ensuring legal compliance with privacy regulations like GDPR.

## Consent Types

### 1. Default Opt-in

Simple boolean flag to control SDK behavior.

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<write_key>")
    .optOut(false) // false = allow data collection, true = block data collection
    .build();
```

| Value | Description |
|-------|-------------|
| `false` | SDK can perform user identification and tracking |
| `true` | SDK blocks all user identification and tracking |

### 2. GDPR TCF CMP

For apps with existing TCF 2.0 Consent Management Platform.

#### Configuration
```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<write_key>")
    .useConsent(true)
    .checkForCMP(true)
    .checkZeotapVendorConsent(false) // optional
    .purposesForTracking(Arrays.asList(1, 3, 4))
    .purposesForIdentifying(Arrays.asList(1, 9))
    .build();
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `useConsent` | Boolean | SDK waits for consent signal before processing |
| `checkForCMP` | Boolean | Check for TCF 2.0 variables in SharedPreferences |
| `checkZeotapVendorConsent` | Boolean | Check specifically for Zeotap vendor consent |
| `purposesForTracking` | ```List<Number>``` | Purpose IDs for tracking consent |
| `purposesForIdentifying` | ```List<Number>``` | Purpose IDs for identification consent |

### 3. Custom Consent

Implement your own consent flow with granular control.

#### Configuration
```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<write_key>")
    .useConsent(true)
    .checkForCMP(false) // disable TCF checking
    .build();
```

## Custom Consent Implementation

### Consent Signals

| Signal | Purpose |
|--------|---------|
| `track` | Permission to track and record user activities |
| `identify` | Permission for user matching and identification |

### Setting Consent

```java
// Grant both permissions
Map<String, Object> consent = new HashMap<>();
consent.put("track", true);
consent.put("identify", true);
Collect.getInstance().setConsent(consent);

// Grant only tracking, deny identification
Map<String, Object> consent = new HashMap<>();
consent.put("track", true);
consent.put("identify", false);
Collect.getInstance().setConsent(consent);

// Deny all permissions
Map<String, Object> consent = new HashMap<>();
consent.put("track", false);
consent.put("identify", false);
Collect.getInstance().setConsent(consent);
```

### With Callback

```java
Map<String, Object> consent = new HashMap<>();
consent.put("track", true);
consent.put("identify", true);

Collect.getInstance().setConsent(consent, (res) -> {
    if (res.get("status").equals("success")) {
        Log.d("SDK", "Consent set successfully");
    }
});
```

## Listening for Consent Requests

When consent is not available, the SDK can trigger a callback to request consent from the user.

```java
Collect.getInstance().listenToAskForConsent(() -> {
    // Show your consent dialog/UI here
    showConsentDialog();
});

private void showConsentDialog() {
    // Your consent UI implementation
    // After user responds, call setConsent()
}
```

## Brand-Specific Consent

Store additional brand-specific consent alongside main consent.

```java
Map<String, Object> brandConsent = new HashMap<>();
brandConsent.put("track", true);
brandConsent.put("identify", true);
brandConsent.put("zeotapVendorConsent", true);
brandConsent.put("xyzVendorConsent", false);

Collect.getInstance().setConsent(brandConsent);
```

## Implementation Examples

### Complete Custom Consent Flow

```java
public class ConsentManager {
    private Collect collect;
    
    public void initializeSDK() {
        CollectOptions options = CollectOptions.builder(this)
            .credential("<write_key>")
            .useConsent(true)
            .checkForCMP(false)
            .build();
            
        Collect.init(options);
        collect = Collect.getInstance();
        
        // Listen for consent requests
        collect.listenToAskForConsent(this::requestUserConsent);
    }
    
    private void requestUserConsent() {
        // Show consent dialog
        showConsentDialog((userAccepted) -> {
            setUserConsent(userAccepted);
        });
    }
    
    private void setUserConsent(boolean userAccepted) {
        Map<String, Object> consent = new HashMap<>();
        consent.put("track", userAccepted);
        consent.put("identify", userAccepted);
        
        collect.setConsent(consent, (res) -> {
            Log.d("Consent", "Consent status: " + res.get("status"));
        });
    }
    
    public void updateConsent(boolean allowTracking, boolean allowIdentification) {
        Map<String, Object> consent = new HashMap<>();
        consent.put("track", allowTracking);
        consent.put("identify", allowIdentification);
        collect.setConsent(consent);
    }
}
```

### GDPR TCF Implementation

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<write_key>")
    .useConsent(true)
    .checkForCMP(true)
    .checkZeotapVendorConsent(true)
    .purposesForTracking(Arrays.asList(1, 3, 4, 6)) // Store info, personalization, ad selection, measurement
    .purposesForIdentifying(Arrays.asList(1, 9, 10)) // Store info, understand audiences, develop products
    .build();

Collect.init(options);
```

## Best Practices

1. **Initialize Early**: Set up consent management before any tracking calls
2. **Store Consent**: SDK automatically stores consent in SharedPreferences
3. **Update When Changed**: Call `setConsent()` whenever user changes preferences
4. **Handle Edge Cases**: Always listen for consent requests for better UX
5. **Test Thoroughly**: Verify consent flows work correctly in all scenarios

## Consent States

| State | Description | SDK Behavior |
|-------|-------------|--------------|
| **No Consent** | No consent signal received | SDK waits, triggers `listenToAskForConsent` |
| **Granted** | `track: true, identify: true` | Full SDK functionality enabled |
| **Partial** | `track: true, identify: false` | Tracking enabled, identification disabled |
| **Denied** | `track: false, identify: false` | All data collection blocked |

## Common Use Cases

### E-commerce App
```java
// User accepts marketing emails but not personalized ads
Map<String, Object> consent = new HashMap<>();
consent.put("track", true);        // Track purchase behavior
consent.put("identify", false);    // Don't link across devices
Collect.getInstance().setConsent(consent);
```

### News App
```java
// User wants personalized content but no tracking
Map<String, Object> consent = new HashMap<>();
consent.put("track", false);       // No behavioral tracking
consent.put("identify", true);     // Allow content personalization
Collect.getInstance().setConsent(consent);
```