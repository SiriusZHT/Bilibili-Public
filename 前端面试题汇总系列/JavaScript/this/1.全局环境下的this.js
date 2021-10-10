function f1 () {
    console.log(this)
}
function f2 () {
   'use strict'
    console.log(this)
}
f1() // window
f2() // undefined

const foo = {
    bar: 10,
    fn: function() {
       console.log(this)
       console.log(this.bar)
    }
}
var fn1 = foo.fn
fn1()

const foo = {
    bar: 10,
    fn: function() {
       console.log(this) // {bar: 10, fn: ƒ}
       console.log(this.bar) // 10
    }
}
foo.fn() 