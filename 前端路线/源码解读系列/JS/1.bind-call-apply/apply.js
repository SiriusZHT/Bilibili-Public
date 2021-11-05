Function.prototype._apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for(let i = 0; i < arr.length; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')');
    }
    delete context.fn;
    return result;
}

//测试样例
var foo = {
    val: 1
}
function bar(name, age){
    console.log(name);
    console.log(age);
    console.log(this.val)
}
//1. apply 改变了this的指向 指向到了foo
//2. 并且bar执行了
bar._apply(foo, ['sirius', 21]); //1