function mirrorTree(root){
    if(root){
        const temp = root.right;
        root.right = root.left;
        root.left = temp;
        mirrorTree(root.right);
        mirrorTree(root.left);
    }
}