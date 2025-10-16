---
sidebar_position: 4
title: Configuration Guide
---

## Configuration Options

The `CollectOptions.Builder` provides numerous configuration methods. Here's a comprehensive overview:

### Essential Options

| Method | Type | Description | Default |
|--------|------|-------------|---------|
| `credential(String)` | String | **Required** - Your write key provided by Zeotap | - |
| `enableLogging(boolean)` | Boolean | Enable debug logging for development | `false` |

### Data Management Options

| Method | Type | Description | Default |
|--------|------|-------------|---------|
| `uploadBatchSize(int)` | Integer | Max events in queue before immediate dispatch | `30` |
| `maxCacheSize(int)` | Integer | Max events stored locally during network issues | `100` |
| `serviceUploadInterval(int)` | Integer | Upload interval in seconds when batch size not reached | `90` |

### Privacy & Consent Options

| Method | Type | Description | Default |
|--------|------|-------------|---------|
| `optOut(boolean)` | Boolean | If true, no events are sent (fallback when consent not used) | `false` |
| `useConsent(boolean)` | Boolean | Enable consent management | `false` |
| `checkForCMP(boolean)` | Boolean | Look for TCF CMP data | `false` |

### User Identity Options

| Method | Type | Description | Default |
|--------|------|-------------|---------|
| `userCountry(String)` | String | User country in alpha-iso3 format (e.g., "USA", "GBR") | IP-based |
| `areIdentitiesHashed(boolean)` | Boolean | Whether provided identities are already hashed | `false` |
| `hashIdentities(boolean)` | Boolean | Whether SDK should hash raw identities | `false` |

---

## Advanced Configuration Examples

### Development Configuration

```java title="Development Setup"
CollectOptions options = CollectOptions.builder(this)
    .credential("dev_write_key_12345")
    .enableLogging(true)
    .uploadBatchSize(1)  // Send immediately for testing
    .maxCacheSize(50)    // Smaller cache for development
    .serviceUploadInterval(10)  // Faster uploads for testing
    .build();
```

### Production Configuration

```java title="Production Setup"
CollectOptions options = CollectOptions.builder(this)
    .credential("prod_write_key_67890")
    .enableLogging(false)
    .uploadBatchSize(30)
    .maxCacheSize(200)
    .serviceUploadInterval(90)
    .userCountry("USA")  // Set if known
    .build();
```

### GDPR Compliance Configuration

```java title="GDPR Setup"
CollectOptions options = CollectOptions.builder(this)
    .credential("your_write_key")
    .useConsent(true)
    .checkForCMP(true)
    .checkZeotapVendorConsent(true)
    .roleForConsent(RoleForConsent.PUBLISHER)
    .tcfPublisherConsentCategory(PublisherConsentCategory.CONSENTS)
    .purposesForTracking(Arrays.asList(1, 3, 4))
    .purposesForIdentifying(Arrays.asList(1, 9))
    .build();
```

### Custom Identity Handling

```java title="Identity Configuration"
CollectOptions options = CollectOptions.builder(this)
    .credential("your_write_key")
    .areIdentitiesHashed(false)  // We're providing raw identities
    .hashIdentities(true)        // SDK should hash them
    .userCountry("GBR")         // UK user
    .build();
```

---

## Consent Management Configuration

### TCF CMP Integration

For apps with existing TCF 2.0 Consent Management Platform:

| Option | Value | Description |
|--------|-------|-------------|
| `useConsent(true)` | Boolean | Enable consent management |
| `checkForCMP(true)` | Boolean | Look for existing CMP data |
| `checkZeotapVendorConsent(boolean)` | Boolean | Check specific Zeotap vendor consent |
| `roleForConsent(RoleForConsent)` | Enum | `PUBLISHER` or `VENDOR` |
| `tcfPublisherConsentCategory(PublisherConsentCategory)` | Enum | `CONSENTS` or `LEGITIMATEINTERESTS` |

### Purpose Configuration

Configure tracking and identification purposes:

```java
// Tracking purposes (Store and/or access information, Select basic ads, etc.)
.purposesForTracking(Arrays.asList(1, 3, 4))

// Identification purposes (Store and/or access information, Develop and improve products)
.purposesForIdentifying(Arrays.asList(1, 9))
```

### Custom Consent Flow

For custom consent implementation:

```java title="Custom Consent Setup"
CollectOptions options = CollectOptions.builder(this)
    .credential("your_write_key")
    .useConsent(true)
    .checkForCMP(false)  // We'll handle consent manually
    .build();
```

---

## Configuration Validation

### Minimum Required Configuration

```java
// This is the absolute minimum required configuration
CollectOptions options = CollectOptions.builder(this)
    .credential("your_write_key")
    .build();
```

### Recommended Configuration

```java
// Recommended configuration for most apps
CollectOptions options = CollectOptions.builder(this)
    .credential("your_write_key")
    .enableLogging(BuildConfig.DEBUG)  // Enable in debug builds only
    .uploadBatchSize(20)
    .maxCacheSize(150)
    .useConsent(true)  // Enable if handling consent
    .build();
```

---

## Configuration Best Practices

### 🔧 Development vs Production

- **Enable logging only in debug builds**: `enableLogging(BuildConfig.DEBUG)`
- **Use different write keys** for development and production environments
- **Smaller batch sizes** in development for immediate feedback
- **Larger cache sizes** in production for better offline support

### 🔒 Privacy Considerations

- **Always implement consent management** for apps with EU users
- **Set user country** when known to ensure proper data residency
- **Configure identity hashing** based on your privacy requirements
- **Use opt-out as fallback** when consent mechanisms aren't available

### ⚡ Performance Optimization

- **Balance batch size and upload frequency** based on your app's usage patterns
- **Set appropriate cache limits** to avoid memory issues
- **Consider network conditions** when configuring upload intervals

---

## Troubleshooting Configuration

### Common Configuration Issues

**SDK Not Initializing**
- Verify the write key is correct
- Ensure `MainApplication` is properly registered in `AndroidManifest.xml`
- Check that initialization happens in `Application.onCreate()`

**Events Not Sending**
- Check if `optOut` is set to `true`
- Verify consent configuration if using consent management
- Enable logging to see debug information

**Consent Issues**
- Ensure consent flags are properly configured
- Check if CMP data is available when using `checkForCMP(true)`
- Verify purpose IDs are correct for your use case