#include <iostream>
using namespace std;

int main() {
    long long ar[20] = {0, 1, 1};
    for (int i = 3; i <= 20; i ++) {
        ar[i] = ar[i - 1] + ar[i - 2];
    }
    int n, tmp;
    cin >> n;
    for (int i = 0; i < n; i ++) {
        cin >> tmp;
        cout << ar[tmp] << endl;
    }
    return 0;
}