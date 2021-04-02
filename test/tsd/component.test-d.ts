import { expectType } from 'tsd'
import { defineComponent } from '@vue/composition-api'

import { defineComponent as modifiedDefineComponent } from 'src'

expectType<typeof defineComponent>(modifiedDefineComponent)
