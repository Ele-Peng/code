/*
 * @lc app=leetcode.cn id=567 lang=javascript
 *
 * [567] 字符串的排列
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    let need = new Map;
    let window = new Map;

    for (let i = 0; i < s1.length; i ++) {
        let c = s1[i];
        need.has(c) ? need.set(c, need.get(c) + 1) : need.set(c, 1);
    }

    let left = 0, right = 0;
    let valid = 0;

    while (right < s2.length) {
        let c = s2[right];
        right ++;
        if (need.has(c)) {
            window.has(c) ? window.set(c, window.get(c) + 1) : window.set(c, 1);
            if (window.get(c) === need.get(c)) valid ++;
        }

        while (right - left >= s1.length) {
            if (valid === need.size) return true;
            let d = s2[left];
            left ++;
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) valid --;
                window.set(d, window.get(d) - 1);
            }
        }
    }
    return false;
};
// @lc code=end

