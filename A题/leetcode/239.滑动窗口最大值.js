/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// class MontonicQueue {
//   constructor() {
//     this.data = [];
//   }
//   push(val) {
//     let data = this.data;
//     while(data.length && data[data.length - 1] < val) data.pop();
//     data.push(val);
//   }
//   pop(val) {
//     let data = this.data;
//     if(data.length && data[0] == val) data.shift();
//   }
//   max() {
//     return this.data[0];
//   }
// }
// var maxSlidingWindow = function(nums, k) {
//   let window = new MontonicQueue;
//   let res = [];
//   for (let i = 0; i < nums.length; i ++) {
//     if (i < k - 1) {
//       window.push(nums[i]);
//     } else {
//       window.push(nums[i]);
//       res.push(window.max());
//       window.pop(nums[i - k + 1]);
//     }
//   }
//   return res;
// };

class MontonicQueue {
  constructor() {
    this.data = [];
  }
  push(val) {
    let data = this.data;
    while(data.length && data[data.length - 1] < val) data.pop();
    data.push(val);
  }
  pop(val) {
    let data = this.data;
    if(data.length && data[0] === val) data.shift();
  }
  max() {
    return this.data[0];
  }
} 
var maxSlidingWindow = function(nums, k) {
  let window = new MontonicQueue;
  let res = [];
  for (let i = 0; i < nums.length; i ++) {
    if (i < k - 1) {
      window.push(nums[i]);
    } else {
      window.push(nums[i]);
      res.push(window.max());
      window.pop(nums[i - k + 1]);
    }
  }
  return res;
};




// @lc code=end

