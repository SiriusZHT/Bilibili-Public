// 1.字面量创建一个对象 对象的原型直接指向obj
let obj1 = {};
console.log(obj1.__proto__) // [Object: null prototype] {}

// 2.字面量创建数组等于new Array
let obj2 = [];
console.log(obj2.__proto__ === Array.prototype) // true

// 3.给Array的prototype设置一个print方法属性
Array.prototype.print = () => console.log("print");

// 4.通过new+constructor创建数组
let arr = new Array();

// 5. 这个数组对象的原型 = Array构造函数的原型对象
console.log(arr.__proto__ === Array.prototype) // true

// 6. Array构造函数里面是没有print函数属性的
// Array.print() // Array.print is not a function

// 7. print属性在Array.prototype里
// 访问arr实例化对象的不存在的属性 就在prototype里面找
console.log(arr.print === Array.prototype.print) // true
console.log(arr.__proto__.print === arr.print) // true

// 8. 实例化对象的原型对象的构造函数 就是 实例化的时候的构造函数
console.log(arr.__proto__.constructor === Array) // true

// 9. Array构造函数的原型对象是 Function
console.log(arr.__proto__.constructor.__proto__.constructor) // [Function: Function]

// 10.实例化对象的原型的原型 就是 字面量创建对象的原型 也就是 Object.prototype
console.log(arr.__proto__.__proto__ === obj1.__proto__)

// 注意三个细节
console.log(Object.__proto__ === Function.prototype) // true
console.log(Function.__proto__ === Function.prototype) // true
console.log(Object.prototype.__proto__ === null) // true

// Object.getPrototypeOf 获取实例化对象的原型
console.log(Object.getPrototypeOf(arr)); // Object(0) [ print: [Function (anonymous)] ]

// 判断是不是数组
console.log(Object.getPrototypeOf(arr) === Array.prototype) // true

// Array.isArray 判断是不是数组
console.log(Array.isArray(arr)); // true

// 通过instanceof 判断是不是
console.log(arr instanceof Array); // true
console.log(arr instanceof Function); // false arr.__proto__.__proto_ === Object.prototype
console.log(arr instanceof Object); // true
console.log(Array instanceof Function); // true

// 通过isPrototypeOf 
console.log(Array.prototype.isPrototypeOf(arr)); // true
console.log(Object.prototype.isPrototypeOf(arr)); // true

// 通过constructor
console.log(arr.constructor === Array) // true
console.log(arr.__proto__.constructor === Array) // true
arr.__proto__.constructor = Function; // 改变了构造函数
console.log(arr.constructor === Array) // false

// 通过toString
console.log(Object.prototype.toString(Function)) // [object Object]
console.log(Object.prototype.toString(arr)) // [object Object]
console.log(Object.prototype.toString(arr).slice(8, -1)) // Object



