#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;
    char sign = n > 0 ? 1 : -1;
    int flag = 0; // 位数不为0的个数 
    int res = 0;
    while (n != 0) {
        if (!(flag == 0 && abs(n) % 10 == 0)) { // !（始终都没有出现非0的有效数字，且该位位数取出来仍为0）
            res = res * 10 + (abs(n) % 10);
        }
        if (abs(n) % 10) flag ++; // 若为有效数字更改特征值
        n /= 10;
    }
    cout << sign * res;
    return 0;
}