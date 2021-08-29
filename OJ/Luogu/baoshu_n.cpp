#include <iostream>
using namespace std;

int main() {
    int n, k;
    cin >> n >> k;
    // 0 代表在场上, 1 代表出局
    int a[101] = {0};
    for (int i = 1; i <= n; i ++) {
        a[i] = 1;
    }
    int m = n;
    int sum = 0;
    if (k == 1) {
        cout << n;
    } else {
        while (n > 1) {
            for (int i = 1; i <= m; i ++) {
                sum += a[i];
                if (sum == k) {
                    a[i] = 0;
                    n --;
                    sum = 0;
                    if (n == 1) break;
                }
            }
        }
        for (int i = 1; i <= m; i ++) {
            if (a[i] == 1) cout << i;
        }
    }
    return 0;
}