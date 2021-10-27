// Function.prototype.myBind2 = (context, ...arg1) => {
//     var self = this;
//     return function F(...args2) {
//         return self.apply(context, arg1.concat(...args2));
//     }
// }

Function.prototype.myBind2 = (context, ...arg1) => {
    var self = this;
    return function F(...arg2) {
        // 当self作为构造函数的时候
        if(this instanceof F) {
            return new self(...arg1, ...arg2);
        } else {
            return self.apply(context, arg1.concat(...arg2));
        }
    }
}

function A(ans) {
    console.log(this.name);
    console.log(ans);
}
var person = {
    name: "zs",
};
var name = "ls";
var b = A.myBind2(person, 55);
//   b();
console.log("-----------------------");
var c = new b(12);
//   console.log(c);
// c();