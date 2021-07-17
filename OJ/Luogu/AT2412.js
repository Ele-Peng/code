/*

题目描述
输入格式
无

输出格式
无

题意翻译
题意
读入n个整数的数列a1，a2，…，an和正整数k（1<=k<=n），请输出连续排列的k个整数的和的最大值

输入
第一行是正整数n(1<=n<=100000)和正整数k（1<=k<=n） 第二行以后的第1+i（1<=i<=n）至最后一行为数列

输出
仅一行，仅包括最大值。

样例输入
5 3 2 5 -4 10 3

样例输出
11


*/

function AT2412(n, k, ...args) {
    let sum = [args[0]];
    let a = [args[0]];
    for (let i = 1; i <= k; i ++) {
        a[i - 1] = sum[i - 1];
        sum[i] = sum[i - 1] + args[i];
    }

    for (let i = k + 1; i <= n; i ++) {
        a[i - 1] = sum[i - 1] - sum[i - 1 - k];
        sum[i] = sum[i - 1] + args[i];
    }
    const findMax = (a, b) => b - a;
    a.sort(findMax);
    console.log(a[0]);
}

AT2412(5, 3, 2, 5, -4, 10, 3)