/*
 * @lc app=leetcode.cn id=1423 lang=javascript
 *
 * [1423] 可获得的最大点数
 */

// @lc code=start
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function(cardPoints, k) {
    let n = cardPoints.length, res = 0;
    let s = (new Array(n + 1)).fill(0);
    for (let i = 0; i < n + 1; i ++) {
        s[i + 1] = s[i] + cardPoints[i];
    }
    for (let i = 0; i <= k; i ++) {
        res = Math.max(res, s[i] + s[n] - s[n - k + i])
    }
    return res
};
// @lc code=end

