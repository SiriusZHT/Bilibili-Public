/**
 *newInstance
 *实现new一个对象，添加Fn方法，添加原型属性
 * @param {Function} Fn
 * @param {...any} args
 * @return {Object} new obj 
 */
function newInstance(Fn, ...args) {
    //1.创建新对象
    const obj = {};
    //2.给obj绑定一个Fn函数，让Fn的this指向obj
    const result = Fn.call(obj, ...args);
    //3.添加新对象的原型属性 指向Fn函数的原型
    obj.__proto__ = Fn.prototype;
    //4.函数调用的结果返回的是 对象 那么返回结果 如果不是对象 那么返回
    return result instanceof Object ? result : obj;
}

/**
 *myInstanceof
 *实现instanceof 顺着原型链找
 * @param {Object} obj 对象
 * @param {Function} Fn type
 * @return {Boolean} boolean
 */
function myInstanceof(obj, Fn) {
    let prototype = Fn.prototype;
    let proto = obj.__proto__;
    //遍历原型链 一直到null
    while (proto) {
        if (prototype === proto) {
            return true;
        }
        //向原型链上面查找
        proto = proto.__proto__;
    }
    return false;
}

/**
 *mergeObject
 *按键值对形式合并对象
 * @param {*} args
 * @return {*} 
 */
function mergeObject(...args) {
    const result = {};
    args.forEach(arg => {
        Object.keys(obj).forEach(key => {
            //如果result已经存在key属性 就合并
            if (result.hasOwnProperty(key)) {
                result[key] = [].concat(result[key], obj[key])
            } else {
                //没有key属性 就添加key并赋值
                result[key] = obj[key];
            }
        })
    })
    return result;
}

/**
 *浅拷贝
 *通过ES6...解构运算
 * @param {*} target
 * @return {*} [...target] {...target} target
 */
function clone_ES6(target) {
    if (target instanceof Array) {
        return [...target];
    } else if (target instanceof Object) {
        return {...target };
    } else {
        return target;
    }
}

/**
 *浅拷贝
 *按类型创建新Array或者Object
 通过ES5的let key in target 拷贝 返回拷贝的堆地址
 不是Array或者Object直接返回target 返回拷贝的栈地址
 * @param {*} target
 * @return {*} 
 */
function clone_ES5(target) {
    if (target != null && typeof target === 'object') {
        const cloneTarget = Array.isArray(target) ? [] : {};
        for (let key in target) {
            if (target.hasOwnProperty(key)) {
                cloneTarget[key] = target[key];
            }
        }
        return cloneTarget;
    }
    return target;
}

/**
 *获取data的type
 *将data的指针传入Object.prototype.toString.call
 *作为this
 * @param {*} data
 * @return {*} real type
 */
function getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1);
}

/**
 *深拷贝JSON版本
 * 对象字符串化：JSON.stringify(target)
 * 对象解析重组：JSON.parse
 * @param {*} target
 * @return {*} 
 */
export function deepClone_JSON(target) {
    return JSON.parse(JSON.stringify(target));
}

/**浅拷贝ES5也算最基础的深拷贝 */
let deepClone_ES5 = clone_ES5;

export function deepClone_Loop(target, map = new Map()) {
    const type = getType(target)
    if (type === 'Object' || type === 'Array') {
        let cloneTarget = map.get(target)
        if (cloneTarget) {
            return cloneTarget
        }
        cloneTarget = type === 'Array' ? [] : {}
        map.set(target, cloneTarget)
        for (const key in target) {
            if (target.hasOwnProperty(key)) {
                cloneTarget[key] = deepClone_Loop(target[key], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}

export function deepClone_Plus(target, map = new Map()) {
    const type = getType(target)
    if (type === 'Object' || type === 'Array') {
        let cloneTarget = map.get(target)
        if (cloneTarget) {
            return cloneTarget
        }

        if (type === 'Array') {
            cloneTarget = []
            map.set(target, cloneTarget)
            target.forEach((item, index) => {
                cloneTarget[index] = deepClone4(item, map)
            })
        } else {
            cloneTarget = {}
            map.set(target, cloneTarget)
            Object.keys(target).forEach(key => {
                cloneTarget[key] = deepClone4(target[key], map)
            })
        }

        return cloneTarget
    } else {
        return target
    }
}

function deepCloneSimple(obj={}){
    if(typeof obj !== 'object' || obj === null){
        return obj;
    }
    let result;
    if(obj instanceof Array){
        result = [];
    } else {
        result = {};
    }
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            result[key] = deepCloneSimple(obj[key]);
        }
    }
    return result;
}