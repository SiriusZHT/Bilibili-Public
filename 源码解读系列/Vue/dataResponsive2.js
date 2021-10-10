// 数据响应式
//数据模型仅仅是普通的JS对象，而当我们修改数据时，视图会进行更新，避免了繁琐的DOM操作提高开发效率

//vue2

//模拟data选项
let data = {
    msg: 'Hello'
}
//模拟实例
let vm = {};
//数据劫持：当访问或者设置vm中的成员的时候，做一些干预工作
Object.defineProperty(vm, 'msg', {
    //可枚举
    enumerable: true,
    //可配置(可以使用delete删除，可以通过defineProperty 重新定义)
    configurable: true,
    //当获取到值的时候执行
    get(){
        console.log('get: ', data.msg)
        return data.msg;
    },
    //当设置值的时候执行
    set(newValue){
        console.log('set: ', newValue);
        if(newValue === data.msg){
            return;
        }
        data.msg = newValue;
        //!!!数据更改 更新DOM的值
        document.querySelector('#app').textContent = data.msg;
    }
})

//测试
vm.msg = 'Hello world';
console.log(vm.msg)