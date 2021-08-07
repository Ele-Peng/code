#include<bits/stdc++.h>

using namespace std;

int main() {
    double height;
    cin >> height;
    double sum = height;
    double debouce_height = height;
    for (int i = 2; i <= 10; i ++) {
        debouce_height /= 2;
        sum += debouce_height * 2;
    }
    cout << sum << endl << debouce_height / 2 << endl;
    return 0;
}