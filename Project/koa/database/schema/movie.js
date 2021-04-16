const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId, Mixed } = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },

  category: [{
    type: ObjectId,
    ref: 'Category'
  }],

  title: String,
  rate: Number,
  poster: String,
  tags: [String],
  summary: String,
  rawtitle:String,
  language:[String],
  country:[String],
  writer:[String],
  director:[String],
  cast:[String],
  movie_duration:[String],
  movieTypes: [String],
  year: String,
  pubdate: Mixed,

  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model('Movie', movieSchema)
