/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start
/**
 * @param {number} capacity
 */
class ListNode {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
var LRUCache = function(capacity) {
    this.capacity = capacity;
    this.hash = {};
    this.count = 0;
    this.dummyHead = new ListNode;
    this.dummyTail = new ListNode;
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
    this.moveToHead = (node) => {
        this.removeFromList(node); // 从链表中删除节点
        this.addToHead(node); // 添加到链表的头部
    }
    this.removeFromList = (node) => {
        let temp1 = node.prev;
        let temp2 = node.next;
        temp1.next = temp2;
        temp2.prev = temp1;
    }
    this.addToHead = (node) => {
        node.prev = this.dummyHead;
        node.next = this.dummyHead.next;
        this.dummyHead.next.prev = node;
        this.dummyHead.next = node;
    }
    this.removeLRUItem = () => {
        let tail = this.popTail();
        delete this.hash[tail.key];
        this.count --;
    }
    this.popTail = () => {
        let tail = this.dummyTail.prev;
        this.removeFromList(tail);
        return tail;
    }
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let node = this.hash[key];
    if (!node) return -1;
    this.moveToHead(node);
    return node.value;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node = this.hash[key];
    if (!node) {
        if (this.count === this.capacity) {
            this.removeLRUItem();
        }
        let newNode = new ListNode(key, value);
        this.hash[key] = newNode;
        this.addToHead(newNode);
        this.count ++;
    } else {
        node.value = value;
        this.moveToHead(node);
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

