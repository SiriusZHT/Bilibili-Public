var str = "123";
var res = +str;
console.log(res); //123
console.log(typeof res); //number

var str = "123";
var res = str * 1;
console.log(res); //123
console.log(typeof res); //number
//注意： 一定要和连接符做一个区分。

var num = 123;
var str = num + "";
console.log(str); //"123"
console.log(typeof str);//string

var num = undefined;
console.log(!num); // true
console.log(!!num); // false
var res = !!num;

console.log(res); //false
console.log(typeof res);// boolean
// 注意：那些能转成布尔类型的false：0 -0 +0 false undefiend null NaN ""
console.log(!!+0)