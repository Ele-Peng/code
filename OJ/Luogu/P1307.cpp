#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    int flag = 0;
    int res = 0;
    while (n) {
        res = res * 10 + n % 10;
        n /= 10;
    }
    cout << res;
    return 0;
}