#include <iostream>
#include <cmath>
using namespace std;

int main () {
    int n;
    cin >> n;
    if (n % 2 == 1) {
        cout << "-1"; 
        return 0;
    }
    while (n > 0) {
        int i = 1;
        while (pow(2, i + 1) <= n) i ++;
        n -= pow(2, i);
        cout << (int)pow(2, i) << " ";
    }
    return 0;
}