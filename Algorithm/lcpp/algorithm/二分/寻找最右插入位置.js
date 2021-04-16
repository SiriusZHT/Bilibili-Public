function bisect_right(nums, x) {
    //zuobiyoubi
    let [l, r] = [0, nums.length - 1];
    while(l <= r){
        mid = (r - l) >> 1 + l;
        num[mid] <= x ? l = mid + 1 : r = mid - 1;
    }
    return l;
}