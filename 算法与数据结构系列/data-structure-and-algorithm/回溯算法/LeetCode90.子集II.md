### [90\. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)

Difficulty: **   示例 1： 输入：nums = [1,2,2] 输出：[[],[1],[1,2],[1,2,2],[2],[2,2]] 示例 2： 输入：nums = [0] 输出：[[],[0]]   提示： 1 <= nums.length <= 10 -10 <= nums[i] <= 10 **

给你一个整数数组 `nums` ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。返回的解集中，子集可以按 **任意顺序** 排列。

**示例 1：**

```
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**示例 2：**

```
输入：nums = [0]
输出：[[],[0]]
```

**提示：**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

#### Solution

Language: javascript

```javascript
​/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var subsetsWithDup = function(nums) {
    const res = [];
    nums.sort((a, b) => a - b);
    function backTrack(nums, res, list, start) {
        res.push([...list]);
        for(let i = start; i < nums.length; i++) {
            if(i > start && nums[i] === nums[i - 1]) continue;
            list.push(nums[i]);
            backTrack(nums, res, list, i + 1);
            list.pop();
        }
    }
    backTrack(nums, res, [], 0);
    return res;
};
```
