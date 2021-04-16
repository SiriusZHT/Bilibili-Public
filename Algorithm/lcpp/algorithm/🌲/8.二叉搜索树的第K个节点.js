// 给定一棵二叉搜索树，请找出其中的第k小的结点。 
// 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

// 思路 二叉搜索树 中序遍历 即排序后的节点

function KthNode(root, k){
    const arr = [];
    loop(root, arr);
    if(k > 0 && k <= arr.length){
        return arr[k - 1];
    }
    return null;
}

function loop(root, arr){
    if(root){
        loop(root.left, arr);
        arr.push(root);
        loop(root.right, arr);
    }
}