import {
  Ref,
  watch,
  isRef,
  getCurrentInstance,
  watchEffect,
} from '@vue/composition-api'
import type {
  Context,
  NuxtAppOptions,
  Middleware,
  Transition,
} from '@nuxt/types'
import type { MetaInfo } from 'vue-meta'

export const useContext = () => {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('This must be called within a setup function.')

  return vm.$nuxt.context
}

/**
 * TODO: check if current vm is a Page
 */
function isPage() {
  const context = useContext()

  console.log(context.app.router)
  console.log(context.route)

  return true
}

interface PageOptions {
  head: MetaInfo
  key: string
  layout: string
  loading: boolean
  middleware: Middleware | Middleware[]
  scrollToTop: boolean
  transition: string | Transition
  validate: boolean | Promise<boolean>
  watchQuery: NuxtAppOptions['watchQuery']
}

enum modes {
  static,
  staticFunction,
  ref,
}

type getterWithContext<T> = (ctx: Context) => Ref<T> | T

function createFn<S extends keyof PageOptions>(
  key: S,
  m: modes.staticFunction
): <T extends PageOptions[S]>(c: getterWithContext<T>) => void
function createFn<S extends keyof PageOptions>(
  key: S,
  m: modes.static
): <T extends PageOptions[S]>(cmp: T) => void
function createFn<S extends keyof PageOptions>(
  key: S,
  m: modes.ref
): <T extends PageOptions[S]>(cmp: Ref<T> | getterWithContext<T> | T) => void
function createFn<S extends keyof PageOptions>(key: S, m: modes) {
  switch (m) {
    case modes.ref:
      return <T extends PageOptions[S]>(
        cmp: Ref<T> | getterWithContext<T> | T
      ) => {
        if (!isPage()) {
          return
        }

        const ctx = useContext()

        if (cmp instanceof Function) {
          watchEffect(() => {
            const _v = (cmp as any)(ctx)

            if (isRef(_v)) {
              ctx.app[key] = _v.value as any
            } else {
              ctx.app[key] = _v as any
            }
          })

          return
        }

        if (isRef(cmp)) {
          watch(cmp, () => {
            ctx.app[key] = cmp.value as any
          })
        } else {
          ctx.app[key] = cmp as any
        }

        return
      }
    case modes.static:
      return <T extends PageOptions[S]>(cmp: T) => {
        if (!isPage()) {
          return
        }

        const ctx = useContext()

        ctx.app[key] = cmp as any

        return
      }

    case modes.staticFunction:
      return <T extends PageOptions[S]>(cmp: getterWithContext<T>) => {
        if (!isPage()) {
          return
        }

        const ctx = useContext()

        ctx.app[key] = (() => {
          const _v = cmp(ctx)

          if (isRef(_v)) {
            return _v.value
          }

          return _v
        }) as any

        return
      }

    default:
      break
  }
}

// // In Vue3 not needed.
export const setHead = createFn('head', modes.ref)

export const setKey = createFn('key', modes.staticFunction)

export const setLayout = createFn('layout', modes.ref)

export const setLoading = createFn('loading', modes.static)

export const setMiddleware = createFn('middleware', modes.static)

export const setScrollToTop = createFn('scrollToTop', modes.static)

export const setTransition = createFn('transition', modes.static)

export const setValidate = createFn('validate', modes.staticFunction)

export const setWatchQuery = createFn('watchQuery', modes.static)

type fetchFunction = (ctx: Context) => void | Promise<void>

export const setFetch = (fetch: fetchFunction) => {
  const ctx = useContext()

  ctx.app.fetch = fetch
}

type asyncFunction = (ctx: Context) => void | object | Promise<void | object>

export const useAsync = (asyncFn: asyncFunction | Promise<void | object>) => {
  if (!isPage()) {
    return
  }

  const ctx = useContext()

  if (asyncFn instanceof Promise) {
    ctx.app.asyncData = () => asyncFn
  } else {
    ctx.app.asyncData = asyncFn
  }
}
