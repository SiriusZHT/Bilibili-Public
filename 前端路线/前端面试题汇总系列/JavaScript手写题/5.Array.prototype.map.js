Array.prototype.map1 = function(callback, thisArg) {
    if(this === undefined) { throw new TypeError("this is not defined")};
    if(typeof callback !== "function") { throw new TypeError("callback must be a function")};
    const res = [];
    const O = Object(this);
    const len = O.length >>> 0;
    for(let i = 0; i < len; i++) {
        if(i in O) { 
            res.push(callback.call(thisArg, O[i], i, O));
        }
    }
    return res;
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arr.map1((item, index, arr) => item + index));