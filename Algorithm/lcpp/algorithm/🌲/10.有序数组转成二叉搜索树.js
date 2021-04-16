function sortedArrayToBST(nums){
	if(!nums){
        return null;
    }
    let mid = (nums.length - 1) >> 1; // mid 靠左
    let root = TreeNode(nums[mid]);
    root.left = sortedArrayToBST(nums.slice(0, mid));
    root.right = sortedArrayToBST(nums.slice(mid));
    return root;
}