const puppeteer=require('puppeteer')
const url=`https://movie.douban.com/cinema/nowplaying/chengdu/`

;(async () => {
console.log('Start visit the target page')

const sleep = time =>new Promise(resolve => {
 setTimeout(resolve,time)
})

const  browser = await puppeteer.launch({
   args:['--no-sandbox'],
   //dumpio:false,
   //executablePath: './chromium/chrome.exe',
    headless: false

})
const page = await browser.newPage()
await page.goto(url, {
waitUntil:'networkidle2'
})

await sleep(3000)
await page.click('.more')

const result = await page.evaluate(()=>{
    var $=window.$
    var items =$('.list-item')
    var links=[]

    if (items.length>=1){
        items.each((index,item) => {
        let it = $(item)
        let doubanId = it.attr('id')
        let title = it.data('title')
        let rate = Number(it.data('score'))
        let poster=it.find('img').attr('src')
        let status =it.data('category')
        let release_date = it.find('.release_date') || ''
        let data_enough = it.data('enough') || null
        links.push({
            doubanId,
            title,
            rate,
            poster,
            status,
            release_date,
            data_enough
        })
    })

    }
  
    return links
    
})
browser.close()
process.send({result})
process.exit(0)

})()