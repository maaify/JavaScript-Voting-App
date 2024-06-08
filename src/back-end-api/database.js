const mongoose = require('mongoose')

module.exports = {
  createMongoConnection: function(connectionString) {
    mongoose.connection.once('open', () => console.log(`MongoDB connection opened`))
    mongoose.connection.on('connected', () => console.log(`MongoDB connected`))
    mongoose.connection.on('disconnected', () => console.log(`MongoDB disconnected`))
    mongoose.connection.on('reconnected', () => console.log(`MongoDB reconnected`))
    mongoose.connection.on('error', error => console.error(`connection error: ${error}`))

    return mongoose.connect(connectionString)
  },

  createSchema: function(modelName, schemaStructure) {
    const schema = mongoose.Schema(schemaStructure)
    return mongoose.model(modelName, schema)
  },

  createTestFrameworks: async function(Framework, frameworks) {
    const currentFrameworks = await Framework.find()
    frameworks.filter(fw => !currentFrameworks.some(cfw => cfw.name === fw)).forEach(fw => {
      const framework = new Framework({ name: fw, howManyRatings: 0, cumulatedRatings: 0 })
      framework.save()
    })
  },
}
