@[toc]

# 1、【Map】two-sum

- 循环 每次循环把该项和 target 相减
- 检查 map 里面有没有那个数
- 有的话返回结果
- 没有就把该项加进 map 里面去

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    } else {
      map.set(nums[i], [i]);
    }
  }
};
```

# 2、【链表】add-two-nums

- 通过 dummy 记录头部

<img src="https://img-blog.csdnimg.cn/20210419171700683.png" width="80%">

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode();
  let cur = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum = l1.val + sum;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum = l2.val + sum;
      l2 = l2.next;
    }
    sum += carry;
    cur.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    cur = cur.next;
  }
  if (carry > 0) {
    cur.next = new ListNode(carry);
  }
  return dummy.next;
};
```

# 3、【滑动窗口、Set】无重复长度的最长子串

- 用 set 集合，因为 set 可以 has、add、delete、size 操作并且 set 可以去重
- 定义滑动窗口的左指针 j
- 右指针 i 就直接用遍历 s 的 i 就行了
- 遍历中，如果 i 位置的 s 在 set 没有，把 i 位置的 s 加到 set 里，更新最大长度
- 最大长度是指 set 的 size 和之前的最大长度哪个大，因为 set 去重过后有问题
- 如果 set 中有当前 s 的 i，用个 while 循环，从 j 一直到删到重复的 i 位置

```JavaScript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    const set = new Set();
    let maxLength = 0;
    let j = 0;
    for(let i = 0; i < s.length; i++){
        if(!set.has(s[i])){
            set.add(s[i]);
            maxLength = Math.max(maxLength, set.size);
        } else {
            while(set.has(s[i])){
                set.delete(s[j]);
                j++;
            }
            set.add(s[i]);
        }
    }
    return maxLength;
};
```

# 5、【双指针】最长回文子串

<img src="https://img-blog.csdnimg.cn/20210424163650107.png" width="50%">

```javascript
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length <= 1) {
    return s;
  }
  let maxLength = 1,
    start = 0;
  function expandAroundCenter(left, right) {
    // 核心
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        start = left;
      }
      left--;
      right++;
    }
  }
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i - 1, i + 1);
    expandAroundCenter(i, i + 1);
  }
  return s.substring(start, start + maxLength);
};
```

# 15、【三指针】3sum

<img src="https://img-blog.csdnimg.cn/20210424183249964.png" width=50%>

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  // 为什么-2： i start end
  for (let i = 0; i < nums.length - 2; i++) {
    if (i === 0 || nums[i] !== nums[i - 1]) {
      let start = i + 1,
        end = nums.length - 1;
      while (start < end) {
        if (nums[i] + nums[start] + nums[end] === 0) {
          result.push([nums[i], nums[start], nums[end]]);
          start++, end--;
          while (start < end && nums[start] === nums[start - 1]) {
            start++;
          }
          while (start < end && nums[end] === nums[end + 1]) {
            end--;
          }
        } else if (nums[i] + nums[start] + nums[end] < 0) {
          start++;
        } else {
          end--;
        }
      }
    }
  }
  return result;
};
```

# 19、【双指针】删除链表的倒数第 N 个节点

<img src="https://img-blog.csdnimg.cn/20210424185034756.png" width="50%">

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode();
  dummy.next = head;
  let n1 = dummy,
    n2 = dummy;
  for (let i = 0; i <= n; i++) {
    n2 = n2.next;
  }
  while (n2 !== null) {
    n1 = n1.next;
    n2 = n2.next;
  }
  n1.next = n1.next.next;
  return dummy.next;
};
```

# 20、【Map】有效的括号

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210424190537827.png)

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const map = new Map();
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      stack.push(map.get(s[i]));
    } else {
      if (stack.pop() !== s[i]) {
        return false;
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
};
```

# 21、【链表】合并两个有序数组

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210424193519460.png)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let cur = new ListNode();
  const dummy = cur;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  l1 && (cur.next = l1);
  l2 && (cur.next = l2);
  return dummy.next;
};
```

# 24、【链表】两两交换链表中的节点

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021042420040631.png)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  const dummy = new ListNode();
  dummy.next = head;
  let cur = dummy;
  while (cur.next && cur.next.next) {
    let n1 = cur.next,
      n2 = cur.next.next;
    cur.next = n2;
    n1.next = n2.next;
    n2.next = n1;
    cur = n1;
  }
  return dummy.next;
};
```

# 49、【Map、字符串】字母异位词分组

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210424205437551.png)

```javascript
var groupAnagrams = function (strs) {
  const map = new Object();
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[c.charCodeAt() - "a".charCodeAt()]++;
    }
    map[count] ? map[count].push(s) : (map[count] = [s]);
  }
  return Object.values(map);
};
```

# 53、【DP】最大子数组之和

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425140436935.png)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const memo = [];
  memo[0] = nums[0];
  let max = nums[0];
  // i - 1
  for (let i = 1; i < nums.length; i++) {
    memo[i] = Math.max(memo[i - 1] + nums[i], nums[i]);
    max = Math.max(memo[i], max);
  }
  return max;
};
```

