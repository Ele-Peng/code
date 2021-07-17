/*
 * @lc app=leetcode.cn id=746 lang=javascript
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    let len = cost.length;
    let prev = cost[0];
    let next = cost[1];
    for (let i = 2; i < len; i ++) {
        let temp = next;
        next = Math.min(prev, next) + cost[i];
        prev = temp;
    }
    return Math.min(prev, next);
};
// @lc code=end

