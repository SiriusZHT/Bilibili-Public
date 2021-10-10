// /**
//  * @param {number} n
//  * @return {string[]}
//  */
// var generateParenthesis = function(n) {
//     const memo = []; // 记录每一项
//     const count = []; // 记录每一项的长度
//     memo[0] = "()";
//     if(n === 1){
//         return memo;
//     }
//     count[0] = 1;
//     for(let i = 1; i < n; i++){
//         let len = count[count.length - 1];
//         let i1 = memo.length;
//         let i2 = i1;
//         let j = 0;
//         while(j < len){
//             if(memo.indexOf("(" + memo[i1 - len + j] + ")") === -1){
//                 memo[i2++] = "(" + memo[i1 - len + j] + ")";
//             }
//             if(memo.indexOf(memo[i1 - len + j] + "()") === -1){
//                 memo[i2++] = memo[i1 - len + j] + "()";
//             }
//             if(memo.indexOf("()" + memo[i1 - len + j]) === -1){
//                 memo[i2++] = "()" + memo[i1 - len + j];
//             } 
//             j++;
//         }
//         count.push(i2 - i1);
//         console.log(count);
//         console.log(memo);
//     }
//     return memo.slice(memo.length - count[count.length - 1]);
// };

// console.log(generateParenthesis(4));
// let a = ["(((())))","((()()))","((())())","((()))()","(()(()))","(()()())","(()())()","(())(())","(())()()","()((()))","()(()())","()(())()","()()(())","()()()()"];
// let b = generateParenthesis(4);
// a.forEach(elem => {
//     if(b.indexOf(elem) === -1){
//         console.log(elem);
//     }
// })