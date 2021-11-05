// 选择一个目标值，把目标值小的放左边，比目标值大的放右边，目标值的位置已排好，将左右两侧进行快排
function quickSort(nums, l, r) {
    if(l + 1 >= r){
        return;
    }
    // 左闭右闭
    let first = l, last = r - 1, key = nums[first];
    
    while(first < last){
        while(first < last && nums[last] >= key){
            --last;
        }
        nums[first] = nums[last];
    }
    nums[first] = key;
    quickSort(nums, 1, first);
    quickSort(nums, first + 1, r);
}