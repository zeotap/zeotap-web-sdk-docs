---
sidebar_position: 1
title: Choosing a Consent Strategy
description: Understand the different ways to manage user consent with the Zeotap Web SDK and choose the best approach for your needs.
---

TODO: recheck content for this!!

# Choosing Your Consent Management Strategy

Integrating a Consent Management Platform (CMP) or handling user consent is crucial for compliance with privacy regulations like GDPR. The Zeotap Web SDK offers flexibility in how you manage and communicate user consent choices. This guide helps you choose the best approach for your implementation.

## Understanding the Core Concept

The primary goal is to ensure that the Zeotap SDK only collects and processes user data when you have obtained the necessary consent from the user. The SDK needs to know whether consent has been given for specific purposes (like analytics, personalization, advertising) before it activates its tracking and data collection features.

## Available Strategies

### 1. No Explicit Consent Management (Default Behavior)

*   **How it works:** You initialize the SDK without any specific consent configuration. The SDK assumes consent is granted and starts tracking immediately upon loading.
*   **When to use:** Only suitable if your website/application does not fall under regulations requiring explicit user consent (e.g., purely informational sites with no user tracking, or sites operating exclusively outside jurisdictions like the EU). **This is generally not recommended for most modern websites.**
*   **Pros:** Simplest setup.
*   **Cons:** High risk of non-compliance with privacy regulations like GDPR. Lack of user control.

### 2. Using a TCF v2.2 Compatible Consent Management Platform (CMP)

*   **How it works:** You integrate a third-party CMP (like OneTrust, TrustArc, Didomi, Sourcepoint, etc.) that adheres to the IAB Transparency and Consent Framework (TCF) v2.2 standard. The Zeotap SDK automatically detects the TCF API provided by the CMP, reads the user's consent choices, and acts accordingly.
*   **When to use:**
    *   You operate in regions covered by GDPR or similar regulations requiring granular consent.
    *   You use other advertising or marketing technologies that also rely on the TCF standard.
    *   You want a robust, standardized way to manage consent across multiple vendors.
*   **Implementation:**
    *   Implement your chosen TCF v2.2 compliant CMP on your website.
    *   Initialize the Zeotap SDK *after* the CMP's stub file has loaded (often placed high in the `<head>`).
    *   The SDK will automatically listen for TCF API signals (`addEventListener` for `__tcfapi`) to get consent status. No specific `setConsent` call is usually needed unless you have very custom requirements.
*   **Pros:** Industry standard, widely supported, handles complex consent strings, often provides UI/UX for consent collection.
*   **Cons:** Requires integrating and potentially paying for a third-party CMP.

### 3. Using the `setConsent` API (Manual/Custom Implementation)

*   **How it works:** You implement your own consent mechanism (e.g., a custom banner or integration with a non-TCF CMP). When a user provides or updates their consent preferences, you explicitly call the `window.zeotap.setConsent({...})` function, passing the user's choices.
*   **When to use:**
    *   You have a custom-built consent banner or system.
    *   You are using a CMP that doesn't support TCF v2.2 but provides its own API to access consent status.
    *   You need fine-grained control over when and how consent information is passed to the Zeotap SDK.
*   **Implementation:**
    *   Build or integrate your consent UI/mechanism.
    *   When the user makes a choice (e.g., clicks "Accept All", "Reject All", or customizes settings), retrieve the consent status.
    *   Translate this status into the format expected by `setConsent` (e.g., `{ "track": "true" }`).
    *   Call `window.zeotap.setConsent()` with the appropriate object.
*   **Pros:** Flexible, allows integration with any system.
*   **Cons:** Requires more development effort to build and maintain the consent logic and UI. You are responsible for correctly interpreting and translating consent signals.

TODO: is it needed? 
## Decision Flow

1.  **Are you subject to GDPR or similar privacy regulations?**
    *   **Yes:** You MUST implement a consent mechanism. Proceed to step 2.
    *   **No:** You *could* use the default behavior, but implementing consent is still best practice for user trust. Consider options 2 or 3 for future-proofing.

2.  **Are you already using or planning to use a TCF v2.2 compliant CMP for other vendors?**
    *   **Yes:** This is likely your best option. Integrate the CMP and let the Zeotap SDK automatically detect the TCF signals.
    *   **No:** Proceed to step 3.

3.  **Do you need fine-grained control over the consent mechanism, or are you using a non-TCF CMP?**
    *   **Yes:** Use the `setConsent` API (Option 3). You will need to build the logic to capture user consent and pass it to the SDK.
    *   **No (and you don't want to use a TCF CMP):** Re-evaluate if you truly don't need a CMP. If you only need simple "all or nothing" consent, the `setConsent` API with `{ "track": true/false }` might suffice, but ensure this meets legal requirements in your operating regions.

## Key Considerations

*   **Timing:** Ensure the consent mechanism loads and potentially gets user input *before* the Zeotap SDK initializes fully or sends tracking calls. Many CMPs handle this automatically or provide callbacks.
*   **Updates:** Your implementation should handle changes in user consent preferences over time. If a user revokes consent, subsequent tracking calls will be blocked. Both TCF CMPs and the `setConsent` method support updating consent status.
*   **Region-Specific Logic:** You might need different consent mechanisms or defaults depending on the user's geographic location (e.g., GDPR for EU users). Your website logic needs to handle this.

By carefully considering your regulatory requirements, technical infrastructure, and desired user experience, you can choose the most appropriate consent management strategy for integrating the Zeotap Web SDK. Using a TCF v2.2 compliant CMP (Option 2) is often the most robust and future-proof solution for businesses operating internationally.
