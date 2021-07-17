/*
 * @lc app=leetcode.cn id=976 lang=javascript
 *
 * [976] 三角形的最大周长
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
// var largestPerimeter = function(A) {
//     const compare = (a, b) => {
//         return b - a;
//     }
//     let len = A.length;
//     let tempA = A.sort(compare);
//     const isTriangle = (a, b, c) => {
//         return (a + b > c) && (a - b < c);
//     }
//     let max = 0;
//     for (let i = 0; i < len; i ++) {
//         if (isTriangle(tempA[i], tempA[i - 1], tempA[i - 2])) {
//             return Math.max(max, tempA[i] + tempA[i - 1] + tempA[i - 2]);
//         }
//     }
//     return 0;
// };


var largestPerimeter = function(A) {
    let len = A.length;
    for (let i = 0; i < len; i ++) {
        for (let j = i + 1; j < len; j ++) { // 选择排序，A[0] A[1] A[2] 第一大的，第二大的，第三大的
            if (A[i] < A[j]) [A[i], A[j]] = [A[j], A[i]];
        }
        if (i > 1 && A[i] + A[i - 1] > A[i - 2]) {
            return A[i] + A[i - 1] + A[i - 2]
        }
    }
    return 0;
};
// @lc code=end

