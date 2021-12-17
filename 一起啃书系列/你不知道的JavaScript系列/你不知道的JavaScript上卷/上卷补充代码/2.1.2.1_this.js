// Exp1
// function foo(num) {     
//     console.log( "foo: " + num );      
//     // 记录 foo 被调用的次数   
//     console.log("this in foo():\n\t", "😇", this);  // 😇 <ref *1> Object [global] {...
//     this.count++; 
// }  
// foo.count = 0;  
// var i;  
// for (i=0; i<10; i++) {     
//     if (i > 5) {         
//         foo( i );     
//     } 
// } 
// // foo: 6 
// // foo: 7 
// // foo: 8 
// // foo: 9  
// // foo 被调用了多少次？ 
// console.log( foo.count ); // 0 -- WTF?

// 执行 foo.count = 0 时，的确向函数对象 foo 添加了一个属性 count。
// 但是函数内部代码this.count 中的 this 并不是指向那个函数对象，所以虽然属性名相同，根对象却并不相同，困惑随之产生。

// Exp2
// function foo(num) {     
//     console.log( "foo: " + num );      
//     // 记录 foo 被调用的次数     
//     data.count++; 
// }  
// var data = {     
//     count: 0 
// };  
// var i;  
// for (i=0; i<10; i++) {     
//     if (i > 5) {         
//         foo( i );     
//     } 
// } 
// // foo: 6 
// // foo: 7 
// // foo: 8 
// // foo: 9  
// // foo 被调用了多少次？ 
// console.log( data.count ); // 4

// Exp3
// function foo(num) {     
//     console.log( "foo: " + num );      
//     // 记录 foo 被调用的次数   
//     console.log("there is something in foo():\n\t", "😇", foo);  // 😇 [Function: foo] { count: 1 / 2 / 3  }
//     foo.count++; 
// }  
// foo.count = 0;  
// var i;  
// for (i=0; i<10; i++) {     
//     if (i > 5) {         
//         foo( i );     
//     } 
// } 
// // foo: 6 
// // foo: 7 
// // foo: 8 
// // foo: 9  
// // foo 被调用了多少次？ 
// console.log( foo.count ); // 4

// Exp4
// function foo(num) {     
//     console.log( "foo: " + num );      
//     // 记录 foo 被调用的次数   
//     console.log("this in foo():\n\t", "😇", this);  // 😇 [Function: foo] { count: 1 / 2 / 3  }
//     this.count++; 
// }  
// foo.count = 0;  
// var i;  
// for (i=0; i<10; i++) {     
//     if (i > 5) {         
//         foo.call( foo, i );     
//     } 
// } 
// // foo: 6 
// // foo: 7 
// // foo: 8 
// // foo: 9  
// // foo 被调用了多少次？ 
// console.log( foo.count ); // 4