/*
 * @lc app=leetcode.cn id=767 lang=javascript
 *
 * [767] 重构字符串
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function(S) {
    let map = new Map;
    let str = [];
    let odd = -1; // 奇数位
    let even = -2; // 偶数位
    let m = S.length >> 1;
    let n = (S.length + 1) >> 1;
    for (let s of S) {
        map.set(s, map.has(s) ? map.get(s) + 1 : 1);
    }
    map.forEach((value, key, _, i = value) => {
        if (value > n) {
            str = [];
            map.clear();
        } else {
            while (i --) {
                str[value <= m && odd < S.length - 2 ? odd += 2 : even += 2] = key;
            }
        }
    })
    return str.join("");
};
// @lc code=end

