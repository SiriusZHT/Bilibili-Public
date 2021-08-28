// function search(nums, target){
//     let i = 0, j = nums.length - 1;
//     while(i <= j){
//         let m = parseInt((i + j) / 2);
//         if(nums[m] <= target) i = m + 1;
//         else j = m - 1;
//     }
//     let right = i;
//     i = 0, j = nums.length - 1;
//     while(i <= j){
//         let m = parseInt((i + j) / 2);
//         if(nums[m] < target) i = m + 1;
//         else j = m - 1;
//     }
//     let left = j;
//     return right - left - 1;
// }
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    return getRightMargin(nums, target) - getRightMargin(nums, target - 1);
};
function getRightMargin(nums, target){
    let left = 0, right = nums.length - 1;
    while(left <= right){
        let mid = parseInt((left + right) / 2);
        nums[mid] >= target && (right = mid - 1);
        nums[mid] < target && (left = mid + 1);
    }
    return left;
}
console.log(search([0,1,1,1,2,2,2,3,3,3,4,5,6], 2));