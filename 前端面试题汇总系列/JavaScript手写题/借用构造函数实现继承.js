// 之前的原型链继承
// function Animal() {
//     this.colors = ['black', 'white']
// }
// Animal.prototype.getColor = function() { return this.colors; }

// 构造函数继承
function Animal(name) {
     this.name = name;
     this.getName = function() { return this.name };
 }
function Dog(name) {
    // new Dog的时候的this 每次都会绑定到 新的Animal构造函数
    Animal.call(this, name);
}
// 每次
Dog.prototype = new Animal();
console.log(Dog);
console.log(Dog.prototype);

let dog1 = new Dog('sirius');