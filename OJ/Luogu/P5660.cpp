#include <iostream>
#include <cmath>
#include <algorithm>
#include <bits/stdc++.h>//万头，CSP可用（虽然可能会拖累空间&时间）但是还是建议使用，在这里可以更胜一筹，别人在写头文件的时候你已经开始写代码了
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