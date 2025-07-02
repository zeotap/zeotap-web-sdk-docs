---
sidebar_position: 1
title: Implementation Examples
description: Practical examples and implementation patterns for the Zeotap React Native SDK.
---

# Implementation Examples

This guide provides practical examples and implementation patterns for common use cases with the Zeotap React Native SDK.

## Basic Setup Example

```javascript
// App.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { initialiseZeoCollect } from 'zeo-collect';

const App = () => {
    useEffect(() => {
        const options = {
            android_write_key: "YOUR_ANDROID_WRITE_KEY",
            ios_write_key: "YOUR_IOS_WRITE_KEY",
            batch_size: 30,
            service_interval: 90,
            use_consent: true,
            check_for_cmp: false
        };

        initialiseZeoCollect(options, (response) => {
            console.log('SDK initialized:', response);
        });
    }, []);

    return <YourAppContent />;
};
```

## E-commerce Implementation

### Product Tracking

```javascript
import { setEventProperties, setPageProperties } from 'zeo-collect';

const ProductScreen = ({ product }) => {
    useEffect(() => {
        // Set page context
        setPageProperties({
            page_title: "Product Details",
            category: product.category,
            product_id: product.id
        });

        // Track product view
        setEventProperties("product_viewed", {
            product_id: product.id,
            product_name: product.name,
            category: product.category,
            price: product.price,
            currency: "USD",
            availability: product.inStock ? "in_stock" : "out_of_stock"
        });
    }, [product]);

    const handleAddToCart = () => {
        setEventProperties("add_to_cart", {
            product_id: product.id,
            quantity: 1,
            price: product.price,
            cart_total: calculateCartTotal()
        });
    };

    return (
        <View>
            <ProductDetails product={product} />
            <Button title="Add to Cart" onPress={handleAddToCart} />
        </View>
    );
};
```

### Purchase Flow

```javascript
const CheckoutScreen = () => {
    const handlePurchase = async (orderData) => {
        try {
            const result = await processPayment(orderData);
            
            // Track successful purchase
            setEventProperties("purchase_completed", {
                transaction_id: result.transactionId,
                revenue: orderData.total,
                currency: orderData.currency,
                items: orderData.items.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                payment_method: orderData.paymentMethod
            });
        } catch (error) {
            // Track failed purchase
            setEventProperties("purchase_failed", {
                error_code: error.code,
                error_message: error.message,
                attempted_amount: orderData.total
            });
        }
    };
};
```

## User Authentication

### Login/Registration

```javascript
import { setUserIdentities, setUserProperties, setEventProperties } from 'zeo-collect';

const AuthService = {
    login: async (credentials) => {
        try {
            const user = await apiLogin(credentials);
            
            // Set user identities
            setUserIdentities({
                email: user.email,
                loginid: user.username,
                cellno: user.phone
            });

            // Set user properties
            setUserProperties({
                user_tier: user.subscriptionTier,
                registration_date: user.createdAt,
                last_login: new Date().toISOString()
            });

            // Track login event
            setEventProperties("user_login", {
                login_method: "email",
                user_tier: user.subscriptionTier
            });

            return user;
        } catch (error) {
            setEventProperties("login_failed", {
                error_type: error.type,
                login_method: "email"
            });
            throw error;
        }
    },

    logout: () => {
        // Clear user identities
        unSetUserIdentities();
        
        // Track logout
        setEventProperties("user_logout");
    }
};
```

## Consent Management Implementation

### Custom Consent Dialog

```javascript
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { setConsent, listenToAskForConsent } from 'zeo-collect';

const ConsentModal = () => {
    const [visible, setVisible] = useState(false);
    const [consentTypes, setConsentTypes] = useState({
        analytics: false,
        marketing: false,
        personalization: false
    });

    useEffect(() => {
        // Listen for consent requests
        listenToAskForConsent(() => {
            setVisible(true);
        });
    }, []);

    const handleAcceptAll = () => {
        const consent = {
            track: true,
            identify: true,
            analyticsConsent: true,
            marketingConsent: true,
            personalizationConsent: true
        };

        setConsent(consent, (response) => {
            console.log('Consent set:', response);
            setVisible(false);
        });
    };

    const handleRejectAll = () => {
        const consent = {
            track: false,
            identify: false,
            analyticsConsent: false,
            marketingConsent: false,
            personalizationConsent: false
        };

        setConsent(consent);
        setVisible(false);
    };

    const handleCustomConsent = () => {
        const consent = {
            track: consentTypes.analytics,
            identify: consentTypes.analytics,
            analyticsConsent: consentTypes.analytics,
            marketingConsent: consentTypes.marketing,
            personalizationConsent: consentTypes.personalization
        };

        setConsent(consent);
        setVisible(false);
    };

    return (
        <Modal visible={visible} transparent>
            <View style={styles.modalContainer}>
                <View style={styles.consentDialog}>
                    <Text style={styles.title}>Privacy Preferences</Text>
                    <Text>We value your privacy. Please choose your data preferences:</Text>
                    
                    {/* Custom consent toggles */}
                    <ConsentToggle 
                        label="Analytics" 
                        value={consentTypes.analytics}
                        onToggle={(value) => setConsentTypes(prev => ({...prev, analytics: value}))}
                    />
                    
                    <View style={styles.buttonContainer}>
                        <Button title="Accept All" onPress={handleAcceptAll} />
                        <Button title="Reject All" onPress={handleRejectAll} />
                        <Button title="Save Preferences" onPress={handleCustomConsent} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
```

