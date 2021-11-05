//模拟data
let data = {
    msg: 'hello',
    count: 0
}
//模拟实例
//Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
let vm = new Proxy(data, {
    get(target, key){
        console.log('get, key', key, target[key]);
        return target[key];
    },
    set(target, key, newValue){
        console.log('set, key', key, newValue);
        if(target[key] === newValue){
            return;
        }
        target[key] = newValue;
        document.querySelector('#app').textContent = target[key];
    }
})

//测试
vm.msg = 'Hello world'
console.log(vm.msg);
