// 154.Find Minimum in Rotated Sorted Array II (Medium)
// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。
// 例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
// 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]
// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

// 给你一个可能存在 重复 元素值的数组 nums ，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素 。

// 示例 1：

// 输入：nums = [1,3,5]
// 输出：1
// 示例 2：

// 输入：nums = [2,2,2,0,1]
// 输出：0


function findMinInSortedArray(nums){
    let l = 0, r = nums.length - 1;
    while(l < r){
        let mid = l + (r - l) / 2;
        if(nums[mid] < nums[r]){
            // mid 比 r小 r移到mid上
            r = mid;
        } else if(nums[mid] > nums[r]){
            // mid 比 r大 l移到mid后面一位
            l = mid + 1;
        } else {
            // mid等于r r后移一位
            r--;
        }
    }
    return nums[l];
}

console.log(findMinInSortedArray([1,3,5]));