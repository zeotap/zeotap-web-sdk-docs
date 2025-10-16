---
sidebar_position: 2
title: Tracking User Identities
---

# User Identities

User identities help link user behavior across sessions and devices. The Zeotap Android SDK provides robust identity management with automatic hashing and flexible configuration options.

## Overview

The SDK automatically generates a unique identifier (`zi`) for each user and allows you to associate additional identities like email, phone number, and login ID.

## Default User Identification

### Zeotap Identifier (zi)

The SDK automatically creates a unique `zi` (Zeotap Identifier) for each user:

```java
Collect collect = Collect.getInstance();

// Get the current zi value
String userZi = collect.getZI();
Log.d("Zeotap", "User ZI: " + userZi);
```

### Managing zi

```java
// Reset zi (useful for user logout scenarios)
collect.resetZI();

// Set custom zi (e.g., using your own user ID)
collect.setZI("custom_user_id_123");
```

## Setting User Identities

### Basic Identity Setting

```java
Map<String, String> userIdentities = new HashMap<>();
userIdentities.put("email", "user@example.com");
userIdentities.put("loginid", "user123");
userIdentities.put("cellno", "1234567890");
userIdentities.put("cellno_cc", "1-1234567890");

collect.setUserIdentities(userIdentities);
```

### Supported Identity Types

| Identity Key | Type | Description | Example |
|--------------|------|-------------|---------|
| `email` | String | User's email address | `"user@example.com"` |
| `loginid` | String | App-specific login ID | `"user123"` |
| `cellno` | String | Phone number without country code | `"1234567890"` |
| `cellno_cc` | String | Phone number with country code | `"1-1234567890"` |

## Identity Hashing

### Automatic Hashing Configuration

Configure how the SDK handles identity hashing during initialization:

```java
CollectOptions options = CollectOptions.builder(this)
    .credential("<YOUR_WRITE_KEY>")
    .areIdentitiesHashed(false)    // Identities are raw (not pre-hashed)
    .hashIdentities(true)          // SDK should hash the raw identities
    .build();
```

### Hashing Scenarios

#### Scenario 1: Raw Identities, No Hashing

```java
// SDK Configuration
.areIdentitiesHashed(false)
.hashIdentities(false)

// Usage
Map<String, String> identities = new HashMap<>();
identities.put("email", "john.doe@gmail.com");
identities.put("cellno", "1234567890");
collect.setUserIdentities(identities);
// Identities sent as-is (raw form)
```

#### Scenario 2: Raw Identities, Auto-Hash

```java
// SDK Configuration
.areIdentitiesHashed(false)
.hashIdentities(true)

// Usage
Map<String, String> identities = new HashMap<>();
identities.put("email", "john.doe@gmail.com");
identities.put("cellno", "1234567890");
collect.setUserIdentities(identities);
// SDK automatically generates SHA-256, SHA-1, MD5 hashes
```

#### Scenario 3: Pre-Hashed Identities

```java
// SDK Configuration
.areIdentitiesHashed(true)

// Usage
Map<String, String> identities = new HashMap<>();
identities.put("email_sha256_lowercase", "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
identities.put("cellno_sha256", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
collect.setUserIdentities(identities);
```

## Hashed Identity Formats

When using pre-hashed identities, use these specific key formats:

### Email Hash Formats

```java
Map<String, String> hashedIdentities = new HashMap<>();

// SHA-256 variations
hashedIdentities.put("email_sha256_lowercase", "sha256_hash_of_lowercase_email");
hashedIdentities.put("email_sha256_uppercase", "sha256_hash_of_uppercase_email");

// MD5 variations
hashedIdentities.put("email_md5_lowercase", "md5_hash_of_lowercase_email");
hashedIdentities.put("email_md5_uppercase", "md5_hash_of_uppercase_email");

// SHA-1 variations
hashedIdentities.put("email_sha1_lowercase", "sha1_hash_of_lowercase_email");
hashedIdentities.put("email_sha1_uppercase", "sha1_hash_of_uppercase_email");
```

### Phone Number Hash Formats

```java
// Without country code
hashedIdentities.put("cellno_without_country_code_sha256", "hash_value");
hashedIdentities.put("cellno_without_country_code_md5", "hash_value");
hashedIdentities.put("cellno_without_country_code_sha1", "hash_value");

// With country code
hashedIdentities.put("cellno_with_country_code_sha256", "hash_value");
hashedIdentities.put("cellno_with_country_code_md5", "hash_value");
hashedIdentities.put("cellno_with_country_code_sha1", "hash_value");
```

### Login ID Hash Formats

```java
// Login ID variations
hashedIdentities.put("loginid_sha256_lowercase", "hash_value");
hashedIdentities.put("loginid_sha256_uppercase", "hash_value");
hashedIdentities.put("loginid_md5_lowercase", "hash_value");
hashedIdentities.put("loginid_md5_uppercase", "hash_value");
hashedIdentities.put("loginid_sha1_lowercase", "hash_value");
hashedIdentities.put("loginid_sha1_uppercase", "hash_value");
```

## Identity Management Patterns

### User Registration

```java
// When user signs up
Map<String, String> newUserIdentities = new HashMap<>();
newUserIdentities.put("email", userEmail);
newUserIdentities.put("loginid", userId);
if (phoneNumber != null) {
    newUserIdentities.put("cellno", phoneNumber);
}

collect.setUserIdentities(newUserIdentities);
```

### User Login

```java
// When user logs in
Map<String, String> loginIdentities = new HashMap<>();
loginIdentities.put("email", loginEmail);
loginIdentities.put("loginid", loginUserId);

collect.setUserIdentities(loginIdentities);
```

### User Logout

```java
// Clear user identities on logout
collect.unSetUserIdentities();

// Optionally reset the zi to differentiate users
collect.resetZI();
```

### Profile Update

```java
// When user updates their profile
Map<String, String> updatedIdentities = new HashMap<>();
updatedIdentities.put("email", newEmail);
updatedIdentities.put("cellno", newPhoneNumber);

collect.setUserIdentities(updatedIdentities);
```

## Identity with Callbacks

Handle identity setting responses:

```java
collect.setUserIdentities(identities, (response) -> {
    if (response.containsKey("status")) {
        String status = (String) response.get("status");
        if ("success".equals(status)) {
            Log.d("Zeotap", "Identities set successfully");
        } else {
            Log.e("Zeotap", "Failed to set identities: " + response.get("message"));
        }
    }
});
```

## Identity Payload Structure

When identities are set, they appear in event payloads:

```json
{
  "event": { ... },
  "page": { ... },
  "user": {
    "zi": "user-identifier",
    "email": {
      "sha256_lowercase": "hashed_email_value",
      "sha256_uppercase": "hashed_email_value",
      "md5_lowercase": "hashed_email_value",
      "md5_uppercase": "hashed_email_value",
      "sha1_lowercase": "hashed_email_value",
      "sha1_uppercase": "hashed_email_value"
    },
    "loginid": {
      "sha256_lowercase": "hashed_loginid_value",
      // ... other hash variations
    },
    "cellphone_number_withoutcode": {
      "sha256": "hashed_phone_value",
      "md5": "hashed_phone_value",
      "sha1": "hashed_phone_value"
    },
    "cellphone_number_withcode": {
      "sha256": "hashed_phone_value",
      "md5": "hashed_phone_value",
      "sha1": "hashed_phone_value"
    }
  }
}
```