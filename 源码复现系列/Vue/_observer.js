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
        if(!data || Object.prototype.toString(data).slice(8, -1) === 'object'){
            return;
        }
        //loop data
        Object.keys(data).forEach(key => {
            this.defineReactive(key, data[key]);
        })
    }
    //define reactive 
    defineReactive(data, key, val){
        const that = this;
        this.walk(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get(){
                return val;
            },
            set(newValue){
                if(newValue === val){
                    return;
                }
                // newValue => reactive
                that.walk(newValue);
                val = newValue;
            }
        })
    }
}