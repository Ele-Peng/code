/*
 * @lc app=leetcode.cn id=861 lang=javascript
 *
 * [861] 翻转矩阵后的得分
 */

// @lc code=start
/**
 * @param {number[][]} A
 * @return {number}
 */
var matrixScore = function(A) {
    let nums1 = new Uint8Array(A[0].length); // 列
    for (let i = 0; i < A.length; i ++) {
        for (let j = A[0].length - 1; j >= 0; j --) {
            if (A[i][0] === 0) {
                A[i][j] = 1 - A[i][j];
            }
            if (A[i][j] === 1) {
                nums1[j] ++;
            }
        }
    }
    for (let j = 0; j < A[0].length; j ++) {
        if (nums1[j] < A.length - nums1[j]) {
            for (let i = 0; i < A.length; i ++) {
                A[i][j] = 1 - A[i][j];
            }
        }
    }
    return A.reduce((sum, v) => sum + Number('0b' +  v.join('')), 0);
};
// @lc code=end

