const mongoose = require('mongoose')
const db = 'mongodb://localhost/douban'
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise

exports.initSchemas = () => {
 glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
 
}

exports.connect = () =>{

    let maxConnectTimes = 0

    return new Promise((resolve,reject) => {
        if (process.env.NODE_ENV !='production'){
            mongoose.set('debug',true)
        }
    
        mongoose.connect(db,{ useNewUrlParser: true })
    
        mongoose.connection.on('disconnected',() => {
            maxConnectTimes++
            if (maxConnectTimes<5){
                mongoose.connect(dbUri, {
                    useCreateIndex: true,
                    useNewUrlParser: true
                  })
            }else{
                throw new Error('数据库挂了')
            }
            
        })
    
        mongoose.connection.on('error',err => {
            maxConnectTimes++
            if (maxConnectTimes<5){
                mongoose.connect(db)
            }else{
                throw new Error('数据库挂了')
            }
        })
    
        mongoose.connection.once('open',() => {    
            resolve()
            console.log('Mongoose Connected Successfully')
            
        })
    })
 
}