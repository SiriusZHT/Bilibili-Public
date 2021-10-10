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
    addSub(sub) {(sub && sub.update) && this.subs.push(sub);}
    //anounce all watcher
    notify() {this.subs.forEach(sub => sub.update());}
}
// watcher
class Watcher {
    update() {
        console.log('update');
    }
}

//测试
let dep = new Dep();
let watcher = new Watcher();
dep.addSub(watcher);
dep.notify();