// 题目描述：
// 输入一棵二叉搜索树 将该二叉搜索树转换成一个排序的双向链表
// 不能创建新的节点 只能改变节点的指向

const { nodeModuleNameResolver } = require("typescript");

// 思路：
// 二叉搜索树的中序遍历 即 排序后的序列 中序遍历首先遍历左子树，然后访问根结点，最后遍历右子树。
// 递归左子树 找到左子树的最后一个节点 跟节点左侧 和 这个节点连接
// 当前节点 转变为 已经转换完成的链表 的最后一个节点
// 递归右子树 找到当前树的最后一个节点
// 回溯到上层 进行链接

//    2
//  // \\
// 1     3  http://www.conardli.top/docs/二叉搜索树与双向链表.png

/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 *  1、看到题目描述需要排序的链表，想到二叉树的中序遍历，以升序的方式进行遍历
    2、在每次输出结点的时候进行链表的指向
    3、保存首结点与尾结点，等到遍历结束进行拼接
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function(root) {
    let prev = null;
    let firstNode = null;
    function searchNode(head){
        if (head){
            searchNode(head.left);
            if (prev) {
                prev.right = head;
                head.left = prev;
            } else {
                firstNode = head;
            }
            prev = head;
            searchNode(head.right); 
        }
    }
    searchNode(root);
    if (firstNode){
        firstNode.left = prev;
        prev.right = firstNode;
    }
    return firstNode;
};

