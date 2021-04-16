// 平衡二叉树 每一个子树的深度之差 不超过1
// 思路：
// 后序遍历二叉树
// 在遍历二叉树每个节点前 都会遍历其左右子树
// 比较左右子树的深度，如果差值大于1 则返回一个标记-1 当前子树不平衡
// 左右子树有一个不是平衡的 或者 左右子树差值大于1 则整棵树不平衡
// 若左右子树平衡，返回当前树的深度（左右子树的深度最大值 + 1）
function isBalancedTree(root) {
    return balanced(root) != -1;
}
function balanced(root) {
    if(!root){
        return 0;
    }
    const left = balanced(root.left);
    const right = balanced(root.right);
    if(left == -1 || right == -1 || Math.abs(left - right) > 1) {
        return -1;
    }
    return Math.max(left, right) + 1;
}