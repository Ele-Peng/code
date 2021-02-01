/*
 * @lc app=leetcode.cn id=888 lang=javascript
 *
 * [888] 公平的糖果交换
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
// sumA−x+y=sumB+x−y
// x = y + 1/2 * sumA−sumB
var fairCandySwap = function(A, B) {
    let sumA = A.reduce((a, b) => {return a + b;}, 0);
    let sumB = B.reduce((a, b) => {return a + b;}, 0);
    for (let i = 0; i < A.length; i ++) {
        for (let j = 0; j < B.length; j ++) {
            if (B[j] === A[i] + (sumB - sumA) / 2) {
                return [A[i], B[j]];
            }
        }
    }
};
// @lc code=end

