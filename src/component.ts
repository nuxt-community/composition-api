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

const heads = new WeakMap<() => any, MetaInfo>()

export function defineComponent(
  options: Parameters<typeof define>[0]
): ReturnType<typeof define>

export function defineComponent(options: any) {
  if (!options.head) return options

  const reactiveHead = reactive<MetaInfo>({})
  const head = () =>
    defu(
      options.head instanceof Function ? options.head() : options.head || {},
      reactiveHead
    )
  heads.set(head, reactiveHead)

  return {
    ...options,
    head,
  }
}

export const useMeta = (init: MetaInfo = {}) => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('useMeta must be called within a component.')

  const { head } = vm.$options
  if (!head || !(head instanceof Function))
    throw new Error(
      'In order to enable `useMeta`, please make sure you include `head: {}` within your component definition, and you are using the `defineComponent` exported from nuxt-composition-api.'
    )

  const meta = heads.get(head) as UnwrapRef<Ref<MetaInfo>>
  Object.assign(meta, createEmptyMeta())
  Object.assign(meta, init)
  return toRefs(meta)
}
