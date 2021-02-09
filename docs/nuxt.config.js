import { withDocus } from 'docus'

// Learn more at https://docus.dev
export default withDocus({
  generate: {
    routes: ['/'],
    exclude: [/\/example/, /\/fixture/],
  },
})
