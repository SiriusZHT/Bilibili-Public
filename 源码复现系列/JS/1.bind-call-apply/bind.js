// 第一版 实现调用
Object.defineProperty(Function.prototype, '_bind1', {
    value: function (context) {
        var self = this;
        return function () {
            return self.apply(context);
        }
    }
})

// 第二版 接收参数
Object.defineProperty(Function.prototype, '_bind2', {
    value: function (context) {
        var self = this;
        // 获取bind2函数第二个参数到最后一个参数
        var args = Array.prototype.slice.call(arguments, 1); // arguments.slice(1)
        return function () {
            // 此时的arguments是bind返回后的函数传入的参数
            var bindArgs = Array.prototype.slice.call(arguments);
            return self.apply(context, args.concat(bindArgs));
        }
    }
})

// let foo = {
//     value: 1
// };

// function bar(name, age) {
//     console.log(this.value);
//     console.log(name);
//     console.log(age);
// }

// let bindFoo = bar._bind2(foo, "sirius");
// bindFoo('21'); // 1

// 一个绑定函数也能使用new操作符创建对象
// 这种行为就像把原函数当作构造器
// 提供的this值被忽略，同时调用时的参数被提供给模拟函数

// 第三版 支持构造函数
Object.defineProperty(Function.prototype, '_bind3', {
    value: function (context) {
        let self = this;
        let args = Array.prototype.slice.call(arguments, 1);
        let fBound = function(){
            let bindArgs = Array.prototype.slice.call(arguments);
            // 当作为构造函数时，this指向实例，此时结果为true，将绑定的this指向该实例，可以让实例获得来自绑定函数的值
            // 例如：如果改成this instanceof fBound ? null : context 实例只是一个空对象 将null改成this 实例会具有habit属性
            // 当作为普通函数时，this指向window，此时结果为false，将绑定函数的this指向context
            return self.apply( this instanceof fBound ? this : context, args.concat(bindArgs) );
        }
        // 修改返回函数的prototype为绑定函数的prototype，实例就可以继承绑定函数的原型中的值
        fBound.prototype = this.prototype;
        return fBound;
    }
})

// 第四版 优化第三版
Object.defineProperty(Function.prototype, '_bind4', {
    value: function(context) {
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        var fNOP = function() {};
        var fBound = function() {
            var bindArgs = Array.prototype.slice.call(arguments);
            return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
        }
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    }
})

// 最终版
Object.defineProperty(Function.prototype, '_bind', {
    value: function(context) {
        // console.log(this) func bar
        if (typeof this !== "function") {
            throw new Error("Function.prototype._bind - what is trying to be bound is not callable");
        }
        var self = this;
        var args = Array.prototype.slice.call(arguments, 1);
        var fNOP = function() {};
        // 返回构造器
        var fBound = function() {
            //构造函数接受的参数
            var bindArgs = Array.prototype.slice.call(arguments);
            return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
        }
        // 继承this的prototype属性
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    }
})


var value = 21;
var foo = {
    value: 1,
};
function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}
bar.prototype.friend = 'kevin';
// 支持bind的同时传参
var bindFoo = bar._bind(foo, 'sirius');
// 支持new的同时传参（作为构造器）
var obj = new bindFoo('21');

console.log(obj)
console.log(obj.friend === obj.__proto__.friend)

//undefined
// blabla
// 21
// bar { habit: 'shopping' }
// true



