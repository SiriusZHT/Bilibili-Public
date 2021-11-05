function Animal() {
    this.colors = ['black', 'white']
}
Animal.prototype.getColor = function() { return this.colors; }

function Dog() {}
Dog.prototype = new Animal();

let dog1 = new Dog(); // 问题1:不能传参
dog1.colors.push('black');
let dog2 = new Dog();

console.log(dog1.__proto__)
console.log(Dog.prototype)
console.log(dog2.__proto__)
console.log(dog2.colors);
// 问题2:继承的引用被共享
console.log(dog1.__proto__ === dog2.__proto__);