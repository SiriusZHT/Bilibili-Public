const cp = require('child_process')
const {resolve} = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Tv = mongoose.model('Tv')
const Film = mongoose.model('Film')
const glob = require('glob')


;(async () => {
    const script = resolve(__dirname,'./movietrailer.js')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
        if (invoked) return

        invoked = true

        console.log(err)

    })

    child.on('exit', code => {
        if (invoked) return

        invoked = true

        let err = code ===0 ? null : new Error('exit code'+code)
        console.log(err)

    })

    
    child.on('message', async data => {
       let result = data.result
       
        // console.log(result)


         result.forEach(async item => {
            if(item.doubanId){
            let movie = await Movie.findOne({
                doubanId: item.doubanId
            })
            if(!movie){
                movie= new Movie(item)
                await movie.save()
            } 
        }
        })



        //   result.forEach(async item => {
        //     if(item.doubanId){
        //     let tv = await Tv.findOne({
        //         doubanId: item.doubanId
        //     })

        //     if(!tv){
        //         tv= new Tv(item)
        //         await tv.save()
        //     } 
        //   }
        // })



        //  result.forEach(async item => {

        //     if(item.doubanId){
        //     let film = await Film.findOne({
        //         doubanId: item.doubanId
        //     })

        //     if(!film){
        //         film= new Film(item)
        //         await film.save()
        //     } 
        //   }
        // })


    })
    
})()