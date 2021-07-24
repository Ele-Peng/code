#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    double height;
    cin >> height;
    double sum = height;
    double debouce_height = height;
    for (int i = 1; i <= 10; i ++) {
        debouce_height /= 2;
        if (i == 10) cout << sum << endl;
        sum += debouce_height * 2;
        if (i == 10) cout << debouce_height;
    }
    return 0;
}