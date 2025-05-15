---
sidebar_position: 1
title: Examples
description: A summary of available code examples demonstrating various Zeotap SDK features and configurations.
---

# Examples

This page provides a central index for various code examples demonstrating how to implement and configure the Zeotap Web SDK for different use cases. Each example includes a link to the relevant code or a live demonstration page.

You can use these examples as a starting point and reference for your own implementation. Remember to replace `"YOUR_WRITE_KEY"` with your actual Zeotap Write Key when testing these examples locally.

| Use Case                          | Description                                                                 | Link                                                                                             |
| :-------------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| **Quick Start**                   | Basic SDK integration and core functionalities (identify, track page/event). | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples" target="_blank">View Example</a>                           |
| **setUserIdentities (Raw PII)**   | Send raw, unhashed user identifiers (like email) directly to Zeotap.        | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/rawPIIs" target="_blank">View Example</a>                |
| **setUserIdentities (Hashed PII)**| Send pre-hashed user identifiers (like SHA-256 email) to the SDK.           | <a href="/https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/preHashedPIIs" target="_blank">View Example</a>             |
| **setUserIdentities (SDK Hashing)**| Send raw identifiers and have the SDK perform the hashing client-side.      | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/setUserIdentities/PIIshasingBySDK" target="_blank">View Example</a>        |
| **setEventProperties**            | Track specific user actions or events (e.g., 'AddToCart').                  | <a href="/examples/quickStartEx.html" target="_blank">View Example</a>                           |
| **setPageProperties**             | Send details about the current page being viewed by the user.               | <a href="/examples/quickStartEx.html" target="_blank">View Example</a>                           |
| **setConsent (Default)**          | SDK's default behavior when no specific consent mechanism is configured.    | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/consent/defaultConsent" target="_blank">View Example</a>                      |
| **setConsent (Custom)**           | Manually manage user consent using the `setConsent` API call.               | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/consent/customConsent" target="_blank">View Example</a>                       |
| **setConsent (GDPR/TCF)**         | How the SDK integrates with TCF 2.0 Consent Management Platforms (CMPs).    | <a href="/examples/consent_gdprEx.html" target="_blank">View Example</a>                         |
| **persistenceInCookieStorage**    | Control where the data is stamped                                           | <a href="https://github.com/rishabh-zeo/zeotap-web-sdk-docs/tree/master/my-docs/static/examples/configurations/persistenceInCookieStorage" target="_blank">View Example</a> |
