/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
    let slow = head;
    let quick = head;
    while(true) {
        if (!quick || !quick.next) return null;
        slow = slow.next;
        quick = quick.next.next;
        if (slow == quick) break;
    }
    quick = head;
    while(quick != slow) {
        slow = slow.next;
        quick = quick.next;
    }
    return quick;
};
// @lc code=end

