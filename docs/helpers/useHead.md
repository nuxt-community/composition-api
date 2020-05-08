---
---

# useHead

You can interact directly with [`head()` properties](https://nuxtjs.org/api/pages-head/) in `setup` by means of the `useHead()` helper.

```ts
import { defineComponent, useHead, computed } from 'nuxt-composition-api'

const { head, useMeta } = useHead()

export default defineComponent({
  // this line is needed!
  head,
  setup() {
    // This will allow you to set the title in head - but won't allow you to read its state outside of this component.
    const { title } = useMeta()

    title.value = 'newSetTitle'
  },
})
```
