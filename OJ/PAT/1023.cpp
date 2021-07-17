#include <iostream>

using namespace std;

int main() {
    int num[10] = {0};
    for (int i = 0; i < 10; i++) {
        int c;
        cin >> c;
        num[i] = c;
    } 
    for (int i = 1; i < 10; i++) {
        if (num[i] != 0) {
            cout << i;
            num[i]--;
            break;
        }
    }
    for (int i = 0; i < 10; i++) {
        while (num[i] != 0) {
            cout << i;
            num[i]--;
        }
    }
    return 0;
}
