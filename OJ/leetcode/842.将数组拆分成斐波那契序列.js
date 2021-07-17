/*
 * @lc app=leetcode.cn id=842 lang=javascript
 *
 * [842] 将数组拆分成斐波那契序列
 */

// @lc code=start
/**
 * @param {string} S
 * @return {number[]}
 */
var splitIntoFibonacci = function(S) {
    const list = [];
    const len = S.length;
    const max = Math.pow(2, 31) - 1;
    const dfs = (index, sum, prev) => {
        if (len === index) {
            return list.length >= 3;
        }
        let cur = 0;
        for (let i = index; i < len; i ++) {
            if (i > index && cur === 0) {
                break;
            }
            cur = cur * 10 + (+S[i]);
            if (cur > max) {
                break;
            }
            if (list.length >= 2) {
                if (cur < sum) {
                    continue;
                } else if (cur > sum) {
                    break;
                }
            }
            list.push(cur);
            if (dfs(i + 1, cur + prev, cur)) {
                return true;
            } else {
                list.pop();
            }
        }
        return false;
    }
    dfs(0, 0, 0);
    return list;
};
// @lc code=end

