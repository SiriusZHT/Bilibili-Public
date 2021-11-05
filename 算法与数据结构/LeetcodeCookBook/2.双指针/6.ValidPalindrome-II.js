// 680. 验证回文字符串 Ⅱ(Easy)
// 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。

// 示例 1:
// 输入: "aba"
// 输出: True

// 示例 2:
// 输入: "abca"
// 输出: True
// 解释: 你可以删除c字符。
// 如果左右指针从两端同时向中间走，那么：

// 第一步：
// 左右指针 遇到的元素相等 继续向中间走
// a       b       c       a
// |                       |
// left                  right

// 第二步：
// 左右指针遇到的元素不等 必须进行处理：必须删除其中的一个字符，然后再判断剩余的所有字符是否是回文串
// a       b       c       a
//         |       |
//         left  right

// 删除 b：
// a       c       a

// 或者，  删除 c：
// a       b       a

// 即判断 aca 或者 aba 是否为回文字符串。
// 如果删除一个字符后，剩余的全部字符构成字符串 是回文字符串，那么就满足题意。

function validPalindrome(s){
    function isValid(s, left, right){
        while(left < right){
            if(s[left] == s[right]){
                left++;
                right--;
            } else {
                return false;
            }
        }
        return true;
    }
    
    let left = 0;
    let right = s.length - 1;
    while(left < right){
        if(s[left] == s[right]){
            left++;
            right--;
        } else {
            return isValid(s, left, right - 1) || isValid(s, left + 1, right);
        }
    }
    return true;
}