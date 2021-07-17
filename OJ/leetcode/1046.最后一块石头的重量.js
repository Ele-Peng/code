/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function(stones) {
    let arr = stones;
    const cmp = (a, b) => {return b - a;}
    while (arr.length > 1) {
        let tempStones = arr.sort(cmp);
        let first = tempStones[0];
        let second = tempStones[1];
        if (first - second === 0) {
            arr = arr.splice(2, arr.length - 2);
        } else {
            arr = [first - second].concat(arr.splice(2, arr.length - 2));
        }
    }
    return !arr.length ? 0 : arr[0];
};
// @lc code=end

