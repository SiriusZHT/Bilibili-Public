### [17\. 电话号码的字母组合](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

Difficulty: **中等**

给定一个仅包含数字  `2-9`  的字符串，返回所有它能表示的字母组合。答案可以按 **任意顺序** 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![](https://assets.leetcode-cn.com/aliyun-lc-upload/original_images/17_telephone_keypad.png)

**示例 1：**

```
输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**示例 2：**

```
输入：digits = ""
输出：[]
```

**示例 3：**

```
输入：digits = "2"
输出：["a","b","c"]
```

**提示：**

- `0 <= digits.length <= 4`
- `digits[i]` 是范围 `['2', '9']` 的一个数字。

#### Solution

Language: javascript

```javascript
​var letterCombinations = function(digits) {

    if (!digits) return []

    let numMap = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
    }

    const result = [];

    function backTrack(digits, index, str) {
        let arr = numMap[digits[index]];
        if(index === digits.length - 1) {
            arr.forEach((str2) => {
                result.push(str + str2);
            })
            return;
        }
        arr.forEach((str2) => {
            backTrack(digits, index + 1, str + str2);
        })
    }

    backTrack(digits, 0, '');
    return result;
};
```
