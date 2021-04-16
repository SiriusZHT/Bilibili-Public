function sortedListToBST(root){
    if(!root) return root;
    let [pre, slow, fast] = [null, root, root];

    while(fast && fast.next){
        fast = fast.next.next; // 跳两个
        pre = slow;
        slow = slow.next; // 跳一个
    }
    if(pre){
        pre.next = null;
    }
    let node = TreeNode(slow.val);
    if(slow == fast){
        return node;
    }
    node.left = sortedListToBST(root);
    node.right = sortedListToBST(slow.next);
    return node;
}