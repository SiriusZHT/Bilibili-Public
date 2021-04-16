![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402130436642.png)

@[toc]

## MVVM

在开始之前我们还是复习一下 MVVM 吧

- Model 层 通过 ajax 等 api 完成服务端到客户端 model 的同步，
- View 层 动态视图模板，展示的是 VM 的数据和状态，不处理状态，做的只是数据绑定的声明、指令的声明、事件绑定的声明
- VM 层 把 View 需要的层数据暴露，对 View 层的数据绑定声明、指令声明、事件绑定声明负责，处理 View 层声明的业务逻辑。绑定属性监听，当 VM 数据变化，V 会得到更新；当 V 中声明了数据的双向绑定，（通常表单元素），框架就会监听 V 表单值的变化，一旦变化了 VM 中的数据也会自动更新

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402121629801.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzY5ODMyOA==,size_16,color_FFFFFF,t_70)

实现 MVVM 的必要操作：

- 视图引擎，帮助 developer 操作 DOM
- 数据存储器，通过`Object.defineProperty()`自行封装存取数据的方式。往往封装的是发布 / 订阅模式，来完成数据的监听、数据变更时更新的通知
- 组件机制，因为有涉及继承、生命周期、组件通信机制，所以 MVVM 都有提供

# 响应式原理

数据驱动

数据响应式、双向绑定、数据驱动

### 数据响应式

数据模型仅仅是普通的 JavaScript 对象，而当我们修改数据时，视图会进行更新，避免了繁琐的 DOM 操作提高开发效率

### 双向绑定

数据改变，视图改变;视图改变，数据也随之改变
我们可以使用 v-model 在表单元素上创建双向数据绑定

### 数据驱动是 Vue 最独特的特性之一

开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图

## 2.x 的响应式

- 响应式需要做到在修改数据的时候对 dom 的自动更改
- 所以仅仅需要在 set 里面 自动绑定一个 dom 元素，然后更新就完事
- 这里的 get set 操作 通过`Object.defineProperty()`完成

```javascript
// 数据响应式
//数据模型仅仅是普通的JS对象，而当我们修改数据时，视图会进行更新，避免了繁琐的DOM操作提高开发效率

//vue2

//模拟data选项
let data = {
  msg: "Hello",
};
//模拟实例
let vm = {};
//数据劫持：当访问或者设置vm中的成员的时候，做一些干预工作
Object.defineProperty(vm, "msg", {
  //可枚举
  enumerable: true,
  //可配置(可以使用delete删除，可以通过defineProperty 重新定义)
  configurable: true,
  //当获取到值的时候执行
  get() {
    console.log("get: ", data.msg);
    return data.msg;
  },
  //当设置值的时候执行
  set(newValue) {
    console.log("set: ", newValue);
    if (newValue === data.msg) {
      return;
    }
    data.msg = newValue;
    //!!!数据更改 更新DOM的值
    document.querySelector("#app").textContent = data.msg;
  },
});

//测试
vm.msg = "Hello world";
console.log(vm.msg);
```

## 3.x 的响应式

- 通过 proxy 进行对象代理
- 直接监听对象，而非 2.x 的属性

```javascript
//模拟data
let data = {
  msg: "hello",
  count: 0,
};
//模拟实例
//Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
let vm = new Proxy(data, {
  get(target, key) {
    console.log("get, key", key, target[key]);
    return target[key];
  },
  set(target, key, newValue) {
    console.log("set, key", key, newValue);
    if (target[key] === newValue) {
      return;
    }
    target[key] = newValue;
    document.querySelector("#app").textContent = target[key];
  },
});

//测试
vm.msg = "Hello world";
console.log(vm.msg);
```

## 发布订阅者模式

    我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"(publish)一个信 号，其他任务可以向信号中心"订阅"(subscribe)这个信号，从而知道什么时候自己可以开始执 行。这就叫做"发布/订阅模式"(publish-subscribe pattern)

- vue 中的发布订阅自定义

```javascript
let vm = new Vue();
vm.$on("dataChange", () => {
  console.log("dataChange");
});
vm.$on("dataChange", () => {
  console.log("dataChange1");
});
vm.$emit("dataChange");
```

- 兄弟组件的通信过程
  > 不难理解，就是一个组件绑定了 add-todo 的订阅，另一个也绑定了 add-todo 的发布

```javascript
//兄弟组件通信过程
//eventBus.js
//事件中心
let eventHub = new Vue();

//componentA.vue
//announcer
function addToDo() {
  //发布消息 事件
  eventHub.$emit("add-todo", { nametext: this.newTodoText });
  this.newTodoText = "";
}

//componentB.vue
//subscriber
function created() {
  //subscribe msg or event
  eventHub.$on("add-todo", this.addToDo);
}
```

- 手写实现
  > on 主要做的事 每次将传的 eventType 给一个订阅事件回调 fn
  > emit 主要做的事 把所有的该事件进行执行回调

```javascript
/**********模拟自定义实现************/
class EventEmitter {
  constructor() {
    // { eventType: [ handle1, handle2,] }
    this.subs = [];
  }
  //subscribe
  $on(eventType, fn) {
    //init []
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(fn);
  }
  //emit
  $emit(eventType) {
    this.subs[eventType] && this.subs[eventType].forEach((v) => v());
  }
}

//测试
let bus = new EventEmitter();

//registe event
bus.$on("click", function () {
  console.log("click"); //click
});

bus.$on("click", function () {
  console.log("click1"); //click1
});

bus.$emit("click");
```

## 观察者模式

> 由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模 式的订阅者与发布者之间是存在依赖的

