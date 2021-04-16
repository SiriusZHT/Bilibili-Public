const { forNoAnimation } = require("react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/HeaderStyleInterpolators");

// get now time
function getNow() {
    return +new Date(); // "+"
}
/**
 * throttle
 * run func in (1 times / wait)
 * @param {Function} func callback function
 * @param {Number} wait time interval
 * @param {Object} options 
 * run func in the beginning ? {leading: true} : {leading: false}
 * run func in the end ? {trailing: true} : {trailing: false}
 * beginning and end can not live together
 * @return {Function} return function
 */
function throttle(func, wait, options) {
    let context, args, result;
    let timeout = null;
    // pre time
    let previous = 0;
    // no options
    !options && (options = {});
    //later timeout
    let later = function() {
        // if leading previous = 0
        previous = options.leading === false ? 0 : getNow();
        // null 1.防止内存泄漏 2.为了下面定时器有无的判断
        timeout = null;
        result = func.apply(context, args);
        !timeout && (context = args = null);
    }
    return function() {
        // get now time
        let now = getNow();
        !previous && !options.leading && (previous = now);
        // count remaining time
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 满足边界条件 1. 没有剩余事件（没有开始） 2. 超过wait 已经完成
        if(remaining <= 0 || remaining > wait){
            // clear
            if(timeout){
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if(!timeout){
                context = args = null;
            }
        }else if (!timeout && !options.trailing){
            timeout = setTimeout(later, remaining);
        }
        return result;
    }
}

function throttle_x(fn, delay){
    let timer = null;
    let startTime = Date.now();
    return function(){
        let curTime = Date.now();
        let remaining = delay - (curTime - startTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        if(remaining <= 0){
            fn.apply(context, args);
            startTime = Date.now();
        }else{
            timer = setTimeout(fn, remaining);
        }
    }
}

function throttle_y(func, delay){
    let start = new Date().getTime();
    let timer = null;
    return function(...args){
        timer && clearTimeout(timer);
        if(new Date() - start >= delay){
            func.apply(this, args);
            start = new Date();
        } else {
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        }
    }
}