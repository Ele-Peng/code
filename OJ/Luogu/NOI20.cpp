#include<iostream>
using namespace std;

int main() {
    double original_height;
    cin >> original_height;
    double sum = original_height;
    double down_height = original_height;
    for (int i = 1; i <= 10; i ++) {
        down_height /= 2;
        if (i == 10) cout << sum << endl; // No.10 fall down to the ground
        sum = sum + down_height * 2;
        if (i == 10) cout << down_height; // No.10 debounce
    }
    return 0;
}