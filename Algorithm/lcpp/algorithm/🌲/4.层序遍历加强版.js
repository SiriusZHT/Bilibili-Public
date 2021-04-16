function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderI = function(root) {
    if(!root) return;
    let list = [root];
    let arr = [root.val];
    while(list.length){
        let nextList = [];
        for(let node of list){
            node.left && nextList.push(node.left);
            node.right && nextList.push(node.right);
        }
        list = nextList;
        for(let node of nextList) {
            arr.push(node.val);
        }
    }
    return arr;
}


/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrderIICutTree = function(root) {
    if(!root) return [];

    let list = [root];
    let arr = [root.val];
    let flag = false;
    while(list.length){
        let nextList = [];
        for(let node of list){
            if(node.left && node.right) {
                nextList.push(node.left);
                nextList.push(node.right);
            } else {
                flag = true;
                break;
            }
        }
        if(flag) break;
        list = nextList;
        for(let node of nextList) {
            arr.push(node.val);
        }
    }
    return arr;
};


var root = new TreeNode(
    1, 
    new TreeNode(
        2, 
        null, 
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

console.log(levelOrderIICutTree(root)); 
console.log(levelOrderI(root)); 

