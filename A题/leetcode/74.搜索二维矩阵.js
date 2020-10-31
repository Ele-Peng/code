/*
 * @lc app=leetcode.cn id=74 lang=javascript
 *
 * [74] 搜索二维矩阵
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    for (let i = 0; i < matrix.length; i ++) {
        if (halfSearch(matrix[i], target) !== -1) {
            return true;
        }
    }
    return false;
};


/**
 * 二分查找模板
 * @param {*} arr 
 * @param {*} target 
 * return 找到 返回索引，没找到 返回 -1；
 */
var halfSearch = function(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = (left + right) >> 1; // 哨兵
        if (arr[mid] > target) { // 大于目标值，右边界向左收缩
            right = mid - 1;
        } else if (arr[mid] < target) { // 小于目标值，左边界向右收缩
            left = mid + 1;
        } else { // 找到
            return mid;
        }
    }
    return -1;
};
// @lc code=end

