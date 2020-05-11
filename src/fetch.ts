import Vue from 'vue'
import {
  getCurrentInstance,
  onBeforeMount,
  onServerPrefetch,
} from '@vue/composition-api'

import type { ComponentInstance } from '@vue/composition-api/dist/component'

function normalizeError(err: any) {
  let message
  if (!(err.message || typeof err === 'string')) {
    try {
      message = JSON.stringify(err, null, 2)
    } catch (e) {
      message = `[${err.constructor.name}]`
    }
  } else {
    message = err.message || err
  }
  return {
    ...err,
    message,
    statusCode:
      err.statusCode ||
      err.status ||
      (err.response && err.response.status) ||
      500,
  }
}

interface Fetch {
  (context: ComponentInstance): void
}

const fetches = new WeakMap<ComponentInstance, Fetch[]>()

const isSsrHydration = (vm: ComponentInstance) =>
  (vm.$vnode?.elm as any)?.dataset?.fetchKey
const nuxtState = process.client && (window as any).__NUXT__

interface AugmentedComponentInstance extends ComponentInstance {
  _fetchKey?: number
  _data?: any
  _hydrated?: boolean
  _fetchDelay?: number
  _fetchOnServer?: boolean
}

function registerCallback(vm: ComponentInstance, callback: Fetch) {
  const callbacks = fetches.get(vm) || []
  fetches.set(vm, [...callbacks, callback])
}

async function callFetches(this: AugmentedComponentInstance) {
  const fetchesToCall = fetches.get(this)
  if (!fetchesToCall) return
  ;(this.$nuxt as any).nbFetching++

  this.$fetchState.pending = true
  this.$fetchState.error = null
  this._hydrated = false

  let error = null
  const startTime = Date.now()

  try {
    await Promise.all(fetchesToCall.map(fetch => fetch(this)))
  } catch (err) {
    error = normalizeError(err)
  }

  const delayLeft = (this._fetchDelay || 0) - (Date.now() - startTime)
  if (delayLeft > 0) {
    await new Promise(resolve => setTimeout(resolve, delayLeft))
  }

  this.$fetchState.error = error
  this.$fetchState.pending = false
  this.$fetchState.timestamp = Date.now()

  this.$nextTick(() => (this.$nuxt as any).nbFetching--)
}

async function serverPrefetch(vm: AugmentedComponentInstance) {
  if (!vm._fetchOnServer) {
    return
  }
  // Call and await on $fetch
  vm.$fetchState =
    vm.$fetchState ||
    Vue.observable({
      error: null,
      pending: false,
      timestamp: 0,
    })
  try {
    await callFetches.call(vm)
  } catch (err) {
    vm.$fetchState.error = normalizeError(err)
  }
  vm.$fetchState.pending = false

  // Define an ssrKey for hydration
  vm._fetchKey = vm.$ssrContext.nuxt.fetch.length

  // Add data-fetch-key on parent element of Component
  if (!vm.$vnode.data) vm.$vnode.data = {}
  const attrs = (vm.$vnode.data.attrs = vm.$vnode.data.attrs || {})
  attrs['data-fetch-key'] = vm._fetchKey

  // Add to ssrContext for window.__NUXT__.fetch
  vm.$ssrContext.nuxt.fetch.push(
    vm.$fetchState.error
      ? { _error: vm.$fetchState.error }
      : JSON.parse(JSON.stringify(vm._data))
  )
}

export const useFetch = (callback: Fetch) => {
  const vm = getCurrentInstance() as AugmentedComponentInstance | undefined
  if (!vm) throw new Error('This must be called within a setup function.')

  vm.$fetchState =
    vm.$fetchState ||
    Vue.observable({
      error: null,
      pending: false,
      timestamp: 0,
    })

  vm.$fetch = callFetches.bind(vm)

  registerCallback(vm, callback)

  if (typeof vm.$options.fetchOnServer === 'function') {
    vm._fetchOnServer = vm.$options.fetchOnServer.call(vm) !== false
  } else {
    vm._fetchOnServer = vm.$options.fetchOnServer !== false
  }

  onServerPrefetch(() => serverPrefetch(vm))

  onBeforeMount(() => {
    if (!vm._hydrated) {
      return callFetches.call(vm)
    }
  })

  if (process.server || !isSsrHydration(vm))
    return {
      $fetch: vm.$fetch,
      $fetchState: vm.$fetchState,
    }

  // Hydrate component
  vm._hydrated = true
  vm._fetchKey = +(vm.$vnode.elm as any)?.dataset.fetchKey
  const data = nuxtState.fetch[vm._fetchKey]

  // If fetch error
  if (data && data._error) {
    vm.$fetchState.error = data._error

    return {
      $fetch: vm.$fetch,
      $fetchState: vm.$fetchState,
    }
  }

  onBeforeMount(() => {
    // Merge data
    for (const key in data) {
      try {
        Vue.set(vm, key, data[key])
      } catch (e) {
        if (process.env.NODE_ENV === 'development')
          // eslint-disable-next-line
          console.warn(`Could not hydrate ${key}.`)
      }
    }
  })

  return {
    $fetch: vm.$fetch,
    $fetchState: vm.$fetchState,
  }
}
