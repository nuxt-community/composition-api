import { expectType } from 'tsd'
import { defineComponent } from 'vue'

import { defineComponent as modifiedDefineComponent } from '../..'

expectType<typeof defineComponent>(modifiedDefineComponent)
