
//const task = require('./task.js')
axios = require('axios')

//const Category = mongoose.model('Category')
var fetchMovie = function(item){
  return new Promise((resolve,reject) => {
   
    axios.get(item)
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}


;(async () => {
    const url = `https://api.douban.com/v2/movie/in_theaters`
   
    let movieData = await fetchMovie(url)
    console.log(movieData)

    

  
})()