# 54、【DP】螺旋矩阵

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425145207317.png)

```javascript
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  if (!matrix.length) {
    return [];
  }
  let top = 0,
    left = 0,
    bottom = matrix.length - 1,
    right = matrix[0].length - 1,
    direction = "right",
    result = [];

  while (left <= right && top <= bottom) {
    switch (direction) {
      case "right": {
        for (let i = left; i <= right; i++) {
          result.push(matrix[top][i]);
        }
        top++;
        direction = "down";
        break;
      }
      case "down": {
        for (let i = top; i <= bottom; i++) {
          result.push(matrix[i][right]);
        }
        right--;
        direction = "left";
        break;
      }
      case "left": {
        for (let i = right; i >= left; i--) {
          result.push(matrix[bottom][i]);
        }
        bottom--;
        direction = "top";
        break;
      }
      case "top": {
        for (let i = bottom; i >= top; i--) {
          result.push(matrix[i][left]);
        }
        left++;
        direction = "right";
        break;
      }
      default: {
        break;
      }
    }
  }
  return result;
};
```

# 55、【贪心】跳跃游戏

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210425153411865.png)

```javascript
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxJump = nums.length - 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (i + nums[i] >= maxJump) {
      maxJump = i;
    }
  }

  return maxJump === 0;
};
```

# 56、【双指针】合并区间

# 62、【DP】不同路径

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429123151257.png)

```javascript
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const memo = [];
  for (let i = 0; i < m; i++) {
    memo.push([]);
  }
  for (let i = 0; i < n; i++) {
    memo[0][i] = 1;
  }
  for (let i = 0; i < m; i++) {
    memo[i][0] = 1;
  }
  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      memo[row][col] = memo[row - 1][col] + memo[row][col - 1];
    }
  }
  return memo[m - 1][n - 1];
};
```

# 66、【数组】加一

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429125638596.png)

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    // 遇到一个不等于9的就++并返回
    if (digits[i] != 9) {
      digits[i]++;
      return digits;
    } else {
      digits[i] = 0;
    }
  }
  return [1, ...digits];
};
```

# 70、【DP】爬楼梯 1-2

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const memo = [];
  memo[1] = 1;
  memo[2] = 2;
  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
};
```

# 73、【二维数组】矩阵置 0

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429140834325.png)

```javascript
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let firstColHasZero = false;
  let firstrowHasZero = false;
  // 判断第一列有没有0
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }
  // 判断第一行有没有0
  for (let i = 0; i < matrix[0].length; i++) {
    if (matrix[0][i] === 0) {
      firstrowHasZero = true;
      break;
    }
  }
  // 检查其余行列有没有0 用行列表示
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = 0;
        matrix[0][col] = 0;
      }
    }
  }
  // 接下来，利用第一行和第一列的标0情况，将matrix中的数字标0
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }
  // 考虑行和列为0的情况
  if (firstrowHasZero) {
    for (let i = 0; i < matrix[0].length; i++) {
      matrix[0][i] = 0;
    }
  }
  if (firstColHasZero) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0;
    }
  }
  return matrix;
};
```

# 83、【链表】删除排序链表重复元素

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429142552714.png)

- 难点
- 判断 cur 的边界条件
- 因为 cur 是跟自己的 next 比较，所以 cur 和 next 都不为 null
- 如果相等的话 就 next 的 next 跳过
- 不相等就 next

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode();
  dummy.next = head;
  let cur = head;
  while (cur !== null && cur.next !== null) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};
```

# 92、【链表】反转链表 2

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429150637429.png)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let [prev, cur] = [null, head];
  for (let i = 0; i < left - 1; i++) {
    prev = cur;
    cur = cur.next;
  }
  let prev2 = prev,
    cur2 = cur;
  for (let i = left; i <= right; i++) {
    [cur.next, prev, cur] = [prev, cur, cur.next];
  }
  if (left > 1) {
    prev2.next = prev;
  } else {
    head = prev;
  }
  cur2.next = cur;
  return head;
};
```

# 121、买卖股票最佳时机 1

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429153529315.png)

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPrice = prices[0];
  for (let i = 0; i < prices.length; i++) {
    if (minPrice > prices[i]) {
      minPrice = prices[i];
    } else if (maxProfit < prices[i] - minPrice) {
      maxProfit = prices[i] - minPrice;
    }
  }
  return maxProfit;
};
```

# 122、【贪心、波峰波谷】买卖股票的最佳时机 2

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */

// 第一种方法：贪心策略(每次局部操作是最优的，全局就是最优的)
// 遍历整个股票交易日价格列表 price，策略是所有上涨交易日都买卖（赚到所有利润），所有下降交易日都不买卖（永不亏钱）。

function maxProfit(prices = []) {
  let profit = 0;
  for (let i = 0; i < prices.length; i++) {
    // 只要涨了 就交易
    prices[i] - prices[i - 1] > 0 && (profit += temp);
  }
  return profit;
}

// 第二种方法：每次找波峰和波谷
function maxProfit(prices = []) {
  let profit = 0,
    valley = prices[0], // 波峰
    peak = prices[0]; // 波谷
  i = 0;
  while (i < prices.length - 1) {
    // 一直跌
    while (i < prices.length - 1 && prices[i + 1] - prices[i] <= 0) {
      i++;
    }
    // 跌完了 找到波谷
    valley = prices[i];
    // 一直涨
    while (i < prices.length - 1 && prices[i + 1] - prices[i] >= 0) {
      i++;
    }
    // 涨完了 找到波峰
    peak = prices[i];
    // 交易
    profit += peak - valley;
  }
  return profit;
}
```

