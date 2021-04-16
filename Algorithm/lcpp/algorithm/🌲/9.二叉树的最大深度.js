// 深度优先遍历 + 分治
// 二叉树的最大深度 = 左子树深度 和 右子树深度 的最大值 + 1
function treeDepth(root) {
    return !root ? 0 : Math.max(treeDepth(root.left), treeDepth(root.right)) + 1;
}
