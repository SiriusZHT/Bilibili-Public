// 移位操作符

// >>有符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，拷贝最左侧的位以填充左侧
// -9 >> 2
// 11111111111111111111111111110111  // -9 -> 11111111111111111111111111111101   // -3

// >>>无符号移位：该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用0填充。因为符号位变成了 0，所以结果总是非负的。（即便右移 0 个比特，结果也是非负的。）
// 9 >>> 2
// 00000000000000000000000000001001   // 9 ->  00000000000000000000000000000010 // 2

Array.prototype.filter1 = function(callback, thisArg) {
    if(this === undefined) {
        throw new Error("this is not defined");
    }
    if(typeof callback !== "function") {
        throw new Error("callback must be a function");
    }
    const res = [];
    // 让O成为回调函数的对象传递 强制转换
    const O = Object(this);
    console.log('this', this);
    console.log('O', O);
    // 保证为正整数
    const len = O.length >>> 0;
    for(let i = 0; i < len; i++) {
        // 判断 i 是否是 O 的 key
        if(i in O) {
            // 调用 并传参
            // 满足条件 为 true 就保留
            if(callback.call(thisArg, O[i], i, O)) {
                res.push(O[i]);
            }
        }
    }
    return res;
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter1((item, index, arr) => parseInt(item % 2) === 0);
console.log('arr', arr);