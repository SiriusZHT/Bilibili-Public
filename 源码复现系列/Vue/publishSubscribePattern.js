/*********自定义事件**********/
// let vm = new Vue()
// vm.$on('dataChange', () => {console.log('dataChange')});
// vm.$on('dataChange', () => {console.log('dataChange1')});
// vm.$emit('dataChange');

// //兄弟组件通信过程
// //eventBus.js
// //事件中心
// let eventHub = new Vue();

// //componentA.vue
// //announcer
// function addToDo(){
//     //发布消息 事件
//     eventHub.$emit('add-todo', {nametext:this.newTodoText})
//     this.newTodoText = '';
// }

// //componentB.vue
// //subscriber
// function created(){
//     //subscribe msg or event
//     eventHub.$on('add-todo', this.addToDo);
// }


/**********模拟自定义实现************/
class EventEmitter {
    constructor(){
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
        this.subs[eventType] && this.subs[eventType].forEach(v => v());
    }
}

//测试
let bus = new EventEmitter();

//registe event
bus.$on('click', function(){
    console.log('click'); //click
})

bus.$on('click', function(){
    console.log('click1') //click1
})

bus.$emit('click');
