---
sidebar_position: 1
title: Configurations
---

## Usage

The Zeotap React Native SDK can be configured by passing an options object to `initialiseZeoCollect`. Eg:

```javascript
import { initialiseZeoCollect } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY"
    // Other SDK Configuration options
};

initialiseZeoCollect(options);
```

## Mandatory
Some set of options should be setup to make SDK collect the data in required ways.

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./writeKey">`android_write_key`</a>                         | String                                   | **Required.** Your unique Zeotap Write Key for Android platform. It can be obtained from access details of your Android source created in Zeotap CDP.         |
| <a href="./writeKey">`ios_write_key`</a>                         | String                                   | **Required.** Your unique Zeotap Write Key for iOS platform. It can be obtained from access details of your iOS source created in Zeotap CDP.         |

## SDK Configuration Options

### PII related Options
Only works for PIIs (cellno, email, loginid) sent using [setUserIdentities](../APIReference/setUserIdentities)

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `are_identities_hashed`           | Boolean                                  | Set to `true` if the identities you pass to `setUserIdentities` are already hashed (e.g., SHA-256). Defaults to `false`.                                         |
| `hash_identities`                | Boolean                                  | Set to `true` to enable automatic client-side SHA-256/SHA-1/MD-5 hashing of email/phone identities before sending. Defaults to `false`.                                    |

[Learn more about PII hashing options ](./hashing)

### Consent Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `opt_out`                           | Boolean                                  | If set to `true`, then no events will be tracked by SDK. Defaults to `false`.                                                                   |
| `use_consent`                       | Boolean                                  | If set to `true`, the SDK waits to receive a consent signal before tracking. Defaults to `false`.                                                                   |
| `check_for_cmp`                      | Boolean                             |  If both `use_consent` and `check_for_cmp` are set to true, then the SDK looks for CMP data that is stored by other CMPs. Based on the CMP data. Defaults to `false`.                                    |
| `check_zeotap_vendor_consent`                       | Boolean                                  | For CMP case, if set to true, then the SDK checks for Zeotap Vendor consent, while resolving GDPR consent to send the data. <br/> If set to false, then the SDK ignores Zeotap Vendor consent.                                                                   |
| `purposes_for_tracking`                       | Array                                  | This option is used to pass a list of purpose IDs, based on which you can manage the consent for tracking. Defaults to `[1, 3, 4]`.                                                                   |
| `purposes_for_identify`                       | Array                                  | This option is used to pass a list of purpose IDs, based on which you can manage the consent for identification. Defaults to `[1, 9]`.                                                                   |

[Learn more about combined usage of consent options](./consentOptions)

### Data Collection Settings

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `batch_size`                        | Integer                                      | Number of events to queue before sending automatically. Defaults to `30`. Range: `10-50`.                                                                                             |
| `service_interval`                    | Integer                             | How often to send queued data to the server (in seconds). Defaults to `90`.                                                                                        |
| `max_cache_size`                     | Integer                                      | Maximum number of events to store offline before dropping old events. Defaults to `100` and maximum value is `200`.                                                                            |

### Logging Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `logging`                    | Boolean                                  | If set to true, then it displays the info, debug, warning and error log severity levels. <br/>Else, it only displays the warning and error log severity levels.                                                         |

### Other Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_country`            | String                                      | This option must be set in  alpha-iso3 codes, which can then be sent with every request as `user.user_country`.                                                                   |

## Basic Usage Examples

```javascript
import { initialiseZeoCollect } from 'zeo-collect';

const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    logging: true,
    opt_out: false,
    batch_size: 20,
    service_interval: 60,
    max_cache_size: 150
};
    
initialiseZeoCollect(options);
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