// 题目描述
// 输入一棵二叉树的跟节点和一个整数，打印出二叉树的节点值的和为输入整数的所有路径
// 路径定义为 从树的跟节点开始往下 一直到叶节点所经过的节点 形成一条路径

// 思路
// 设定一个结果数组result来存储所有符合条件的路径
// 设定一个栈stack来存当前路径中的节点
// 设定一个 和 sum 来标识当前路径之和
// 从跟节点开始dfs 每经过一个节点 将节点入栈
// 到达叶子节点 且当前路径和等于给定目标值 则找到一个可行的解决方案 加入result数组
// 遍历到二叉树的节点有两个可能的方向 左 右
// 存在左子树 继续向左子树递归 存在右子树 继续向右子树递归
// 如果上面都不满足 或者已经遍历过 将当前节点出栈 向上回溯？？

function findTreePath(root, k){
    const result = [];
    if(root){
        findTreePathCore(root, k, [], 0, result);
    }
    return result;
}

function findTreePathCore(root, k, stack, sum, result){
    // 存放当前路径节点
    stack.push(root.val);
    sum += root.val;
    if(!root.left && !root.right && sum == k){
        // 如果满足条件（在跟节点 并且sum == k） 从stack push到result里面
        result.push(stack.slice(0));
    }
    root.left && findTreePathCore(root.left, k, stack, sum, result);
    root.right && findTreePathCore(root.right, k, stack, sum, result);
    stack.pop();
}