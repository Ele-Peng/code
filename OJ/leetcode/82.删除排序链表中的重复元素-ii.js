/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let node = new ListNode(Number.MIN_SAFE_INTEGER);
    node.next = head;
    let cur = node
    while (cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            let val = cur.next.val;
            while (cur.next && cur.next.val === val) {
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }
    return node.next;
};
// @lc code=end

