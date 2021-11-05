//get now time
function now() {
    return +new Date() // "+"
}

/**
 * run in the last event
 * 1. event ? clear && new : new 
 * 2. immediately ? func.apply() : later()
 *
 * @param {Funciton} func callback
 * @param {number} [wait=50] time interval
 * @param {boolean} [immediate=true] true ? run immediately : default
 * @return {Funciton} return function
 */
function debounce(func, wait = 50, immediate = true) {
    // [context, args] = [this, params];
    // timer: later()
    let timer, context, args;
    const later = () => setTimeout(() => {
        // clear timer every time
        timer = null;
        // if not immediately wait
        !immediate && func.apply(context, args) && (context = args = null);
    }, wait)

    return function(...params) {
        // if no later, new
        if(!timer){
            timer = later();
            // immediately ? run : storage this and params
            immediate ? func.apply(this, params) : [context, args] = [this, params];
        } else {
            // ater ? clearOld(cuz run in the last event) && new Later() : continue
            clearTimeout(timer);
            timer = later();
        }
    }
}


function debounce_y(func, delay){
    let timer = null;
    return function(...args) {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}

