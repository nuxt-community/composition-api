import Vue from 'vue'
import CompositionApi from '@vue/composition-api'

Vue.use(CompositionApi)

export { useAsync } from './async'
export { defineComponent } from './component'
export { useContext, withContext } from './context'
export { useFetch } from './fetch'
export { useMeta } from './meta'
export { ssrRef, shallowSsrRef, setSSRContext } from './ssr-ref'
export { useStatic } from './static'

export type {
  ComponentRenderProxy,
  InjectionKey,
  PropOptions,
  PropType,
  Ref,
  SetupContext,
  VueWatcher,
} from '@vue/composition-api'

export {
  computed,
  createComponent,
  createElement,
  getCurrentInstance,
  inject,
  isRef,
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
  toRefs,
  watch,
  watchEffect,
} from '@vue/composition-api'
