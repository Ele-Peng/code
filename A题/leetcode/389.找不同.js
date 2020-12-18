/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function(s, t) {
    let map_s = new Map;
    for (let i = 0; i < s.length; i ++) {
        map_s.has(s[i]) ? map_s.set(s[i], map_s.get(s[i]) + 1) : map_s.set(s[i], 1);
    }
    let map_t = new Map;
    for (let i = 0; i < t.length; i ++) {
        map_t.has(t[i]) ? map_t.set(t[i], map_t.get(t[i]) + 1) : map_t.set(t[i], 1);
    }
    if (s.length > t.length) {
        for (let item of map_s.keys()) {
            if (map_t.get(item) !== map_s.get(item))
                return item
        }
    } else {
        for (let item of map_t.keys()) {
            if (map_t.get(item) !== map_s.get(item))
                return item
        }
    }
};
// @lc code=end

