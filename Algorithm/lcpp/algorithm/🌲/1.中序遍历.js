function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// https://tva1.sinaimg.cn/large/007S8ZIlly1ghlu4qkvu0g30qp0eywoh.gif
var inorderTraversal = function(root) {
    // // 1. 递归
    // if (!root) {
    //     return [];
    // }
    // const left = root.left ? inorderTraversal(root.left) : [];
    // const right = root.right ? inorderTraversal(root.right) : [];
    // return left.concat([root.val]).concat(right);

    // 2. 非递归
    if (!root) {
        return [];
    }
    const stack = [root];
    const ret = [];
    let left = root.left;

    let item = null; //stack 当前弹出项
    //从root从上向下找到所有left
    while (left) {
        stack.push(left);
        left = left.left;
    }

    while ((item = stack.pop())) {
        ret.push(item.val);
        
        let t = item.right;
        while(t) {
            stack.push(t);
            t = t.left;
        }
    }
    return ret;
}

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
console.log(inorderTraversal(root)); // [ 3, 2, 4, 1, 5, 4 ]