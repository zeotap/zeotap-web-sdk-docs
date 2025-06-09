---
sidebar_position: 2
title: Installation Guide
---

# Installation

You can integrate the Zeotap Android SDK into your project using two methods: automated dependency management or manual installation.

## Prerequisites

- Android SDK version targeting API level 19 or higher
- Gradle 4.0 or higher
- Java 8 compatibility

## Method 1: Dependency Manager (Recommended)

### Step 1: Add Maven Repository

Add the Zeotap Maven repository to your project-level `build.gradle` or `settings.gradle` file:

```gradle
// In build.gradle (Project level) or settings.gradle
repositories {
    google()
    maven {
        url 'https://sdk.zeotap.com/android-sdk'
    }
}
```

### Step 2: Add SDK Dependency

In your app-level `build.gradle` file, add the SDK dependency:

```gradle
// In build.gradle (Module: app)
dependencies {
    implementation "com.zeotap:zeo-collect:2.2.8"
    // Replace 2.2.8 with the latest version
}
```

### Step 3: Configure Compile Options

Add Java 8 compatibility to your app-level `build.gradle`:

```gradle
android {
    // ... other configurations
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

### Step 4: Add Advertising ID Support

For applications targeting Android 13 or higher, add the Google Play Services dependency:

```gradle
dependencies {
    implementation "com.google.android.gms:play-services-ads:20.4.0"
}
```

:::info
For applications targeting Android versions lower than 13, the SDK automatically retrieves the AdID.
:::

### Step 5: Add JSON Dependency (if needed)

If your project doesn't already use Gson, add this dependency:

```gradle
dependencies {
    implementation "com.google.code.gson:gson:2.10.1"
}
```

### Step 6: Add Permissions

Add the AD_ID permission to your `AndroidManifest.xml` for API level 12+:

```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
```

### Step 7: Clean and Rebuild

1. Clean your project: **Build > Clean Project**
2. Sync with Gradle files
3. Rebuild: **Build > Rebuild Project**

## Method 2: Manual Installation

### Step 1: Download SDK

Download the Android SDK AAR file from the provided link and place it in your project's libs folder:

```
Project Root > app > libs > zeotap-collect-android-v2.2.8.aar
```

:::tip
Create the `libs` folder if it doesn't exist.
:::

### Step 2: Configure Gradle for Local Dependencies

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

### Step 3: Add AAR Dependency

Add the AAR file to your dependencies:

```gradle
dependencies {
    implementation(name: 'zeotap-collect-android-v2.2.8', ext: 'aar')
    // OR if using files() method:
    // implementation(files("libs/zeotap-collect-android-v2.2.8.aar"))
}
```

### Step 4: Create lib-dependencies.gradle

Create a file named `lib-dependencies.gradle` in your app directory with:

```gradle
dependencies {
    implementation "io.reactivex.rxjava2:rxandroid:2.0.1"
    implementation "io.reactivex.rxjava2:rxjava:2.0.1"
    implementation "com.google.code.gson:gson:2.8.8"
    implementation "com.google.android.gms:play-services-ads:20.4.0"
}
```

### Step 5: Follow Steps 3-7 from Method 1

Complete the installation by following steps 3-7 from the dependency manager method above.

## Verification

After installation, verify the SDK is properly integrated by checking:

1. **Gradle Sync**: Ensure no errors during sync
2. **Build Success**: Project builds without errors
3. **Import Success**: You can import Zeotap classes:

```java
import com.zeotap.collect.Collect;
import com.zeotap.collect.CollectOptions;
```

## Common Issues

### Maven Repository Not Found
    - Ensure the Maven URL is added to the project-level build.gradle under allprojects > repositories
    - Perform a Gradle sync after adding the URL

### Dependency Resolution Issues
    - Check if you're using the correct version number
    - Ensure all required dependencies are included
    - Try cleaning and rebuilding the project

### Build Errors
    - Verify Java 8 compatibility is set
    - Check that all required permissions are added to AndroidManifest.xml
    - Ensure ProGuard rules are properly configured if using code obfuscation

### AAR File Not Found (Manual Installation)
    - Verify the AAR file is in the correct app/libs/ directory
    - Check that the filename matches exactly in your build.gradle
    - Ensure the libs folder is properly configured in sourceSets

## Next Steps

Once installation is complete, proceed to [SDK Initialization](./initialization) to configure and initialize the SDK in your application.