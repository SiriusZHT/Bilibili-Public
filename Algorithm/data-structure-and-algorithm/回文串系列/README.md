## 回文串系列

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

- 输入的字符串长度不会超过 1000 。

#### 解题思路 1

![image.png](https://pic.leetcode-cn.com/1630222285-pyoEUR-image.png)

- 中心点的位置：左上到右下的对角线，以及往右上方方向的次对角线
- 先用 dp 来初始化中心点的位置，以后每一次因为是在中心点的右上方，所以一定能取到`dp[i + 1][j - 1]`
- 如果是中心点（j - i <= 2）的话，就直接比较 dp i 和 j 的大小
- 如果不是中心点的话，并且两者相同，那就比较回文串缩小一个级别的范围的`dp[i + 1][j - 1]`
- 遍历的范围：左上到右下的右上方，偏向右上方的倒三角，包含对角线和次对角线（这两个作为 dp 初始化的条件）

#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let length = s.length;
  const dp = [];
  for (let i = 0; i < length; i++) {
    dp[i] = [];
    for (let j = 0; j < length; j++) {
      dp[i][j] = false;
    }
  }
  let count = 0;
  for (let j = 0; j < length; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] !== s[j]) continue;
      dp[i][j] = j - i <= 2 || dp[i + 1][j - 1];
      if (dp[i][j]) {
        count++;
      }
    }
  }
  return count;
};
```

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
var countSubstrings = function (s) {
  let length = s.length;
  const dp = [];
  for (let i = 0; i < length; i++) {
    dp[i] = [];
    for (let j = 0; j < length; j++) {
      dp[i][j] = false;
    }
  }
  let count = 0;
  for (let j = 0; j < length; j++) {
    for (let i = 0; i <= j; i++) {
      if (s[i] === s[j] && (j - i <= 2 || dp[i + 1])) {
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

#### 解题思路 3

- 递归夹逼即可

#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;
  function extendPalindrome(s, l, r) {
    if (s[l] !== s[r]) return false;
    if (r - l <= 2) return true;
    return extendPalindrome(s, l + 1, r - 1);
  }
  for (let r = 0; r < s.length; r++) {
    for (let l = 0; l <= r; l++) {
      if (extendPalindrome(s, l, r)) {
        count++;
      }
    }
  }
  return count;
};
```

#### 解题思路 4

- 双指针夹逼

#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;
  function extendPalindrome(s, l, r) {
    while (l < r) {
      if (s[l++] !== s[r--]) {
        return false;
      }
    }
    return true;
  }
  for (let r = 0; r < s.length; r++) {
    for (let l = 0; l <= r; l++) {
      if (extendPalindrome(s, l, r)) {
        count++;
      }
    }
  }
  return count;
};
```

#### 解题思路 5

- 中心扩散

#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;
  function extendPalindrome(s, ml, mr) {
    while (ml >= 0 && mr <= s.length - 1 && s[ml--] === s[mr++]) {
      count++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    // 中心点为偶数个
    extendPalindrome(s, i, i + 1);
    // 中心点为奇数个
    extendPalindrome(s, i, i);
  }
  return count;
};
```

#### 解题思路 6

![image.png](https://pic.leetcode-cn.com/1630227034-qfmjhR-image.png)

- 中心扩散-双倍长度除 2 定中心点

#### 代码

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
  let count = 0;
  function extendPalindrome(s, ml, mr) {
    while (ml >= 0 && mr <= s.length - 1 && s[ml--] === s[mr++]) {
      count++;
    }
  }
  let size = s.length * 2 - 1;
  for (let i = 0; i < size; i++) {
    let left = Math.floor(i / 2);
    let right = left + Math.floor(i % 2);
    extendPalindrome(s, left, right);
  }
  return count;
};
```
