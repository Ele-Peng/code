/*
 * @lc app=leetcode.cn id=468 lang=javascript
 *
 * [468] 验证IP地址
 */

// @lc code=start
/**
 * @param {string} IP
 * @return {string}
 */
var validIPAddress = function(IP) {
  let arr4 = IP.split('.');
  let arr6 = IP.split(':');
  if (arr4.length === 4) {
    if (arr4.every(item => isValidDecimal(item))) return 'IPv4';
  } else if (arr6.length === 8){
    if (arr6.every(item => isValidHex(item))) return 'IPv6';
  }
  return 'Neither';
};

const isValidHex = function(str) {
  let reg = new RegExp(/^([0-9a-fA-F]){1,4}$/)
  if (reg.test(str)) {
    return true;
  }
  return false;
}

const isValidDecimal = function(str) {
  let reg = new RegExp(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/)
  console.log(reg.test(str));
  if (reg.test(str)) {
    return true;
  }
  return false;
}
// @lc code=end

