/* eslint-disable no-console */
export default {
  debug: (msg) => console.log(`DEBUG: ${msg}`),
  info: (msg) => console.log(`INFO: ${msg}`),
  warn: (msg) => console.log(`WARN: ${msg}`),
  error: (msg) => console.error(`ERROR: ${msg}`),
}
