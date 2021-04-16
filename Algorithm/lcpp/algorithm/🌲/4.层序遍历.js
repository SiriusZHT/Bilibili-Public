function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(!root) return [];
    const items = []; //all node
    const queue = [root, null];
    let levelNodes = []; //每一层node

    while(queue.length) {
        const t = queue.shift();
        if(t){
            levelNodes.push(t);
            t.left && queue.push(t.left);
            t.right && queue.push(t.right);
        } else {
            items.push(levelNodes);
            levelNodes = [];
            queue.length && queue.push(null);
        }
    }
    return items;
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
        5, 
        new TreeNode(
            6, 
            null, 
            null
        ), 
        null
    )
);

console.log(levelOrder(root)); // [ 1, 2, 3, 4, 4, 5 ]
