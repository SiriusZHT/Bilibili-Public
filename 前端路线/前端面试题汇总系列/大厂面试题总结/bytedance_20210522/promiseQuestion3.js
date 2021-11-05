// 三、promise并发请求并控制请求数目
// 有 n 个图片资源的 url，已经存储在数组 urls 中
// （即urls = [‘http://example.com/1.jpg’, …., ‘http://example.com/8.jpg’]），
// 而且已经有一个函数 function loadImg，输入一个 url 链接，返回一个 Promise，
// 该 Promise 在图片下载完成的时候 resolve，下载失败则 reject。

// 但是我们要求，任意时刻，同时下载的链接数量不可以超过 3 个。
// 这里面的思想 我们主要使用async和await 来形成阻塞函数，
// 当我们的请求书大于3个的时候，我们把promise中的resolve保存到数组里面，先不执行。
// 当有图片加载出来后，我们在继续执行

var urls = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 
function loadImg(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`第 ${url} 张图片加载完成`);
            resolve("success");
        }, 2 * 1000);
    })
};
 
// 计数器
var count = 0;
// 全局锁
var lock = [];
var l = urls.length;
 
// 阻塞函数
function block() {
    let _resolve;
    return new Promise((resolve, reject) => {
        _resolve = resolve;
        // resolve不执行,将其推入lock数组;
        lock.push(_resolve);
    });
}
// 叫号机
function next() {
    lock.length && lock.shift()();
}
 
async function reuqest() {
    if (count >= 3) {
        //超过限制利用await和promise进行阻塞;
        await block();
    }
    if (urls.length > 0) {
        console.log(count);
        count++
        await loadImg(urls.shift());
        count--;
        next();
    }
}
 
for (let i = 0; i < l; i++) {
    reuqest();
}
// 0
// 1
// 2
// 第 1 张图片加载完成
// 2
// 第 2 张图片加载完成
// 2
// 第 3 张图片加载完成
// 2
// 第 4 张图片加载完成
// 2
// 第 5 张图片加载完成
// 2
// 第 6 张图片加载完成
// 2
// 第 7 张图片加载完成
// 第 8 张图片加载完成
// 第 9 张图片加载完成