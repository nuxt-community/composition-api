import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export { useAsync } from './async'
export { defineComponent } from './component'
export { useContext, withContext } from './context'
export { useFetch } from './fetch'
export { globalPlugin, onGlobalSetup } from './hooks'
export { useMeta } from './meta'
export { ssrRef, shallowSsrRef, setSSRContext, ssrPromise } from './ssr-ref'
export { useStatic } from './static'
export * from './createHelpers'

export type {
  ComponentRenderProxy,
  ComputedRef,
  FlushMode,
  InjectionKey,
  PropOptions,
  PropType,
  Ref,
  SetupContext,
  UnwrapRef,
  VueWatcher,
  WatchCallback,
  WatchEffect,
  WatchOptions,
  WatchOptionsBase,
  WatchSource,
  WatchStopHandle,
  WritableComputedRef,
} from '@vue/composition-api'

export {
  computed,
  createComponent,
  createElement,
  getCurrentInstance,
  inject,
  isReactive,
  isRef,
  markRaw,
  nextTick,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  provide,
  reactive,
  ref,
  set,
  shallowReactive,
  shallowRef,
  toRaw,
  toRef,
  toRefs,
  triggerRef,
  unref,
  watch,
  watchEffect,
} from '@vue/composition-api'
