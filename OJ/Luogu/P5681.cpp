#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    unsigned long long a, b, c;
    cin >> a >> b >> c;
    if (a * a >= b * c) {
        cout << "Alice" << endl;
    } else {
        cout << "Bob" << endl;
    }
    return 0;
}