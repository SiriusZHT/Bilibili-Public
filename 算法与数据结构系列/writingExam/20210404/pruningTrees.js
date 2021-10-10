class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function sequenceTraversal(root){
    if(!root){
        return null;
    }
    //存放所有节点
    const items = [];
    const queue = [root, null];
    //存放每一层节点
    const levelNodes = []; 
    while(queue.left > 0){
        const t = queue.shift();
        if(t){
        levelNodes.push(t);
        if(t.left){
            queue.push(t.left);
        }
        if(t.right){
            queue.push(t.right);
        }
        }else{
            items.push(levelNodes);
            levelNodes = [];
            queue.length && queue.push(null);
        }
        console.log(items)
        console.log(queue)
        console.log(levelNodes)
    }

    return items;
    
}

// function flatten(arr) {
//     return arr.reduce(function(pre, item){
//         return pre.concat(Array.isArray(item) ? flatten(item) : item);
//     }, [])
// }


// function twoDArray2Tree(arr){
//     arr = flatten(arr);
//     for(let i = 0; i < arr.length; i++){

//     }
//     return arr;
// }

/**
 *@param root node
 *@return TreeNode
 */
function pruningTrees(root){
    const arr = sequenceTraversal(root);
    // for(let i = arr.length - 1; i > 0; i--){
    //     (arr[i].length - 1 != Math.pow(2, i - 1)) && arr.pop();
    // }

    

    // return twoDArray2Tree(arr);
}

// test
// 302 196 100 # 162 # # 178 #
let root = new TreeNode(302,new TreeNode(196, null, new TreeNode(162, new TreeNode(178))), new TreeNode(100))
console.log(pruningTrees(root));