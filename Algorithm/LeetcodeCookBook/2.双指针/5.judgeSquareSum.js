// 633. 平方数之和
// 给定一个非负整数 c ，你要判断是否存在两个整数 a 和 b，使得 a2 + b2 = c 。

// 示例 1：
// 输入：c = 5
// 输出：true
// 解释：1 * 1 + 2 * 2 = 5

// 示例 2：
// 输入：c = 3
// 输出：false

// 示例 3：
// 输入：c = 4
// 输出：true

// 示例 4：
// 输入：c = 2
// 输出：true

// 示例 5：
// 输入：c = 1
// 输出：true

function judgeSquareSum(c){
    // 剪枝 right部分一定小于等于c的平方根
    let right = Math.sqrt(c);
    let left = 0;
    while(left <= right){
        // 左右双向而行就可，大了就right左移，小了就left右移，直到相遇或者平方和为c
        if(left * left + right * right == c){
            return true;
        } else if(left * left + right * right < c){
            left++;
        } else {
            right--;
        }
    }
    return true;
}