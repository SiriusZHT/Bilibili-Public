// Exp1
// this在非严格模式下，默认指向全局变量
function foo() { 
    console.log( this.a );
}
var a = 2;
foo(); // 2

// Exp2
// 严格模式下，this 默认为undefined
function foo() {
    "use strict";
    console.log( this.a );
}
var a = 2;
foo(); // TypeError: this is undefined

// Exp3
// this所在的函数，被调用的情况下，谁调用他就指向谁
function foo() {
    console.log( this.a );
}
var a = 2;
(function(){
    "use strict";
    foo(); // 2
})();