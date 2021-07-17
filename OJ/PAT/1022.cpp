#include <iostream>
#include <cstring>

using namespace std;

void getN(long long n, int jz) {
    if (n == 0) {
        cout << '0';
        return;
    }
    char str[1001];
    int i = 0;
    while (n != 0) {
        str[i++] = n % jz + '0';
        n /= jz;
    }
    str[i] = '\0';
    int length = strlen(str);
    for (int i = length - 1; i >= 0; i--) {
        cout << str[i];
    }
    cout << endl;
}

int main() {
    long long a, b;
    int jz;
    cin >> a >> b >> jz;
    long long n = a + b;
    getN(n, jz);
    return 0;
} 
