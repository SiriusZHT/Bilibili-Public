// forEach 不能修改原来的数组
Array.prototype.forEach1 = function(callback, thisArg) {
    if(this === undefined) { throw new TypeError("this is not defined") };
    if(typeof callback !== "function") { throw new TypeError("callback must be a function") };
    const O = Object(this);
    const len = O.length >>> 0;
    for(let i = 0; i < len; i++) {
        if(i in O) { 
            callback.call(thisArg, O[i], i, O);
        }
    }
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const arr1 = [];
arr.forEach1((item, index, arr) => arr1.push(item + index));
console.log('arr', arr);
console.log('arr1', arr1);