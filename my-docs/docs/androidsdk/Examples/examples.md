---
sidebar_position: 1
title: Implementation Examples
---

# Android SDK Implementation Examples

This page provides practical examples of how to implement the Zeotap Android SDK in common app scenarios.

## Complete App Integration Example

### Application Setup

```java
import android.app.Application;
import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;

public class MainApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Configure and initialize Zeotap Collect SDK
        setupZeotapSDK();
    }

    private void setupZeotapSDK() {
        CollectOptions options = CollectOptions.builder(this)
            .credential(getWriteKeyForEnvironment())
            .enableLogging(BuildConfig.DEBUG)
            .build();

        Collect.init(options);

        // Set up initial user properties
        setInitialUserProperties();
    }

    private String getWriteKeyForEnvironment() {
        if (BuildConfig.DEBUG) {
            return "zt_android_dev_1234567890abcdef";
        }
        return "zt_android_prod_1234567890abcdef";
    }

    private void setInitialUserProperties() {
        Map<String, Object> userProperties = new HashMap<>();
        userProperties.put("appVersion", BuildConfig.VERSION_NAME);
        userProperties.put("deviceModel", Build.MODEL);
        userProperties.put("osVersion", Build.VERSION.RELEASE);

        Collect.getInstance().setUserProperties(userProperties);
    }
}
```

## E-commerce App Example

### Product Catalog Integration

```java
import com.zeotap.collect.Collect;

public class ProductListActivity extends AppCompatActivity {

    private List<Product> products;
    private String category;
    private long startTime;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Track screen view
        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("category", category);
        eventProps.put("productCount", products.size());

        Collect.getInstance().setEventProperties("Product List Viewed", eventProps);
    }

    @Override
    protected void onResume() {
        super.onResume();
        startTime = System.currentTimeMillis();
    }

    @Override
    protected void onPause() {
        super.onPause();
        long timeSpent = System.currentTimeMillis() - startTime;

        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("category", category);
        eventProps.put("timeSpentMs", timeSpent);

        Collect.getInstance().setEventProperties("Time Spent on Category", eventProps);
    }
}

public class ProductDetailActivity extends AppCompatActivity {

    private Product product;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Track product view
        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("productId", product.getId());
        eventProps.put("productName", product.getName());
        eventProps.put("category", product.getCategory());
        eventProps.put("price", product.getPrice());
        eventProps.put("currency", "USD");
        eventProps.put("brand", product.getBrand());
        eventProps.put("inStock", product.isInStock());

        Collect.getInstance().setEventProperties("Product Viewed", eventProps);
    }

    private void onAddToCartClicked() {
        CartManager.getInstance().addProduct(product);

        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("productId", product.getId());
        eventProps.put("productName", product.getName());
        eventProps.put("price", product.getPrice());
        eventProps.put("currency", "USD");
        eventProps.put("cartTotal", CartManager.getInstance().getTotal());
        eventProps.put("cartItemCount", CartManager.getInstance().getItemCount());

        Collect.getInstance().setEventProperties("Product Added to Cart", eventProps);
    }
}
```

### Purchase Flow

```java
public class CheckoutActivity extends AppCompatActivity {

    private void completePurchase(OrderData orderData) {
        try {
            PaymentResult result = processPayment(orderData);

            // Track successful purchase
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("orderId", result.getTransactionId());
            eventProps.put("totalAmount", orderData.getTotal());
            eventProps.put("currency", orderData.getCurrency());
            eventProps.put("itemCount", orderData.getItems().size());
            eventProps.put("paymentMethod", orderData.getPaymentMethod());

            Collect.getInstance().setEventProperties("Purchase Completed", eventProps);

        } catch (PaymentException e) {
            // Track failed purchase
            Map<String, Object> eventProps = new HashMap<>();
            eventProps.put("errorCode", e.getCode());
            eventProps.put("errorMessage", e.getMessage());
            eventProps.put("attemptedAmount", orderData.getTotal());

            Collect.getInstance().setEventProperties("Purchase Failed", eventProps);
        }
    }
}
```

## User Authentication Example

