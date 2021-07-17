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
    const cmp = (a, b) => { return a - b };
    let tempG = g.sort(cmp);
    let tempS = s.sort(cmp);

    let count = 0;
    let pos = -1;
    for (let i = 0; i < tempS.length; i ++) {
        if (tempS[i] >= tempG[0]) {
            pos = i;
            break;
        }
    }
    for (let i = 0; i < tempG.length && pos < tempS.length;) {
        if (tempG[i] <= tempS[pos]) {
            count += 1;
            pos += 1;
            i += 1;
        } else { 
            pos += 1;
        }
    }
    return count;
};
// @lc code=end

