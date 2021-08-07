// #include <iostream>
// #include <cmath>
// #include <algorithm>
// using namespace std;

// bool isPrime(int number) {
//     for (int i = 2; i * i <= number; i ++) {
//         if (number % i == 0) return false;
//     }
//     return true;
// }

// int main() {
//     // 先给出一个奇数n，要求输出3个质数，这3个质数之和等于输入的奇数。
//     // 等于奇数
//     // 1. 两个偶数 + 奇数
//     // 2. 三个奇数
//     int n;
//     cin >> n;
//     // 1. 两个偶数 + 奇数
//     if (isPrime(n - 4)) {
//         cout << "2 2 " << n - 4;
//         return 0;
//     }
//     // 2. 三个奇数
//     for (int i = 3; i <= n; i ++) {
//         if (i % 2 != 0 && isPrime(i)) { // 第 1 个奇数
//             for (int j = i; j < n; j ++) {
//                 if (j % 2 != 0 && isPrime(j) && isPrime(n - i - j)) { // 第 2 个奇数 + （n - i - j） 第二个奇数
//                     cout << i << " " << j << " " << n - i - j;
//                     return 0;
//                 }
//             }
//         }
//     }
//     return 0;
// }


#include <iostream>
using namespace std;

int z(int f, int g, int h) {
    int d = 0;
    for (int i = 2; i < f; i ++) {
        if (f % i == 0) {
            d = 1;
            break;
        }
    }
    for (int i = 2; i < g; i ++) {
        if (g % i == 0) {
            d = 1;
            break;
        }
    }
    for (int i = 2; i < h; i ++) {
        if (h % i == 0) {
            d = 1;
            break;
        }
    }
    return d;
}

int main() {
    int n;
    cin >> n;
    int a = 2; // 最小的质数为2
    for (int i = 0; i < n; i ++) {
        for (int j = 2; j < n; j ++) { // 不必从0，最小的质数为 2
            // 根据题意，两种 三个数全为奇数的质数和
            // 1. 3个数都为奇数
            // 2. 2 作为质数中唯一的偶数，必然要出现2次，因为两个偶数想加为偶数，再加一个奇数，最终也是奇数
            // 2， 2， n - 2 - 2
            if ((a % 2 != 0 && j % 2 != 0 && n - a -j != 0) || (a == 2 && j == 2 && (n - a - j) % 2 != 0)) {
                if (z(a, j, n - a - j) == 0) {
                    cout << a << " " << j << " " << n - a - j;
                    return 0;
                }
            }
        }
        a ++;
    }
    return 0;
}
