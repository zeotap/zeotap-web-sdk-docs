---
sidebar_position: 9
title: Collect Advertising ID (IDFA)
description: Collect the iOS Advertising Identifier (IDFA / MAID) and App Tracking Transparency status.
---

# Collect Advertising ID (IDFA)

The Zeotap iOS SDK can collect the device's **Advertising Identifier (IDFA)** — also known as a Mobile
Advertising ID (MAID) — and the user's **App Tracking Transparency (ATT)** authorization status, and attach them
to the user payload of every event.

How the IDFA is obtained depends on the iOS version:

- **iOS 13 and below:** the SDK collects the IDFA automatically, provided advertising tracking is enabled on the
  device. No extra integration is required.
- **iOS 14 and later:** Apple's [App Tracking Transparency](https://developer.apple.com/documentation/apptrackingtransparency)
  framework requires explicit user permission. Your app requests this permission and passes the result to the SDK
  using one of the two methods below.

When collection succeeds, the SDK adds the following keys to the user payload of tracked events:

| Key | Description |
|-----|-------------|
| `advertising_id` | The IDFA string. Present only when the ATT status is `authorized`. |
| `att_authorization_status` | The ATT authorization status (see [values](#authorization-status-values)). |

:::info Prerequisite
To request tracking authorization on iOS 14+, add the `NSUserTrackingUsageDescription` key to your app's
`Info.plist` with a short, user-facing explanation of why you request access. Apple displays this string in the
native ATT prompt.
:::

---

## Method A: `setAdvertisingIdByATTStatus`

Pass the ATT authorization status to the SDK and let the SDK retrieve the IDFA from the device for you.

### Syntax

```swift
Collect.getInstance()?.setAdvertisingIdByATTStatus(status: ATTrackingManager.AuthorizationStatus)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | `ATTrackingManager.AuthorizationStatus` | Yes | The status returned by `ATTrackingManager.requestTrackingAuthorization`. |

### Behavior

- When `status == .authorized`, the SDK reads the IDFA from `ASIdentifierManager` and adds both
  `advertising_id` and `att_authorization_status` to the user payload.
- For any other status (`.denied`, `.notDetermined`, `.restricted`), the SDK adds **only**
  `att_authorization_status`. No `advertising_id` is sent.

### Example

```swift
import AppTrackingTransparency

ATTrackingManager.requestTrackingAuthorization { status in
    Collect.getInstance()?.setAdvertisingIdByATTStatus(status: status)
}
```

---

## Method B: `setATTStatusAndAdvertisingId`

Pass both the ATT status **and** the IDFA string explicitly. Use this when you manage IDFA retrieval yourself
(for example, behind a custom consent UI).

### Syntax

```swift
Collect.getInstance()?.setATTStatusAndAdvertisingId(
    status: ATTrackingManager.AuthorizationStatus,
    advertisingId: String = ""
)
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| status | `ATTrackingManager.AuthorizationStatus` | Yes | The ATT authorization status. |
| advertisingId | `String` | Optional | The IDFA string to store. Defaults to an empty string. |

### Behavior

The SDK stores exactly the `advertisingId` you pass. Provide the IDFA only when the status is `authorized`;
omit it (or pass `""`) otherwise.

### Example

```swift
import AppTrackingTransparency
import AdSupport

ATTrackingManager.requestTrackingAuthorization { status in
    switch status {
    case .authorized:
        Collect.getInstance()?.setATTStatusAndAdvertisingId(
            status: status,
            advertisingId: ASIdentifierManager.shared().advertisingIdentifier.uuidString
        )
    case .denied:
        Collect.getInstance()?.setATTStatusAndAdvertisingId(status: status)
    case .notDetermined:
        Collect.getInstance()?.setATTStatusAndAdvertisingId(status: status)
    case .restricted:
        Collect.getInstance()?.setATTStatusAndAdvertisingId(status: status)
    @unknown default:
        break
    }
}
```

---

## Authorization status values

The SDK records `att_authorization_status` using these string values:

| `ATTrackingManager.AuthorizationStatus` | Value sent in payload |
|-----------------------------------------|-----------------------|
| `.authorized` | `authorized` |
| `.denied` | `denied` |
| `.restricted` | `restricted` |
| `.notDetermined` | `notDetermined` |

:::note
The not-determined value is camelCase `notDetermined`. When you build downstream segments that filter on
`att_authorization_status`, match these exact values.
:::

---

## Best Practices

1. **Initialize the SDK first.** Call `Collect.initialize(option:)` (typically in
   `application(_:didFinishLaunchingWithOptions:)`) before requesting tracking authorization.

2. **Request at the right moment.** Show your own context (pre-permission) screen before triggering the native
   ATT prompt, and avoid requesting during critical flows.

3. **Add `NSUserTrackingUsageDescription`.** The ATT prompt will not appear without it.

4. **Respect the user's choice.** When the status is not `authorized`, the SDK does not send an `advertising_id`;
   continue to operate without it.

## Related Documentation

- [Track User Consent](./setConsent): Manage GDPR / CCPA consent signals.
- [Consent Configuration Options](../Configurations/consentOptions): SDK options such as `optout`, `useConsent`.
- [Apple — Requesting authorization to track](https://developer.apple.com/documentation/apptrackingtransparency/attrackingmanager/requesttrackingauthorization(completionhandler:)): Official ATT reference.
