/*
 * @lc app=leetcode.cn id=450 lang=javascript
 *
 * [450] 删除二叉搜索树中的节点
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
// var deleteNode = function(root, key) {
//     if (root === null) return null;
//     if (root.val === key) {
//         if (root.left === null) return root.right;
//         if (root.right === null) return root.left;
//         let minNode = getMin(root.right);
//         root.val = minNode.val;
//         root.right = deleteNode(root.right, minNode.val);
//     } else if (root.val > key) {
//         root.left = deleteNode(root.left, key);
//     } else if (root.val < key) {
//         root.right = deleteNode(root.right, key);
//     }
//     return root;
// };

// function getMin(node) {
//     while(node.left !== null) node = node.left;
//     return node;
// }


var deleteNode = function(root, key) {
    if (!root) return null;
    if (root.val === key) {
        if (!root.left) return root.right;
        if (!root.right) return root.left;
        // 找到右子树最小的节点
        let minNode = getMinNode(root.right);
        // 将其替换值
        root.val = minNode.val;
        // 将右子树最小节点那个值 删掉
        root.right = deleteNode(root.right, minNode.val);
    } else if (root.val > key) {
        root.left = deleteNode(root.left, key);
    } else {
        root.right = deleteNode(root.right, key);
    }
    return root;
};

var getMinNode = (root) => {
    while (root.left !== null) {
        root = root.left;
    }
    return root;
}
// @lc code=end