```javascript
// 观察者(订阅者) -- Watcher
// update():当事件发生时，具体要做的事情
// 目标(发布者) -- Dep
// subs 数组:存储所有的观察者
// addSub():添加观察者
// notify():当事件发生，调用所有观察者的 update() 方法
// 没有事件中心

// target(announcer)
// Dependency
class Dep {
  constructor() {
    // storage all announcers
    this.subs = [];
  }
  // add watcher
  addSub(sub) {
    sub && sub.update && this.subs.push(sub);
  }
  //anounce all watcher
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
// watcher
class Watcher {
  update() {
    console.log("update");
  }
}

//测试
let dep = new Dep();
let watcher = new Watcher();
dep.addSub(watcher);
dep.notify();
```

- 观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模 式的订阅者与发布者之间是存在依赖的
- 发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402123718404.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzY5ODMyOA==,size_16,color_FFFFFF,t_70)

## Vue 响应式原理

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402124948216.png)

#### Vue

记录传入的选项，设置 $data/$el
把 data 的成员注入到 Vue 实例
负责调用 Observer 实现数据响应式处理(数据劫持)
负责调用 Compiler 编译指令/插值表达式等

#### Observer

负责把 data 中的成员转换成 getter/setter
负责把多层属性转换成 getter/setter
如果给属性赋值为新对象，把新对象的成员设置为 getter/setter
数据劫持
添加 Dep 和 Watcher 的依赖关系
数据变化发送通知

#### Compiler

负责编译模板，解析指令/插值表达式
负责页面的首次渲染过程
当数据变化后重新渲染

#### Dep

收集依赖，添加订阅者(watcher)
通知所有订阅者

#### Watcher

自身实例化的时候往 dep 对象中添加自己
当数据变化 dep 通知所有的 Watcher 实例更新视图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210402130436642.png)

### Vue 功能

- 负责接收初始化的参数(选项)
- 负责把 data 中的属性注入到 Vue 实例，转换成 getter/setter
- 负责调用 observer 监听 data 中所有属性的变化
- 负责调用 compiler 解析指令/插值表达式

```javascript
class _vue {
  constructor(options) {
    //1. storage options data
    this.$options = options || {};
    this.$data = data || {};

    const el = options.el;
    this.$el =
      Object.prototype.toString(options.el).slice(8, -1) === "string"
        ? document.querySelector(el)
        : el;

    //2. data injection
    this._proxyData(this.$data);

    //3. transfer Observer to proxy data
    //4. transfer Compiler to compile
  }

  _proxyData() {
    // loop data
    Object.keys(data).forEach((key) => {
      ObjectFlags.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newValue) {
          if (data[key] === newValue) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}
```

### Observer

```javascript
// Observer

// 功能
// 负责把 data 选项中的属性转换成响应式数据
// data 中的某个属性也是对象，把该属性转换成响应式数据 deep reactive
// 数据变化发送通知

class Observer {
  //$data => getter / setter
  constructor(data) {
    this.walk(data);
  }
  //1. if not obj return
  //2. if obj loop and getter / setter
  walk(data) {
    if (!data || Object.prototype.toString(data).slice(8, -1) === "object") {
      return;
    }
    //loop data
    Object.keys(data).forEach((key) => {
      this.defineReactive(key, data[key]);
    });
  }
  //define reactive
  defineReactive(data, key, val) {
    const that = this;
    this.walk(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val;
      },
      set(newValue) {
        if (newValue === val) {
          return;
        }
        // newValue => reactive
        that.walk(newValue);
        val = newValue;
      },
    });
  }
}
```

### Dep

```javascript
class Dep {
  constructor() {
    // 存储所有的订阅者
    this.subs = [];
  }
  // 添加订阅者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 通知观察者
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
```

- 在 compiler.js 中收集依赖，发送通知

```javascript
// defineReactive 中
// 创建 dep 对象收集依赖
const dep = new Dep();

// getter 中
// get 的过程中收集依赖
Dep.target && dep.addSub(Dep.target);

// setter 中
// 当数据变化之后，发送通知
dep.notify();
```

### watcher

- 数据变化触发依赖，dep 通知所有的 watcher 实例更新视图
- 自身实例化的时候往 dep 对象中添加自己的结构

```javascript
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data 中的属性名称
    this.key = key;
    // 当数据变化的时候，调用 cb 更新视图
    this.cb = cb;
    // 在 Dep 的静态属性上记录当前 watcher 对象，当访问数据的时候把 watcher 添加到dep 的 subs 中
    Dep.target = this;
    // 触发一次 getter，让 dep 为当前 key 记录 watcher
    this.oldValue = vm[key];
    // 清空 target
    Dep.target = null;
  }
  update() {
    const newValue = this.vm[this.key];
    if (this.oldValue === newValue) {
      return;
    }
    this.cb(newValue);
  }
}
```

- 在 compiler.js 中为每一个指令/插值表达式创建 watcher 对象，监视数据的变化

```javascript
// 因为在 textUpdater等中要使用 this
updaterFn && updaterFn.call(this, node, this.vm[key], key)

// v-text 指令的更新方法
textUpdater (node, value, key) {
  node.textContent = value
  // 每一个指令中创建一个 watcher，观察数据的变化
  new Watcher(this.vm, key, value => {
    node.textContent = value
  })
}
```

- 视图变化更新数据

```javascript
// v-model 指令的更新方法
modelUpdater (node, value, key) {
  node.value = value
  // 每一个指令中创建一个 watcher，观察数据的变化
  new Watcher(this.vm, key, value => {
    node.value = value
  }
  // 监听视图的变化
  node.addEventListener('input', () => {
    this.vm[key] = node.value
  })
}
```
