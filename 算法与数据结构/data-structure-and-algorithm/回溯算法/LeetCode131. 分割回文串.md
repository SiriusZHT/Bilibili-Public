### [131\. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

Difficulty: **中等**

给你一个字符串 `s`，请你将`s`分割成一些子串，使每个子串都是 **回文串** 。返回 `s` 所有可能的分割方案。

**回文串** 是正着读和反着读都一样的字符串。

**示例 1：**

```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

**示例 2：**

```
输入：s = "a"
输出：[["a"]]
```

**提示：**

- `1 <= s.length <= 16`
- `s` 仅由小写英文字母组成

#### Solution

Language: javascript

```javascript
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
  const huiwenArr = [];
  // 以下不能通过,因为传的是引用
  // const huiwenArr = new Array(s.length).fill(new Array(s.length).fill(false));
  for (let i = 0; i < s.length; i++) {
    huiwenArr.push(new Array(s.length).fill(false));
    for (let j = 0; j <= i; j++) {
      if (s[i] === s[j] && (i - j <= 2 || huiwenArr[j + 1][i - 1])) {
        huiwenArr[j][i] = true;
      }
    }
  }
  const res = [];
  function backTracking(s, temp, index) {
    if (index === s.length) {
      res.push([...temp]);
      return;
    }
    for (let i = index; i < s.length; i++) {
      if (huiwenArr[index][i]) {
        temp.push(s.substring(index, i + 1));
        backTracking(s, temp, i + 1);
        temp.pop();
      }
    }
  }
  backTracking(s, [], 0);
  return res;
};
```
