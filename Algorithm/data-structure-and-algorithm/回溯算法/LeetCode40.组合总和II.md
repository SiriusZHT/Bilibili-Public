### [40\. 组合总和 II](https://leetcode-cn.com/problems/combination-sum-ii/)

Difficulty: **中等**

给定一个数组  `candidates`  和一个目标数  `target` ，找出  `candidates`  中所有可以使数字和为  `target`  的组合。

`candidates`  中的每个数字在每个组合中只能使用一次。

**注意：**解集不能包含重复的组合。

**示例  1:**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8,
输出:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**示例  2:**

```
输入: candidates = [2,5,2,1,2], target = 5,
输出:
[
[1,2,2],
[5]
]
```

**提示:**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

#### Solution

Language: JavaScript

```JavaScript
​/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
 var combinationSum2 = function(candidates, target) {
    if(candidates === null || candidates.length === 0) return [];
    const res = [];
    // 排序的作用就是为了去重
    candidates.sort((a, b) => a - b);
    const helper = (res, nums, target, temp, start) => {
        // < 的话 说明不满足 return
        if(target < 0) return;
        // 等于的话就push 要记住push的是拷贝后的 而不是 temp 的指针 因为temp在之后还会改变
        if(target === 0) {
            res.push([...temp]);
            return;
        }

        for(let i = start; i < nums.length; i++) {
            // 当前的不是第一个 且 跟之前的重复了
            if(i !== start && nums[i] === nums[i - 1]) continue;
            temp.push(nums[i]);
            // 保存结果的集合 传入的要使用的数组 跳到下一个节点的时候需要进行target减去当前的值的操作 加上当前的值后的节点路径集合 不能取到当前值（直接快进到下一个start）
            helper(res, nums, target - nums[i], temp, i + 1);
            temp.pop();
        }
    }
    helper(res, candidates, target, [], 0);
    return res;
};
```
