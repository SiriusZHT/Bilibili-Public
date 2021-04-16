// 88. Merge Sorted Array (Easy)
// 题目描述
// 给定两个有序数组 把两个数组合并为一个

// 输入输出样例
// 输入是两个数组和它们分别的长度 m 和 n。其中第一个数组的长度被延长至 m + n，多出的n 位被 0 填补。
// 题目要求把第二个数组归并到第一个数组上，不需要开辟额外空间。
// Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3 
// Output: nums1 = [1,2,2,3,5,6]

// 思路
// 因为已经排好序 把两个指针分别放在两个数组的末尾 也就是 num1的m-1 和 num2的n-1
// 每次将较大的数字 复制到nums1的右边 然后向前移动一位
function mergeSortedArray(nums1=[], m, nums2=[], n){
    // pos起始位置是 m + n - 1 也就是num1的末尾
    let pos = m-- + n-- - 1;
    // 比较m和n位置对应的两个数组元素哪个大 大的就放在num1末尾
    // 放了过后 pos指针和当前最大元素的指针 都要向左移动
    // 小点的元素的指针 不用移动
    while(m >= 0 && n >= 0){
        nums1[pos--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--];
    }
    // 如果num1原来的已经放完了 但是 n还没有放完 还要按照排序的结果放n
    while(n >= 0){
        nums1[pos--] = nums2[n--];
    }
    return nums1;
}

console.log(mergeSortedArray([1,2,3,0,0,0], 3, [2,5,6], 3))