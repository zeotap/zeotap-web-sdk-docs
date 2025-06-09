---
sidebar_position: 3
title: Intialization Guide
---

# SDK Initialization

After installing the SDK, you need to initialize it in your application. This should be done in your `MainApplication.java` file to ensure the SDK is ready before any activities start.

## Basic Setup

### Step 1: Create Application Class

If you don't already have a custom Application class, create one:

```java
import android.app.Application;
import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        
        // Initialize Zeotap SDK
        CollectOptions options = CollectOptions.builder(this)
            .credential("<YOUR_WRITE_KEY>")
            .enableLogging(true)
            .build();
            
        Collect.init(options);
    }
}
```

### Step 2: Register Application Class

Add your Application class to `AndroidManifest.xml`:

```xml
<application
    android:name=".MainApplication"
    android:allowBackup="true"
    android:icon="@mipmap/ic_launcher"
    android:label="@string/app_name"
    android:theme="@style/AppTheme">
    
    <!-- Your activities here -->
    
</application>
```

## Configuration Options

The `CollectOptions.Builder` provides various configuration options:

### Required Configuration

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<YOUR_WRITE_KEY>")  // Required: Your Zeotap write key
    .build();
```

### Complete Configuration Example

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<YOUR_WRITE_KEY>")
    .enableLogging(true)                    // Enable debug logging
    .uploadBatchSize(30)                    // Events per batch (default: 30)
    .maxCacheSize(100)                      // Max cached events (default: 100)
    .serviceUploadInterval(90)              // Upload interval in seconds (default: 90)
    .optOut(false)                          // Opt-out flag (default: false)
    .useConsent(true)                       // Enable consent management
    .checkForCMP(false)                     // Check for CMP integration
    .userCountry("USA")                     // User country (ISO3 code)
    .areIdentitiesHashed(false)             // Are identities pre-hashed
    .hashIdentities(true)                   // Hash identities automatically
    .build();
```

## Configuration Options Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `credential()` | String | **Required** | Your Zeotap write key |
| `enableLogging()` | Boolean | `false` | Enable debug logging |
| `optOut()` | Boolean | `false` | Disable event collection |
| `uploadBatchSize()` | Integer | `30` | Events per batch (1-50) |
| `maxCacheSize()` | Integer | `100` | Max cached events (max: 200) |
| `serviceUploadInterval()` | Integer | `90` | Upload interval in seconds |
| `useConsent()` | Boolean | `false` | Enable consent management |
| `checkForCMP()` | Boolean | `false` | Check for CMP integration |
| `userCountry()` | String | `null` | User country (ISO3 code) |
| `areIdentitiesHashed()` | Boolean | `false` | Identities are pre-hashed |
| `hashIdentities()` | Boolean | `false` | Auto-hash raw identities |

## Initialization with Callback

You can also initialize the SDK with a callback to handle the initialization response:

```java
Collect.init(options, (response) -> {
    // Handle initialization response
    if (response.containsKey("status")) {
        String status = (String) response.get("status");
        if ("success".equals(status)) {
            Log.d("Zeotap", "SDK initialized successfully");
        } else {
            Log.e("Zeotap", "SDK initialization failed: " + response.get("message"));
        }
    }
});
```

## Advanced Configuration

### Consent Management Setup

For GDPR compliance with consent management:

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<YOUR_WRITE_KEY>")
    .useConsent(true)
    .checkForCMP(true)  // For TCF 2.0 CMP integration
    .checkZeotapVendorConsent(true)
    .roleForConsent(RoleForConsent.PUBLISHER)
    .tcfPublisherConsentCategory(PublisherConsentCategory.CONSENTS)
    .purposesForTracking(Arrays.asList(1, 3, 4))
    .purposesForIdentifying(Arrays.asList(1, 9))
    .build();
```

### Performance Optimization

For high-traffic applications:

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<YOUR_WRITE_KEY>")
    .uploadBatchSize(50)           // Larger batches
    .maxCacheSize(200)             // More caching
    .serviceUploadInterval(60)     // More frequent uploads
    .build();
```

## Getting SDK Instance

After initialization, get the SDK instance in your activities:

```java
public class MainActivity extends AppCompatActivity {
    private Collect collect;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Get SDK instance
        collect = Collect.getInstance();
    }
}
```

## Verification

Verify successful initialization:

```java
// Check if SDK is initialized
if (Collect.getInstance() != null) {
    Log.d("Zeotap", "SDK is ready to use");
    
    // Send a test event
    collect.setEventProperties("app_launched");
}
```

## Common Issues

### NullPointerException
Ensure the SDK is initialized before getting the instance:

```java
// Wrong - SDK not initialized
Collect collect = Collect.getInstance(); // May return null

// Correct - Initialize first
Collect.init(options);
Collect collect = Collect.getInstance(); // Returns valid instance
```

### Application Class Not Registered
Verify your custom Application class is declared in `AndroidManifest.xml`.

### Write Key Issues
Ensure you're using the correct write key provided by Zeotap.

## Next Steps

With the SDK initialized, you can now:
- [Track Events](./tracking/events)
- [Manage User Identities](./user-management/identities)
- [Set Up Consent Management](./consent-management/overview)