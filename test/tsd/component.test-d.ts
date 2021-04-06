import { expectType } from 'tsd'
import { defineComponent } from '@vue/composition-api'

import { defineComponent as modifiedDefineComponent } from '../..'

expectType<typeof defineComponent>(modifiedDefineComponent)
