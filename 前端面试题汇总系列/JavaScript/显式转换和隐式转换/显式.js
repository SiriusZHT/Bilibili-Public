
var str = true;
var num = Number(str);
console.log(num); //1
console.log(typeof num); //number

var str = "123";
var num = parseInt(str);
console.log(num); //123
console.log(typeof num); //number

var str = "123.24ll";
var num = parseFloat(str);
console.log(num); //123.24
console.log(typeof num); //number

var num = 123;
var str = String(num);
console.log(str); //"123"
console.log(typeof str); //string

var num = 123;
var str = num.toString();
console.log(str); //"123"
console.log(typeof str); //string

var num = null;
var res = Boolean(num);
console.log(res); //false
console.log(typeof res); //boolean