const restify = require('restify')
const restifyPlugins = require('restify-plugins')

module.exports = {
  createHttpServer: function() {
    const server = restify.createServer()
    server.use(restifyPlugins.bodyParser())
    return server
  },

  listen: function(server, listenOn, port) {
    server.listen(port, listenOn, () => {
      console.log(`${server.name} listening at ${server.url}`)
    })
  },

  createGetEndpoint: function(server, endpointName, callback) {
    server.get(endpointName, callback)
  },

  createPostEndpoint: function(server, endpointName, callback) {
    server.post(endpointName, callback)
  },
}
