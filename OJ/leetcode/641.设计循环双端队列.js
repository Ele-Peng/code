/*
 * @lc app=leetcode.cn id=641 lang=javascript
 *
 * [641] 设计循环双端队列
 */

// @lc code=start

class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

class MyCircularDeque {
  /**
   * Initialize your data structure here. Set the size of the deque to be k.
   * @param {number} k
   */
  constructor(k) {
    this.head = null; // 头指针
    this.tail = null; // 尾指针
    this.opacity = k; // 循环双端队列容量
    this.count = 0; // 当前循环双端队列大小
  }



  /**
   * Adds an item at the front of Deque. Return true if the operation is successful. 
   * @param {number} value
   * @return {boolean}
   */
  insertFront(value) {
    let newNode = new Node(value);
    if (this.isFull()) return false;
    
  };


  /**
   * Checks whether the circular deque is empty or not.
   * @return {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * Checks whether the circular deque is full or not.
   * @return {boolean}
   */
  isFull() {
    return this.opacity === this.count;
  }
}
var MyCircularDeque = function(k) {

};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful. 
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {

};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {

};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {

};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {

};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {

};

/**
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
// @lc code=end

