// 如果有巨量的图片要展示，除了懒加载的方式
// 有没有什么其他方法限制一下
// 同时加载图片数量
function limitLoad(urls, handler, limit) {
    const sequence = [].concat(urls);
    let promises = [];
    promises = sequence.splice(0, limit).map((url, index) => {
        return handler(url).then(() => index);
    })
    let p = Promise.race(promises); 
    for(let i = 0; i < sequence.length; i++) {
        p = p.then((res) => {
            promises[res] = handler(sequence[i]).then(() => res);
            return Promise.race(promises);
        }).then().then();   
    }
}
const urls = [{info: 'aaa'}, {info: 'bbb'}, {info: 'ccc'}, {info: 'ddd'}, {info: 'eee'}, {info: 'fff'}, {info: 'ggg'}, {info: 'hhh'}];
function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log('----' + url.info + '   start!');
        setTimeout(() => {
            console.log(url.info + "   OK!");
            resolve();
        }, url.time);
    })
};

limitLoad(urls, loadImg, 3);