#include <iostream>
using namespace std;

int main () {
    int n, x, y;
    cin >> n >> x >> y;
    int res = y / x;
    if (y % x == 0 && res < n) {
        cout << n - res;
    } else if (y % x != 0 && res < n) {
        cout << n - res - 1;
    } else {
        cout << 0;
    }
    return 0;
}