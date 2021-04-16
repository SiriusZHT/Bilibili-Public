// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
// 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}
// 和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 思路：
// 前序遍历：跟节点 + 左子树前序遍历 + 右子树前序遍历
// 中序遍历：左子树中序遍历 + 跟节点 + 右子树中序遍历

// 所以 1.前序遍历找到跟节点root 
// 2.找到root在中序遍历的位置,左子树的长度和右子树的长度
// 3.截取左子树的中序遍历、右子树的中序遍历 就是左右
// 4.继续找前序遍历的跟节点，再次递归

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

function reConstructBinayTree(preTraval, inTraval) {
    if (preTraval.length === 0) {
        return null;
    }
    // 递归出口 递归分解到最后一个节点时
    if (preTraval.length === 1) {
        return new TreeNode(preTraval[0]);
    }
    // 前序遍历找到root
    const root = preTraval[0];
    // 中序遍历找到root的index
    const index = inTraval.indexOf(root);
    // 通过index分片找到中序遍历的左右
    const inLeft = inTraval.slice(0, index);
    const inRight = inTraval.slice(index + 1);
    // 通过index也能找到前序遍历的左右，因为去掉跟节点，一直遍历index次，就是左子树的前序遍历，剩下的就是右子树的前序遍历
    const preLeft = preTraval.slice(1, index + 1);
    const preRight = preTraval.slice(index + 1);
    // 已经得到分片过后的中序遍历和前序遍历了 直接递归继续就行 因为递归结束条件是preTraval的length大于1
    const node = new TreeNode(value);
    node.left = reConstructBinayTree(preLeft, inLeft);
    node.right = reConstructBinayTree(preRight, inRight);
    return node;

}
