// 69. Sqrt(x) (Easy)
// 给定一个非负整数 求他的开方 向下取整
// 输入输出样例输入一个整数，输出一个整数。
// Input: 8 
// Output: 2 8 的开方结果是 2.82842...，向下取整即是 2。

// 思路
// 求 f (x) = x2− a = 0 的解 
// 考虑 x ≥ 0，所以 f (x) 在定义域上是单调递增
// 考虑到 f (0) = −a ≤ 0， f (a) = a2− a ≥ 0，我们可以对 [0,a] 区间使用二分法找到 f (x) = 0 的解。
// 为了防止除以 0，我们把 a = 0 的情况单独考虑，然后对区间 [1,a] 进行二分查找。我们使用了左闭右闭的写法
function mySqrt(a) {
    if(a == 0) return a;
    let l = 1, r = a, mid, sqrt;
    while(l <= r) {
        mid = l + (r - l) >> 1;
        sqrt = a / mid;
        if(sqrt == mid) {
            return mid;
        } else if(mid > sqrt){
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return r;
}