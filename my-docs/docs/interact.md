---
sidebar_position: 6
title: Interact SDK
description: Interact SDK
---

# Interact SDK Integration Guide

This guide explains how to integrate **Zeotap’s Interact SDK** into your website using the Web SDK or directly.

## Overview

The **Interact SDK** enables secure, real-time client-side data delivery based on server-side configuration from your Zeotap account. It facilitates routing user profile data to supported platforms (e.g., Google Ad Manager, Adobe Target).

---

## Web SDK Already Integrated

If you already use Zeotap's Web SDK, enable Interact by setting the `loadInteractScript` option to `true` during initialization.

```html
<!-- Zeotap JS SDK -->
<script type="text/javascript">
!function(e,t){
  var n=t.createElement("script");
  n.type="text/javascript", n.crossorigin="anonymous", n.async=!0;
  n.src="https://content.zeotap.com/sdk/zeotap.min.js";
  var s=t.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(n,s);
  function o(e,t,n){
    function s(t){e[t]=function(){e[n].push([t].concat(Array.prototype.slice.call(arguments,0)))}} 
    for(var o=0;o<t.length;o++)s(t[o])
  }
  var r=e.zeotap||{_q:[],_qcmp:[]};
  o(r,["init","setEventProperties","setUserProperties","setPageProperties","setMetaProperties","setUserIdentities","unsetUserIdentites","setZI"],"_q");
  o(r,["setConsent","addAskForConsentActionListener"],"_qcmp");
  e.zeotap=r;
}(window,document);
</script>

<script type="text/javascript">
window.zeotap.init("<YOUR_WRITE_KEY>", {
  loadInteractScript: true,
  // ... other options
});
</script>
```

    :::note
    The Zeotap Interact SDK will reference the source mapping and API key associated with the Zeotap JS SDK tag. Only the mapped identifiers from the source will be used to look up the user's profile in Zeotap.
    :::

---

## Without Web SDK

If you're not using the Web SDK, add the Interact SDK directly to the head of your HTML/website.

```html
<script type="text/javascript">
!function(t,n){
  var e=n.createElement("script");
  e.type="text/javascript", e.crossorigin="anonymous", e.async=!0;
  e.src="https://content.zeotap.com/sdk/interact.min.js";
  var o=n.getElementsByTagName("script")[0];
  o.parentNode.insertBefore(e,o);
  var a=t.zeotapInteract||{_q:[]};
  !function(t,n,e){
    function o(n){t[n]=function(){t[e].push([n].concat(Array.prototype.slice.call(arguments,0)))}} 
    for(var a=0;a<n.length;a++)o(n[a])
  }(a,["init","setUserIdentities","getUserIdentities"],"_q");
  t.zeotapInteract=a;
  window.zeotapInteract.init("<API_KEY>");
}(window,document);
</script>
```

**Note:**
- Replace <a href="./Configurations/writeKey">`<API_KEY>`</a> with your Web Javascript API source key.
- For identifier lookup, please set the first-party identifier on the page using our <a href="./APIReference/setUserIdentities">`setUserIdentities`</a> method. This identifier will be used for lookups on the Zeotap end. 

:::note

Ensure that the identifier is passed using the same field name as the one used for the API key source mentioned earlier. This consistency is essential for the SDK to recognize the corresponding field in the Zeotap catalogue for lookups. For example, if you're sending a user ID as `user_id` from your server-side source, you must use the same field name when setting the IDs on the page through the `setUserIdentities` method. 

:::

---

## Retrieving Data on the Client Side Based on Configured “Data to send” for an Interaction

You can access the Interact SDK output in one of three ways:

### 1. Local Storage

