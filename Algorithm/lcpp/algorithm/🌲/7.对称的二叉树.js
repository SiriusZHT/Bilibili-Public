function isSymmetrical(root) {
    return isSymmetrical(root, root)
}

function isSymmetricalTree(root1, root2) {
    // 如果都为空
    if(!root1 && !root2){
        return true;
    }
    // 单方面为空
    if(!root1 || !root2){
        return false;
    }
    if(root1.val != root2.val){
        return false;
    }
    // 如果相等 就比较下一个
    return isSymmetricalTree(root1.left, root2.right) && isSymmetricalTree(root1.right, root2.left);
}