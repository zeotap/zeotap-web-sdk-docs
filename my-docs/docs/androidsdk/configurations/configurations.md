---
sidebar_position: 0
title: Configurations
---

## Usage

The Zeotap Android SDK can be configured by setting options in `CollectOptions.Builder` and passing to `Collect.init`. Eg:

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    // Other SDK Configuration options
    .build();

Collect.init(options);
```

## Mandatory
Some set of options should be setup in CollectOptions to make SDK collect the data in required ways.

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./writeKey">`credential`</a>                         | String                                   | **Required.** Your unique Zeotap Write Key to send data to your specific source. It can be obtained from access details of your Android source created in Zeotap CDP.        |
| `build`                         | -                                   | **Required.** This function builds the Options object that is required to initialise the Collect SDK with the configuration passed to the CollectOptions object.        |

## SDK Configuration Options

### PII related Options
Only works for PIIs (cellno, email, loginid) sent using [setUserIdentities](../APIReferences/setUserIdentities)

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `areIdentitiesHashed`           | Boolean                                  | Set to `true` if the identities you pass to `setUserIdentities` are already hashed (e.g., SHA-256). Defaults to `false`.                                         |
| `hashIdentities`                | Boolean                                  | Set to `true` to enable automatic client-side SHA-256/SHA-1/MD-5 hashing of email/phone identities before sending. Defaults to `false`.                                    |

[Learn more about PII hashing options](./hashing#combined-usage)

### Consent Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `optOut`                           | Boolean                                  | If set to `true`, then no events will be tracked by SDK. Defaults to `false`.                                                                   |
| `useConsent`                       | Boolean                                  | If set to `true`, the SDK waits to receive a consent signal before tracking. Defaults to `false`.                                                                   |
| `checkForCMP`                      | Boolean                             |  If both `useConsent` and `checkForCMP` are set to true, then the SDK looks for CMP data that is stored by other CMPs. Based on the CMP data. Defaults to `false`.                                    |
| `checkZeotapVendorConsent`                       | Boolean                                  | For CMP case, if set to true, then the SDK checks for Zeotap Vendor (ID 1469) consent, while resolving GDPR consent to send the data. <br/> If set to false, then the SDK ignores Zeotap Vendor consent.                                                                   |
| `purposesForTracking`                       | List\<Integer\>                                  | This option is used to pass a list of purpose IDs, based on which you can manage the consent for tracking. Defaults to `[1, 3, 4]`.                                                                   |

[Learn more about combined usage of consent options](./consentOptions#combined-usage)

### Data Collection Settings

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `uploadBatchSize`                        | Integer                                      | Number of events to queue before sending automatically. Defaults to `30`.                                                                                             |
| `serviceUploadInterval`                    | Integer                             | How often to send queued data to the server (in seconds). Defaults to `90`.                                                                                        |
| `maxCacheSize`                     | Integer                                      | Maximum number of events to store offline before dropping old events. Defaults to `100` and maximum value is `200`.                                                                            |

### Logging Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enableLogging`                    | Boolean                                  | If set to true, then it displays the info, debug, warning and error log severity levels. <br/>Else, it only displays the warning and error log severity levels.                                                         |

### Other Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userCountry`            | String                                      | This option must be set in alpha-iso3 codes, which can then be sent with every request as `user.user_country`.                                                                   |

## Basic Usage Examples

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("YOUR_WRITE_KEY")
    .enableLogging(true)
    .optOut(false)
    .uploadBatchSize(20)
    .serviceUploadInterval(60)
    .maxCacheSize(150)
    .build();

Collect.init(options);
```

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
    .purposesForTracking(Arrays.asList(1, 3, 4))
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

## Best Practices

1. **Use Environment-Specific Configurations**: Always use different write keys and settings for development, staging, and production.

2. **Optimize for Your Use Case**: Adjust batch sizes and flush intervals based on your app's event volume.

3. **Respect User Privacy**: Enable consent management and respect system privacy settings.

4. **Validate Configuration**: Always validate your configuration before initializing the SDK.


## Related Documentation

- [Write Key Configuration](./writeKey): Learn how to obtain and configure your write key
- [Quick Start Guide](../quickStart): Basic SDK integration guide
- [API Reference](../APIReferences/setUserIdentities): Explore available methods
