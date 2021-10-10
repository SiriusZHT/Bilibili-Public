### [22\. 括号生成](https://leetcode-cn.com/problems/generate-parentheses/)

Difficulty: **中等**

数字 `n`  代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 **有效的** 括号组合。

有效括号组合需满足：左括号必须以正确的顺序闭合。

**示例 1：**

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```
输入：n = 1
输出：["()"]
```

**提示：**

- `1 <= n <= 8`

#### Solution

Language: javascript

```javascript
​/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    function helper(cur, l, r) {
        if(l === 0 && r === 0) {
            res.push(cur);
        }
        if(l !== 0) {
            helper(cur + "(", l - 1, r);
        }
        if(r > l) {
            helper(cur + ")", l, r - 1);
        }
    }
    helper("", n, n);
    return res;
};
```
