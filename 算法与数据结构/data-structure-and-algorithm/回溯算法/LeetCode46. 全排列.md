### [22\. 括号生成](https://leetcode-cn.com/problems/permutations/)

Difficulty: **中等**

给定一个不含重复数字的数组 `nums` ，返回其 **所有可能的全排列** 。你可以 **按任意顺序** 返回答案。

**示例 1：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**示例 2：**

```
输入：nums = [0,1]
输出：[[0,1],[1,0]]
```

**示例 3：**

```
输入：nums = [1]
输出：[[1]]
```

**提示：**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数 **互不相同**

#### Solution

Language: javascript

```javascript
​/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    function backTrack(temp) {
        if(temp.length === nums.length) {
            res.push([...temp]);
            return;
        }
        for(let i = 0; i < nums.length; i++) {
            if(temp.indexOf(nums[i]) !== -1 ) continue;
            temp.push(nums[i]);
            backTrack(temp, i + 1);
            temp.pop();
        }
    }
    backTrack([]);
    return res;
};
```
