---
sidebar_position: 8
title: Remove User Identities
description: Clear user identities from storage.
---

# Remove User Identities

The `unSetUserIdentities` method removes user identities that were set using the `setUserIdentities` method.

## Syntax

```swift
Collect.getInstance()?.unSetUserIdentities()
```

## Usage Example

```swift
// Clear user identities on logout
func handleLogout() {
    Collect.getInstance()?.unSetUserIdentities()
    print("User identities cleared")
}
```

## Related Methods

- [setUserIdentities](./setUserIdentities) - Set user identities