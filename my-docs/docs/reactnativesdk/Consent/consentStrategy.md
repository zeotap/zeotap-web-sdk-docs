---
sidebar_position: 1
title: Choosing a Consent Strategy
description: Understand the different ways to manage user consent with the Zeotap React Native SDK and choose the best approach for your needs.
---

# Choosing Your Consent Management Strategy

Integrating a Consent Management Platform (CMP) or handling user consent is crucial for compliance with privacy regulations like GDPR, CCPA, and other data protection laws. The Zeotap React Native SDK offers flexibility in how you manage and communicate user consent choices across both iOS and Android platforms.

## Understanding the Core Concept

The primary goal is to ensure that the Zeotap SDK only collects and processes user data when you have obtained the necessary consent from the user. The SDK needs to know whether consent has been given for specific purposes (like analytics, personalization, advertising) before it activates its tracking and data collection features.

## Available Strategies

### 1. No Explicit Consent Management (Default Behavior)

*   **How it works:** You initialize the SDK without any specific consent configuration (`use_consent: false`). The SDK assumes consent is granted and starts tracking immediately upon initialization.
*   **When to use:** Only suitable if your app does not fall under regulations requiring explicit user consent (e.g., purely informational apps with no user tracking, or apps operating exclusively outside jurisdictions like the EU). **This is generally not recommended for most modern mobile applications.**
*   **Pros:** Simplest setup with minimal configuration.
*   **Cons:** High risk of non-compliance with privacy regulations like GDPR/CCPA. Lack of user control over data collection.

```javascript
// Default behavior - no consent management
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: false  // Default
};

initialiseZeoCollect(options);
```

### 2. Using a TCF v2.2 Compatible Consent Management Platform (CMP)

*   **How it works:** You integrate a third-party CMP (like OneTrust, TrustArc, Didomi, Sourcepoint, etc.) that adheres to the IAB Transparency and Consent Framework (TCF) v2.2 standard. The Zeotap SDK automatically detects the TCF data stored by the CMP, reads the user's consent choices, and acts accordingly.
*   **When to use:**
    *   You operate in regions covered by GDPR or similar regulations requiring granular consent.
    *   You use other advertising or marketing technologies that also rely on the TCF standard.
    *   You want a robust, standardized way to manage consent across multiple vendors.
*   **Implementation:**
    *   Implement your chosen TCF v2.2 compliant CMP in your React Native app.
    *   Configure the Zeotap SDK with `use_consent: true` and `check_for_cmp: true`.
    *   Optionally specify `purposes_for_tracking` to define which TCF purposes are required for tracking.
    *   The SDK will automatically read TCF consent data stored by the CMP. No specific `setConsent` call is usually needed unless you have custom requirements.
*   **Pros:** Industry standard, widely supported, handles complex consent strings, integrates with multiple vendors.
*   **Cons:** Requires integrating and potentially paying for a third-party CMP.

```javascript
// TCF CMP integration
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: true,
    purposes_for_tracking: [1, 3, 4], // Store/access info, personalization, content selection
    check_zeotap_vendor_consent: true // Optional: also check vendor consent
};

initialiseZeoCollect(options);
```

### 3. Using the `setConsent` API (Manual/Custom Implementation)

*   **How it works:** You implement your own consent mechanism (e.g., a custom consent dialog or integration with a non-TCF CMP). When a user provides or updates their consent preferences, you explicitly call the `setConsent()` method, passing the user's choices.
*   **When to use:**
    *   You have a custom-built consent UI or system.
    *   You are using a CMP that doesn't support TCF v2.2 but provides its own API to access consent status.
    *   You need fine-grained control over when and how consent information is passed to the Zeotap SDK.
    *   You want to implement a simple opt-in/opt-out mechanism.
*   **Implementation:**
    *   Build or integrate your consent UI/mechanism.
    *   Configure the SDK with `use_consent: true` and `check_for_cmp: false`.
    *   When the user makes a choice (e.g., taps "Accept All", "Reject All", or customizes settings), retrieve the consent status.
    *   Call `setConsent()` with the appropriate consent data.
*   **Pros:** Flexible, allows integration with any system, full control over user experience.
*   **Cons:** Requires more development effort to build and maintain the consent logic and UI. You are responsible for correctly interpreting and translating consent signals.

```javascript
// Custom consent management
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: false
};

initialiseZeoCollect(options);

// Later, when user provides consent
import { setConsent } from 'zeo-collect';

setConsent({
    track: true,
    identify: true
});

// Or when user denies consent
setConsent({
    track: false,
    identify: false
});
```

## Key Considerations

*   **Timing:** Ensure the consent mechanism completes user input *before* the Zeotap SDK sends tracking calls. The SDK can queue events until consent is determined.
*   **Updates:** Your implementation should handle changes in user consent preferences over time. If a user revokes consent, subsequent tracking calls will be blocked. Both TCF CMPs and the `setConsent` method support updating consent status.
*   **Region-Specific Logic:** You might need different consent mechanisms or defaults depending on the user's geographic location (e.g., GDPR for EU users). Your app logic needs to handle this.
*   **Platform Consistency:** Ensure consent behavior is consistent across iOS and Android platforms in your React Native app.

## Configuration Examples

### Basic Opt-Out Implementation
```javascript
// Simple opt-out mechanism
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    opt_out: false // Allow tracking by default
};

// If user opts out later, reinitialize with opt_out: true
```

### Custom Consent with Brand Permissions
```javascript
// Custom consent with additional brand consents
const options = {
    android_write_key: "YOUR_ANDROID_WRITE_KEY",
    ios_write_key: "YOUR_IOS_WRITE_KEY",
    use_consent: true,
    check_for_cmp: false
};

initialiseZeoCollect(options);

// When user grants consent
setConsent({
    track: true,
    identify: true,
    newsletterOptIn: true,
    personalizationConsent: false,
    marketingConsent: true
});
```

## Related Documentation

- [Consent Configuration Options](../Configurations/configurations) - Detailed configuration options for consent management
- [Set Consent API](../APIReference/setConsent) - API reference for managing user consent
- [SDK Configuration Guide](../Configurations/configurations) - General SDK configuration guide