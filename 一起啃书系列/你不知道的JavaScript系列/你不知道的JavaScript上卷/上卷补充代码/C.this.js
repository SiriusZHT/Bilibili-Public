// Exp1
// var obj = {
//   id: "awesome",
//   cool: function coolFn() {
//     console.log(this.id);
//   },
// };

// var id = "not awesome";

// obj.cool(); // 酷

// // cool() 函数丢失了同 this 之间的绑定
// setTimeout(obj.cool, 100); // 不酷

// Exp2
// self 只是一个可以通过词法作用域和闭包进行引用的标识符，不关心 this 绑定的过程中发生了什么。
// var obj = {
//   count: 0,
//   cool: function coolFn() {
//     var self = this;
//     console.log("this in coolFn():\n\t", "😇", this); // 😇 { count: 0, cool: [Function: coolFn] }
//     if (self.count < 1) {
//       setTimeout(function timer() {
//         console.log("this in timer():\n\t", "😇", this); // 😇 Timeout {...
//         self.count++;
//         console.log("awesome?");
//       }, 100);
//     }
//   },
// };
// obj.cool(); // 酷吧？

// Exp3
// 箭头函数在涉及 this 绑定时的行为和普通函数的行为完全不一致。它放弃了所有普通 this 绑定的规则，取而代之的是用当前的词法作用域覆盖了 this 本来的值。
// 因此，这个代码片段中的箭头函数并非是以某种不可预测的方式同所属的 this 进行了解绑定，而只是“继承”了 cool() 函数的 this 绑定（因此调用它并不会出错） 。
// var obj = {      
//     count: 0,     
//     cool: function coolFn() {   
//         console.log("this in coolFn():\n\t", "😇", this); //  😇 { count: 0, cool: [Function: coolFn] }               
//         if (this.count < 1) {             
//             setTimeout( () => { // 箭头函数是什么鬼东西？ 
//                 console.log("this in ()=>{} in setTimeout:\n\t", "😇", this); //  😇 { count: 0, cool: [Function: coolFn] }                
//                 this.count++;                 
//                 console.log( "awesome?" );             
//             }, 100 );         
//         }     
//     } 
// };  
// obj.cool(); // 很酷吧 ?

// Exp4
var obj = {     
    count: 0,     
    cool: function coolFn() { 
        console.log("this in coolFn():\n\t", "😇", this); //  😇 { count: 0, cool: [Function: coolFn] }               
        if (this.count < 1) {             
            setTimeout( function timer(){    
                console.log("this in timer():\n\t", "😇", this); //  😇 { count: 0, cool: [Function: coolFn] }               
                this.count++; 
                // this 是安全的                               
                // 因为 bind(..)                 
                console.log( "more awesome" );             
            }.bind( this ), 100 ); // look, bind()!         
        }     
    }  
};  obj.cool(); // 更酷了。