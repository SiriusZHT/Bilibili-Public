const router = require('koa-router')();
const mongoose = require('mongoose')


router.get('/', async (ctx, next) => {
    let movietags=["热门","最新","豆瓣高分","冷门佳片","华语","欧美","韩国","日本"]
    let tvtags=["热门","美剧","英剧","韩剧","日剧","国产剧","港剧","日本动画","综艺","纪录片"]
    let Movie = mongoose.model('Movie')
    let Film = mongoose.model('Film')
    let Tv = mongoose.model('Tv')
    let film = await Film.find().limit(25)
    let movie = await Movie.find().limit(50)
    let tv = await Tv.find().limit(50)
    await ctx.render('homepage.html',{
        movietags : movietags,
        tvtags : tvtags,
        movie : movie,
        tv : tv,
        film : film
    })
    });

    
    router.get('/film', async (ctx, next) => {
        let Film = mongoose.model('Film')
        let nowplaying = await Film.find({"data_enough" : "True"}).limit(20)
        let upcoming =  await Film.find({"data_enough" : "False" || "null"}).limit(20)
        
            await ctx.render('film.html',{
                nowplaying : nowplaying,
                upcoming : upcoming,
            })
            });


    router.get('/purchase', async (ctx, next) => {
                await ctx.render('purchase.html',)
                });
    
    
    router.get('/movie', async (ctx, next) => {
    let type = "选电影"
     let tags=["热门","最新","经典","可播放","豆瓣高分","冷门佳片","华语","欧美","韩国","日本","动作","喜剧","爱情","科幻","悬疑","恐怖","治愈"]
     let Movie = mongoose.model('Movie')
     let data = await Movie.find().limit(20)
        await ctx.render('movie.html',{
            data : data,
            tags : tags,
            type : type
            
        })
        });


        router.post('/movie/view', async (ctx, next) => {
             let Movie = mongoose.model('Movie')
             let postParam = ctx.request.body
             console.log(postParam)
             let data = await Movie.find().limit(20)
                await ctx.render('movie.html',{
                    data : data,
                    
                })
                });
    

        router.get('/tv', async (ctx, next) => {
            let type = "热门电视剧"
            let tags=["热门","美剧","英剧","韩剧","日剧","国产剧","港剧","日本动画","综艺","纪录片"] 
            let Tv = mongoose.model('Tv')
            let data = await Tv.find().limit(20)
               await ctx.render('tv.html',{
                   data : data,
                   tags : tags,
                   type : type
                   
               })
               });
    
    router.get('/movie/:id', async (ctx, next) => {
        let {id} =ctx.params
        let Movie = mongoose.model('Movie')
        let data = await Movie.findOne({doubanId : id})
            await ctx.render('detail.html',{
                data : data
            })
            });

            router.get('/tv/:id', async (ctx, next) => {
                let {id} =ctx.params
                let Tv = mongoose.model('Tv')
                let data = await Tv.findOne({doubanId : id})
                    await ctx.render('detail.html',{
                        data : data
                    })
                    });

                    router.get('/film/:id', async (ctx, next) => {
                        let {id} =ctx.params
                        let Film = mongoose.model('Film')
                        let data = await Film.findOne({doubanId : id})
                            await ctx.render('detail.html',{
                                data : data
                            })
                            });
    
    




 module.exports = router