#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

long long a, b, c;

int main() {
    cin >> a >> b >> c;
    if (a * a > b * c) {
        cout << "Alice" << endl;
    } else {
        cout << "Bob" << endl;
    }
    return 0;
}