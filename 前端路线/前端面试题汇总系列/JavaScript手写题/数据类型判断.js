function typeOf(obj) {
    let res = Object.prototype.toString.call(obj).split(' ')[1];
    res = res.substring(0, res.length - 1).toLowerCase();
    return res;
}
a = typeOf([]);
b = typeOf({});
c = typeOf(new Date);
console.log(a, b, c);
