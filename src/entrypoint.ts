import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export { useAsync } from './async'
export { defineComponent } from './component'
export { useContext, withContext } from './context'
export { useFetch } from './fetch'
export { globalPlugin, onGlobalSetup, setMetaPlugin } from './hooks'
export { useMeta } from './meta'
export { reqRef, reqSsrRef } from './req-ref'
export { ssrRef, shallowSsrRef, setSSRContext, ssrPromise } from './ssr-ref'
export { useStatic } from './static'
export * from './defineHelpers'
export * from './wrappers'

export const getCompositionApiKey = (key?: string) => key

export type {
  App,
  ComponentInstance,
  ComponentRenderProxy,
  ComputedGetter,
  ComputedRef,
  ComputedSetter,
  Data,
  DeepReadonly,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  FlushMode,
  InjectionKey,
  PropOptions,
  PropType,
  Ref,
  SetupContext,
  SetupFunction,
  ShallowUnwrapRef,
  ToRefs,
  UnwrapRef,
  VueWatcher,
  WatchCallback,
  WatchEffect,
  WatchOptions,
  WatchOptionsBase,
  WatchSource,
  WatchStopHandle,
  WritableComputedOptions,
  WritableComputedRef,
} from '@vue/composition-api'

export {
  computed,
  createApp,
  createRef,
  customRef,
  defineAsyncComponent,
  del,
  getCurrentInstance,
  h,
  inject,
  isRaw,
  isReactive,
  isReadonly,
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
  proxyRefs,
  reactive,
  readonly,
  ref,
  set,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  toRaw,
  toRef,
  toRefs,
  triggerRef,
  unref,
  useCssModule,
  useCSSModule,
  version,
  warn,
  watch,
  watchEffect,
} from '@vue/composition-api'
