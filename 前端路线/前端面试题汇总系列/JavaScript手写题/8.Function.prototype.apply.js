// 第一个参数是要绑定的 this，
// 第二个参数是数组或类数组
Function.prototype.apply1 = function (context = window, args) {
    if(typeof this !== 'function') {
        throw new TypeError('this is not a function');
    }
    const fn = Symbol('fn');
    context[fn] = this;
    const res = context[fn](...args);
    delete context[fn];
    return res;
}

function A(a) {
    console.log(this.name);
    console.log(a);
}
let person = {
    name: 'John',
    age: 34,
}
A.apply1(person, [16]);
