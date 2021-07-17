/**
 * 
 * @param {*} n 第N级台阶
 * @param {*} k 每次最多迈K级台阶
 * sum --> sum[n] === 数组 a 的 n 项总和
 * a[i] --> sum[i - 1] - sum[i - 1 - k] 从k级台阶跨上来的可能
 */
function step(n, k) {
  let a = [1]; // 从前 i - k - 1 到 i - 1的方法
  let sum = [1];
  let mod = 10003;
  for (let i = 1; i <= k; i ++) {
    a.push(sum[i - 1]);
    sum.push((sum[i - 1] + a[i]) % mod)
  }
  for (let i = k+1; i <= n; i ++) {
    a.push((sum[i - 1] - sum[i - 1 - k] + mod) % mod)
    sum.push((sum[i - 1] + a[i]) % mod);
  }
  return a[n];
}