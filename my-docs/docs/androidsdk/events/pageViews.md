---
sidebar_position: 1
title: Tracking Page Views
---

# Page Tracking

Learn how to track page views and user navigation in your Android application using the Zeotap Android SDK.

## Overview

Page tracking allows you to monitor user navigation patterns and attach page-specific context to all events that occur within that page. When you set page properties, all subsequent user events on the same page will automatically include these page properties.

## Basic Page Tracking

### Setting Page Properties

Use the `setPageProperties()` method to track when users view different pages in your app:

```java
import com.zeotap.collect.Collect;

// Create page properties
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Product");

// Set the page properties
Collect.getInstance().setPageProperties(pageProperties);
```

### Method Signature

```java
void setPageProperties(Map<String, ?> pageProperties, SDKCallback cb)
```

**Parameters:**
- `pageProperties` (required): Object containing page-specific properties
- `cb` (optional): Callback function to handle the response

## Implementation Examples

### Example 1: Product Page

```java
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Product");
pageProperties.put("category", "Electronics");
pageProperties.put("productId", "12345");

Collect.getInstance().setPageProperties(pageProperties);
```

### Example 2: Category Page

```java
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Category");
pageProperties.put("categoryLevel1", "Electronics");
pageProperties.put("categoryLevel2", "Smartphones");

Collect.getInstance().setPageProperties(pageProperties);
```

### Example 3: Home Page

```java
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Home");

Collect.getInstance().setPageProperties(pageProperties);
```

## Page Properties

### Standard Page Names

The following page names are recommended for consistency:

| Page Name | Description |
|-----------|-------------|
| `Home` | Main/landing page of the app |
| `Product` | Individual product detail pages |
| `Category` | Product category/listing pages |
| `Search` | Search results pages |
| `Cart` | Shopping cart page |
| `Checkout` | Checkout/payment pages |
| `Profile` | User profile pages |

### Custom Properties

You can add any custom properties relevant to your page:

```java
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Product");
pageProperties.put("productCategory", "Electronics");
pageProperties.put("brand", "Samsung");
pageProperties.put("price", 599.99);
pageProperties.put("inStock", true);

Collect.getInstance().setPageProperties(pageProperties);
```

## Best Practices

### 1. Set Page Properties Early

Always call `setPageProperties()` when a page loads and before tracking any events:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_product);
    
    // Set page properties first
    Map<String, Object> pageProperties = new HashMap<>();
    pageProperties.put("name", "Product");
    Collect.getInstance().setPageProperties(pageProperties);
    
    // Then track other events
    trackPageView();
}
```

### 2. Update Properties on Navigation

Update page properties whenever the user navigates to a different page:

```java
// In your navigation logic
private void navigateToCategory(String category) {
    Map<String, Object> pageProperties = new HashMap<>();
    pageProperties.put("name", "Category");
    pageProperties.put("category", category);
    
    Collect.getInstance().setPageProperties(pageProperties);
    
    // Navigate to the new page
    startActivity(new Intent(this, CategoryActivity.class));
}
```

### 3. Handle Dynamic Content

For pages with dynamic content, update properties when the content changes:

```java
private void loadProductDetails(String productId) {
    // Update page properties with new product info
    Map<String, Object> pageProperties = new HashMap<>();
    pageProperties.put("name", "Product");
    pageProperties.put("productId", productId);
    pageProperties.put("lastUpdated", System.currentTimeMillis());
    
    Collect.getInstance().setPageProperties(pageProperties);
}
```

## Event Integration

Once page properties are set, all subsequent events will automatically include the page context:

```java
// Set page properties
Map<String, Object> pageProperties = new HashMap<>();
pageProperties.put("name", "Product");
pageProperties.put("productId", "12345");
Collect.getInstance().setPageProperties(pageProperties);

// This event will automatically include the page properties
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("buttonName", "Add to Cart");
Collect.getInstance().setEventProperties("Button Click", eventProperties);
```

## Important Notes

:::warning Default Behavior
If page properties are not defined, no page property will be available in the event payload by default.
:::

:::tip Property Persistence
Page properties persist for all events until new page properties are set. Make sure to update them when navigating between different pages.
:::

## Troubleshooting

### Page Properties Not Appearing

If page properties aren't showing up in your events:

1. Ensure you're calling `setPageProperties()` before other events
2. Verify the page properties object is properly constructed
3. Check that you're not overriding properties with empty objects

### Memory Considerations

Page properties are stored in memory, so avoid setting extremely large objects or too many properties per page.

## Next Steps

- Learn about [Event Tracking](./event-tracking.md) to track user actions
- Explore [User Identification](./user-identification.md) to identify your users
- Check out [SDK Configuration](./configuration.md) for advanced settings