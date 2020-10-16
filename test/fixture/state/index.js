import { reqRef, ssrRef, reqSsrRef } from '@nuxtjs/composition-api'

export const reqRefCounter = reqRef(0)
export const ssrRefCounter = ssrRef(0)
export const reqSsrRefCounter = reqSsrRef(0)
