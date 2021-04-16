// 输入一个整数数组 判断该数组是不是某二叉搜索树的后序遍历的结果
// 如果是 输出yes 假设数字都不同

// 思路：
// 1 后序遍历(左 右 跟) 分成三部分 最后一个节点为跟节点 第二部分为左子树的值比跟节点都少 第三部分为右子树的值比跟节点都大
// 2 先检测左子树 左侧比跟节点小的值 都判定为 左子树
// 3 出最后一个节点外 和左子树外的其他值为右子树 右子树有一个比跟节点小 就返回false
// 4 若存在左右子树，递归检测

function verifySequenceOfBST(sequence){
    if(sequence && sequence.length > 0){
        let root = sequence[sequence.length - 1];
        let index = sequence.indexOf(root);

        for(let j = index; j < sequence.length - 1; j++){
            if(sequence[j] < root){
                return false;
            }
        }
        let [left, right] = [true, true];
        left = verifySequenceOfBST(sequence.slice(0, index));
        right = verifySequenceOfBST(sequence.slice(index, sequence.length - 1));
        return left && right;
    }
}