---
---

# Introduction

> `nuxt-composition-api` provides a way to use the Vue 3 Composition API in with Nuxt-specific features.

**Note**: the main aim is to allow experimentation and feedback before the final release of Nuxt 3. It is not recommended to use this package in production.

## Key features

- 🏃 **Fetch**: Support for the new Nuxt `fetch()` in v2.12+
- ℹ️ **Context**: Easy access to `router`, `app`, `store` within `setup()`
- 🗺️ **Head**: Interact directly with your `vue-meta` properties within `setup()`
- ✨ **Automatic hydration**: Drop-in replacement for `ref` with automatic SSR stringification and hydration (`ssrRef`)
- 💪 **TypeScript**: Written in TypeScript
