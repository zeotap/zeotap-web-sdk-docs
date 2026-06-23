---
title: Adobe Launch Integration Overview
sidebar_position: 0
description: Learn how to integrate the Zeotap Collect Tag using Adobe Experience Platform Tags (Adobe Launch) with support for consent, identity tracking, and event capture.
---

# Adobe Launch Integration Overview

The **Zeotap Collect Tag Extension** for **Adobe Experience Platform Tags (Adobe Launch)** allows you to seamlessly capture user events, identities, and consent signals from your website. This data flows directly into the Zeotap Customer Intelligence Platform and powers downstream use cases such as activation, identity resolution, analytics, and more.

Adobe Launch is a tag management system that helps manage and deploy marketing and analytics tags. The Zeotap extension is available in the Adobe Tags Extension catalog and supports a wide range of features, including:

- Event tracking (page views, custom events, etc.)
- Identity syncing (raw or hashed PII)
- Consent management (TCF, custom, default)
- ID5 integration
- Cookie syncing

---

## Why Use Adobe Launch with Zeotap?

- **No-code deployment**: Configure tag rules visually without coding.
- **Consent-aware**: Fully supports GDPR, TCF 2.0, and custom consent workflows.
- **Modular rules**: Fine-grained control using Adobe's Event → Condition → Action rule engine.
- **Extensible**: Works with Adobe Analytics, CMPs, and third-party tools like ID5.

---

## Key Capabilities of the Zeotap Collect Extension

| Feature                    | Description |
|----------------------------|-------------|
| **Event Tracking**         | Capture user interactions like page views, product clicks, form submissions, etc. Learn more about [tracking events](/adobeLaunch/docs/Actions/trackEvents). |
| **User Identity Capture**  | Collect raw or hashed PII and custom IDs like ECID, CRM ID. See our guide on [syncing user identities](/adobeLaunch/docs/Actions/syncUserIdentity). |
| **Consent Management**     | Supports GDPR/TCF, default opt-in, and custom flows via `Set Custom Consent`. Learn about [setting custom consent](/adobeLaunch/docs/Actions/setCustomConsent). |
| **Cookie Syncing**         | Enabled by default for all partner platforms. To restrict or disable reach out to Zeotap represtative or Zeotap Support. |
| **ID5 Integration**        | Capture ID5 identifiers for identity enrichment. |

---

## What You'll Learn in This Guide

This guide walks you through:

1. [Installing](/adobeLaunch/docs/installation) the Zeotap Collect Extension in Adobe Launch
2. [Configuring](/adobeLaunch/docs/configure) core settings like consent method, write key, and identity handling
3. Creating Rules to use Zeotap Extensions [Actions](/adobeLaunch/docs/Actions/) to:
   - [Track Events](/adobeLaunch/docs/Actions/trackEvents)
   - [Sync User Identities](/adobeLaunch/docs/Actions/syncUserIdentity)
   - [Track Consent](/adobeLaunch/docs/Actions/setCustomConsent) (Custom Consent)

Each step includes relevant Adobe Launch UI references, screenshots, and real implementation examples.

---

## Understanding Adobe Launch Terminology

Before diving into the Zeotap integration, it's helpful to understand some core Adobe Launch concepts:

*   **Tags:** "Tags" in Adobe Launch is the overall system that allows you to build and maintain your own integrations through components called extensions. These extensions are available to Adobe Experience Cloud customers in an app-store-like experience, enabling them to quickly install, configure, and deploy various tracking and marketing technologies. [Learn more about Tags](https://experienceleague.adobe.com/en/docs/experience-platform/tags/home)

*   **Extensions:** An extension is a package of code (JavaScript, HTML, and CSS) that extends the functionality of Adobe Launch. Think of extensions as apps or plugins that you install into your Launch property to add specific capabilities, like the Zeotap Collect Extension. [Learn more about Extensions.](https://experienceleague.adobe.com/en/docs/experience-platform/tags/ui/extensions/overview)

*   **Rules:** Rules are the heart of Adobe Launch, defining the logic for when and how your tags and extensions should behave. They follow an 'if/then' structure, combining Events (triggers), Conditions (optional criteria), and Actions (what to do, e.g., fire the Zeotap tag). [Learn more about Rules](https://experienceleague.adobe.com/en/docs/experience-platform/tags/ui/rules)

*   **Data Elements:** Data Elements are variables you create in Launch to point to specific pieces of information on your website (e.g., from cookies, JavaScript variables, DOM elements, or query parameters). They act as a data dictionary for your site and can be used to dynamically populate fields when configuring Rules and Actions, ensuring your tags send the correct, context-specific data. [Learn more about Data Elements](https://experienceleague.adobe.com/en/docs/experience-platform/tags/ui/data-elements).

---
