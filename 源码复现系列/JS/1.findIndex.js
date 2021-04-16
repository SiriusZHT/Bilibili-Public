//findIndex 期望回调函数作为第一个参数。
//如果你需要非基本类型数组(例如对象)的索引，或者你的查找条件比一个值更复杂，可以使用这个方法
if(!Array.prototype.findIndex) {
    //绑定一个findIndex
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function(predicate) {
            if(this == null) {
                throw new TypeError("this is null or not defined");
            }
            let obj = Object(this);
            let len = obj.length >>> 0;

            if(Object.prototype.toString(predicate).slice(8, -1) != 'function'){
                throw new TypeError('predicate must be a function');
            } 
            let thisArg = arguments[1];

            let k = 0;
            while(k < len) {
                let kValue = obj[k];
                if(predicate.call(thisArg, kValue, k, obj)) {
                    return k;
                }
                k++;
            }
            return -1;
        }
    })
}