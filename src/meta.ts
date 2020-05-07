import { reactive, toRefs } from '@vue/composition-api'
import type { MetaInfo } from 'vue-meta'

function createEmptyMeta(): MetaInfo {
  return {
    title: undefined,
    titleTemplate: undefined,
    htmlAttrs: undefined,
    headAttrs: undefined,
    bodyAttrs: undefined,

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

export function useHead(init: MetaInfo = {}) {
  const meta = reactive<MetaInfo>({
    ...createEmptyMeta(),
    ...init,
  })

  return {
    head: () => meta,
    useMeta: () => toRefs(meta),
  }
}
