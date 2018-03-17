#include <iostream>
#include <cmath>
#include <cstdio>
#include <algorithm>
#include <cstring>

using namespace std;

int main() {
    char str[1001];
    cin >> str;
    int num[10] = {0};
    int len = strlen(str);
    for (int i = 0; i < len; i++) {
        num[str[i] - '0'] ++;
    }
    for (int i = 0; i < 10; i++) {
        if (num[i] != 0) {
            printf("%d:%d\n", i, num[i]);
        }
    }
    return 0;
}