## Navigation Tracking

### React Navigation Integration

```javascript
import { setPageProperties, setEventProperties } from 'zeo-collect';
import { useNavigationState } from '@react-navigation/native';

const NavigationTracker = () => {
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        if (navigationState) {
            const currentRoute = getCurrentRoute(navigationState);
            
            // Track page view
            setPageProperties({
                screen_name: currentRoute.name,
                screen_params: JSON.stringify(currentRoute.params || {}),
                navigation_stack: getNavigationStack(navigationState)
            });

            // Track navigation event
            setEventProperties("screen_view", {
                screen_name: currentRoute.name,
                previous_screen: getPreviousScreen(navigationState),
                navigation_method: "app_navigation"
            });
        }
    }, [navigationState]);

    return null;
};

// Add to your App component
const App = () => {
    return (
        <NavigationContainer>
            <NavigationTracker />
            <YourNavigationStack />
        </NavigationContainer>
    );
};
```

## Performance Monitoring

### App State Tracking

```javascript
import { AppState } from 'react-native';
import { setEventProperties } from 'zeo-collect';

const AppStateTracker = () => {
    useEffect(() => {
        const handleAppStateChange = (nextAppState) => {
            setEventProperties("app_state_change", {
                app_state: nextAppState,
                timestamp: new Date().toISOString()
            });
        };

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription?.remove();
    }, []);

    return null;
};
```

### Error Tracking

```javascript
import { setEventProperties } from 'zeo-collect';

const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    const handleError = (error, errorInfo) => {
        setHasError(true);
        
        // Track error
        setEventProperties("app_error", {
            error_message: error.message,
            error_stack: error.stack,
            component_stack: errorInfo.componentStack,
            timestamp: new Date().toISOString()
        });
    };

    if (hasError) {
        return <ErrorFallback />;
    }

    return children;
};
```

## Advanced Configuration

### Environment-Based Setup

```javascript
const getSDKConfig = () => {
    const baseConfig = {
        android_write_key: Config.ANDROID_WRITE_KEY,
        ios_write_key: Config.IOS_WRITE_KEY,
    };

    if (__DEV__) {
        return {
            ...baseConfig,
            logging: true,
            batch_size: 10,
            service_interval: 30
        };
    }

    return {
        ...baseConfig,
        logging: false,
        batch_size: 50,
        service_interval: 120,
        max_cache_size: 200
    };
};

// Initialize with environment config
initialiseZeoCollect(getSDKConfig());
```

## Testing and Debugging

### Development Helpers

```javascript
const DebugPanel = () => {
    const [events, setEvents] = useState([]);

    const trackTestEvent = () => {
        const testEvent = {
            event_name: "test_event",
            timestamp: new Date().toISOString(),
            test_data: "debug_value"
        };

        setEventProperties("debug_test", testEvent, (response) => {
            setEvents(prev => [...prev, { ...testEvent, response }]);
        });
    };

    if (!__DEV__) return null;

    return (
        <View style={styles.debugPanel}>
            <Button title="Send Test Event" onPress={trackTestEvent} />
            <ScrollView>
                {events.map((event, index) => (
                    <Text key={index}>{JSON.stringify(event, null, 2)}</Text>
                ))}
            </ScrollView>
        </View>
    );
};
```

## Best Practices Summary

1. **Initialize Early**: Set up the SDK in your app's entry point
2. **Page Context**: Always set page properties before tracking events
3. **Error Handling**: Implement callbacks for critical events
4. **Consent First**: Handle consent before any tracking
5. **Batch Optimization**: Configure batch sizes based on your app's usage patterns
6. **Development vs Production**: Use different configs for different environments

---

For more detailed API documentation, see our [API Reference](../APIReference/) section.