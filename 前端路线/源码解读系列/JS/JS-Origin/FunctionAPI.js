//最基础版本
//Fn：执行函数 
//obj：this指向对象 
//args：参数
// function call(Fn, obj, ...args){
//     //为obj这个对象添加临时的方法，并且执行的时候this是obj的
//     obj.temp = Fn;
//     //调用 并 传参
//     let result = obj.temp(...args);
//     //删除temp方法
//     delete obj.temp;
//     //返回结果
//     return result;
// }

// 考虑obj不传的情况的版本
/**
 *call
 *给传入的obj对象绑定一个Fn函数并对传入的args执行，最后销毁Fn并返回执行结果值
 * @param {function} Fn
 * @param {Object} obj
 * @param {Array} args
 * @return {any} result
 */
function call(Fn, obj, ...args){
    //注意 如果处于非严格模式下，则指定null或undefined时，会自动替换成指向全局对象
    if(obj === undefined || obj ===null){
        obj = globalThis;//全局对象 es11 globalThis ； 还有种方法是new个obj
    }
    //为obj这个对象添加临时的方法，并且执行的时候this是obj的
    obj.temp = Fn;
    //调用 并 传参
    let result = obj.temp(...args);
    //删除temp方法
    delete obj.temp;
    //返回结果
    return result;
}
module.exports = call;

function apply(Fn, obj, args){
    //判断有无this
    if(obj === undefined || obj === null){
        obj = globalThis;
    }
    //添加临时方法
    obj.temp = Fn;
    //展开参数
    obj.temp(...args)
    //删除临时 属性
    delete obj.temp;
    //返回结果
    return result;
}

function bind(Fn, obj, ...args){
    //返回新函数
    return function(...args2){
        //执行call
        //例如 
        //let fn1 = bind(add, obj, 10, 20);
        //fn1(30, 40)
        //注意 1.bind的参数是靠前的 返回的函数的参数是要靠后的
        //2.args2放在后面 并且不参加bind绑定的相关运算
        return call(Fn, obj, ...args, ...args2);
    }
}
module.exports = bind;

//节流
//理解：函数需要频繁触发时 给个执行周期； 多次事件平均分配
//场景：窗口调整resize 页面滚动scroll DOM元素拖拽mousemove 抢购疯狂点击click

/**throttle 节流
 * 在等待的wait时间内不能进行callback，保证wait时间后才callback
 * @param {function} callback 
 * @param {number} wait 
 * @return {function} callback
 */
function throttle(callback, wait){
    //定义开始时间
    let start = 0;
    //返回结果是个函数
    return e => {
        //获取当前的时间戳
        let now = Date.now();
        //满足条件就执行回调函数
        if(now - start >= wait){
            callback.call(this, e);
            //修改开始时间
            start = now;
        }    
    }  
}

/**
 *debounce 防抖
 保证只进行一次callback
 *callback函数被触发后在time后才执行，如果callback又被触发，那么刷新计时器，time后在执行
 * @param {function} callback
 * @param {number} time
 * @return {function} callback
 */
function debounce(callback, time){
    //定时器变量
    let timeId = null;
    //返回一个函数
    return function(e){
        if(timeId !== null){
            clearTimeout(timeId);
        }
        timeId = setTimeout(() => {
            //执行回调
            callback.call(this, e);
            //重置定时器
            timeId = null;
        }, time);
    }
}

