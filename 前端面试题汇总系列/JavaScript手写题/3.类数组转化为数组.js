const arr = {
    length: 4,
    "1":"xu", "2": "hao","3":"dong", "h": "hao"
}

console.log('res1', Array.from(arr).filter(e => !!e));
console.log('res2', Array.prototype.slice.call(arr).filter(e => !!e));
// console.log('res3', [...pureArr]);
console.log('res4', Array.prototype.concat.apply([], arr).filter(e => !!e));
