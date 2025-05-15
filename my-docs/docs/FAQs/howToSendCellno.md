---
sidebar_position: 1
title: How to send cellno
description: Cellno handling
---

# Cellno Specifications

Handling the `cellno` identifier requires careful attention due to potential variations in input format and the implications for hashing, especially when using the SDK's hashing capabilities (`hashIdentities: true`).

## Scenario 1: SDK Performs Hashing

When `hashIdentities` is configured as `true`, the SDK generates multiple hashed versions of the phone number based on the format detected in the `cellno` value you provide.

1.  **Input Format: `[code<space>number]` (Recommended)**
    *   **Example:** `zeotap.setUserIdentities({ cellno: '1 5551234567' });`
    *   **Processing:** The space allows the SDK to correctly identify the country code (`1`) and the national number (`5551234567`).
    *   **Generated Hashes Sent:**
        *   `cellno_without_country_code_sha256` / `md5` / `sha1` (Hash of `5551234567`)
        *   `cellno_with_country_code_sha256` / `md5` / `sha1` (Hash of `15551234567`)
        *   `cellphone_number_e164_sha256` / `md5` / `sha1` (Hash of `+15551234567`)
    *   **Result:** All generated hashes are valid and correctly represent the input. **This is the recommended format.**

2.  **Input Format: `[codenumber]` (Not Recommended)**
    *   **Example:** `zeotap.setUserIdentities({ cellno: '15551234567' });`
    *   **Processing:** Without a delimiter, the SDK cannot reliably separate the code and number.
    *   **Generated Hashes Sent:**
        *   `cellno_without_country_code_sha256` / `md5` / `sha1` (**Incorrect:** Hash of the *entire* string `15551234567`)
        *   `cellno_with_country_code_sha256` / `md5` / `sha1` (Hash of `15551234567`)
        *   `cellphone_number_e164_sha256` / `md5` / `sha1` (Hash of `+15551234567`)
    *   **Result:** Only `_with_country_code` and `_e164` hashes are correct. `_without_country_code` hash is invalid. **Not recommended.**

3.  **Input Format: `[number]` (Not Recommended)**
    *   **Example:** `zeotap.setUserIdentities({ cellno: '5551234567' });`
    *   **Processing:** Only the national number is provided.
    *   **Generated Hashes Sent:**
        *   `cellno_without_country_code_sha256` / `md5` / `sha1` (Hash of `5551234567`)
        *   `cellno_with_country_code_sha256` / `md5` / `sha1` (**Incorrect:** Hash of `5551234567`)
        *   `cellphone_number_e164_sha256` / `md5` / `sha1` (**Incorrect:** Hash of `5551234567`,  prefixed with `+`)
    *   **Result:** Only `_without_country_code` hash is valid. The others lack country code information. **Not recommended.**

## Scenario 2: Sending Raw Identifiers

When `hashIdentities` is `false`, the SDK selects the best available raw phone number representation to send to the backend.

:::warning `cellno_cc` Key Deprecated

*   The `cellno_cc` key is **deprecated**.
*   For clients already using this key, it is recommened to send the data using `cellno`.
*   If used, the SDK assumes the value is in `[codenumber]` format, leading to the same potentially incorrect hashes as described in point #2 below.

:::

**Priority Order for Selection:**

1.  **`[code<space>number]` Format:** If found in either the `cellno` or `cellno_cc` input key, this value is selected.
    *   *Example Input:* `{ cellno: '1 5551234567' }`
    *   *Value Sent:* `15551234567`
2.  **`[codenumber]` Format (via `cellno_cc` key):** If format #1 is not found, but `cellno_cc` is provided (assumed `[codenumber]`).
    *   *Example Input:* `{ cellno_cc: '15551234567' }`
    *   *Value Sent:* `15551234567`
3.  **`[number]` Format (via `cellno` key):** If neither #1 nor #2 is found, but `cellno` is provided (assumed `[number]`).
    *   *Example Input:* `{ cellno: '5551234567' }`
    *   *Value Sent:* `5551234567`

:::note Raw Value Selection
Only *one* raw phone number value is selected based on this priority and sent when `hashIdentities: false`.
:::

## Recommendations

*   **When using SDK Hashing (`hashIdentities: true`):**
    *   **Always** provide phone numbers via the `cellno` key in the `[code<space>number]` format (e.g., `'1 5551234567'`) for accurate generation of all hash types.
*   **When sending Raw Identifiers (`hashIdentities: false`):**
    *   Providing `cellno` in the `[code<space>number]` format is preferred as it's the highest priority and most complete representation.
