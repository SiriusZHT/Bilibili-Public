### [647\. 回文子串](https://leetcode-cn.com/problems/palindromic-substrings/)

Difficulty: **中等**


给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

**示例 1：**

```
输入："abc"
输出：3
解释：三个回文子串: "a", "b", "c"
```

**示例 2：**

```
输入："aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
```

**提示：**

*   输入的字符串长度不会超过 1000 。

#### 解题思路 2
![image.png](https://pic.leetcode-cn.com/1630223958-cKDquZ-image.png)
- 因为每次走到 要判断 dp[i + 1] 的情况的时候
- 一定是不是对角线和次对角线的情况，并且每次 dp[i + 1] 走完一个列的时候一定会更新往右移
- 所以`dp[i + 1][j - 1]` 一定是跟 dp[i + 1] 不考虑列的情况是一样的



#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
    let length = s.length;
    const dp = [];
    for(let i = 0; i < length; i++) {
        dp[i] = [];
        for(let j = 0; j < length; j++) {
            dp[i][j] = false;
        }
    }
    let count = 0;
    for(let j = 0; j < length; j++) {
        for(let i = 0; i <= j; i++) {
            if(s[i] === s[j] && (j - i <= 2 || dp[i + 1])) {
                dp[i] = true;
                count++;
            } else {
                dp[i] = false;
            }
        }
    }
    return count;
};
```
