const arr = [1, 1, 2, 3, 4, 4, 5, 5, , 6, 'true', 'true', {}, {}, {a: 1}, {a: 1}];
// => [
//   1,        2,
//   3,        4,
//   5,        undefined,
//   6,        'true',
//   {},       {},
//   { a: 1 }, { a: 1 }
// ]
// 方法一 使用set
const res1 = [...new Set(arr)];
console.log('res1', res1);

// 方法二 两层for循环 + splice
const res2 = [...arr];
const unique2 = arr => {
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j, 1);
            }
        }
    }
    return arr;
}
console.log('res2', unique2(res2));

// 方法三 用indexOf
const res3 = [...arr];
const unique3 = arr => {
    const res = [];
    for(let i of arr) {
        res.indexOf(i) === -1 && res.push(i);
    }
    return res;
}
console.log('res3', unique3(res3));

// 方法四 用includes
const res4 = [...arr];
const unique4 = arr => {
    const res = [];
    for(let i of arr) {
        !res.includes(i) && res.push(i);
    }
}
console.log('res4', unique3(res4));

// 方法五 用filter(item, index) true就保留
const res5 = [...arr];
const unique5 = arr => arr.filter((item, index) => arr.indexOf(item) === index); // true就保留
console.log('res5', unique5(res5));

// 方法六 用map
const res6 = [...arr];
const unique6 = arr => {
    const res = new Map();
    for(let i of arr) {
        !res.get(i) && res.set(i, 1);
    }
    return [...res.keys()];
}
console.log('res6', unique6(res6))