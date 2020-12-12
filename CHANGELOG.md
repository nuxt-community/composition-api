## [0.17.0](https://github.com/nuxt-community/composition-api/compare/0.16.4...0.17.0) (2020-12-12)


### Features

* upgrade to vca beta 21 (adds `readonly`) ([9277489](https://github.com/nuxt-community/composition-api/commit/92774896b27548352de75344ce319d1d899718e2))


### Bug Fixes

* ensure `ssrRef` doesn't share state across requests when used in `setup()` ([#310](https://github.com/nuxt-community/composition-api/issues/310)) ([61a3b55](https://github.com/nuxt-community/composition-api/commit/61a3b550afa1ffbeb285aad69c0cba62234da9be))

### [0.16.4](https://github.com/nuxt-community/composition-api/compare/0.16.3...0.16.4) (2020-11-25)


### Bug Fixes

* completely disable support for global `useMeta` if `@nuxtjs/pwa` detected ([5dc5e34](https://github.com/nuxt-community/composition-api/commit/5dc5e345500f437bb4332cee541dfe4af59e8254))

### [0.16.3](https://github.com/nuxt-community/composition-api/compare/0.16.2...0.16.3) (2020-11-25)


### Features

* respect explicitly set `build.corejs` version in `nuxt.config` ([b1603cb](https://github.com/nuxt-community/composition-api/commit/b1603cbbcca3aa99f7fffc2f408011c42861912e))

### [0.16.2](https://github.com/nuxt-community/composition-api/compare/0.16.1...0.16.2) (2020-11-25)


### Bug Fixes

* ensure meta plugin is loaded last ([c5c7299](https://github.com/nuxt-community/composition-api/commit/c5c72997f755b51b5d0d08e4807581df1f0c919c))

### [0.16.1](https://github.com/nuxt-community/composition-api/compare/0.16.0...0.16.1) (2020-11-25)


### Bug Fixes

* register meta plugin after other plugins ([87535eb](https://github.com/nuxt-community/composition-api/commit/87535eb5301d6640f91c8ea6fe621df096213418)), closes [#307](https://github.com/nuxt-community/composition-api/issues/307)

## [0.16.0](https://github.com/nuxt-community/composition-api/compare/0.15.1...0.16.0) (2020-11-24)


### Features

* allow accessing meta properties in `onGlobalSetup` ([15cf20e](https://github.com/nuxt-community/composition-api/commit/15cf20ece6d49e4067f8d648b626c373e76129c0)), closes [#305](https://github.com/nuxt-community/composition-api/issues/305)


### Bug Fixes

* **docs:** update lockfile ([952259b](https://github.com/nuxt-community/composition-api/commit/952259b04cb560e36731c68644f654ac83777e0d))

### [0.15.1](https://github.com/nuxt-community/composition-api/compare/0.15.0...0.15.1) (2020-11-17)

## [0.15.0](https://github.com/nuxt-community/composition-api/compare/0.13.5...0.15.0) (2020-11-09)


### Features

* add new export from upstream (`del`) ([4845254](https://github.com/nuxt-community/composition-api/commit/4845254b6fa25427ffcae459fec29d1596c78c97))


### Bug Fixes

* address TS bug ([e87d610](https://github.com/nuxt-community/composition-api/commit/e87d6108722df76446bc6eb041c00a0592ac4c18))
* use globalNuxt in full static mode ([1479665](https://github.com/nuxt-community/composition-api/commit/14796657f53d35134c6898a6e2aa9ab2640ee49c))

## [0.14.0](https://github.com/nuxt-community/composition-api/compare/0.13.5...0.14.0) (2020-11-02)


### Features

* add new export from upstream (`del`) ([4845254](https://github.com/nuxt-community/composition-api/commit/4845254b6fa25427ffcae459fec29d1596c78c97))

### [0.13.5](https://github.com/nuxt-community/composition-api/compare/0.13.4...0.13.5) (2020-10-17)

### [0.13.4](https://github.com/nuxt-community/composition-api/compare/0.13.3...0.13.4) (2020-10-16)


### Features

* add `reqRef` and `ssrReqRef` for refs to be reset per-request ([b6f327c](https://github.com/nuxt-community/composition-api/commit/b6f327ca55f1cd48f6b39c257b487a7d25a15f59))

### [0.13.3](https://github.com/nuxt-community/composition-api/compare/0.13.2...0.13.3) (2020-10-15)


### Bug Fixes

* fallback to instance for nuxt context ([d40c07b](https://github.com/nuxt-community/composition-api/commit/d40c07b7edf8190c8556866e418ee32100f5991a)), closes [#264](https://github.com/nuxt-community/composition-api/issues/264)

### [0.13.2](https://github.com/nuxt-community/composition-api/compare/0.13.1...0.13.2) (2020-10-15)


### Bug Fixes

* reinitialise global setup callbacks on each request ([7816afe](https://github.com/nuxt-community/composition-api/commit/7816afe9ca46e3118ba18be34a88240d986ec75f)), closes [#270](https://github.com/nuxt-community/composition-api/issues/270)

### [0.13.1](https://github.com/nuxt-community/composition-api/compare/0.13.0...0.13.1) (2020-10-14)


### Bug Fixes

* prevent `useMeta` from sharing state in ssr ([#268](https://github.com/nuxt-community/composition-api/issues/268)) ([e54cefe](https://github.com/nuxt-community/composition-api/commit/e54cefe61c28fbdb5956dc8ecf53e313567da1ee))

## [0.13.0](https://github.com/nuxt-community/composition-api/compare/0.12.6...0.13.0) (2020-10-12)


### Features

* allow computed properties within `useMeta` ([#255](https://github.com/nuxt-community/composition-api/issues/255)) ([7152ed4](https://github.com/nuxt-community/composition-api/commit/7152ed42785585507c26c7df6deced7c6e16f590))


### Bug Fixes

* use `siroc` to build ([79106c2](https://github.com/nuxt-community/composition-api/commit/79106c22a9da153c720251aef1dc3b7c66acb300)), closes [#259](https://github.com/nuxt-community/composition-api/issues/259)

### [0.12.6](https://github.com/nuxt-community/composition-api/compare/0.12.5...0.12.6) (2020-10-10)

### [0.12.5](https://github.com/nuxt-community/composition-api/compare/0.12.4...0.12.5) (2020-09-18)

### [0.12.4](https://github.com/nuxt-community/composition-api/compare/0.12.3...0.12.4) (2020-09-16)


### Bug Fixes

* remove `markReactive` export ([#239](https://github.com/nuxt-community/composition-api/issues/239)) ([d455d0f](https://github.com/nuxt-community/composition-api/commit/d455d0f87e5a798403ffb7bb0263f4e30de0c4ce)), closes [#238](https://github.com/nuxt-community/composition-api/issues/238)

### [0.12.3](https://github.com/nuxt-community/composition-api/compare/0.12.2...0.12.3) (2020-08-26)


### Bug Fixes

* load nuxt edge utils if available ([#219](https://github.com/nuxt-community/composition-api/issues/219)) ([563bb3c](https://github.com/nuxt-community/composition-api/commit/563bb3c33fb7bfc9d5a57353b006c8cc8f268eb0))
* overwrite titleTemplate with undefined ([#220](https://github.com/nuxt-community/composition-api/issues/220)) ([dc6f253](https://github.com/nuxt-community/composition-api/commit/dc6f25360554aab4cb29ec8d0f021939c5660168))

### [0.12.2](https://github.com/nuxt-community/composition-api/compare/0.12.1...0.12.2) (2020-08-18)


### Bug Fixes

* use `Promise.resolve()` to cover all possible promise cases ([#211](https://github.com/nuxt-community/composition-api/issues/211)) ([6d10312](https://github.com/nuxt-community/composition-api/commit/6d10312f65cefb219c00bbceb946d3547abc25f4)), closes [#210](https://github.com/nuxt-community/composition-api/issues/210)

### [0.12.1](https://github.com/nuxt-community/composition-api/compare/0.12.0...0.12.1) (2020-08-16)

## [0.12.0](https://github.com/nuxt-community/composition-api/compare/0.11.0...0.12.0) (2020-08-09)


### Features

* add new exports from `@vue/composition-api` ([5bbcfd7](https://github.com/nuxt-community/composition-api/commit/5bbcfd75e241e3aa97d07ea87595b171019eec4c))

## [0.11.0](https://github.com/nuxt-community/composition-api/compare/0.10.6...0.11.0) (2020-07-27)


### Features

* add nuxt helpers ([#160](https://github.com/nuxt-community/composition-api/issues/160)) ([8a9885e](https://github.com/nuxt-community/composition-api/commit/8a9885e5a78dc3c07c38134e45887185be7d6139))

### [0.10.6](https://github.com/nuxt-community/composition-api/compare/0.10.5...0.10.6) (2020-07-14)


### Bug Fixes

* add support for windows ([#140](https://github.com/nuxt-community/composition-api/issues/140)) ([c39773f](https://github.com/nuxt-community/composition-api/commit/c39773fcff157169e2c7761ca7bbd229bf089331))
* correctly check for `isFullStatic` ([db87441](https://github.com/nuxt-community/composition-api/commit/db874411b9195d2d90fa1710fb9f4065a0fb153c))

### [0.10.5](https://github.com/nuxt-community/composition-api/compare/0.10.4...0.10.5) (2020-07-09)


### Bug Fixes

* create `static-json` dir at correct point in generate lifecycle ([2d4e10b](https://github.com/nuxt-community/composition-api/commit/2d4e10b645f982034a0e69a2d3ba338af9c0a255))
* test for nuxt instance before loading static ([43d5ee6](https://github.com/nuxt-community/composition-api/commit/43d5ee6a18482b981365d3e1669146e96420fcae)), closes [#143](https://github.com/nuxt-community/composition-api/issues/143)

### [0.10.4](https://github.com/nuxt-community/composition-api/compare/0.10.3...0.10.4) (2020-07-09)


### Bug Fixes

* revert to custom ssr fetch handling ([6cde3df](https://github.com/nuxt-community/composition-api/commit/6cde3dfe4555f5bee6a2944d79715c4a705da496)), closes [#133](https://github.com/nuxt-community/composition-api/issues/133) [#141](https://github.com/nuxt-community/composition-api/issues/141) [#143](https://github.com/nuxt-community/composition-api/issues/143)

### [0.10.3](https://github.com/nuxt-community/composition-api/compare/0.10.2...0.10.3) (2020-07-01)


### Bug Fixes

* check static path exists before copying files ([9f1bdc7](https://github.com/nuxt-community/composition-api/commit/9f1bdc7026336e018bec1f6b7d4b63713c451897))

### [0.10.2](https://github.com/nuxt-community/composition-api/compare/0.10.1...0.10.2) (2020-06-25)


### Bug Fixes

* remove `console.log` ([0b1d5a8](https://github.com/nuxt-community/composition-api/commit/0b1d5a8872760f28e4e7deb030cc6640b1b611cd))

### [0.10.1](https://github.com/nuxt-community/composition-api/compare/0.10.0...0.10.1) (2020-06-25)


### Features

* export `nextTick` from `@vue/composition-api` ([df68e0a](https://github.com/nuxt-community/composition-api/commit/df68e0a3788dbfca3d3f400465228daf3d202851))

## [0.10.0](https://github.com/nuxt-community/composition-api/compare/0.9.3...0.10.0) (2020-06-25)


### ⚠ BREAKING CHANGES

* requires nuxt 2.13+ for `useFetch`

### Features

* support static target for `useFetch` ([74205b5](https://github.com/nuxt-community/composition-api/commit/74205b5198e46f43f77601a9c786b49b1e6e9dc1)), closes [#127](https://github.com/nuxt-community/composition-api/issues/127)


### Bug Fixes

* handle preexisting babel plugins function ([c5c338f](https://github.com/nuxt-community/composition-api/commit/c5c338f1675a05264ce3481e8469ad24d2fe44d8))
* specify type for inline function ([694f21b](https://github.com/nuxt-community/composition-api/commit/694f21bbfea097ea2409f70c8a9a8f700143b97f))
* write static files synchronously ([eb91a5f](https://github.com/nuxt-community/composition-api/commit/eb91a5f5d85f98b6bd5a425aab28c151183abe0b))

### [0.9.3](https://github.com/nuxt-community/composition-api/compare/0.9.2...0.9.3) (2020-06-13)


### Features

* add `ssrPromise` functionality ([461939d](https://github.com/nuxt-community/composition-api/commit/461939da38b0386c95b328ae49a10d2e57536aad)), closes [#115](https://github.com/nuxt-community/composition-api/issues/115)

### [0.9.2](https://github.com/nuxt-community/composition-api/compare/0.9.1...0.9.2) (2020-06-13)


### Features

* provide access to global `setup()` function ([7fd70d9](https://github.com/nuxt-community/composition-api/commit/7fd70d9ccb4687a3a20aceeb24a3295d53875146)), closes [#104](https://github.com/nuxt-community/composition-api/issues/104) [#111](https://github.com/nuxt-community/composition-api/issues/111)


### Bug Fixes

* remove duplicate static path definition ([48b9afb](https://github.com/nuxt-community/composition-api/commit/48b9afbe0531ffa90090c67d69d8fc65f02fa868))


### Performance Improvements

* remove unnecessary spread ([2300a93](https://github.com/nuxt-community/composition-api/commit/2300a93d79e826526645d732f57bf9712f59e52e))

### [0.9.1](https://github.com/nuxt-community/composition-api/compare/0.9.0...0.9.1) (2020-06-11)

## [0.9.0](https://github.com/nuxt-community/composition-api/compare/0.8.2...0.9.0) (2020-06-10)


### ⚠ BREAKING CHANGES

* There are a number of breaking changes in the latest upstream composition-api. See https://github.com/vuejs/composition-api/releases/tag/v0.6.0 for details.

### Features

* upgrade to `@vue/composition-api` v0.6.1 ([3d0bdc6](https://github.com/nuxt-community/composition-api/commit/3d0bdc62b509e0e95896ff8da79f12feaf0fb60b))

### [0.8.2](https://github.com/nuxt-community/composition-api/compare/0.8.1...0.8.2) (2020-06-04)


### Bug Fixes

* regression if `ssrRef` is used outside setup (in dev) ([f2beecd](https://github.com/nuxt-community/composition-api/commit/f2beecd38396a1942a52aceb55cc516eb9de37b7))

### [0.8.1](https://github.com/nuxt-community/composition-api/compare/0.8.0...0.8.1) (2020-06-02)


### Bug Fixes

* re-run `ssrRef` factory functions on hot module reload ([282b8d2](https://github.com/nuxt-community/composition-api/commit/282b8d273cf049d9015d29ee8dc60f2ff0478248)), closes [#88](https://github.com/nuxt-community/composition-api/issues/88)

## [0.8.0](https://github.com/nuxt-community/composition-api/compare/0.7.5...0.8.0) (2020-05-30)


### Features

* add `useStatic` helper to inline results of API calls ([#79](https://github.com/nuxt-community/composition-api/issues/79)) ([460b615](https://github.com/nuxt-community/composition-api/commit/460b6152c93f678781a79a628a16894ca7795a02))

### [0.7.5](https://github.com/nuxt-community/composition-api/compare/0.7.4...0.7.5) (2020-05-30)


### Bug Fixes

* allow extension of `useContext` return type ([24d7586](https://github.com/nuxt-community/composition-api/commit/24d75865be7d6226aafd871cae7f2346bef021e1)), closes [#84](https://github.com/nuxt-community/composition-api/issues/84)

### [0.7.4](https://github.com/nuxt-community/composition-api/compare/0.7.3...0.7.4) (2020-05-28)


### Bug Fixes

* transpile buildModule ([2d5388d](https://github.com/nuxt-community/composition-api/commit/2d5388de3433d157a71393cc121fd34ed1398dad)), closes [#80](https://github.com/nuxt-community/composition-api/issues/80)

### [0.7.3](https://github.com/nuxt-community/composition-api/compare/0.7.2...0.7.3) (2020-05-27)


### Bug Fixes

* `useMeta` refs should be reactive ([#81](https://github.com/nuxt-community/composition-api/issues/81)) ([74cb5ef](https://github.com/nuxt-community/composition-api/commit/74cb5ef4b5b1e896bd64af3b9fb43ddb636f5894))

### [0.7.2](https://github.com/nuxt-community/composition-api/compare/0.7.1...0.7.2) (2020-05-27)


### Bug Fixes

* allow custom `globalContext` and `globalNuxt` ([#80](https://github.com/nuxt-community/composition-api/issues/80)) ([8b8d7eb](https://github.com/nuxt-community/composition-api/commit/8b8d7eb73a70fedfff630709fc03f6958a8d4961))
* reduce chance of `$fetch`/`$fetchState` collision ([534dc43](https://github.com/nuxt-community/composition-api/commit/534dc432af43934d079b1cb0a4c8231e27053f6e)), closes [#74](https://github.com/nuxt-community/composition-api/issues/74)
* sanitise ssrRefs ([fcb4a9d](https://github.com/nuxt-community/composition-api/commit/fcb4a9daca955b9537c6996f1de798b7eae6f94a))

### [0.7.1](https://github.com/nuxt-community/composition-api/compare/0.7.0...0.7.1) (2020-05-19)


### Bug Fixes

* register composition api before layouts ([93024a8](https://github.com/nuxt-community/composition-api/commit/93024a827af853c061ff70429a835ebc7df52786)), closes [#64](https://github.com/nuxt-community/composition-api/issues/64) [#65](https://github.com/nuxt-community/composition-api/issues/65)

## [0.7.0](https://github.com/nuxt-community/composition-api/compare/0.6.3...0.7.0) (2020-05-14)


### ⚠ BREAKING CHANGES

* `route`, `query`, `from` and `params` are now returned as refs from `useContext`, which was probably what you wanted anyway.

### Bug Fixes

* make route-related context reactive ([91292c8](https://github.com/nuxt-community/composition-api/commit/91292c8cb2d3cc2954ca67514ac59ab006f3ae73))

### [0.6.3](https://github.com/nuxt-community/composition-api/compare/0.6.2...0.6.3) (2020-05-11)


### Features

* create shallowSsrRef ([#49](https://github.com/nuxt-community/composition-api/issues/49)) ([5ef0f6c](https://github.com/nuxt-community/composition-api/commit/5ef0f6c8d6597e38b7396fdad9ef087eb4194eb6))

### [0.6.2](https://github.com/nuxt-community/composition-api/compare/0.6.1...0.6.2) (2020-05-11)


### Features

* use appropriate core-js polyfill for ie11 ([5281e66](https://github.com/nuxt-community/composition-api/commit/5281e66b1e77d762056909a2157ddbc72253fc71))


### Bug Fixes

* insert composition api plugin before others ([2ef608b](https://github.com/nuxt-community/composition-api/commit/2ef608b456fe945b47661d82af337dcd20c390c5))
* reduce meta type definitions ([fa9efa3](https://github.com/nuxt-community/composition-api/commit/fa9efa37c8eadd71c523a7cdbe0e574e210f4f8b))
* revert data sanitisation ([1a4bbed](https://github.com/nuxt-community/composition-api/commit/1a4bbed5025b9f1deb8294d568cf419d27b99a5e))
* sanitise `ssrRef` data ([d86fdb2](https://github.com/nuxt-community/composition-api/commit/d86fdb2ec6b00f437fe2c1786133b18fffe78a3b))

### [0.6.1](https://github.com/nuxt-community/composition-api/compare/0.6.0...0.6.1) (2020-05-10)


### Features

* allow `ssrRef` to work outside of setup ([#46](https://github.com/nuxt-community/composition-api/issues/46)) ([6a67c05](https://github.com/nuxt-community/composition-api/commit/6a67c05537f87254d2dcb0c95dd43c4747431a5f))


### Bug Fixes

* improve default values for `useMeta` ([f3024e1](https://github.com/nuxt-community/composition-api/commit/f3024e1e79a01a2d9714b4549bd6d6966b2ef260))

## [0.6.0](https://github.com/nuxt-community/composition-api/compare/0.5.0...0.6.0) (2020-05-09)


### ⚠ BREAKING CHANGES

* `useHead()` no longer exists and instead `useMeta` can be used directly within `setup`, as long as a minimal `head: {}` is defined in the component options.

_Note_: Work has already begun on composable hooks for `vue-meta` that will mean we don't need to define a minimal `head` object: see [here](5d0eb1ab60ce476ed8a97e97d4d409e74284df9b).

### Features

* allow automatic injection of `head()` into components ([#43](https://github.com/nuxt-community/composition-api/issues/43)) ([f1bda39](https://github.com/nuxt-community/composition-api/commit/f1bda396ea096e42dff645df3275b5d4d288ac73)), closes [#41](https://github.com/nuxt-community/composition-api/issues/41)
* return `$fetch` and `$fetchState` from `useFetch` ([c45177f](https://github.com/nuxt-community/composition-api/commit/c45177f341c57fd40136aaac8e0c55e97c4edd4a))

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

