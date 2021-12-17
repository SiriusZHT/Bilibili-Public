// 垃圾💩⛰代码
function foo() {
  var a = 2;
  console.log(this); // window | global
  this.bar(this);
}
function bar(something) {
  console.log(this.a);
  console.log("this === something?", this === something);
}
foo(); // ReferenceError: a is not defined
