// 由于`二叉搜索树的中序遍历是一个有序数组`，
// 因此问题很容易就转化为 `108. 将有序数组转换为二叉搜索树（简单）`。

// class Solution:
//     def inorder(self, node):
//         if not node: return []
//         return self.inorder(node.left) + [node.val] + self.inorder(node.right)
//     def balanceBST(self, root: TreeNode) -> TreeNode:
//         nums = self.inorder(root)
//         def dfs(start, end):
//             if start == end: return TreeNode(nums[start])
//             if start > end: return None
//             mid = (start + end) // 2
//             root = TreeNode(nums[mid])
//             root.left = dfs(start, mid - 1)
//             root.right = dfs(mid + 1, end)
//             return root
//         return dfs(0, len(nums) - 1)

function inorder(root){
    if(!node) return true;
    return inorder(root.left).concat(root.val).concat(inorder(root.right));
}

function balanceBST(root){
    let nums = inorder(root);
    function dfs(start, end){
        if(start == end){
            return new TreeNode(nums[start])
        }
        if(start > end){
            return null;
        }
        let mid = (end - start) >> 1 + start;
        let node = new TreeNode(nums[mid]);
        node.left = dfs(start, mid - 1);
        node.right = dfs(mid + 1, end);
        return node;
    }
    return dfs(0, nums.length - 1);

}