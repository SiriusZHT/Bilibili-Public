function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
    //   // 1.递归 数据量大合适
    //   if (!root) {
    //     return [];
    //   }
    //   return [root.val]
    //     .concat(preorderTraversal(root.left))
    //     .concat(preorderTraversal(root.right));
    // 2.非递归 用栈简化操作
    if (!root) return [];
    const ret = [];
    const stack = [root];
    let t = stack.pop();
    console.log(stack);

    while (t) {
        if (t.right) {
            stack.push(t.right);
        }
        if (t.left) {
            stack.push(t.left);
        }
        ret.push(t.val);
        t = stack.pop();
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
console.log(preorderTraversal(root)); // [ 1, 2, 3, 4, 4, 5 ]
