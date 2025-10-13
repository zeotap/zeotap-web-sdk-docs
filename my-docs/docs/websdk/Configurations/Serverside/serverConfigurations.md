---
sidebar_position: 2
title: Server Side Configurations(WIP)
description: Configurations
---

# Server-Side Configurations Reference

## 1. Basic Configurations

<details>
<summary>Consent Resolution</summary>

| Field | Type | Default | Description | Options |
|-------|------|--------|------------|--------|
| `consentMode` | string | `tcf` | Determines GDPR/CCPA consent handling | `tcf`, `ccpa`, `none` |
| `enableCustomConsent` | boolean | false | Enables custom consent overrides | `true`, `false` |

</details>

<details>
<summary>PII Hashing</summary>

| Field | Type | Default | Description | Options |
|-------|------|--------|------------|--------|
| `hashPII` | boolean | true | Hash PII fields before sending to server | `true`, `false` |
| `hashAlgorithm` | string | `sha256` | Hash algorithm used | `sha256`, `md5` |

</details>

<details>
<summary>Cookie Storage</summary>

| Field | Type | Default | Description | Options |
|-------|------|--------|------------|--------|
| `storeCookies` | boolean | true | Enable storing cookies locally | `true`, `false` |
| `cookieExpiryDays` | number | 365 | Number of days before cookie expires | Any integer |

</details>

<details>
<summary>3P Cookie Syncing</summary>

| Field | Type | Default | Description | Options |
|-------|------|--------|------------|--------|
| `enable3PCookieSync` | boolean | false | Enable third-party cookie syncing | `true`, `false` |
| `vendors` | array | [] | Vendor IDs to sync with | List of numeric vendor IDs |

</details>

---

## 2. Advanced Configurations

<details>
<summary>Domain</summary>

| Field | Type | Default | Description |
|-------|------|--------|------------|
| `allowedDomains` | array | `["*"]` | Domains where SDK is active |

</details>

<details>
<summary>Interact SDK</summary>

| Field | Type | Default | Description |
|-------|------|--------|------------|
| `enableInteract` | boolean | false | Enable Interact SDK features |
| `interactMode` | string | `default` | Interaction mode | `default`, `custom` |

</details>

<details>
<summary>ID5 Setup</summary>

| Field | Type | Default | Description |
|-------|------|--------|------------|
| `enableID5` | boolean | false | Enable ID5 integration |
| `id5Partner` | string | `""` | Partner name for ID5 integration |

</details>

<details>
<summary>Include/Exclude Events</summary>

| Field | Type | Default | Description |
|-------|------|--------|------------|
| `includeEvents` | array | [] | Events to include for tracking |
| `excludeEvents` | array | [] | Events to exclude from tracking |

</details>

---
