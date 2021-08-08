#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int w[100001] = {0};
    for (int i = 0; i < n; i ++) {
        cin >> w[i];
    }
    int l[100001] = {0};
    for (int i = 0; i < m; i ++) {
        l[i] = w[i];
    }
    for (int i = m; i < n; i ++) {
        int k = 0;
        for (int j = 1; j < m; j ++) {
            if (l[j] < l[k]) k = j;
        }
        l[k] = l[k] + w[i];
    }
    int max = 0;
    for (int i = 0; i < m; i ++) {
        if (l[i] > max) max = l[i];
    }
    cout << max;
    return 0;
}