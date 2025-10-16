---
sidebar_position: 3
title: Quick start guide
description: Quick Start guide
---

# Quick Start

This guide helps you set up and run the Zeotap Android SDK in your Android application with minimal configuration.

## 1. Add the SDK Dependency

Open your **app-level** `build.gradle` file and add the Zeotap Maven repository and dependency:

```groovy
repositories {
    google()
    maven {
        url 'https://sdk.zeotap.com/android-sdk'
    }
}

dependencies {
    implementation "com.zeotap:zeo-collect:X.X.X"
}
```

Replace `X.X.X` with the latest SDK version.

## 2. Configure Build Settings

Make sure Java 8 compatibility is enabled in the same file:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

If your project uses Android 13+ features, also include:

```groovy
implementation "com.google.android.gms:play-services-ads:20.4.0"
```

## 3. Initialize the SDK

In your `MainApplication.java` (or the Kotlin equivalent), initialize the SDK inside the `onCreate()` method.

```java
import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;

public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

         CollectOptions options = CollectOptions.builder(this)
            .credential("YOUR_WRITE_KEY_HERE")
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

## 4. Send Your First Event

After initialization, you can begin tracking events immediately.

```java
Map<String, Object> eventProps = new HashMap<>();
eventProps.put("screen", "Home");
eventProps.put("action", "App Launched");

Collect.getInstance().setEventProperties("AppStart", eventProps);
```

## 5. Verify Data Flow

Once events are sent, open your **Zeotap CDP dashboard**, select your Android source, and verify data ingestion under the **Preview** tab.