---
sidebar_position: 4
title: Step 4 - Set Up the Trigger
description: Learn how to set up triggers for the Zeotap Collect Tag in Google Tag Manager to control when the tag should fire based on custom events or page views.
---

# 5. Set Up the Trigger

Once the inputs for the Zeotap Collect Tag have been configured (see [Step 3: Configure the Tag](/gtm/docs/SetupGuide/Configuration/configuration)), the next step is to define **when** the tag should fire. This is done by setting up triggers within Google Tag Manager (GTM).

Triggers control the execution of the tag, and they determine which events on your website should result in the tag being fired. 

Depending on your data collection needs, you can configure the trigger to fire for:

- **All Page Views**: Use GTM's built-in `All Pages` trigger if you only want to track page views.
- **All Events**: Use a custom event trigger to capture a broader range of events, such as clicks, form submissions, or custom-defined events.

---

## Trigger Configuration Methods

There are two methods for setting up a trigger in GTM:

- [Method 1: Create Trigger Separately](#method-1-create-trigger-separately)
- [Method 2: Add Trigger While Creating the Tag](#method-2-add-trigger-while-creating-the-tag)

---

## Method 1: Create Trigger Separately

Follow these steps to create a trigger independently and then attach it to the Zeotap Collect Tag.

1. Navigate to the **Triggers** section in GTM from the left-hand menu.
2. Click **New** to create a new trigger.
3. Provide a descriptive name (e.g., `Login Event Trigger`).
4. Click the **Trigger Configuration** block to open the trigger type options.
5. Under the **Other** category, select **Custom Event** as the trigger type.
6. Enter the event name, for example:

   ```text
   Login event
   ```

7. Enable **Use regex matching** if your events follow a specific naming pattern.

   - Recommended regex for capturing all events except GTM system events:

     ```text
     ^(?!gtm\.load)(?!gtm\.dom).*
     ```

8. Select the **All Custom Events** option to apply the trigger to all matching events.
9. Click **Save** to create the trigger.
10. Attach this trigger to the Zeotap Collect Tag in the **Tag Configuration**.

> This setup ensures that your Zeotap Collect Tag fires for all relevant custom events on your website, excluding internal GTM events such as `gtm.load` and `gtm.dom`.

---

## Method 2: Add Trigger While Creating the Tag

You can also configure the trigger directly while creating or editing the tag.

1. Navigate to the **Tag Configuration** section of the tag.
2. In the **Triggering** section, click the **+** button.
3. In the **Choose a trigger** window, click **+** again to create a new trigger.
4. Choose **Custom Event** as the trigger type.
5. Enter the event name, such as:

   ```text
   Login event
   ```

6. Enable **Use regex matching** if needed and input the following pattern:

   ```text
   ^(?!gtm\.load)(?!gtm\.dom).*
   ```

7. Select the **All Custom Events** radio button.
8. Click **Save** to add the trigger to your tag configuration.

---

## Final Notes

- The trigger setup is a critical step to ensure the Zeotap Collect Tag only fires when meaningful user interactions occur.
- Custom events offer flexibility to track a variety of interactions beyond just page views.
- The provided regex pattern excludes common system events to prevent unnecessary data collection.

---

## Example Trigger Configuration

```text
Event Name: Login event
Use Regex: ✓
Regex Pattern: ^(?!gtm\.load)(?!gtm\.dom).*
Trigger Type: Custom Event
```

Once your trigger is created and linked to the Zeotap Collect Tag, the tag will begin to send event data as configured. After setting up triggers, proceed to [validate](/gtm/docs/SetupGuide/validation) your implementation to ensure everything is working correctly.

You can refer to the [official GTM documentation](https://support.google.com/tagmanager/answer/7679316?hl=en) to learn more about triggers.

