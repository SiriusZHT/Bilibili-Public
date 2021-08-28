// 二、promise 三次重试
// 需求：用promise实现一个可以指定重试次数的方法，如果重试次数等于指定的重试测试时，还没有成功，则认为失败。

 
var getData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.random();
            console.log(num);
            if(num > 1){
                resolve();
            } else {
                reject();
            }
        }, 2000);
    });
}
 
 
function retryData(getData, times, delay) {
    return new Promise((resolve, reject) => {
        function attempt() {
            times--;
            getData().then(resolve).catch((erro) => {
                console.log(`还有 ${times} 次尝试`);
                if (times < 1) {
                    reject(erro);
                } else {
                    setTimeout(() => {
                        attempt();
                    }, delay * 1000);
                }
            })
        }
        attempt();
    })
}
 
retryData(getData, 3, 0.5).then((res) => {
    console.error("执行成功", res);
}).catch((err) => {
    console.error("尝试失败");
})
 
// 0.2537473977539608
// 还有 2 次尝试
// 0.11891286863089512
// 还有 1 次尝试
// 0.27074469430076986
// 还有 0 次尝试
// 尝试失败
