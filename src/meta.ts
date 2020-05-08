import { MetaInfo } from 'vue-meta'

export function createEmptyMeta(): MetaInfo {
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
