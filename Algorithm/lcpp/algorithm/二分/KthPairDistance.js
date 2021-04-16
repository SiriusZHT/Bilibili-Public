// Given an integer array, return the k-th smallest distance among all the pairs.
// The distance of a pair (A, B) is defined as the absolute difference between A and B.

// Example 1:

// Input:
// nums = [1,3,1]
// k = 1
// Output: 0
// Explanation:
// Here are all the pairs:
// (1,3) -> 2
// (1,1) -> 0
// (3,1) -> 2
// Then the 1st smallest distance pair is (1,1), and its distance is 0.

// Note:

// 2 <= len(nums) <= 10000.
// 0 <= nums[i] < 1000000.
// 1 <= k <= len(nums) * (len(nums) - 1) / 2.

// force
// function KthPairDistance(arr, k) {
//   const map = new Map();
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++) {
//       let getCur = map.get(Math.abs(arr[j] - arr[i]));
//       getCur
//         ? ++map[Math.abs(arr[j] - arr[i])]
//         : map.set(Math.abs(arr[j] - arr[i]), 1);
//     }
//   }
//   for (let i = 0; i < arr.length; i++) {
//     if (map[i] >= k) {
//       return i;
//     }
//     k -= map[i];
//   }
//   return -1;
// }

console.log(KthPairDistance([1, 2, 3, 3, 5], 2));

//binarySearch
function KthPairDistance(arr = [], k = 0) {
    arr.sort();
    let len = arr.length;
    let [left, right] = [0, arr[len-1] - arr[0]];
    while(left < right) {
        let mid = (right - left) >> 1 + left;
        // [小于等于mid距离的个数, 较小数字的位置]
        let [cnt, start] = [0, 0];
        for(let i = 0; i < len; i++){
            while(start < len && arr[i] - arr[start] > mid){
                ++start;
            }
            cnt += i - start;
        }
        cnt < k ? left = mid + 1 : right = mid;
    }
    return right;
}