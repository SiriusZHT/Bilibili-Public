// 34. Find First and Last Position of Element in Sorted Array (Medium)
// 题目描述
// 给定一个增序的整数数组 和 一个值，查找该值第一次和最后一次出现的位置

// 输入输出样例
// 输入一个数组 和 一个值，输出为该值第一次出现的位置 和 最后一次出现的位置（从0开始）
// 如果不存在该值 则 两个返回值都设为 -1

// Input: nums = [5,7,7,8,8,10], target = 8 
// Output: [3,4] 数字 8 在第 3 位第一次出现，在第 4 位最后一次出现。

// 左闭右开的写法
function searchRange(nums, target) {
    if(nums.length) {
        return [-1, -1];
    }
    let lower = lower_bound(nums, target);
    let upper = upper_bound(nums, target) - 1; // 要 - 1 位
    if(lower == nums.length || nums[lower] != target) {
        return [-1, -1]
    }
    return [lower, upper];
}

function lower_bound(nums, target) {
    let l = 0, r = nums.length, mid; // r = nums.length - 1 就偏左了
    // [l, r)
    while(l < r) {
        mid = l + (r - l) / 2;
        // mid值大于等于给定值 说明lower在mid左边 [l, mid)
        // 因为找到最左边 所以=和>一起
        // 为什么？
        // [1,2,2,3] => [l:0, r:4) => mid:2 已经 == target => 但还要在左边 r = mid实现缩小范围
        nums[mid] >= target && (r = mid);
        // mid值小于给定值 说明lower在mid右边 [mid + 1, r)
        nums[mid] < target && (l = mid + 1);
    }
    return l;
}

function upper_bound(nums, target) {
    let l = 0, r = nums.length, mid;
    // [l, r)
    while (l < r) {
        mid = l + (r - l) / 2;
        // mid值大于给定值 说明upper在mid左边 [l, mid)
        nums[mid] > target && (r = mid);
        nums[mid] <= target && (l = mid + 1);
    }
    return l;
}