// 一、promise 请求超时处理
// 需求：在微服务中发送一个请求，如果三秒钟还没有收到结果，我们就认为失败。

// 这里面是使用的是Promise.race。

// Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。并行执行

// const p = Promise.race([p1, p2, p3]);

// 上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
// race
const p = Promise.race([
    getUrl('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 3001)
    })
]);

p.then(console.log)
.catch(console.error);

