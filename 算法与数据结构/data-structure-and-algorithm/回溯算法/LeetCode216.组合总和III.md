### [216\. 组合总和 III](https://leetcode-cn.com/problems/combination-sum-iii/)

Difficulty: **中等**

找出所有相加之和为  ***n*** 的  **_k _**个数的组合**_。_**组合中只允许含有 1 - 9 的正整数，并且每种组合中不存在重复的数字。

**说明：**

- 所有数字都是正整数。
- 解集不能包含重复的组合。

**示例 1:**

```
输入: k = 3, n = 7
输出: [[1,2,4]]
```

**示例 2:**

```
输入: k = 3, n = 9
输出: [[1,2,6], [1,3,5], [2,3,4]]
```

#### Solution

Language: JavaScript

```JavaScript
​/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    const res = [];
    function dfs(res, temp, k, start, n) {
        // 满足一个就没有意义了
        if(temp.length === k || n <= 0) {
            // 找到符合标准的
            if(temp.length === k && n === 0) {
                res.push([...temp]);
            }
            return;
        }
        // 从 1 到 9 开始尝试
        for(let i = start; i <= 9; i++) {
            // 尝试当前的一项
            temp.push(i);
            // 进行下一步的尝试，并且把当前的 n 进行更新
            dfs(res, temp, k, i + 1, n - i);
            // 撤回当前的尝试 进行下一个尝试
            temp.pop();
        }
    }
    dfs(res, [], k, 1, n);
    return res;
};
```
