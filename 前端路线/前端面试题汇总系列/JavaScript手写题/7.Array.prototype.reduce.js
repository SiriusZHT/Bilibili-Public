Array.prototype.reduce1 = function(...args) {
    if(this === undefined) { throw new TypeError("this is not defined") };
    if(typeof callback !== "function") { throw new TypeError("callback must be a function") };
    let arr = this;
    let fn = args[0];
    let initialValue, index;
    if(args.length > 1) {
        initialValue = args[1];
        index = 0;
    } else {
        initialValue = args[0];
        index = 1;
    }
    let value = initialValue;
    for(let i = index, len = arr.length; i < len; i++) {
        value = fn(value, arr[i]);
    }
    return value;
}
