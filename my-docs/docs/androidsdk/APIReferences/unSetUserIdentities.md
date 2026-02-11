---
sidebar_position: 8
title: Remove User Identities
description: Clear user identities from storage.
---

# Remove User Identities

The `unSetUserIdentities` method removes user identities that were set using the `setUserIdentities` method.

## Syntax

```java
Collect.getInstance().unSetUserIdentities()
```

## Usage Example

```java
// Clear user identities on logout
private void handleLogout() {
    Collect.getInstance().unSetUserIdentities();
    Log.d("ZeotapSDK", "User identities cleared");
}
```

## Related Methods

- [setUserIdentities](./setUserIdentities) - Set user identities
