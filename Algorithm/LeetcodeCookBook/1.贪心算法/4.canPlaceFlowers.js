// 605.canPlaceFlowers(easy)
// 题目描述：
// 假设有一个很长的花坛，一部分地块种植了话，另一部分却没有。可是花不能种植在相邻的地块上，他们会争夺水源，然后死去。
// 给你一个整数数组 表示花坛 由若干0 和 1组成，其中0表示没有种花，1表述种了花，
// 有个数n，能否在不打破种植规则的情况下钟入n多花？ 返回true false

// 输入样例：
// 输入：flowerbed = [1,0,0,0,1], n = 1
// 输出：true
// 输入：flowerbed = [1,0,0,0,1], n = 2
// 输出：false

// 思路：能种就种 判断最后是否有剩余
// 可以种花的条件是 
// 自己为空
// 左边为空 或者 自己是最左
// 右边为空 或者 自己是最右
// 为了效率 一旦种植完 就返回

function canPlaceFlowers(flowerbed=[], n){
    for(let i = 0; i < flowerbed.length; i++){
        if(
            flowerbed[i] == 0 && 
            (i == 0 || flowerbed[i - 1] == 0) && 
            (i == flowerbed.length - 1 || flowerbed[i + 1] == 0)
        ){
            n--;
            if(n <= 0){
                return true;
            }
            flowerbed[i] = 1;
        }
    }
    return n <= 0;
}