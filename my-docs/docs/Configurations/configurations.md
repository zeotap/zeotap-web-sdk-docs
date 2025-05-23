---
sidebar_position: 0
title: Configurations
---

## Usage

The Zeotap Web SDK can be configured by passing an options object during the [`init`](/docs/quickStart#integration) call. eg: `window.zeotap.init("writeKey", <options>);`

## Mandatory
| Key                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./writeKey">`writeKey`</a>                         | String                                   | **Required.** Your unique Zeotap Write Key to send data to your specific source. It can be obtained from access details of your web javascript source created in Zeotap CDP.        |

## SDK Configuration Options                                                

### PII related Options

Only works for PIIs (cellno, email, loginid) sent using [setUserIdentities](../APIReference/setUserIdentities)

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./hashing">`areIdentitiesHashed`</a>           | Boolean                                  | Set to `true` if the identities you pass to `setUserIdentities` are already hashed (e.g., SHA-256). Defaults to `false`.                                         |
| <a href="./hashing">`hashIdentities`</a>                 | Boolean                                  | Set to `true` to enable automatic client-side SHA-256 hashing of email/phone identities before sending. Defaults to `true`.                                    |

[Learn more about PII hashing options ](./hashing#combined-usage)

### Consent Options 

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`useConsent`](./consentOptions#useconsent)                       | Boolean                                  | If set to `true`, the SDK waits to receive a consent signal and uses that consent to manage actions. Defaults to `false`.                                        |
| [`checkForCMP`](./consentOptions#checkforcmp)                       | Boolean                                  | If set to `false`, the Non-TCF Zeotap CMP is used for consent management. Defaults to `true`.                                                                   |
| [`purposesForTracking`](./consentOptions#purposesfortracking)             | Number[]                                 | TCF Purpose IDs required for tracking user activity. Default depends on TCF version/config (e.g., `[1,3,4]` or `[1,5,6]`).                                      |
| [`purposesForCookieSync`](./consentOptions#purposesforcookiesyncing)            | Number[]                                 | TCF Purpose IDs required for cookie syncing. Default depends on TCF version/config (e.g., `[1,3,4]` or `[1,5,6]`).                                             |
| [`includeTCFString`](./consentOptions#includetcfstring)                     | Boolean                                  | If `true`, the TCF consent string is included in the event payload regardless of the consent mechanism used. No default specified.                              |
| [`shouldCheckZeotapVendorConsent`](./consentOptions#shouldcheckzeotapvendorconsent)     | Boolean                                  | If `true`, the SDK checks for Zeotap's vendor consent (ID 301) before checking tracking purposes. Defaults to `false`.                                           |

[Learn more about combined usage of consent options](./consentOptions#combined-usage)


### Storage options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `storageExpirationDays`            | Number                                   | Defines how long (in days) any cookies used for storage are set for. Not applicable to localStorage. Defaults to `365`.                                            |
| `domain`                           | String                                   | If specified, cookies are stored against this domain (e.g., '.yourdomain.com'). By default, cookies are saved against the top-level domain. Defaults to `undefined`. |
| <a href="./persistenceInCookieStorage">`persistenceInCookieStorage`</a>       | Boolean                                  | If `true`, identities and consent info are persisted in cookie storage; otherwise, sessionStorage is used. Defaults to `false`.                                    |


### ID5 integration Options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./id5">`enableID5`</a>                        | Boolean                                  | Set to `true` to enable the ID5 Universal ID integration. Defaults to `false`.                                                                                 |
| <a href="./id5">`id5PartnerId`</a>                    | Number                                   | Your specific partner ID provided by ID5. Required if `enableID5` is `true`. No default.                                                                         |
| <a href="./id5">`sendPartnerDataToID5`</a>             | Boolean                                  | If `true`, allows the SDK to send user PII (hashed email/phone) to ID5. Requires `enableID5` to be `true`. Defaults to `false`.                                  |

### GA integration options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `allowGAClientId`                  | Boolean                                  | If set to `false`, the Google Analytics Client ID will not be forwarded in POST calls. Defaults to `true`.                                                       |
| `gaClientIdCookiePrefix`           | String                                   | Cookie prefix for the Google Analytics Client ID cookie. If set to `<value>`, the SDK looks for a cookie named `<value>_ga`. Defaults to `''`.                     |
| `gaUserIdCookieName`               | String                                   | Cookie name for the Google Analytics User ID. If set to `<value>`, the SDK looks for a cookie named `<value>`. Defaults to `''`.                                  |
| `gaUserIdOnlyLoginEvent`           | Boolean                                  | If set to `false`, the GA User ID is sent in all event calls. If `true`, it's sent only on `setUserIdentities` calls. Defaults to `false`.                        |

### Interact SDK options

| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="../interact#web-sdk-already-integrated"> `loadInteractScript` </a>     | Boolean  | Set to `true` to automatically load the Zeotap Interact SDK alongside the main Web SDK. This enables client-side data delivery features. Defaults to `false`. |
| <a href="../interact">`interactScriptUrl`</a>     | String  | Specifies a custom URL from which to load the Interact SDK script. If not provided, the SDK will use a default URL when `loadInteractScript` is `true`. |


### Logging options
| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enableLogging`                    | Boolean                                  | If set to `false`, debug logs won't appear in the browser console, regardless of `logLevel`. Defaults to `false`.                                               |
| `logLevel`                         | String                                   | Sets the minimum level for logs to appear ('debug', 'info', 'warn', 'error'). Defaults to `'warn'`.                                                              |
| `debug`                            | Boolean                                  | If set to `true`, events are logged to the console instead of being sent to the backend. Useful for development. Defaults to `false`.                           |



### Other options
| Option                          | Type                                     | Description                                                                                                                                                              |
| :--------------------------------- | :--------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a href="./allowCookieSync">`allowCookieSync`</a>                     | Boolean                                  | If set to `true`, cookie syncing takes place. Defaults to `true`.                                                                                              |
| `user_country`                     | String                                   | If set with a country code (e.g., 'US', 'DE'), this code is sent with every request as `user.user_country`. Defaults to `null`.                                  |
| `eventRetryDelayMillis`            | Number                                   | The delay in milliseconds added per backoff attempt when retrying failed event posts. Defaults to `500`.                                                          |
| `eventUploadPeriodMillis`          | Number                                   | If the event queue size is less than `eventUploadThreshold`, the request to post events will be scheduled after this many milliseconds. Defaults to `500`.         |
| `eventUploadThreshold`             | Number                                   | The maximum number of events allowed in the unsent queue before dispatching immediately. Defaults to `1`.                                                         |
| `uploadBatchSize`                  | Number                                   | The number of events that should be posted at once in a single batch request. Defaults to `1`.                                                                   |
| `maxRetries`                       | Number                                   | The maximum number of retries for posting events before dropping them. Defaults to `3`.                                                                         |
| `maxEventsQueuedTillConsentUnresolved` | Number                                   | The maximum number of events to queue in memory while consent status is unresolved. Defaults to `10`.                                                          |
