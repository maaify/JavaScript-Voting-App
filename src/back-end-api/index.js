const httpServer = require('./httpServer')
const database = require('./database')

const PORT = process.env.PORT
const LISTEN_ON = process.env.LISTEN_ON
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING

if (!PORT) {
  console.error('PORT environment variables not found.')
  process.exit(1)
}

if (!MONGO_CONNECTION_STRING) {
  console.error('MONGO_CONNECTION_STRING environment variables not found.')
  process.exit(1)
}

connectToDatabase(MONGO_CONNECTION_STRING)
const Framework = database.createSchema('framework', {
  name: String,
  howManyRatings: Number,
  cumulatedRatings: Number,
})

database.createTestFrameworks(Framework, ['React', 'Angular', 'Vue.js'])

const getHealthCheckResponseFunction = async (request, response, next) => {
  response.send(200)
  return next()
}

const getResponseFunction = async (request, response, next) => {
  const frameworks = await Framework.find()
  response.send(
    frameworks.map(fw => {
      return {
        id: fw._id,
        name: fw.name,
        avgRating: avgRating(fw.howManyRatings, fw.cumulatedRatings),
      }
    })
  )
  return next()
}

const postResponseFunction = async (request, response, next) => {
  const framework = await Framework.findById(request.body.id)
  framework.cumulatedRatings += request.body.rating
  framework.howManyRatings += 1
  framework.save()
  response.send({
    id: framework._id,
    name: framework.name,
    avgRating: avgRating(framework.howManyRatings, framework.cumulatedRatings),
  })
  return next()
}

const server = httpServer.createHttpServer()
httpServer.createGetEndpoint(server, '/api/probetest', getHealthCheckResponseFunction)
httpServer.createGetEndpoint(server, '/api/voting', getResponseFunction)
httpServer.createPostEndpoint(server, '/api/voting', postResponseFunction)

server.on('NotFound', (request, response) => {
  console.log('404 - Not found')
  response.send(404, '404 - Not Found')
})

httpServer.listen(server, LISTEN_ON, PORT)

function avgRating(howManyRatings, cumulatedRatings) {
  return howManyRatings === 0 || cumulatedRatings === 0 ? 0 : cumulatedRatings / howManyRatings
}

async function connectToDatabase(connectionString) {
  try {
    await database.createMongoConnection(connectionString)
    console.log(`MongoDB connected...`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
