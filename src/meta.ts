import { MetaInfo } from 'vue-meta'

type MetaInfoMapper<T> = {
  [P in keyof T]: T[P] extends Array<any> ? T[P] : T[P] | undefined
}

export function createEmptyMeta(): MetaInfoMapper<Required<MetaInfo>> {
  return {
    __dangerouslyDisableSanitizers: [],
    __dangerouslyDisableSanitizersByTagID: undefined,

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
