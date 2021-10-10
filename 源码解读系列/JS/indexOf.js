//Array.prototype.indexOf()：
//indexOf() 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

//1.this一定要有指向
//2.this也要有长度
//3.fromIndex要小于len
//4.能够接收 <0 的数
//5.fromIndex要有效
if(!Array.prototype.indexOf){
    //不能用() => {}, 因为this指向问题
    Array.prototype.indexOf = function(searchElement, fromIndex){
        let k;

        //边界判断环节
        //this 不为空
        if(this == null) {
            throw new TypeError("this is null or not defined");
        }
        let O = Object(this);
        let len = O.length >>> 0;//转为num类型 且>0 且在有效array范围内 >>> n 进n位
        //this也要有长度
        if(len === 0) {
            return -1;
        }
        let n = +fromIndex || 0;
        //fromIndex要有效
        if(Math.abs(n) === Infinity) {
            n = 0;
        }
        //fromIndex要小于len
        if(n >= len) {
            return -1;
        }
        //能够接收 <0 的数
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        //开始find
        while(k < len) {
            if( k in O && O[k] === searchElement){
                return k;
            }
            k++;
        }
        return -1;
    }
}