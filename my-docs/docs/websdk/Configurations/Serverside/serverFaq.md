---
sidebar_position: 5
title: Server Side FAQs
description: All question answered
---

# Server-Side Configs FAQ

## General Questions

**Q: What are server-side configs?**  
Server-side configs let you manage SDK settings centrally through the dashboard, instead of hardcoding them in your app code.

**Q: Why should I migrate from client-side configs?**  
- No redeploy needed for config changes.  
- Consistent setup across apps/environments.  
- Auditability via the Change Log.  

**Q: How do server-side configs work?**  
When you initialize the SDK with your API key, it fetches the latest configs from the server. If the server fetch fails, it falls back to local storage, then client-side configs, then SDK defaults.

---

## Migration

**Q: How do I migrate from client-side configs?**  
1. Document your current client-side configs.  
2. Replicate them in the Config Panel.  
3. Simplify your SDK init call to just the API key.  
4. Verify the configs are applied using SDK logs or `window.zeotap.getConfig()`.

**Q: Do I still need client-side configs after migrating?**  
No, they are only used if server-side and local fallback are unavailable.

---

## Config Panel & Dashboard

**Q: What categories exist in the Config Panel?**  
- **Basic Configurations:** Consent Resolution, PII hashing, Cookie Storage, 3P Cookie Syncing, etc.
- **Advanced Configuration:** Domain, Interact SDK, ID5 Setup, Include/Exclude events.

**Q: What is the Change Log panel?**  
- Records every config change with who made it, when and values.  
- Useful for debugging or auditing.

**Q: Are mandatory fields required?**  
Yes, but the dashboard pre-populates defaults for all mandatory fields, so no manual action is needed unless you want to change from default.

---

## Fallbacks & Priority

**Q: What is the config priority order?**  
1. Server-side config (dashboard)  
2. Local storage fallback  
3. Client-side config (inline init options)  
4. SDK defaults  

**Q: How long does it take for config changes to propagate?**  
Config updates are usually instantaneous, but caching/local storage may cause a few-second delay.

---

## Debugging & Verification

**Q: How can I check which config is applied?**  
Use SDK logs or a method like: `window.zeotap.getConfig()`

**Q: What if the server fetch fails?**  
The SDK automatically falls back to local storage, then client-side configs, then defaults.

