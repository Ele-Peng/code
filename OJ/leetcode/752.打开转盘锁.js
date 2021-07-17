/*
 * @lc app=leetcode.cn id=752 lang=javascript
 *
 * [752] 打开转盘锁
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
  let queue = [];
  queue.push("0000");
  let visited = new Set;
  visited.add("0000");
  let dead = new Set;
  deadends.forEach(item => {
    dead.add(item);
  })
  let ans = 0;
  while(queue.length) {
    let size = queue.length;
    for (let i = 0;i < size; i ++) {
      let cur = queue.shift();
      if (dead.has(cur)) continue;
      if (cur === target) return ans;
      for (j = 0;j < 4; j ++) {
        let up = plusOne(cur, j);
        if (!visited.has(up)) {
            visited.add(up);
            queue.push(up);
        }
        let down = minusOne(cur, j);
        if (!visited.has(down)) {
            visited.add(down);
            queue.push(down);
        }
      }
    }
    ans ++;
  }
  return -1;
};
function plusOne (str, j) {
    let arr = str.split("");
    if (arr[j] == '9') arr[j] = 0;
    else arr[j] = Number(arr[j]) + 1;
    return arr.join("");
}

function minusOne(str, j) {
    let arr = str.split("");
    if (arr[j] == '0') arr[j] = 9;
    else arr[j] = Number(arr[j]) - 1;
    return arr.join("");
}
// @lc code=end

