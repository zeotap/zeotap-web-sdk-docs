---
sidebar_position: 2
title: All about cookie syncing
description: Cookie Syncing FAQ
---

## Cookie Syncing

Since cookies are domain-specific, browsers do not send cookies from other domains with server requests. To establish a common user identifier across platforms, a translation mechanism known as cookie syncing is required.

Zeotap CDP allows you to collect user web data from different platforms and target users by syncing cookies with selected partners.

- Cookie syncing is pre-configured per source write key.
- Channel cookies are mapped to the Zeotap cookie and any user identifiers you send.
- Syncs are fired as image pixels or iframe tags.
- Web image pixels can sync with only one partner per call; the highest-priority partner is selected.
- To control cookie syncing consent per individual channel partner, configure [`partnerConsentKeyMap`](../Configurations/partnerConsentKeyMap) during `init`.


:::note
Reach out to your Customer Success Manager (CSM) for activation or partner configuration.
:::

## How Zeotap CDP Uses Cookies

Cookies are a preferred method for maintaining a browser-based user identifier (known or anonymous). These identifiers are associated with all inbound events captured by the Zeotap JavaScript tag.

# Cookie Reference

The following table lists all cookies set or read by the Zeotap SDK, including their purpose, scope, and lifecycle.

| Cookie | Cookie Type | Name (as per Cookie Storage) | Read / Write | Purpose | Value | Default Expiry | Set When | Cleared When |
|------|------------|-----------------------------|--------------|---------|-------|----------------|----------|--------------|
| ZI | First-party | `zpstorage_{{Base64.encode(API_KEY)}}zi` | Read / Write | Client ID used to recognise a user by device, browser, or domain-generated options | Random UUID | 365 days<br/>7 days (Safari) | On consent set with `consent.track = true`<br/>`setZI()`<br/>`resetZI()` | On consent set with `consent.track = false`<br/> |
| Identity | First-party | `zpstorage_{{Base64.encode(API_KEY)}}identity` | Read / Write | Stores user identities such as hashed email, cell number, login ID, and unhashed `fpuid` | Base64-encoded JSON | 365 days<br/>7 days (Safari) | On consent set (empty)<br/>On options change (empty)<br/>`setUserIdentities()` | On consent set with `consent.track = false`<br/> |
| ZS | First-party | `zpstorage_{{Base64.encode(API_KEY)}}zs` | Read / Write | Session ID unique per device, browser, domain, or session | Random UUID | 60 minutes<br/>7 days (Safari) | On consent set with `consent.track = true` | On consent set with `consent.track = false`<br/> |
| GDPR Consent | First-party | `euconsent-v2` | Read | Stores GDPR consent string set by TCF-compliant CMP | Encoded consent string | 7 days (Safari) | When user interacts with CMP | — |
| GA Client ID | First-party | `{{cookie prefix as per SDK Configurations}}_ga` | Read | Reads Google Analytics Client ID | GA cookie value | 7 days (Safari) | — | — |
| GA User ID | First-party | `{{cookie name as per SDK Configurations}}` | Read | Reads GA User ID for POST calls (all or post-login only) | GA cookie value | 7 days (Safari) | — | — |
| IDP | First-party | `IDP` | Read / Write | Login-based currency cookie | Base64-encoded string | 365 days<br/>7 days (Safari) | `setUserIdentities()` | — |
| Zcookieid | Third-party | `zc` | Read / Write | Zeotap user identifier set via smart pixel endpoint | Random UUID | 730 days | POST calls from SDK<br/>GET calls for cookie syncs | — |
| Capping Cookie | Third-party | `zsc` | Read / Write | Limits frequency of cookie syncs with channel partners (e.g. DoubleClick) | Base64-encoded string | 1 day | POST calls from SDK<br/>GET calls for cookie syncs | — |
| User Consent | Third-party | `zuc` | Read / Write | Stores non-TCF consent at account level | Base64-encoded string | 365 days | POST calls from SDK<br/>GET calls for cookie syncs | — |



:::warning

Third-party cookies are scheduled for deprecation as part of Google’s Privacy Sandbox initiative.  
We recommend reviewing your implementation and planning accordingly.

Refer to official browser documentation for timelines and impact.
:::

:::info
The following Zeotap third-party cookies will be deprecated:

- ZC: Used for ID extension.
- ZSC: Limits cookie sync calls per session.
- ZUC: Legacy custom consent cookie, scheduled for removal.
:::

## Need Support?

If you have questions or need assistance, contact Zeotap Support or raise a ticket through the support portal.
