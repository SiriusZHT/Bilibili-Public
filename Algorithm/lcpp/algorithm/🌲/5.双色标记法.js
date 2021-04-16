
/**
 * WHITE 未访问
 * GRAY 尚未完全访问子节点
 * BLACK 子节点全部访问
 * 使用颜色标记节点的状态，新节点为白色，已访问的节点为灰色。
 * 如果遇到的节点为白色，则将其标记为灰色，然后将其右子节点、自身、左子节点依次入栈。
 * 如果遇到的节点为灰色，则将节点的值输出。
 * @param {TreeNode} root
 */
function threeColorSign(root) {
    let [WHITE, Gray] = [0, 1];
    let res = [];
    const stack = [[WHITE, root]];
    while(stack.length) {
        let [color, node] = stack.pop();
        if(!node) continue;
        if(color == WHITE){
            stack.push([WHITE, node.right]);
            stack.push([GRAY, node]);
            stack.push([WHITE, node.left]);
        } else {
            res.push(node.val);
        }
    }
    return res;
}