/*
 * @lc app=leetcode.cn id=384 lang=javascript
 *
 * [384] 打乱数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
  this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
  return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
  let res = this.nums.slice();
  // 洗牌算法
  const randomFromN2M = (n, m) => {
    return Math.floor(Math.random() * (m - n + 1)) + n;
  }
  let len = res.length;
  for (let i = 0; i < len; i ++) {
    let temp = res[i];
    let j = randomFromN2M(i, len - 1);
    res[i] = res[j];
    res[j] = temp;
  }
  return res;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
// @lc code=end

