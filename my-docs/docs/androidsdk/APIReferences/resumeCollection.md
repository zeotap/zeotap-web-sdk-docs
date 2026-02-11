---
sidebar_position: 10
title: Resume Collection
description: Resume event collection after it was paused.
---

# Resume Collection

The `resumeCollection` method restarts event collection if it was previously paused using the `pauseCollection` method.

## Syntax

```java
Collect.getInstance().resumeCollection()
```

## Usage Example

```java
// Resume data collection
Collect.getInstance().resumeCollection();
```

## Related Methods

- [pauseCollection](./pauseCollection) - Pause event collection
