---
---

# useMeta

You can interact directly with [`head()` properties](https://nuxtjs.org/api/pages-head/) in `setup` by means of the `useMeta()` helper.

```ts
import { defineComponent, useMeta, computed } from 'nuxt-composition-api'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    // This will allow you to set the title in head - but won't allow you to read its state outside of this component.
    const { title } = useMeta()

    // You could also provide an initial value.
    const { title } = useMeta({ title: 'My page' })

    title.value = 'newSetTitle'
  },
})
```
