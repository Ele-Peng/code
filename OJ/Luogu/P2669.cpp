#include <iostream>
#include <cmath>
using namespace std;

/**
int main() {
    // daily 每天收到的金币数量
    // sum 当前金币数量总和
    // 连续第几天，收到 daily 枚金币
    int daily = 1, sum = 0, k, delta = 1;
    cin >> k;
    for (int i = 1; i <= k; i ++) {
        if (delta == daily) {
            sum += daily;
            daily ++;
            delta = 1;
        } else {
            sum += daily;
            delta ++;
        }
    }
    cout << sum;
    return 0;
}
*/

// O(1)
// 首先我们算出骑士一共领了几个整天的金币——
// 比如骑士要领九天：一天一个，两天两个，三天三个，三天四个，那么整天就是三（没领四天四个）。
// 易得方程：设整天为n天，总天数为m
// n*(n+1)/2=m
// n的全部解为 (-1 (+ or -) sqrt(8*m + 1)) / 2
// 解出n的非负解为:(sqrt(8m+1)-1)/2
// 算出整天领的金币数为：1*1+2*2+...+n*n=n*(n+1)*(2n+1)/6
// 剩下的天数共领金币：(m-n(n+1)/2)*(n+1)
// 把它们相加。

int main() {
    int n, k, ans;
    cin >> k;
    n = (sqrt(8 * k + 1) - 1) / 2;
    ans = n * (n + 1) * (2 * n + 1) / 6;
    k -= (1 + n) * n / 2;
    ans += k * (n + 1);
    cout << ans;
    return 0;
}
