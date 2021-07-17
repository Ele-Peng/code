/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
    let map = {
        five: 0,
        ten: 0
    }
    for (let i = 0; i < bills.length; i ++) {
        if (bills[i] === 5) {
            map.five ++;
        } else if (bills[i] === 10) {
            if (!map.five) return false;
            map.ten ++;
            map.five --;
        } else if (bills[i] === 20) {
            if (map.five > 0 && map.ten > 0) {
                map.ten --;
                map.five --;
            } else if (map.five >= 3) {
                map.five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
};
// @lc code=end

