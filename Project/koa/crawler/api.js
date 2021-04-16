
//const task = require('./task.js')
axios = require('axios')
const mongoose = require('mongoose')
const Movie = mongoose.model('Tv')
//const Category = mongoose.model('Category')


var fetchMovie = function(item){
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`
    axios.get(url)
    }

;(async () => {
    let movies = await Movie.find({
      $or: [
        { summary: { $exists: false } },
        { summary: null },
        { year: { $exists: false } },
        { title: '' },
        { summary: '' }
      ]
    })

     for (let i = 0; i < movies.length; i++) {
    let movie = movies[i]
    let movieData = await fetchMovie(movie)
    console.log(movieData)

    if (movieData) {
      let tags = movieData.tags || []
      movie.tags = movie.tags || []
      movie.summary = movieData.summary || ''
      movie.rawTitle = movieData.alt_title || ''

      if (movieData.attrs) {
        movie.language = movieData.attrs.language || []
        movie.country = movieData.attrs.country || []
        movie.writer = movieData.attrs.writer || []
        movie.director = movieData.attrs.director || []
        movie.cast = movieData.attrs.cast || []
        movie.movieTypes = movieData.attrs.movie_type || []
        movie.year = movieData.attrs.year[0] || ''
        movie.movie_duration = movieData.attrs.movie_duration || []
        movie.episodes = movieData.attrs.episodes || null

        //  for (let i = 0; i < movie.movieTypes.length; i++) {
        //   let item = movie.movieTypes[i]
        //   let cat = await Category.findOne({
        //     name: item
        //   })

        //   if (!cat) {
        //     cat = new Category({
        //       name: item,
        //       movies: [movie._id]
        //     })
        //   } else {
        //     if (cat.movies.indexOf(movie._id) === -1) {
        //       cat.movies.push(movie._id)
        //     }
        //   }

        //   await cat.save()

        //   if (!movie.category) {
        //     movie.category.push(cat._id)
        //   } else {
        //     if (movie.category.indexOf(cat._id) === -1) {
        //       movie.category.push(cat._id)
        //     }
        //   }
        // }

        let dates = movieData.attrs.pubdate || []
        let pubdates = []

        dates.map(item => {
          if (item && item.split('(').length > 0) {
            let parts = item.split('(')
            let date = parts[0]
            let country = '未知'

            if (parts[1]) {
              country = parts[1].split(')')[0]
            }

            pubdates.push({
              date: new Date(date),
              country
            })
          }
        })

        movie.pubdate = pubdates
      }

      tags.forEach(tag => {
        movie.tags.push(tag.name)
      })
      await movie.save()
    }
  }
})()



