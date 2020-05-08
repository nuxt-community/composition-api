## [0.5.0](https://github.com/nuxt-community/composition-api/compare/0.4.1...0.5.0) (2020-05-08)


### Features

* add `useAsync` and improve `ssrRef` ([#28](https://github.com/nuxt-community/composition-api/issues/28)) ([31c9729](https://github.com/nuxt-community/composition-api/commit/31c9729885e290415dddc3e33a36b4912c29feb8))


### Bug Fixes

* address cross-request state pollution ([b7248c7](https://github.com/nuxt-community/composition-api/commit/b7248c7bf87a7815180629247ccc65f235746565))
* remove no-setup `ssrRefs` until solution ([707fb25](https://github.com/nuxt-community/composition-api/commit/707fb25ee4243d28b4a43eb8e41b4eac37134492))


### Performance Improvements

* improve memory usage ([e3f7221](https://github.com/nuxt-community/composition-api/commit/e3f722187793dfab1dcb0d99e70261b574ceb97c))

### [0.4.1](https://github.com/nuxt-community/composition-api/compare/0.4.0...0.4.1) (2020-05-08)


### Bug Fixes

* hotfix so ssrRefs work in production ([7c15c92](https://github.com/nuxt-community/composition-api/commit/7c15c928530f417b3c0ff25c2b0c1f852ac017a7)), closes [#28](https://github.com/nuxt-community/composition-api/issues/28)

## [0.4.0](https://github.com/nuxt-community/composition-api/compare/0.3.2...0.4.0) (2020-05-08)


### ⚠ BREAKING CHANGES

* `withContext` is now deprecated

### Features

* add `useContext` helper function ([9752a61](https://github.com/nuxt-community/composition-api/commit/9752a6124fa545f172bbfbe27dc1e6ef849510a7)), closes [#29](https://github.com/nuxt-community/composition-api/issues/29)
* add composition api helper to interact with `head()` ([#35](https://github.com/nuxt-community/composition-api/issues/35)) ([b7467e2](https://github.com/nuxt-community/composition-api/commit/b7467e2075b61ce7bd23a66d96f9c4e8d124e4f5))


### Bug Fixes

* correctly type `ssrRef` with factory function ([7b734ac](https://github.com/nuxt-community/composition-api/commit/7b734ac038cde3fbf967b89a39e2f57844f046e1))
* make `useContext` API available ([#39](https://github.com/nuxt-community/composition-api/issues/39)) ([dc4f028](https://github.com/nuxt-community/composition-api/commit/dc4f028a2adcc5ee9d663ee9fe2217dd891a7fdf))

### [0.3.2](https://github.com/nuxt-community/composition-api/compare/0.3.1...0.3.2) (2020-05-04)


### Bug Fixes

* purge non-stringifiable values from ssrRefs ([ac199b1](https://github.com/nuxt-community/composition-api/commit/ac199b18b722774ef1b50936565cafcbc8689e1a))

### [0.3.1](https://github.com/nuxt-community/composition-api/compare/0.3.0...0.3.1) (2020-05-04)


### Bug Fixes

* set `ssrContext` through plugin ([3ba85f5](https://github.com/nuxt-community/composition-api/commit/3ba85f5fc65dcc9e1e121db2a72fbd13e0cd6565))
* use own `onServerPrefetch` for `useFetch` ([60e23dd](https://github.com/nuxt-community/composition-api/commit/60e23dd4930156ff9b3c3025478aa53b02003a86))

## [0.3.0](https://github.com/nuxt-community/composition-api/compare/0.2.3...0.3.0) (2020-05-04)


### Features

* add `ssrRef` capability for automatic SSR support ([#23](https://github.com/nuxt-community/composition-api/issues/23)) ([f27fae8](https://github.com/nuxt-community/composition-api/commit/f27fae886836428410e607ce77d9c066b6596f22))


### Reverts

* Revert "docs: remove live demo link (Now is rate-limiting deploy)" ([bbd8661](https://github.com/nuxt-community/composition-api/commit/bbd86618310d897ca041015c0a39248a6ddaef69))

### [0.2.3](https://github.com/danielroe/nuxt-composition-api/compare/0.2.2...0.2.3) (2020-05-01)


### Bug Fixes

* respect `fetchOnServer` option ([368f33d](https://github.com/danielroe/nuxt-composition-api/commit/368f33d08a0391392bad50b075282902af0ee4cb))

### [0.2.2](https://github.com/danielroe/nuxt-composition-api/compare/0.2.1...0.2.2) (2020-04-30)


### Bug Fixes

* correctly match `$fetch` and `$fetchState` features ([e2d0442](https://github.com/danielroe/nuxt-composition-api/commit/e2d0442190055608e56eab83316acc08dfb17c4b))

### [0.2.1](https://github.com/danielroe/nuxt-composition-api/compare/0.2.0...0.2.1) (2020-04-30)


### Bug Fixes

* require `@vue/composition-api` ([f81182e](https://github.com/danielroe/nuxt-composition-api/commit/f81182e6cdc0b03b5f1f72885cc022aa20f01b36))

## [0.2.0](https://github.com/danielroe/nuxt-composition-api/compare/0.1.5...0.2.0) (2020-04-30)


### Features

* enable this to be used as a nuxt module ([#13](https://github.com/danielroe/nuxt-composition-api/issues/13)) ([9c5dee7](https://github.com/danielroe/nuxt-composition-api/commit/9c5dee79b10a4b6699c8bbaf54d4a12317f2a08a))

### [0.1.5](https://github.com/danielroe/nuxt-composition-api/compare/0.1.4...0.1.5) (2020-04-29)


### Bug Fixes

* disable browser build ([849edee](https://github.com/danielroe/nuxt-composition-api/commit/849edee610ee536e2755999f878e669019deb363))

### [0.1.4](https://github.com/danielroe/nuxt-composition-api/compare/0.1.3...0.1.4) (2020-04-29)

### [0.1.3](https://github.com/danielroe/nuxt-composition-api/compare/0.1.2...0.1.3) (2020-04-28)


### Bug Fixes

* set $fetchState if nonexistent ([d94c40e](https://github.com/danielroe/nuxt-composition-api/commit/d94c40eb8b581bd9f1ab888310985966c7126643))

### [0.1.2](https://github.com/danielroe/nuxt-composition-api/compare/0.1.1...0.1.2) (2020-04-27)


### ⚠ BREAKING CHANGES

* `onFetch` can now be accessed using `useFetch`

### Code Refactoring

* rename onFetch to useFetch ([3647769](https://github.com/danielroe/nuxt-composition-api/commit/3647769b8db96f8dcc0463ea4a820eb712ef97ca))

### 0.1.1 (2020-04-27)


### Features

* add withContext hook ([179f0e1](https://github.com/danielroe/nuxt-composition-api/commit/179f0e1ab7b0d67499c1814c0101fd7037b66490))

