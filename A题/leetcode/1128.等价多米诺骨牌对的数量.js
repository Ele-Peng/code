/*
 * @lc app=leetcode.cn id=1128 lang=javascript
 *
 * [1128] 等价多米诺骨牌对的数量
 */

// @lc code=start
/**
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
    let obj = {};
    let ans = 0;
    for (let dominoe of dominoes) {
        let str = '';
        if (dominoe[0] > dominoe[1]) {
            str = `${dominoe[0]}_${dominoe[1]}`;
        } else {
            str = `${dominoe[1]}_${dominoe[0]}`;
        }
        if (obj[str]) {
            ans += obj[str];
            obj[str] ++;
        } else {
            obj[str] = 1;
        }
    }
    return ans;
};
// @lc code=end

