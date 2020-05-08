<template>
  <div>
    <div v-for="c in values" :key="c[0]">{{ c[0] }}-{{ c[1] }}</div>
  </div>
</template>

<script>
import { defineComponent, computed, isComputed } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const values = [
      ['test1', null],
      ['test2', {}],
      ['test3', ''],
      ['test4', ref(null)],
      ['test5', ref(5)],
      ['test6', ref({})],
      ['test7', computed(() => 5)],
      ['test8', computed(() => null)],
      [
        'test9',
        computed({
          get: () => 5,
          set: val => {},
        }),
      ],
    ].map(v => [v[0], isComputed(v[1]) ? 'yes' : 'no'])

    return {
      values,
    }
  },
})
</script>
