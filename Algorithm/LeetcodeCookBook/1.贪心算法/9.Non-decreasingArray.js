// 665.Non-decreasing Array(easy)
// 题目描述
// 给你一个长度为n的整数数组，请你判断在最多改变 1 个元素的情况下 该数组是否变成一个非递减数列
// 非递减数列的定义：
// 对于数组中任意的 i (0 <= i <= n-2)，总满足 nums[i] <= nums[i + 1]。

// 示例 1:
// 输入: nums = [4,2,3]
// 输出: true
// 解释: 你可以通过把第一个4变成1来使得它成为一个非递减数列。

// 示例 2:
// 输入: nums = [3, 5, 2, 5]
// 输出: false
// 解释: 你不能在只改变一个元素的情况下将其变为非递减数列。
// [3, 5, 2, 5] => [3, 3, 2, 5] => [3, 3, 3, 5]
function nonDecreasingArray(nums){
    let count = 0;
    for(let i = 0; i < nums.length - 1; i++){
        // 遍历中的 当前值 和 下一个值
        let left = nums[i - 1], cur = nums[i], right = nums[i + 1];
        // 如果当前值 大于 下一个值 就说明在递减
        if(cur > right){
            // 递减计数器++
            count++;
            // 有超过1组的递减 就说明不能用一个数来让他成为非递减
            if(count > 1){
                return false;
            }
            // 如果 当前值大于0 并且后面的值 小于 当前值的前一个值
            if(cur > 0 && right < left){
                nums[i + 1] = cur; // 把当前的cur->right递减 变成 cur=right相等
            }
        }
    }
    return true;
}

console.log(nonDecreasingArray([4,2,1]))