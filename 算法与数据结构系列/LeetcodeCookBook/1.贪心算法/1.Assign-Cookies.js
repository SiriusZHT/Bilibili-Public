// 贪心：每次操作都是局部最优的，从而得到的结果是全局最优的

// 455.Assign Cookies(Easy)
// 题目描述
// 有一群孩子和一堆饼干，每个孩子有一个饥饿度，每个饼干都有一个大小。
// 每个孩子只能吃一个饼干，且只有饼干的大小不小于孩子的饥饿度时，这个孩子才能吃饱。求解最多有多少孩子可以吃饱。

// 输入输出样例
// 输入两个数组，分别代表孩子的饥饿度和饼干的大小。输出最多有多少孩子可以吃饱的数量。
// Input: [1,2], [1,2,3] Output: 2 在这个样例中，我们可以给两个孩子喂 [1,2]、[1,3]、[2,3] 这三种组合的任意一种。

// 思路
// 把大于等于这个孩子饥饿度的、且大小最小的饼干给这个孩子
// 给剩余孩子里 最小饥饿度的孩子 分配 最小的 能饱腹的饼干（稍微大于或等于当前孩子的饥饿度就行）

function findContentChildren(children=[], cookies=[]){
    // 排序 目的是 为了从饥饿度最小 的孩子 和 大小最小 的饼干出发
    children.sort();
    cookies.sort();
    let [child, cookie] = [0, 0];
    // 给剩余孩子里 最小饥饿度的孩子 分配 最小的 能饱腹的饼干（稍微大于或等于当前孩子的饥饿度就行）
    while(child < children.length && cookie < cookies.length){
        // 当前孩子 能被 喂饱 总数++
        if(children[child] <= cookies[cookie]){
            ++child;
        }
        // 喂饱了 cookie换下一个更大的 没喂饱 cookie还是要换下一个更大的
        ++cookie;
    }
    return child;
}

console.log(findContentChildren([1,2], [1,2,3]))