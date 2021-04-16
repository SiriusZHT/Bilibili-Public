function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    // 1. 递归
    // return !root ? [] : postorderTraversal(root.left).concat(postorderTraversal(root.right).concat(root.val));

    // 2. 非递归
    if(!root) return [];

    const ret = [];
    const stack = [root];
    let p = root;

    while(stack.length > 0) {
        const top = stack[stack.length - 1];
        // 如果是mid
        if(
            top.left === p ||
            top.right === p ||
            (!top.left && !top.right)
        ){
            p = stack.pop();
            ret.push(p.val);
        } else {
            top.right && stack.push(top.right);
            top.left && stack.push(top.left)
        }
    }

    return ret;
};

var root = new TreeNode(
    1, 
    new TreeNode(
        2, 
        new TreeNode(
            3, 
            null, 
            null
        ), 
        new TreeNode(
            4, 
            null, 
            null
        ),
    ), 
    new TreeNode(
        4, 
        new TreeNode(
            5, 
            null, 
            null
        ), 
        null
    )
);
console.log(postorderTraversal(root)); // [ 1, 2, 3, 4, 4, 5 ]