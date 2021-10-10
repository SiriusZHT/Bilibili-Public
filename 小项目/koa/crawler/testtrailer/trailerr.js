
var MyUtil = function () {
};
// var $ = require('../node_modules/jQuery');
var request = require('request');
// 用于 保存body的html数据
var bodtTemp;
MyUtil.prototype.get=function(url,callback){
    // console.log("MyUtil.prototype") // 打印
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body) // 打印目标页面
        console.log("request ");
        // 用临时变量保存起来请求回来的body数据
        bodtTemp=body;

        var movie={}  
        // movie.name = $(body).find('span[property="v:itemreviewed"]').text();
        // movie.director = $(body).find('#info span:nth-child(1) a').text();
      }
    })
}
// console.log(movie);
//获取目标网页的数据
var temp = new MyUtil();
var httpUrl='https://movie.douban.com/subject/25921812/?tag=%E7%83%AD%E9%97%A8&from=gaia_video';
// var httpUrl='http://movie.douban.com/subject/1152952';
temp.get(httpUrl);
console.log('bodtTemp is '+bodtTemp);
// 开启自己的http服务器
var http = require('http')
http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(bodtTemp);
    let cheerio = require('cheerio')
    let $ = cheerio.load(bodtTemp)
    // $('h2.title').text('Hello there!')
    // $('h2').addClass('welcome')
    // $('#db-nav-movie .nav-logo a').text("哈哈")
    // $("#dale_movie_subject_bottom_super_banner_frame").remove();
    // 移除  id 里面的内容
    // $("#footer").remove();
    console.log($('#info').text());
    // $.html()
    // console.log($.html());
    res.write($.html());
    // res.end('<p>结束</p>');
    res.end();
}).listen(5858);
