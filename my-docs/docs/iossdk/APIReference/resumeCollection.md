---
sidebar_position: 7
title: Resume Collection
description: Resume event collection after it was paused.
---

# Resume Collection

The `resumeCollection` method restarts event collection if it was previously paused using the `pauseCollection` method.

## Syntax

```swift
Collect.getInstance()?.resumeCollection()
```

## Usage Example

```swift
// Resume data collection
Collect.getInstance()?.resumeCollection()
```

## Related Methods

- [pauseCollection](./pauseCollection) - Pause event collection