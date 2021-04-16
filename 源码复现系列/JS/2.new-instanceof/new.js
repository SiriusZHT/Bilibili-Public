var ObjectFactory = function() {
    var obj = {};
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var ret = Constructor.apply(obj, arguments);
    // 能返回基本类型
    return typeof ret === "object" ? ret : obj;
}

function Person(name, age){
    this.name = name;
    this.age = age;
    this.habit = 'Games';
    return "new a person";
}

Person.prototype.skills = "play LOL";

Person.prototype.sayName = function(){
    console.log("I am " + this.name);
}

// 1. 访问构造函数属性
// 2. 访问prototype属性
// 3. 如果构造函数有返回值，需要过滤掉
// var person = new Person("sirius", "21");
var person = ObjectFactory(Person, "sirius", "21");
console.log(person.name); // sirius
console.log(person.habit); // games
console.log(person.skills); // play lol
person.sayName(); // i am sirius