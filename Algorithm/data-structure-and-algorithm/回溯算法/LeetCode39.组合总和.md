### [39\. 组合总和](https://leetcode-cn.com/problems/combination-sum/)

Difficulty: **中等**

给定一个**无重复元素**的正整数数组  `candidates`  和一个正整数  `target` ，找出  `candidates`  中所有可以使数字和为目标数  `target`  的唯一组合。

`candidates`  中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是唯一的。

对于给定的输入，保证和为  `target` 的唯一组合数少于 `150` 个。

**示例  1：**

```
输入: candidates = [2,3,6,7], target = 7
输出: [[7],[2,2,3]]
```

**示例  2：**

```
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
```

**示例 3：**

```
输入: candidates = [2], target = 1
输出: []
```

**示例 4：**

```
输入: candidates = [1], target = 1
输出: [[1]]
```

**示例 5：**

```
输入: candidates = [1], target = 2
输出: [[1,1]]
```

**提示：**

- `1 <= candidates.length <= 30`
- `1 <= candidates[i] <= 200`
- `candidate` 中的每个元素都是独一无二的。
- `1 <= target <= 500`

#### Solution

Language: javascript

```javascript
​/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const res = [];
    const helper = (nums, res, target, temp, start) => {
        if(target < 0) return;
        if(target == 0) {
            res.push([...temp]);
            return;
        }
        for(let i = start; i < nums.length; i++) {
            temp.push(nums[i]);
            // 题目给的数组 找到的结果 当前的这一项被target减去的值（传递下去是为了对以后的递归结束做判断） 当前加上当前值的数组（后面是为了给我们target为0的时候push的一个数组，记录的是每一次递归的节点） start（下一个递归的节点开始的位置）
            helper(nums, res, target - nums[i], temp, i);
            temp.pop();
        }
    }
    helper(candidates, res, target, [], 0);
    return res;
};
```
