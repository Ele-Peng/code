/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// 每个孩子最多给一块饼干，不需要出现凑饼干的情况
var findContentChildren = function(g, s) {
    let tempG = g.sort((a, b) => a - b);
    let tempS = s.sort((a, b) => a - b);
    let res = 0;
    for (let i = 0, j = 0; i < tempG.length && j < tempS.length; ) {
        if (tempG[i] <= tempS[j]) {
            res ++;
            i ++;
            j ++;
        } else {
            j ++; // 当前饼干小了，找下一块大的饼干
        }
    }
    return res;
};
// @lc code=end

