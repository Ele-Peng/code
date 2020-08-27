// 循环 Time: O(n) Space: O(n)
function fibonacci(n) {
  if (n <= 1) {
    return Math.max(n, 0);
  }
  let res = [0, 1]
  for (let i = 2; i < n; i ++) {
    res.push(res[i - 1] + res[i - 2])
  }
  return res[n - 1];
}


// 递归 Time: O(2^n) Space: O(1)
function fibonacci(n) {
  if (n <= 1) {
    return Math.max(n, 0);
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}


// 递归优化，跳过计算过的中间变量 Time: O(n) Space: O(n)
{
  let res = [0]
  function fibonacci(n) {
    if (n <= 1) {
      return res[n] = Math.max(n, 0);
    }
    if (res[n]) {
      return res[n];
    }
    res[n] = fibonacci(n - 1) + fibonacci(n - 2);
    return res[n]
  }
  // 求数组第十项的值
  fibonacci(9)
}


// 矩阵乘法
function fibonacci(n) {
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}


fibonacci(10)
