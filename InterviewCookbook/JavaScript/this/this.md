# 全局环境下的 this

    这种情况相对简单直接，函数在浏览器全局环境中被简单调用，非严格模式下this指向window; 在use strict指明严格模式的情况下就是undefined:

```javascript
function f1() {
  console.log(this);
}
function f2() {
  "use strict";
  console.log(this);
}
f1(); // window
f2(); // undefined
```

```javascript
const foo = {
  bar: 10,
  fn: function () {
    console.log(this);
    console.log(this.bar);
  },
};
var fn1 = foo.fn;
fn1();
```

这里 this 仍然指向的是 window。
虽然 fn 函数在 foo 对象中作为方法被引用，但是在赋值给 fn1 之后，fn1 的执行仍然是在 window 的全局环境中。
因此输出 window 和 undefined，
还是上面这道题目，如果调用改变为：

```javascript
const foo = {
  bar: 10,
  fn: function () {
    console.log(this); // {bar: 10, fn: ƒ}
    console.log(this.bar); // 10
  },
};
// 没有 var fn1 = foo.fn
foo.fn();
```

这其实属于第二种情况了，因为这个时候 this 指向的是最后调用它的对象，在 foo.fn()语句中 this 指向 foo 对象。

```javascript
请记住：在执行函数时，如果函数中的this是被上一级的对象所调用，
那么this指向的就是上一级的对象；否则指向全局环境。
```

# 上下文对象调用中的 this

```javascript
const person = {
  name: "Lucas",
  brother: {
    name: "Mike",
    fn: function () {
      return this.name;
    },
  },
};
console.log(person.brother.fn()); // Mike
```

```javascript
const o1 = {
  text: "o1",
  fn: function () {
    return this.text;
  },
};
const o2 = {
  text: "o2",
  fn: function () {
    return o1.fn();
  },
};
const o3 = {
  text: "o3",
  fn: function () {
    var fn = o1.fn;
    return fn();
  },
};

console.log(o1.fn()); // o1
console.log(o2.fn()); // o1
console.log(o3.fn()); // undefined
```

我们来一一分析。第一个 console 最简单，o1 没有问题。难点在第二个和第三个上面，关键还是看调用 this 的那个函数。第二个 console 的 o2.fn()，最终还是调用 o1.fn()，因此答案仍然是 o1。最后一个，在进行 var fn = o1.fn 赋值之后，是“裸奔”调用，因此这里的 this 指向 window，答案当然是 undefined。

如果是在面试中，我作为面试官，就会追问：如果我们需要让：console.log(o2.fn())
输出 o2，该怎么做？一般开发者可能会想到使用 bind/call/apply 来对 this 的指向进行干预，这确实是一种思路。但是我接着问，如果不能使用 bind/call/apply，有别的方法吗？

```javascript
const o1 = {
  text: "o1",
  fn: function () {
    return this.text;
  },
};
const o2 = {
  text: "o2",
  fn: o1.fn,
};

console.log(o2.fn());
```

还是应用那个重要的结论：this 指向最后调用它的对象，在 fn 执行时，挂到 o2 对象上即可，我们提前进行了类似赋值的操作。

# bind/call/apply 改变 this 指向

上文提到 bind/call/apply：

```javascript
const foo = {
  name: "lucas",
  logName: function () {
    console.log(this.name);
  },
};
const bar = {
  name: "mike",
};
console.log(foo.logName.call(bar));
```

将会输出 mike，这不难理解。但是对 call/apply/bind 的高级考察往往会结合构造函数以及组合式实现继承。实现继承的话题，我们会单独讲到。构造函数的使用案例，我们结合下面的场景进行分析。

# 构造函数和 this

```javascript
function Foo() {
  this.bar = "Lucas";
}
const instance = new Foo();
console.log(instance.bar);
```

new 操作符调用构造函数，具体做了什么？以下供参考：

- 创建一个新的对象；
- 将构造函数的 this 指向这个新对象；
- 为这个对象添加属性、方法等；
- 最终返回新对象。

