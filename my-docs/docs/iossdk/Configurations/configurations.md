---
sidebar_position: 0
title: Configurations
---

## Usage

The Zeotap iOS SDK can be configured by setting write key in `CollectOption` and pass to `Collect.initialize`. Eg:

```swift
var collectOptions = CollectOption().writeKey(value: "YOUR_WRITE_KEY")
                        // Other SDK Configurations options
                        .build()
Collect.initialize(option: collectOptions)
```

## Mandatory
Some set of options should be setup in CollectOption to make SDK collect the data in required ways.

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./writeKey">`writeKey`</a>                         | String                                   | **Required.** Your unique Zeotap Write Key to send data to your specific source. It can be obtained from access details of your iOS source created in Zeotap CDP.        |
| `build`                         | -                                   | **Required.** This function builds the Option object that is required to initialise the Collect SDK with the configuration passed to the CollectOption object.        |

## SDK Configuration Options     

### PII related Options
Only works for PIIs (cellno, email, loginid) sent using [setUserIdentities](../APIReference/setUserIdentities)

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `areIdentitiesHashed`           | Boolean                                  | Set to `true` if the identities you pass to `setUserIdentities` are already hashed (e.g., SHA-256). Defaults to `false`.                                         |
| `hashIdentities`                | Boolean                                  | Set to `true` to enable automatic client-side SHA-256 hashing of email/phone identities before sending. Defaults to `false`.                                    |

[Learn more about PII hashing options ](./hashing#combined-usage) <!-- TODO: Update the link --> 

### Consent Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `optOut`                           | Boolean                                  | If set to `true`, then no events will be tracked by SDK. Defaults to `false`.                                                                   |
| `useConsent`                       | Boolean                                  | If set to `true`, the SDK waits to receive a consent signal before tracking. Defaults to `false`.                                                                   |
| `checkForCMP`                      | Boolean                             |  If both `useConsent` and `checkForCMP` are set to true, then the SDK looks for CMP data that is stored by other CMPs. Based on the CMP data. Defaults to `false`.                                    |
| `checkZeotapVendorConsent`                       | Boolean                                  | For CMP case, if set to true, then the SDK checks for Zeotap Vendor consent, while resolving GDPR consent to send the data. <br/> If set to false, then the SDK ignores Zeotap Vendor consent.                                                                   |
| `purposesForTracking`                       | [Int]                                  | This option is used to pass a list of purpose IDs, based on which you can manage the consent for tracking. Defaults to `[1, 3, 4]`.                                                                   |

[Learn more about combined usage of consent options](./consentOptions#combined-usage)

### Data Collection Settings

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `batchSize`                        | Int                                      | Number of events to queue before sending automatically. Defaults to `30`.                                                                                             |
| `eventUploadInterval`                    | Int                             | How often to send queued data to the server (in seconds). Defaults to `90`.                                                                                        |
| `maxCacheSize`                     | Int                                      | Maximum number of events to store offline before dropping old events. Defaults to `100` and maximum value is `200`.                                                                            |

### Logging Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `logging`                    | Boolean                                  | If set to true, then it displays the info, debug, warning and error log severity levels. <br/>Else, it only displays the warning and error log severity levels.                                                         |

### Other Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `userCountry`            | String                                      | This option must be set in  alpha-iso3 codes, which can then be sent with every request as `user.user_country`.                                                                   |

## Basic Usage Examples

```swift
var collectOptions = CollectOption()
    .writeKey(value: "YOUR_WRITE_KEY")
    .logging(true)
    .optOut(false)
    .batchSize(20)
    .eventUploadInterval(60)
    .maxCacheSize(150)
    .build()
    
Collect.initialize(option: collectOptions)
```

## Best Practices

1. **Use Environment-Specific Configurations**: Always use different write keys and settings for development, staging, and production.

2. **Optimize for Your Use Case**: Adjust batch sizes and flush intervals based on your app's event volume.

3. **Respect User Privacy**: Enable consent management and respect system privacy settings.

4. **Validate Configuration**: Always validate your configuration before initializing the SDK.


## Related Documentation

- [Write Key Configuration](./writeKey): Learn how to obtain and configure your write key
- [Quick Start Guide](../quickStart): Basic SDK integration guide
- [API Reference](../APIReference/setUserIdentities): Explore available methods