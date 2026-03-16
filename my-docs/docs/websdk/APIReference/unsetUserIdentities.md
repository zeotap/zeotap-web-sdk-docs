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

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| removedPropertyKeys | Array | If provided, only the keys specified in the array are removed. If not provided, all identities are cleared. |