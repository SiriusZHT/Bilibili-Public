## html

- 语义化
- defer async

## css

- BFC
- 水平垂直居中
- 选择优先级

## Javascript

- 作用域
- 原型链

## React

- hooks

## 计算机网络

- https
- 三次握手
- tcp udp 区别

## 手写题

- 实现一个 new
- fib 函数
- 层序遍历倒着输出
- 数组找第一项和最后一项
-
- 实现 new
- function myNew(object, ...args) {
  let o = {};
  o.constructor = Object.assign(object);
  o.prototype = object.prototype;
  let res = o(...args);
  if(res) {
  return res;
  } else {
  return o;
  }
  }
- 实现 fib
- function floor(num) {
  if(num === 1) {
  return 1;
  }
  if(num === 2) {
  return 2;
  }
  return floor(num - 1) + floor(num - 2);
  }
  console.log(floor(3))
- 实现层序遍历
- function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
  }

function binaryTree(tree) {
if(!tree) return [];
let head = [tree];
let res = [];
while(head.length) {
let len = head.length;
let temp = [];
for(let i = 0; i < len; i++) {
let node = head.pop();
temp.push(node.val);
if(node.left) head.unshift(node.left);
if(node.right) head.unshift(node.right);

        }
        res.push(temp);
    }
    return res.reverse();

}

let tree = new TreeNode(3,
new TreeNode(9, null, null),
new TreeNode(20,
new TreeNode(15, null, null),
new TreeNode(7, null, null)));
console.log(binaryTree(tree));

- 二分法找第一和最后
  // 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
  // 如果数组中不存在目标值 target，返回 [-1, -1]。
  // 进阶：
  // 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
  // 示例 1：
  // 输入：nums = [5,7,7,8,8,10], target = 8
  // 输出：[3,4]

// 示例 2：
// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]

// 示例 3：
// 输入：nums = [], target = 0
// 输出：[-1,-1]

// 提示：

// 0 <= nums.length <= 105

// -109 <= nums[i] <= 109

// nums 是一个非递减数组

// -109 <= target <= 109

function erFen(nums, target) {
if(!nums.length || nums.length < 2) return [-1, -1];
let left = 0, right = nums.length - 1;
const res = [];
let index = 0;
while(left <= right) {
let mid = left + Math.floor((right - left) / 2);
if(nums[mid] === target) {
index = mid;
} else if(nums[mid] >= target) {
right = mid - 1;
} else {
left = mid + 1;
}
}
res.push(index);
index = 0;
while(left <= right) {
let mid = left + Math.floor((right - left) / 2);
if(nums[mid] === target) {
index = mid;
} else if(nums[mid] <= target) {
right = mid + 1;
} else {
left = mid - 1;
}
}
res.push(index);
return res;
}
console.log(erFen([5,7,7,8,8,10], 8));
