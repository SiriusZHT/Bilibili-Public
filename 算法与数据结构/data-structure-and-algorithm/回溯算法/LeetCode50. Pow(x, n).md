### [50\. Pow(x, n)](https://leetcode-cn.com/problems/powx-n/)

Difficulty: **中等**

实现   ，即计算 x 的 n 次幂函数（即，x<sup><span style="font-size: 10.8333px; display: inline;">n</span></sup>）。

**示例 1：**

```
输入：x = 2.00000, n = 10
输出：1024.00000
```

**示例 2：**

```
输入：x = 2.10000, n = 3
输出：9.26100
```

**示例 3：**

```
输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25
```

**提示：**

- `-100.0 < x < 100.0`
- `-2<sup>31</sup> <= n <= 2<sup>31</sup>-1`
- `-10<sup>4</sup> <= x<sup>n</sup> <= 10<sup>4</sup>`

#### Solution

Language: javascript

```javascript
​/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if(n < 0) {
        x = 1 / x;
        n = -n;
    }
    const fastPow = (x, n) => {
        if(n === 0) {
            return 1;
        }
        let half = fastPow(x, parseInt(n / 2));
        return n % 2 === 0 ? half * half : half * half * x;
    }
    return fastPow(x, n);
};
```
