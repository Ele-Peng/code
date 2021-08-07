#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

// int main() {
//     int n;
//     cin >> n;
//     bool ar[50001];
//     for (int i = 1; i <= n; i ++) {
//         for (int j = 1; i * j <= n; j ++) { // i * j 加速
//             ar[i * j] = !ar[i * j];
//         }
//     }
//     bool flag = false;
//     for (int i = 1; i <= n; i ++) {
//         if (ar[i]) {
//             if (!flag) {
//                 cout << i;
//                 flag = true;
//             } else {
//                 cout << " " << i;
//             }
//         }
//     }
//     return 0;
// }

// 完全平方数
// 一般的自然数 M ，都有偶数个奇数，因为一个因数必然对应另一个因数 (即 m=x * y )，
// 因数便成对出现。但如果一个数 M ，可以分为 m=x * x 的形式，这个数便会比理论少一个因数，于是有奇数个因数。
// 而能分解为 m=x * x 形式的 自然数 M，只有完全平方数。
// 所以，我们只要输出完全平方数即可。

int main() {
    int n;
    cin >> n;
    int x = sqrt(n);
    bool flag = false;
    for (int i = 1; i <= x; i ++) {
        if (!flag) {
            cout << i;
            flag = true;
        } else {
            cout << " " << i * i;
        }
    }
    return 0;
}