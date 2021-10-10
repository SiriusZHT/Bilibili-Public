### [47\. 全排列 II](https://leetcode-cn.com/problems/permutations-ii/)

Difficulty: **中等**

给定一个可包含重复数字的序列 `nums` ，**按任意顺序** 返回所有不重复的全排列。

**示例 1：**

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**示例 2：**

```
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**提示：**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

#### Solution

Language: javascript

```javascript
​/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
    const traverse = (res, cur, nums, used) => {
        if(cur.length === nums.length) {
            res.push([...cur]);
        } else {
            for(let i = 0; i < nums.length; i++) {
                // 当前值被使用了
                if(used[i]) {
                    continue;
                }
                // 当前值和之前的值是一样的 但是没关系 我们还是能够考虑这一项的
                // 因为没说值是不重复的 只说的是 item 出现的次数不能超过 1
                if(i > 0 && nums[i] === nums[i - 1]) {
                    // 如果之前的那一项还在使用，就说明是在之前的那一项的流程里面
                    // 所以能够考虑这一项
                    // 如果之前的那一项没在使用了，就说明之前那一项已经走完了，
                    // 所有的结果全都考虑到了，所以就没必要再考虑这一项了
                    if(!used[i - 1]) {
                        continue;
                    }
                }
                cur.push(nums[i]);
                used[i] = true; // 使用过了
                traverse(res, cur, nums, used);
                used[i] = false; // 不使用了
                cur.pop();
            }
        }
    }
    nums.sort((a, b) => a - b);
    const res = [];
    traverse(res, [], nums, new Array(nums.length).fill(false));
    return res;
};
```
