// 深度优先 + 分治
// 左右子树都不为空 左子树的深度 和 右子树最小深度的最小值 + 1
// 左树为空 右子树最小深度的最小值 + 1
// 右树为空 左子树最小深度 + 1
function minDepth(root){
    if(!root){
        return 0;
    }
    if(!root.left){
        return 1 + minDepth(root.right);
    }
    if(!root.right){
        return 1 + minDepth(root.left);
    }
    return Math.min(minDepth(root.left), minDepth(root.right));
}