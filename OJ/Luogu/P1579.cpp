#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

bool isPrime(int number) {
    for (int i = 2; i * i <= number; i ++) {
        if (number % i == 0) return false;
    }
    return true;
}

int main() {
    // 先给出一个奇数n，要求输出3个质数，这3个质数之和等于输入的奇数。
    // 等于奇数
    // 1. 两个偶数 + 奇数
    // 2. 三个奇数
    int n;
    cin >> n;
    // 1. 两个偶数 + 奇数
    if (isPrime(n - 4)) {
        cout << "2 2 " << n - 4;
        return 0;
    }
    // 2. 三个奇数
    for (int i = 3; i <= n; i ++) {
        if (i % 2 != 0 && isPrime(i)) { // 第 1 个奇数
            for (int j = i; j < n; j ++) {
                if (j % 2 != 0 && isPrime(j) && isPrime(n - i - j)) { // 第 2 个奇数 + （n - i - j） 第二个奇数
                    cout << i << " " << j << " " << n - i - j;
                    return 0;
                }
            }
        }
    }
    return 0;
}