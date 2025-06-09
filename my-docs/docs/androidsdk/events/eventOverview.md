# Event Tracking Overview

Events are user actions that occur within your Android application. The Zeotap Android SDK provides powerful event tracking capabilities to help you understand user behavior and journey through your app.

## What are Events?

Events represent specific actions users take in your app, such as:
- Viewing a product
- Adding items to cart
- Completing a purchase
- Logging in
- Navigating between screens

## Event Types

The SDK supports two main types of events:

### 1. System Events
Predefined events that the SDK automatically tracks for essential user interactions:

| Event Name | Description | When Triggered |
|------------|-------------|----------------|
| Set consent | User sets consent for the first time | First app launch with consent |
| Update consent | User changes their consent preferences | Consent modification |
| Set identities | User logs into the application | User login |
| Update identities | User modifies their identity information | Profile updates |

### 2. Custom Events
User-defined events specific to your application's unique requirements. Few examples could be:

| Event Example | Description | Use Case |
|---------------|-------------|----------|
| Add to cart | User adds item to shopping cart | E-commerce tracking |
| Remove from cart | User removes item from cart | Cart abandonment analysis |
| Complete purchase | User completes transaction | Conversion tracking |
| View product | User views product details | Product engagement |

## Event Structure

Every event consists of:

- **Event Name**: A string identifier for the action
- **Event Properties**: Key-value pairs providing additional context
- **Timestamp**: Automatically added by the SDK

## Getting Started

To start tracking events, you'll need to:

1. [Implement user identification](./user-identification)
2. [Configure page properties](./page-tracking) 
3. [Track user actions](./user-actions)


## Best Practices

- Use descriptive event names that clearly indicate the action
- Include relevant properties to provide context
- Be consistent with naming conventions
- Avoid tracking sensitive information in event properties
- Test your event implementation before deploying to production

:::tip
Start with basic events and gradually add more detailed tracking as your analytics needs grow.
:::