以上过程，也可以用代码表述：

```javascript
var obj = {};
obj.__proto__ = Foo.prototype;
Foo.call(obj);
```

需要指出的是，如果在构造函数中出现了显式 return 的情况，那么需要注意分为两种场景：

```javascript
function Foo() {
  this.user = "Lucas";
  const o = {};
  return o;
}
const instance = new Foo();
console.log(instance.user);
```

将会输出 undefined，此时 instance 是返回的空对象 o。

```javascript
function Foo() {
  this.user = "Lucas";
  return 1;
}
const instance = new Foo();
console.log(instance.user);
```

将会输出 Lucas，也就是说此时 instance 是返回的目标对象实例 this。

结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。

# 箭头函数中的 this 指向

箭头函数使用 this 不适用以上标准规则，而是根据外层（函数或者全局）上下文作用域来决定。来看题目：

```javascript
const foo = {
  fn: function () {
    setTimeout(function () {
      console.log(this);
    });
  },
};
console.log(foo.fn());
```

这道题中，this 出现在 setTimeout() 中的匿名函数里，因此 this 指向 window 对象。如果需要 this 指向 foo 这个 object 对象，可以巧用箭头函数解决：

```javascript
const foo = {
  fn: function () {
    setTimeout(() => {
      console.log(this);
    });
  },
};
console.log(foo.fn());

// {fn: ƒ}
```

单纯箭头函数中的 this 非常简单，但是综合所有情况，结合 this 的优先级考察，这时候 this 指向并不好确定。请继续阅读。

# this 优先级相关

我们常常把通过 call、apply、bind、new 对 this 绑定的情况称为显式绑定；根据调用关系确定的 this 指向称为隐式绑定。

那么显式绑定和隐式绑定谁的优先级更高呢？

请看例题：

```javascript
function foo(a) {
  console.log(this.a);
}

const obj1 = {
  a: 1,
  foo: foo,
};

const obj2 = {
  a: 2,
  foo: foo,
};

obj1.foo.call(obj2);
obj2.foo.call(obj1);
```

输出分别为 2、1，也就是说 call、apply 的显式绑定一般来说优先级比隐式绑定更高。

```javascript
function foo(a) {
  this.a = a;
}

const obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a);
```

上述代码通过 bind，将 bar 函数中的 this 绑定为 obj1 对象。执行 bar(2) 后，obj1.a 值为 2。即经过 bar(2) 执行后，obj1 对象为：{a: 2}。

当再使用 bar 作为构造函数时：

```javascript
var baz = new bar(3);
console.log(baz.a);
```

将会输出 3。我们看 bar 函数本身是通过 bind 方法构造的函数，其内部已经对将 this 绑定为 obj1，它再作为构造函数，通过 new 调用时，返回的实例已经与 obj1 解绑。 也就是说：new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高。我们再看：

```javascript
function foo() {
  return (a) => {
    console.log(this.a);
  };
}

const obj1 = {
  a: 2,
};

const obj2 = {
  a: 3,
};

const bar = foo.call(obj1);
console.log(bar.call(obj2));
```

将会输出 2。由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。

如果将 foo 完全写成箭头函数的形式：

```javascript
var a = 123;
const foo = () => (a) => {
  console.log(this.a);
};

const obj1 = {
  a: 2,
};

const obj2 = {
  a: 3,
};

var bar = foo.call(obj1);
console.log(bar.call(obj2));
```

将会输出 123。

这里我再“抖个机灵”，仅仅将上述代码的第一处变量 a 的赋值改为：

```javascript
const a = 123;
const foo = () => (a) => {
  console.log(this.a);
};

const obj1 = {
  a: 2,
};

const obj2 = {
  a: 3,
};

var bar = foo.call(obj1);
console.log(bar.call(obj2));
```

答案将会输出为 undefined，原因是因为使用 const 声明的变量不会挂载到 window 全局对象当中。因此 this 指向 window 时，自然也找不到 a 变量了。
