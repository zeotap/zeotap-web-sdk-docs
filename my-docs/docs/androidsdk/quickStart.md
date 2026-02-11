---
sidebar_position: 2
title: Quick Start Guide
---

## Setup in Zeotap CDP

Create an Android source in your Zeotap CDP account. [How to create an Android source?](https://docs.zeotap.com/articles/#!integrate-customer/creating-android-sdk-source)

Obtain the write key from the created source. [How to obtain a write key?](./configurations/writeKey)

## Installation

### Method 1: Dependency Manager (Recommended)

#### Add Maven Repository

Add the Zeotap Maven repository to your project-level `build.gradle` or `settings.gradle` file:

```gradle
repositories {
    google()
    maven {
        url 'https://sdk.zeotap.com/android-sdk'
    }
}
```

#### Add Dependencies

In your app-level `build.gradle` file, add the SDK dependency:

```gradle
dependencies {
    implementation "com.zeotap:zeo-collect:2.2.12"

    // For Android 13+ (AdID support)
    implementation "com.google.android.gms:play-services-ads:20.4.0"

    // JSON support (if not already included)
    implementation "com.google.code.gson:gson:2.10.1"
}
```

#### Configure Compile Options

Add Java 8 compatibility to your app-level `build.gradle`:

```gradle
android {
    ...
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

#### Add Permissions

Add the AD_ID permission to your `AndroidManifest.xml` for API level 12+:

```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
```

#### Build Project

Clean and rebuild your project:

1. Clean your project: **Build > Clean Project**
2. Sync with Gradle files
3. Rebuild: **Build > Rebuild Project**

### Method 2: Manual Installation

#### Download SDK

Download the Android SDK AAR file from the [link](https://content.zeotap.com/android-sdk/android-collect-sdk.zip) and place it in your project's libs folder:

```
Project Root > app > libs > zeotap-collect-android-v2.2.12.aar
```

:::tip
Create the `libs` folder if it doesn't exist.
:::

#### Configure Gradle for Local Dependencies

Add the following to your app-level `build.gradle` before the dependencies block:

```gradle
apply from: 'lib-dependencies.gradle'

repositories {
    flatDir {
        dirs 'libs'
    }
}
```

:::warning For Android Studio Bumblebee+
If `flatDir` is not supported, use this alternative configuration:

```gradle
android {
    // ... other configurations
    sourceSets {
        main {
            jniLibs.srcDirs = ['libs']
        }
    }
}

apply from: 'lib-dependencies.gradle'
```
:::

#### Add AAR Dependency

Add the AAR file to your dependencies:

```gradle
dependencies {
    implementation(name: 'zeotap-collect-android-v2.2.12', ext: 'aar')
}
```

#### Create lib-dependencies.gradle

Create a file named `lib-dependencies.gradle` in your app directory with:

```gradle
dependencies {
    implementation "io.reactivex.rxjava2:rxandroid:2.0.1"
    implementation "io.reactivex.rxjava2:rxjava:2.0.1"
    implementation "com.google.code.gson:gson:2.8.8"
    implementation "com.google.android.gms:play-services-ads:20.4.0"
}
```

#### Complete Remaining Steps

Follow the **Configure Compile Options**, **Add Permissions**, and **Build Project** steps from Method 1 above.

## Initialization

Initialize the SDK in your `MainApplication.java` (or the Kotlin equivalent) inside the `onCreate()` method:

```java
import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        CollectOptions options = CollectOptions.builder(this)
            .credential("YOUR_WRITE_KEY")
            .enableLogging(false)
            .build();

        Collect.init(options);
    }
}
```

Then declare your custom application class in `AndroidManifest.xml`:

```xml
<application
    android:name=".MainApplication"
    android:label="@string/app_name"
    android:icon="@mipmap/ic_launcher">
</application>
```

:::info
You need to input your [`write key`](./configurations/writeKey) in place of `YOUR_WRITE_KEY` so that the data gets ingested to an ***Android source*** created in your Zeotap CDP account.
:::

## Setting up User Identities <span style={{"fontSize": "15px"}}>[(Learn more)](./APIReferences/setUserIdentities)</span>

Once the Zeotap SDK is integrated, you can start setting up user identities. User identities are how you associate data to specific users.

The Zeotap Android SDK provides the `setUserIdentities` function to identify your users:

```java
Map<String, String> identities = new HashMap<>();
identities.put("email", "user@example.com");
identities.put("cellno", "1234567890");

Collect.getInstance().setUserIdentities(identities);
```

## Setting User Properties <span style={{"fontSize": "15px"}}>[(Learn more)](./APIReferences/setUserProperties)</span>

User properties allow you to store information about your users that doesn't change frequently, such as subscription status, user preferences, or demographic information.

To set user properties, use the `setUserProperties` method:

```java
Map<String, Object> userProperties = new HashMap<>();
userProperties.put("subscription", "premium");
userProperties.put("age", 25);

Collect.getInstance().setUserProperties(userProperties);
```

## Tracking User Events <span style={{"fontSize": "15px"}}>[(Learn more)](./APIReferences/setEventProperties)</span>

Event tracking allows you to track specific actions that users take in your app, such as making a purchase, completing a level, or sharing content.

To track user events, you can use the `setEventProperties` method:

```java
Map<String, Object> eventProperties = new HashMap<>();
eventProperties.put("productId", "12345");
eventProperties.put("productName", "iPhone 15");
eventProperties.put("category", "Electronics");
eventProperties.put("price", 999.99);

Collect.getInstance().setEventProperties("Product Purchased", eventProperties);
```

## Verify Integration

After completing the setup:

1. **Send Test Events**: Trigger some events through your app
2. **Check Logs**: Enable logging and monitor logcat for SDK messages
3. **Verify in Zeotap**: Log into the Zeotap CDP App and check the PREVIEW tab for your Android source

## Common Issues

### Build Issues
- Ensure Gradle versions are compatible
- Check that all dependencies are properly added
- Clean and rebuild the project

### Maven Repository Not Found
- Ensure the Maven URL is added to the project-level build.gradle
- Perform a Gradle sync after adding the URL

### Dependency Resolution Issues
- Check if you're using the correct version number
- Ensure all required dependencies are included

## Next Steps

Now that you have the basic setup working:

1. [Learn about available APIs](./APIReferences/) - Explore all tracking methods
2. [Configure consent management](./Consent/consentStrategy) - Set up privacy compliance
3. [Customize configurations](./configurations/configurations) - Optimize for your use case
4. [View examples](./Examples/examples) - See advanced implementation patterns