# 123、【DP】买卖股票的最佳时机 3

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
// 动态规划 dp[i][k][j] 第i天，交易k笔，j=0：手中不持有
var maxProfit = function (prices) {
  // 获取初始状态值
  let dpi10 = 0;
  let dpi11 = -prices[0];
  let dpi20 = 0;
  let dpi21 = -prices[0];
  //计算第i天
  for (let i = 0; i < prices.length; i++) {
    dpi10 = Math.max(dpi10, dpi11 + prices[i]);
    dpi11 = Math.max(dpi11, -prices[i]);
    dpi20 = Math.max(dpi20, dpi21 + prices[i]);
    dpi21 = Math.max(dpi21, dpi10 - prices[i]);
  }
  return dpi20;
};
```

# 125、【正则、双指针】验证回文串

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  s = s.toLowerCase().replace(/[\W_]/g, "");
  // \W表示除英文、数字、中文、下划线_以外的所有特殊符号
  // s = s.replace(/[^0-9a-zA-Z]/g, '').toLowerCase()
  if (s.length < 2) {
    return true;
  }
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left++] !== s[right--]) {
      return false;
    }
  }
  return true;
};
```

# 134、加油站

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429193508551.png)

```javascript
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas = [], cost = []) {
  let totalCost = cost.reduce((a, b) => a + b),
    totalGas = gas.reduce((a, b) => a + b);
  if (totalCost > totalGas) {
    return -1;
  }
  let start = 0;
  let curGas = 0;
  for (let i = 0; i < gas.length; i++) {
    curGas = curGas - cost[i] + gas[i];
    if (curGas < 0) {
      curGas = 0;
      start = i + 1;
    }
  }
  return start;
};
```

# 141、【双指针】环形链表

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (head === null) {
    return false;
  }
  let slow = head;
  let fast = head;
  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  }
  return false;
};
```

# 142、【双指针、数学】环形链表 2

- a：环外的长度
- b：slow 走了 b 的距离 与 a 相遇
- c：slow 走剩下的长度 = 圈的总长度 - b

- fast 已经走完了环的 n 圈 因此走过的总距离：a + n(b+c) + b = a + (n+1)b + nc
- 因为 fast 比 slow 走快 2 倍
- 所以 a + (n+1)b + nc = 2(a+b) => a = c + (n-1)(b+c)
- 就会发现：从相遇点 到 入环点 的距离 + n-1 圈 的环长 == 链表头部 到 入环点的距离
- 当 slow 和 fast 相遇时 再额外用一个指针 ptr 指向链表头部
- 然后跟 slow 每次移动一个位置 就能在入环点相遇

```javascript
function detectCycle(head) {
  let [slow, fast] = [head, head];
  // 判断是否存在环路
  do {
    // 如果fast或者fast的下一位到尽头了 也就是说 当前fast是尽头 或者 fast的下一个fast是尽头
    // 没有环路
    if (!fast || !fast.next) {
      return null;
    }
    fast = fast.next.next;
    slow = slow.next;
  } while (fast != slow);
  // 如果存在 查找环路节点
  let ptr = head;
  while (ptr != slow) {
    slow = slow.next;
    ptr = ptr.next;
  }
  return ptr;
}
```

# 152、【DP】乘积最大子序列

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210429201448139.png)

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  const minProductMemo = [];
  const maxProductMemo = [];
  minProductMemo[0] = nums[0];
  maxProductMemo[0] = nums[0];
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxProductMemo[i] = Math.max(
      nums[i],
      nums[i] * maxProductMemo[i - 1],
      nums[i] * minProductMemo[i - 1]
    );
    minProductMemo[i] = Math.min(
      nums[i],
      nums[i] * maxProductMemo[i - 1],
      nums[i] * minProductMemo[i - 1]
    );
    max = Math.max(max, maxProductMemo[i]);
  }
  return max;
};
```

# 153、【二分】寻找旋转排序数组的最小值

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  let left = 0,
    right = nums.length - 1;
  // 右边必然小于左边
  if (nums[right] > nums[0]) {
    return nums[0];
  }
  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    // mid 后面 小于 mid 说明 mid 后面就是最小值
    if (nums[mid] > nums[mid + 1]) {
      return nums[mid + 1];
    }
    // mid 小于 前面 说明 mid 就是最小值
    if (nums[mid] < nums[mid - 1]) {
      return nums[mid];
    }
    // 如果上述两个条件都不成立
    // 继续二分
    if (nums[mid] >= nums[left]) {
      // 左边是安全的 所以缩进左边
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
};
```
