---
sidebar_position: 2
title: Quick Start
description: Step-by-step guide to integrate the Zeotap React Native SDK in your application.
---

# Quick Start Guide

Get started with the Zeotap React Native SDK in just a few steps. This guide will walk you through the complete integration process.

## Prerequisites

Before you begin, ensure you have:
- Created Android and iOS sources in the Zeotap CDP account
- Obtained write_keys for both platforms. [How to obtain a write key?](./Configurations/writeKey)
- React Native development environment set up

## Integration Steps

### Install the Package

Run the following command from your project's root directory:

```bash
npm install zeo-collect
```

Verify the installation by checking your `package.json` file for the zeo-collect package in the dependencies section.

### Set up Android

Configure the Zeotap Android SDK using the Dependency Manager:

#### Configure Repositories

Add the Maven URL to your project-level `build.gradle` or `settings.gradle` file:

```gradle
repositories {       
    google()     
    maven {                  
        url 'https://sdk.zeotap.com/android-sdk'        
    } 
}
```

#### Add Dependencies

In your app-level `build.gradle` file, add the following dependencies:

```gradle
dependencies {     
    implementation "com.zeotap:zeo-collect:2.2.8"
    
    // For Android 13+ (AdID support)
    implementation "com.google.android.gms:play-services-ads:20.4.0"
    
    // JSON support (if not already included)
    implementation "com.google.code.gson:gson:2.10.1"
}
```

#### Configure Compile Options

Add compile options to the android block:

```gradle
android {
    ...
    compileOptions {    
        sourceCompatibility JavaVersion.VERSION_1_8    
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

#### Build Project

Clean and rebuild your project:
```bash
# Clean project
cd android && ./gradlew clean

# Rebuild project  
cd android && ./gradlew build
```

### Set up iOS

Configure the Zeotap iOS SDK using CocoaPods:

#### Install CocoaPods

Check if CocoaPods is installed:
```bash
pod --version
```

If not installed, follow the [CocoaPods installation guide](https://guides.cocoapods.org/using/using-cocoapods.html).

#### Install Dependencies

Navigate to the iOS directory of the project and add `ZeotapCollect` package.

```swift
pod 'ZeotapCollect', '~> 1.3.7'
```

And install dependencies from ios directory:

```bash
cd ios
pod install
```

#### Open Workspace

Open the `.xcworkspace` file in Xcode (not the `.xcodeproj` file):
```bash
open yourApplication.xcworkspace
```

:::info
To find the exact Android and iOS build versions required for a specific React Native version, please refer to the [release notes](../release-notes).
:::

## Initialization

Initialize the SDK in your app's entry point (`App.js` or `App.tsx`):

```javascript
import React, { useEffect } from 'react';
import { initialiseZeoCollect } from 'zeo-collect';

const App = () => {
    useEffect(() => {
        const options = {
            "android_write_key": "YOUR_ANDROID_WRITE_KEY",
            "ios_write_key": "YOUR_IOS_WRITE_KEY",
            "batch_size": 30,
            "service_interval": 90,
            "max_cache_size": 100,
            "opt_out": false,
            "use_consent": false,
            "check_for_cmp": false,
            "user_country": "usa"
        };
        
        // Initialize without callback
        initialiseZeoCollect(options);
        
        // Or initialize with callback
        // initialiseZeoCollect(options, (data) => {
        //     console.log("Initialization status:", data);
        // });
    }, []);

    return (
        // Your app components
    );
};

export default App;
```

:::info
You need to input your [```Android key and iOS write keys```](./Configurations/writeKey)  in place of ```YOUR_ANDROID_WRITE_KEY``` and ```YOUR_IOS_WRITE_KEY``` so that the data gets ingested to an respective ***iOS source*** and ***Android source*** created in your Zeotap CDP account.
:::

## Setting up User Identities <span style={{"fontSize": "15px"}}>[(Learn more)](./APIReference/setUserIdentities)</span>

Once the Zeotap SDK is integrated, you can start setting up user identities. User identities are how you associate data to specific users.

The Zeotap React Native SDK provides the `setUserIdentities` function to identify your users:

```javascript
import { setUserIdentities } from 'zeo-collect';

setUserIdentities({
    email: "user@example.com",
    cellno: "11 5551234567"
})
```

## Setting User Properties <span style={{"fontSize": "15px"}}>[(Learn more)](./APIReference/setUserProperties)</span>

User properties allow you to store information about your users that doesn't change frequently, such as subscription status, user preferences, or demographic information.

To set user properties, use the `setUserProperties` method:

```javascript
import { setUserProperties } from 'zeo-collect';

setUserProperties({
    subscription: "premium",
    age: 25
})
```

### Send Your First Event

Start tracking events in your components:

```javascript
import { setEventProperties, setPageProperties } from 'zeo-collect';

// Track a simple event
const trackButtonClick = () => {
    setEventProperties("button_clicked", {
        button_name: "primary_cta",
        page: "home"
    });
};

// Track page view
const trackPageView = () => {
    setPageProperties({
        page_title: "Home Screen",
        section: "main"
    });
};

// In your component
return (
    <View>
        <Button 
            title="Track Event" 
            onPress={trackButtonClick}
        />
    </View>
);
```

## Verify Integration

After completing the setup:

1. **Send Test Events**: Trigger some events through your app
2. **Check Logs**: Monitor console for SDK messages
3. **Verify in Zeotap**: Log into the Zeotap CDP App and check the PREVIEW tab for your Android/iOS sources

## Common Issues

### Android Build Issues
- Ensure Gradle versions are compatible
- Check that all dependencies are properly added
- Clean and rebuild the project

### iOS Build Issues  
- Make sure you're opening the `.xcworkspace` file
- Verify CocoaPods installation is complete
- Check iOS deployment target compatibility

### JavaScript Issues
- Verify package installation in `package.json`
- Check import statements are correct
- Ensure initialization occurs before tracking calls

## Next Steps

Now that you have the basic setup working:

1. [Learn about available APIs](./APIReference/) - Explore all tracking methods
2. [Configure consent management](./Consent/consentStrategy) - Set up privacy compliance
3. [Customize configurations](./Configurations/configurations) - Optimize for your use case
4. [View examples](./Examples/examples) - See advanced implementation patterns

---