// Exp1
// this所在的函数，被调用的情况下，谁调用就指向谁
function foo() {
    console.log( this.a );
}
var obj = { 
    a: 2, 
    foo: foo
};
obj.foo(); // 2 
// 可见是指向的调用 foo 的 obj

// Exp2
// 对象属性引用链中只有最顶层或者说最后一层会影响调用位置
function foo() {
    console.log( this.a );
}
var obj2 = { 
    a: 42, 
    foo: foo
};

var obj1 = { 
    a: 2, 
    obj2: obj2
};
obj1.obj2.foo(); // 42
// 可见指向的直接调用foo的obj2，而非obj1

// Exp3
// 有this的函数的引用被传递过后，还是哪个执行调用他，this指向哪个
function foo() {
    console.log( this.a );
}
var obj = { 
    a: 2,
    foo: foo
}
var bar = obj.foo;
var a = "oops!!! This is global";
bar(); // "oops!!! This is global"

// Exp4 
// 参数传递也是隐式赋值
function foo() {
    console.log( this.a );
}
function doFoo(fn) {
    fn();
}
var obj = { 
    a: 2, 
    foo: foo
};
var a = "oops!!! This is global";
doFoo( obj.foo ); // oops!!! This is global

// Exp5
// 引用传入内置函数 还是谁调用就指向谁d
function foo() {
    console.log( this.a );
}
var obj = { 
    a: 2, 
    foo: foo
};
var a = "oops!!! This is global"; // oops!!! This is global
setTimeout( obj.foo, 100);
