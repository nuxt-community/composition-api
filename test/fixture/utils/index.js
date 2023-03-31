/**
 * @param {string} result
 * @param {number} [time=100]
 */
export function fetcher(result, time = 100) {
  return new Promise(resolve => {
    return setTimeout(() => {
      resolve(result)
    }, time)
  })
}
