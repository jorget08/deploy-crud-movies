const mongoose = require('mongoose')

const MovieSchema = new mongoose.Schema(
  {
    title: {type: String, unique: true},
    slug: {type: String},
    image: {type: String},
    director: {type: String},
    plataforms: {type: [String]}
  },{
    timestamps: true
  }
)

Movie = mongoose.model('movie', MovieSchema)
module.exports = Movie