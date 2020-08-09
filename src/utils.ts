export function validateKey<T>(key?: T): asserts key is T {
  if (!key) {
    throw new Error(
      "You must provide a key. You can have it generated automatically by adding '@nuxtjs/composition-api/babel' to your Babel plugins."
    )
  }
}
