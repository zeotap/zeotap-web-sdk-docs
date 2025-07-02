---
sidebar_position: 6
title: Remove User Identities
description: Clear user identities from storage.
---

# Remove User Identities

The `unSetUserIdentities` method removes user identities that were set using the `setUserIdentities` method.

## Syntax

```javascript
unSetUserIdentities()
```

## Usage Example

```javascript
import { unSetUserIdentities } from 'zeo-collect';

// Clear user identities on logout
const handleLogout = () => {
    unSetUserIdentities();
    console.log("User identities cleared");
};
```

## Related Methods

- [setUserIdentities](./setUserIdentities) - Set user identities