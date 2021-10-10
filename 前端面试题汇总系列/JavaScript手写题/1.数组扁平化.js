const arr = [1, [2, [3, [4, [5, [6, [7, [8, 9]]]]]]], 10];
// => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 方法一 使用flat
const res1 = arr.flat(Infinity);
console.log('res1', res1);

// 方法二 使用正则 
const res2 = JSON.stringify(arr).replace(/\[|\]/g, '').split(',').map((e) => Number(e));
console.log('res2', res2);

//方法三 正则改良版本
const res3 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
console.log('res3', res3); 

// 方法四 使用reduce
const flatten4 = arr => 
    arr.reduce((pre, cur) => 
        pre.concat(Array.isArray(cur) ? flatten4(cur) : cur), 
    []);
console.log('res4', flatten4(arr))

// 方法三 函数递归
const res5 = [];
const flatten5 = (arr) => arr.forEach(e => {
    if(Array.isArray(e)) {
        flatten5(e);
    } else {
        return res5.push(e);
    }
})
flatten5(arr);
console.log('res5', res5);