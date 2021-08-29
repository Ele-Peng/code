#include <iostream>
#include <cmath>

using namespace std;

// int main() {
//     int n, h, k;
//     cin >> n >> h >> k;
//     int a[n][n];
//     int count = 1;
//     for (int i = 0; i < n / 2 + 1; ++ i) {
//         for (int j = i; j < n - i; ++ j) {
//             a[i][j] = count ++;
//         }
//         for (int j = i + 1; j < n - i; ++ j) {
//             a[j][n - i - 1] = count ++;
//         }
//         for (int j = n - i - 2; j > i; -- j) {
//             a[n - i - 1][j] = count ++;
//         }
//         for (int j = n - i - 1; j > i; -- j) {
//             a[j][i] = count ++;
//         }
//     }
//     cout << a[h - 1][k - 1];
//     return 0;
// }

// 数学方法
// long long n, i, j, k;

// int main() {
//     cin >> n >> i >> j;
//     k = min(min(i, j), min(n - i + 1, n - j + 1)); // 求层数
//     if (i <= j) {
//         cout << 4 * (k - 1) * (n - k + 1) + i + j + 1 - 2 * k;
//     } else {
//         cout << 4 * k * (n - k) - i - j + 1 + 2 * k;
//     }
//     return 0;
// }

// 递归

int find(int n, int i, int j) {
    if (i == 1)
        return j;
    if (i == n)
        return (n - 1) * 3 - j + 2;
    if (j == 1)
        return (n - 1) * 4 - i + 2;
    if (j == n)
        return n + i - 1;
    return find(n - 2, i - 1, j - 1) + (n - 1) * 4;
}

int main() {
    int n, i, j;
    cin >> n >> i >> j;
    cout << find(n, i, j) << endl;
    return 0;
}