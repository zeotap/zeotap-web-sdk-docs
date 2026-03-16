---
sidebar_position: 6
title: Logout communication
description: Unsetting user ide
---

# Unset User Identities (Log out communication)

If you no longer wish to attach these identities to events (for example, when a user logs out), you can communicate this by using the `unsetUserIdentities` method and specifying the identities that you want to remove.

Call the method as follows:

```javascript
zeotap.unsetUserIdentities([removedPropertyKeys]);
```

If no properties are specified, all identities set earlier using `setUserIdentities` will be removed.

## Key Matching Requirement

Each entry in `removedPropertyKeys` must exactly match the identifier key that was previously passed to `setUserIdentities`. The key to use depends on how identities were originally set:

- **Raw identifiers** (Scenarios 1 & 3): use the raw key — e.g., `email`, `cellno`, `loginid`.
- **Pre-hashed identifiers** (Scenario 2): use the specific hashed key that was supplied — e.g., `email_sha256_lowercase`, `cellno_with_country_code_sha256`, `loginid_md5_uppercase`.

For example, if you called `setUserIdentities({ email_sha256_lowercase: '...' })`, you must pass `'email_sha256_lowercase'` (not `'email'`) to remove that entry.

See the [PII Identifier Key Reference](./setUserIdentities#pii-identifier-key-reference) for the full list of supported keys.

## Storage Cleared

Calling `unsetUserIdentities` removes the matching keys from the persisted identity profile in browser storage. Which storage is affected depends on your [`persistenceInCookieStorage`](../Configurations/persistenceInCookieStorage) configuration:

- **`persistenceInCookieStorage: false` (default):** identities are stored in `sessionStorage` under a key of the form `zpstorage_*identity`. The matching entries are removed from that key.
- **`persistenceInCookieStorage: true`:** identities are stored in cookies (named `zpstorage_*identity`). The matching cookies are cleared.

Once removed, the cleared identities will no longer appear in the `user` node of subsequent event payloads.

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| removedPropertyKeys | Array | Keys to remove. Each key must exactly match a key previously supplied to `setUserIdentities` — use raw keys (e.g., `email`, `cellno`, `loginid`) if raw identifiers were set, or the specific hashed key (e.g., `email_sha256_lowercase`) if pre-hashed identifiers were set. The corresponding entries are deleted from `sessionStorage` (`zpstorage_*identity`) or from cookies when [`persistenceInCookieStorage: true`](../Configurations/persistenceInCookieStorage) is configured. If omitted, all identities set via `setUserIdentities` are cleared. |
