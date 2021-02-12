---
title: Introduction
description: '@nuxtjs/composition-api provides a way to use the Vue 3 Composition API with Nuxt-specific features.'
category: Getting started
position: 1
items:
  - Support for the new Nuxt fetch in v2.12+
  - Easy access to router, app, store within setup()
  - Interact directly with your vue-meta properties within setup()
  - Drop-in replacement for ref with automatic SSR stringification and hydration (ssrRef)
  - Written in TypeScript
---

> `@nuxtjs/composition-api` provides a way to use the Vue 3 Composition API in with Nuxt-specific features.

**Note**: the main aim is to allow experimentation and feedback before the final release of Nuxt 3. The API of Nuxt-specific methods will likely change before Nuxt 3 is released.

## Key features

<list :items="items"></list>

## API reference

This package extends `@vue/composition-api` and exports all of its types and methods. You can find [a full reference for it in the Vue 3 docs](https://v3.vuejs.org/api/composition-api.html) and [in the initial Composition API RFC](https://composition-api.vuejs.org/api.html)).
