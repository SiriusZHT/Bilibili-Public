// 4. Median of Two Sorted Arrays (Hard)
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

// 示例 1：
// 输入：nums1 = [1,3], nums2 = [2]
// 输出：2.00000
// 解释：合并数组 = [1,2,3] ，中位数 2

// 示例 2：
// 输入：nums1 = [1,2], nums2 = [3,4]
// 输出：2.50000
// 解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5

// 示例 3：
// 输入：nums1 = [0,0], nums2 = [0,0]
// 输出：0.00000

// 示例 4：
// 输入：nums1 = [], nums2 = [1]
// 输出：1.00000

// 示例 5：
// 输入：nums1 = [2], nums2 = []
// 输出：2.00000

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */


function force(nums1, nums2) {
  var nums3 = nums1.concat(nums2);
  var sum = nums3.length / 2;
  nums3.sort(function (a, b) {
    return a - b;
  });
  if (nums3.length % 2 !== 0) {
    return nums3[Math.floor(sum)];
  } else {
    return parseFloat((nums3[sum] + nums3[sum - 1]) / 2);
  }
}
