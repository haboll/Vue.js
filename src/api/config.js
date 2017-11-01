
let config = {}
if (process.env.NODE_ENV === 'production') {
  config.apiHost = 'http://123.56.160.179:9091/api'
} else {
  config.apiHost = 'http://123.56.160.179:29091/api'
}
export default config