Stores the selected data in local storage under the Zeotap key `zeoParamsStoreLocal`, which the consuming platform can access on the client side. Refer to the [GAM implementation](./interact#google-ad-manager-integration) below for guidance on implementing a local storage-based workflow.

```js
if (typeof Storage !== "undefined") {
  var targetingParamStr = localStorage.getItem("zeoParamsStoreLocal");
  if (targetingParamStr) {
    var targetingParameters = JSON.parse(targetingParamStr);
    // Use targetingParameters here
  }
}
```

### 2. Session Storage

Stores the selected data in session storage under the Zeotap key `zeoParamsStoreSession`, which can be accessed by the consuming platform. Similar to local storage, you can push data to session storage and retrieve it as shown below.


```js
if (typeof Storage !== "undefined") {
  var targetingParamStr = sessionStorage.getItem("zeoParamsStoreSession");
  if (targetingParamStr) {
    var targetingParameters = JSON.parse(targetingParamStr);
    // Use targetingParameters here
  }
}
```

### 3. Callback Function

Passes the selected data to the zeoParamsCallback() function, which can be directly accessed by the consuming platform on the client side.

```js
window.zeoParamsCallbackCalled = false;

// fail-safe after 2 seconds
setTimeout(() => {
  window.zeoParamsCallback({});
}, 2000);

window.zeoParamsCallback = function (targetingParameters) {
  if (window.zeoParamsCallbackCalled) return;
  window.zeoParamsCallbackCalled = true;
  // Use targetingParameters here
};
```

---

## Google Ad Manager Integration

### Prerequisite

If you plan to send only **Segment membership** to Google Ad Manager (GAM), follow these steps:

- Create the required **segments** in Zeotap for tagging user profiles with [segment memberships](https://docs.zeotap.com/articles/#!segment-customer/enable-membership/q/membership/qp/1/qid/15555).
- Define and target **key/value parameters** in Google Ad Manager.
  - For example, for segment membership, the key would be `"segment_membership"`, and the values would be the list of segment IDs the user is part of.

**Google Documentation** (Recommended Reading):
- [Defining Key-Value Targeting](https://support.google.com/dfp_premium/answer/188092?hl=en&ref_topic=1638397)
- [Creating Targeted Ads](https://support.google.com/dfp_premium/answer/177381?hl=en&ref_topic=1638397)
- [Key-Value Parameters Overview](https://support.google.com/dfp_premium/answer/2423498)

Ensure Zeotap Interact SDK is implemented as described to work correctly.


### Option 1: Callback

This solution fetches the current profile of the user (e.g., segment membership) and sends it to GAM. With this setup, ads will be displayed once Zeotap has rendered the profile information to GAM. 

Place or trigger the following code after the Zeotap Interact SDK and GAM jsTag

```js
window.zeoParamsCallbackCalled = false;
// fail-safe after 2 seconds
setTimeout(function () {
  window.zeoParamsCallback({});
}, 2000);

window.zeoParamsCallback = function (targetingParameters) {
  if (window.zeoParamsCallbackCalled) {
    // callback already called
    return;
  }
  window.zeoParamsCallbackCalled = true;

// Your Google Ad Manager code should go here, followed by  
// Sending targeting params for this user to Google ad manager
  if (window.googletag.pubads) {
    Object.keys(targetingParameters).forEach((key) => {
      window.googletag.pubads().setTargeting(key, targetingParameters[key]);
    });
  }
};

```

:::info
This ensures that ads are displayed only after the user's profile information has been updated in GAM, providing the platform with the most current data. However, if the timer expires without receiving a response, GAM will still render and display a default or generic banner (if setup). The drawback is that this may cause a delay before the ads are shown.
:::

### Option 2: Local Storage

This solution pushes profile information into local storage. Google Tag Manager can then read the targeting parameters from the browser’s local storage using the code provided below.


Place or trigger the following code after the Zeotap SDKs : 


```js
if (typeof Storage !== "undefined") {
  var targetingParamStr = localStorage.getItem("zeoParamsStoreLocal");

  if (targetingParamStr) {
    var targetingParameters = JSON.parse(targetingParamStr);

    //Please add the below code after the GAM tag

    const targetingParams = JSON.parse(params);
    if (window.googletag.pubads) {
      Object.keys(targetingParameters).forEach((key) => {
        window.googletag.pubads().setTargeting(key, targetingParameters[key]);
      });
    }
  }
}

```

:::info

The benefit of this solution is that ads will be shown without delay for returning visitors or on subsequent page visits. However, the drawback is that first-time visitors to the landing page may not receive a personalized ad.

:::

---

## Adobe Target Integration

### Prerequisite

If you plan to send only **Segment membership** to Adobe Target, follow these steps:

- Create the required **segments** in Zeotap for tagging user profiles with [segment memberships](https://docs.zeotap.com/articles/#!segment-customer/enable-membership/q/membership/qp/1/qid/15555).
- Define and target **key/value parameters** in Adobe Target.
    - For example:
        - If you have defined the key as `"segment_membership"` in both Adobe and Zeotap, the value received will be a list of segment IDs associated with a user.
        - The key format **depends on your Adobe Target setup**:
            - If targeting is configured with the key as `visitor profile`, you must send it on the client side as `profile.segment_membership`.
            - If it’s set up as a custom key, you can simply send it as `segment_membership`.

**Adobe Documentation:**
- You can refer the official Adobe Documentation [Link here](https://experienceleague.adobe.com/en/docs/target-dev/developer/client-side/at-js-implementation/functions-overview/adobe-target-getoffer)


### Serve without delay 
This solution pushes profile information into local storage. Adobe Target can then read the targeting parameters from the browser’s local storage using the code provided below. 

Place or trigger the following code after the Zeotap SDKs, Adobe Target is loaded: 

```js
window.targetPageParams = function () {
  // read data from local storage
  if (typeof Storage !== "undefined") {
    var targetingParamStr = localStorage.getItem("zeoParamsStoreLocal");

    if (targetingParamStr) {
      try {
        const params = JSON.parse(targetingParamStr);
        return { ...params };
      } catch (e) {
        console.error(e);
        return {};
      }
    }
  }
};

```

:::info
The benefit of this solution is that ads will be shown without delay for returning visitors or on subsequent page visits. However, the drawback is that first-time visitors to the landing page may not receive a personalized ad.
:::

---
