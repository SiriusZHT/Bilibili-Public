function bisect_left(nums, x){
    //zuobiyoubi
    let [l, r] = [0, nums.length - 1];
    while(l <= r){
        mid = (r - l) >> 1 + l;
        //等于也要算哦～
        nums[mid] >= x ? r = mid - 1 : l = mid + 1;
    }
    return l;
}

console.log(bisect_left([1,2,2,3,4,5,6,], 2))