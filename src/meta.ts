import defu from 'defu'
import {
  computed,
  getCurrentInstance,
  reactive,
  ref,
  toRefs,
  watch,
  Ref,
  set,
  isReactive,
  isRef,
  toRaw,
  UnwrapRef,
} from '@vue/composition-api'

import type { MetaInfo } from 'vue-meta'

export type ReactiveHead<T = Record<string, unknown>> = UnwrapRef<
  Ref<MetaInfo & T>
>

type MetaInfoMapper<T> = {
  [P in keyof T]: P extends 'base'
    ? T[P] | undefined
    : T[P] extends () => any
    ? T[P] | undefined
    : T[P] extends Array<any> | Record<string, unknown>
    ? T[P]
    : T[P] | undefined
}

function assign<T extends Record<string, any>>(target: T, source: Partial<T>) {
  Object.entries(source).forEach(([key, value]) => {
    set(target, key, value)
  })
  return target
}

export function createEmptyMeta(): MetaInfoMapper<Required<MetaInfo>> {
  return {
    titleTemplate: (null as unknown) as undefined,

    __dangerouslyDisableSanitizers: [],
    __dangerouslyDisableSanitizersByTagID: {},

    title: undefined,
    htmlAttrs: {},
    headAttrs: {},
    bodyAttrs: {},

    base: undefined,

    meta: [],
    link: [],
    style: [],
    script: [],
    noscript: [],

    changed: undefined,
    afterNavigation: undefined,
  }
}

type ComputedHead = Array<MetaInfo | Ref<MetaInfo>>

export const getHeadOptions = (options: { head: () => MetaInfo }) => {
  const head = function (this: {
    head?: MetaInfo | (() => MetaInfo)
    _computedHead?: ComputedHead
  }) {
    const optionHead =
      options.head instanceof Function ? options.head.call(this) : options.head

    if (!this._computedHead) return optionHead

    const computedHead = this._computedHead.map(h => {
      if (isReactive(h)) return toRaw(h)
      if (isRef(h)) return h.value
    })
    return defu(...computedHead.reverse(), optionHead)
  }

  return { head }
}

type ToRefs<T extends Record<string, any>> = {
  [P in keyof T]: Ref<T[P]>
}

/**
 * `useMeta` lets you interact directly with [`head()` properties](https://nuxtjs.org/api/pages-head/) in `setup`. **Make sure you set `head: {}` in your component options.**
 * @example
    ```ts
    import { defineComponent, useMeta, computed } from '@nuxtjs/composition-api'

    export default defineComponent({
      head: {},
      setup() {
        const { title } = useMeta()
        title.value = 'My page'
      })
    })
    ```
 * @param init Whatever defaults you want to set for `head` properties.
 */
export const useMeta = <
  T extends MetaInfo,
  MetaRefs extends ToRefs<ReturnType<typeof createEmptyMeta> & T>
>(
  init?: T | (() => T)
) => {
  const vm = getCurrentInstance() as ReturnType<typeof getCurrentInstance> & {
    _computedHead?: ComputedHead
    _metaRefs?: MetaRefs
  }
  if (!vm) throw new Error('useMeta must be called within a component.')

  if (!('head' in vm.$options))
    throw new Error(
      'In order to enable `useMeta`, please make sure you include `head: {}` within your component definition, and you are using the `defineComponent` exported from @nuxtjs/composition-api.'
    )

  const refreshMeta = () => vm.$meta().refresh()

  if (!vm._computedHead) {
    const metaRefs = reactive(createEmptyMeta())
    vm._computedHead = [metaRefs]
    vm._metaRefs = toRefs(metaRefs) as MetaRefs

    if (process.client) {
      watch(Object.values(vm._metaRefs), refreshMeta, { immediate: true })
    }
  }

  if (init) {
    const initRef = init instanceof Function ? computed(init) : ref(init)
    vm._computedHead.push(initRef)

    if (process.client) {
      watch(initRef, refreshMeta, { immediate: true })
    }
  }

  return vm._metaRefs!
}
