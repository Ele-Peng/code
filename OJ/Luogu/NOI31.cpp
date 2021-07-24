#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int ar[50001]; // the limit of array, should be bigger than limit
    for (int i = 1; i <= m; i ++) { // member
        for (int j = i; j <= n; j += i) { // light number
            ar[j] = ar[j] == 0 ? 1 : 0;
        }
    }
    bool flag = false;
    for (int i = 1; i <= n; i ++) {
        if (ar[i] != 0) {
            if (flag) {
                cout << ",";
            } else {
                flag = true;
            }
            cout << i;
        }
    }
    return 0;
}