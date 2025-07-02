---
sidebar_position: 6
title: Pause Collection
description: Temporarily suspend event collection.
---

# Pause Collection

The `pauseCollection` method temporarily suspends the SDK from collecting events for user actions.

## Syntax

```swift
Collect.getInstance()?.pauseCollection()
```

## Usage Example

```swift
// Pause data collection
Collect.getInstance()?.pauseCollection()
```

## Related Methods

- [resumeCollection](./resumeCollection) - Resume event collection