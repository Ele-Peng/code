/*
 * @lc app=leetcode.cn id=131 lang=javascript
 *
 * [131] 分割回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const res = [];
    const dp = (new Array(s.length));
    for (let i = 0; i < s.length; i ++) {
        dp[i] = new Array(s.length);
    }
    for (let col = 0; col < s.length; col ++) {
        for (let row = 0; row <= col; row ++) {
            if (col === row) {
                dp[row][col] = true;
            } else if (col - row === 1 && s[col] === s[row]) {
                dp[row][col] = true;
            } else if (col - row > 1 && s[col] === s[row] && dp[row + 1][col - 1]) {
                dp[row][col] = true;
            } else {
                dp[row][col] = false;
            }
        }
    }
    const dfs = (path, index) => {
        if (index === s.length) {
            res.push(path.slice());
            return ;
        }
        for (let i = index; i < s.length; i ++) {
            if (dp[index][i]) {
                path.push(s.substring(index, i + 1));
                dfs(path, i + 1);
                path.pop();
            }
        }
    }
    dfs([], 0);
    return res;
};
// @lc code=end

