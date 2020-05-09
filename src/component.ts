import {
  defineComponent as define,
  reactive,
  toRefs,
  getCurrentInstance,
} from '@vue/composition-api'
import defu from 'defu'
import { MetaInfo } from 'vue-meta'

import { createEmptyMeta } from './meta'

import { UnwrapRef, Ref } from '@vue/composition-api/dist/reactivity'

type ReactiveHead<T = {}> = UnwrapRef<Ref<MetaInfo & T>>

export const defineComponent: typeof define = (options: any) => {
  if (!('head' in options)) return options

  const _head: ReactiveHead = reactive<MetaInfo>({})
  if (!(options.head instanceof Function)) {
    Object.assign(_head, options.head)
  }
  const head =
    options.head instanceof Function
      ? () => defu(_head, options.head())
      : () => _head

  return {
    ...options,
    _head,
    head,
  }
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