```java
import com.zeotap.collect.Collect;

public class AuthenticationManager {

    private static AuthenticationManager instance;

    public static AuthenticationManager getInstance() {
        if (instance == null) {
            instance = new AuthenticationManager();
        }
        return instance;
    }

    public void loginUser(String email, String password, AuthCallback callback) {
        apiLogin(email, password, (result) -> {
            if (result.isSuccess()) {
                handleSuccessfulLogin(result.getUser());
                callback.onSuccess(result.getUser());
            } else {
                handleFailedLogin(email, result.getError());
                callback.onFailure(result.getError());
            }
        });
    }

    private void handleSuccessfulLogin(User user) {
        // Set user identities
        Map<String, String> identities = new HashMap<>();
        identities.put("email", user.getEmail());
        identities.put("userId", user.getId());
        if (user.getPhoneNumber() != null) {
            identities.put("cellno", user.getPhoneNumber());
        }

        Collect.getInstance().setUserIdentities(identities);

        // Set user properties
        Map<String, Object> userProperties = new HashMap<>();
        userProperties.put("accountType", user.getAccountType());
        userProperties.put("signupDate", user.getSignupDate());
        userProperties.put("isVerified", user.isVerified());
        userProperties.put("subscription", user.getSubscription());

        Collect.getInstance().setUserProperties(userProperties);

        // Track login event
        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("method", "email_password");
        eventProps.put("isFirstTime", user.isFirstTimeLogin());

        Collect.getInstance().setEventProperties("User Logged In", eventProps);
    }

    private void handleFailedLogin(String email, Error error) {
        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("method", "email_password");
        eventProps.put("error", error.getMessage());
        eventProps.put("email", email.isEmpty() ? "empty" : "provided");

        Collect.getInstance().setEventProperties("Login Failed", eventProps);
    }

    public void logoutUser() {
        // Track logout
        Collect.getInstance().setEventProperties("User Logged Out");

        // Clear user identities
        Collect.getInstance().unSetUserIdentities();
    }
}
```

## Consent Management Implementation

### Custom Consent Dialog

```java
import com.zeotap.collect.Collect;

public class ConsentDialogFragment extends DialogFragment {

    private boolean analyticsConsent = false;
    private boolean marketingConsent = false;
    private boolean personalizationConsent = false;

    private void handleAcceptAll() {
        Map<String, Object> consent = new HashMap<>();
        consent.put("track", true);
        consent.put("identify", true);
        consent.put("analyticsConsent", true);
        consent.put("marketingConsent", true);
        consent.put("personalizationConsent", true);

        Collect.getInstance().setConsent(consent);
        dismiss();
    }

    private void handleRejectAll() {
        Map<String, Object> consent = new HashMap<>();
        consent.put("track", false);
        consent.put("identify", false);
        consent.put("analyticsConsent", false);
        consent.put("marketingConsent", false);
        consent.put("personalizationConsent", false);

        Collect.getInstance().setConsent(consent);
        dismiss();
    }

    private void handleCustomConsent() {
        Map<String, Object> consent = new HashMap<>();
        consent.put("track", analyticsConsent);
        consent.put("identify", analyticsConsent);
        consent.put("analyticsConsent", analyticsConsent);
        consent.put("marketingConsent", marketingConsent);
        consent.put("personalizationConsent", personalizationConsent);

        Collect.getInstance().setConsent(consent);
        dismiss();
    }
}
```

## Navigation Tracking

### Activity Lifecycle Tracking

```java
import com.zeotap.collect.Collect;

public class BaseActivity extends AppCompatActivity {

    @Override
    protected void onResume() {
        super.onResume();

        // Track screen view
        Map<String, Object> pageProperties = new HashMap<>();
        pageProperties.put("screen_name", getClass().getSimpleName());

        Collect.getInstance().setPageProperties(pageProperties);

        // Track navigation event
        Map<String, Object> eventProps = new HashMap<>();
        eventProps.put("screen_name", getClass().getSimpleName());
        eventProps.put("navigation_method", "app_navigation");

        Collect.getInstance().setEventProperties("screen_view", eventProps);
    }
}
```

## Best Practices Summary

1. **Initialize Early**: Set up the SDK in your Application's `onCreate()` method
2. **Page Context**: Always set page properties before tracking events
3. **Error Handling**: Implement callbacks for critical events
4. **Consent First**: Handle consent before any tracking
5. **Development vs Production**: Use different configs for different environments
6. **Consistent Naming**: Use same event names across platforms for cross-device tracking

---

For more detailed API documentation, see our [API Reference](../APIReferences/) section.
