if(!Function.prototype.call){
    Object.defineProperty(Function.prototype, 'call', {
        value: function(){

        }
    })
}

//简单需求 设为属性 执行 删除
Function.prototype._call1 = function (context){
    //将this设为对象的属性
    context.fn = this;
    //执行
    context.fn();
    //删除
    delete context.fn;
}

//能接收多参
Function.prototype._call2 = function (context){
    context.fn = this;
    const args = [];
    //arguments[0] 是context
    for(let i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }
    console.log(arguments)
    console.log('context.fn(' + args + ')')
    eval('context.fn(' + args + ')');
    delete context.fn;
}

//this如果是null 就指向window
//函数可以有返回值
Function.prototype._call3 = function (context){
    let context = context || window;
    context.fn = this;

    let args = [];
    for(let i = 1; i < arguments.length; i++){
        args.push('arguments[' + i + ']');
    }
    let result = eval('context.fn(' + args + ')');

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
//1. call 改变了this的指向 指向到了foo
//2. 并且bar执行了
bar._call2(foo, 'sirius', 21); //1
