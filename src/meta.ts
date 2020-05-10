import { MetaInfo } from 'vue-meta'
import defu from 'defu'
import { getCurrentInstance, toRefs, reactive } from '@vue/composition-api'
import { UnwrapRef, Ref } from '@vue/composition-api/dist/reactivity'

export type ReactiveHead<T = {}> = UnwrapRef<Ref<MetaInfo & T>>

type MetaInfoMapper<T> = {
  [P in keyof T]: P extends 'base'
    ? T[P] | undefined
    : T[P] extends Function
    ? T[P] | undefined
    : T[P] extends Array<any> | Record<string, any>
    ? T[P]
    : T[P] | undefined
}

export function createEmptyMeta(): MetaInfoMapper<Required<MetaInfo>> {
  return {
    __dangerouslyDisableSanitizers: [],
    __dangerouslyDisableSanitizersByTagID: {},

    title: undefined,
    titleTemplate: undefined,
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

export const getHeadOptions = (options: any) => {
  const _head: ReactiveHead = reactive<MetaInfo>({})
  if (!(options.head instanceof Function)) {
    Object.assign(_head, options.head)
  }
  const head =
    options.head instanceof Function
      ? () => defu(_head, options.head())
      : () => _head
  return { _head, head }
}

export const useMeta = <T extends MetaInfo>(init?: T) => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('useMeta must be called within a component.')

  if (!('_head' in vm.$options))
    throw new Error(
      'In order to enable `useMeta`, please make sure you include `head: {}` within your component definition, and you are using the `defineComponent` exported from nuxt-composition-api.'
    )

  const { _head } = vm.$options as { _head: ReactiveHead }

  Object.assign(_head, createEmptyMeta())
  Object.assign(_head, init || {})
  return toRefs(
    _head as UnwrapRef<
      Ref<Exclude<ReturnType<typeof createEmptyMeta>, keyof T> & T>
    >
  )
}
