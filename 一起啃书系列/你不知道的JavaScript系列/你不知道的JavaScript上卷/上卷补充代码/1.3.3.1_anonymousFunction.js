// 证明原文翻译有歧义：
// 《你不知道的JS上卷》中文版原文有句话：
// “如果没有函数名，函数需要引用自身时只能用已经过期的 arguments.callee 引用，比如递归”

// Question: 
// 什么是“已经过期的 arguments.callee ?”
// 是 已经在现在 JS 的大众写法中，淘汰的，“过时的”，比如 ES5 严格模式下淘汰
// 还是 已经在内存中 “过期的” arguments.callee？ 
// 也就是说 之后每次单个递归用的 arguments.callee 都是第一次调用的状态
// 比如 下面的例子，递归相加，如果 arguments.callee 都是第一次调用的状态，那么之后每次都会打印 2 并 死循环

// Exp1:
// 下面是对 arguments.callee 返回的是什么进行了实验
// 最开始我对原文的猜想是：arguments.callee 调用的时候是最开始的函数本体对象
(function (a) {
  console.log('arguments: ', arguments); // [Arguments] { '0': 1 到 4 }
  console.log('arguments.callee: ', arguments.callee); // [Function (anonymous)] 这里 匿名函数打印的时候 名称默认为 anonymous（名字不公开的，匿名的）
  console.log('arguments.callee.arguments: ', arguments.callee.arguments); // [Arguments] { '0': 1 到 4 }
  console.log('this is: ', this); // [Arguments] { '0': global 到 3 }
  if (arguments.callee.arguments[0] === 4) {
    return;
  }
  console.log('             ');
  arguments.callee(a + 1);
})(1);
// console.log(a);// ReferenceError: a is not defined

// Exp2:
// 以下是对引用数据类型进行了实验
var functionExpression = function (a) {
  console.log(arguments.callee); // [Function (anonymous)] 这里 匿名函数打印的时候 名称默认为 anonymous（名字不公开的，匿名的）
  console.log(arguments.callee.arguments); // [Arguments] { '0': 1 到 4 }
  if (arguments.callee.arguments[0] === 4) {
    return;
  }
  arguments.callee(a + 1);
};
var test = functionExpression;
// test 指向 func 的地址
//              ┌────┐
//              │    ▼
//   ┌──────┐   │  Heap_1◄───────────┐
//   │......│   │  ┌─────────────────┼──┐
//   ├──────┤   │  │ arguments       │  │
//   │ Test ├───┤  │ ┌───────────┐   │  │
//   ├──────┤   │  │ │ callee    ├───┘  │
//   │func..├───┘  │ ├───────────┤      │
//   ├──────┤      │ └───────────┘      │
//   │......│      │                    │
//   └──────┘      │                    │
//                 └────────────────────┘
//                 Heap_2
//                 x ──► null
functionExpression = null;
// func 的地址为 Heap_2 null
// test 的地址没变 还是 Heap_1
//             ┌────┐
//             │    ▼
//  ┌──────┐   │  Heap_1◄───────────┐
//  │......│   │  ┌─────────────────┼──┐
//  ├──────┤   │  │ arguments       │  │
//  │ Test ├───┘  │ ┌───────────┐   │  │
//  ├──────┤      │ │ callee    ├───┘  │
//  │func..├───┐  │ ├───────────┤      │
//  ├──────┤   │  │ └───────────┘      │
//  │......│   │  │                    │
//  └──────┘   │  │                    │
//             │  └────────────────────┘
//             └─►Heap_2
//                x ──► null
test(1);

// Exp3:
// 原文还讲到：
// 另一个函数需要引用自身的例子，是在事件触发后事件监听器需要解绑自身。
// 下面是对事件的触发的解绑进行实验
// var oDiv = document.getElementById("div1");
// oDiv.onclick = function () {
//   this.style.width = this.offsetWidth + 100 + "px";
// };
// /*
//  Div.addEventListener('transitionend', end, false);
// 	function end(){
// 		this.style.width = this.offsetWidth + 100 + 'px';
// 		oDiv.removeEventListener('transitionend', end, false);
// 	}
// */
// oDiv.addEventListener(
//   "transitionend",
//   function () {
//     this.style.width = this.offsetWidth + 100 + "px";
//     this.removeEventListener("transitionend", arguments.callee, false);
//   },
//   false
// );
