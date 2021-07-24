#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    char c;
    int sum = 0;
    for (int i = 0; i < 8; i ++) {
        cin >> c;
        if (c != '0') sum ++; // 和字符比较
    }
    cout << sum;
    return 0;
}