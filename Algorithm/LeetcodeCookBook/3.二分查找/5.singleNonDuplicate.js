// 540.有序数组中的单一元素
//给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。
// 示例 1:
// 输入: [1,1,2,3,3,4,4,8,8]
// 输出: 2

// 示例 2:
// 输入: [3,3,7,7,10,11,11]
// 输出: 10

function singleNonDuplicate(nums){
    let l = 0, r = nums.length - 1;
    while (l < r){
        let mid = l + (r - l) / 2;
        if(mid % 2 == 1){
            // 保证左边是偶数个
            --mid;
        }
        if(nums[mid] == nums[mid + 1]){// 左边的偶数是成对出现的
            l = mid + 2;// 所以结果在右边
        } else {// 左边的偶数不是成对的
            r = mid;
        }
    }
    return nums[l];
}

// 暴力
function force(nums){
    for(let i = 0; i < nums.length; i+=2) {
        if(nums[i] != nums[i + 1]){
            return nums[i];
        }
    }
    return nums[nums.length - 1];
}