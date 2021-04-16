const koa = require('koa');
const router = require('./router/router.js');
const render = require('koa-art-template');
const path = require('path');
const koastatic = require('koa-static');
const {connect , initSchemas} = require('./database/init')

const app = new koa();

;(async () => {
    await connect()
    initSchemas()
//require('./crawler/task.js')
  //require('./crawler/api.js')
})()

app.use(koastatic(path.join(__dirname,'static')));

render(app,{
    root: path.join(__dirname,'views'),
    extname : '.html',
    debug : process.env.NODE_ENV !== 'production'
});



app.use(router.routes());
app.use(router.allowedMethods());
app.listen(4455) 