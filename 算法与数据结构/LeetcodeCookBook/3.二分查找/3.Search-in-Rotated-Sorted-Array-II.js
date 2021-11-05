// 81. Search in Rotated Sorted Array II (Medium)
// 题目描述
// 一个原本增序的数组 被首尾连接后 按照某个位置断开
// 如[1,2,2,3,4,5] -> [2,3,4,5,1,2] 就称为旋转数组
// 判断给定值是否在这个旋转数组中

// 输入输出样例输入是一个数组和一个值，输出是一个布尔值，表示数组中是否存在该值。
// Input: nums = [2,5,6,0,0,1,2], target = 0 
// Output: true

// 思路：
// 即使被旋转 但还是可以用这个数组的递增性
// 对于当前中点，如果指向的值小于（等于！）右端 说明右区间有序
// 大于（等于！）左端 说明左区间有序

// l:2,2,mid:2,3,2,r:2
// 如果存在重复数组 如果中点和左端的数字相同 并不能确定左区间全部相同 还是右区间全部相同
// 这种情况下 可以将左端点右移一位 继续进行二分查找

function searchRotatedSortedArrayII(nums, target){
    // 左闭右闭
    let l = 0, r = nums.length - 1;
    while (l <= r){
        let mid = l + (r - l) / 2;
        if(nums[mid] == target){
            return true;
        }
        if(nums[l] == nums[mid]){
            // 无法判断是不是增序
            ++l;
        } else if(nums[mid] <= nums[r]){
            // 右区间增序
            if(target > nums[mid] && target <= nums[r]){
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        } else {
            // 左区间是增序
            if(target >= nums[l] && target < nums[mid]){
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
    }
    return false;
}