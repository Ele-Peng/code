#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;

int main() {
    int num;
    cin >> num;
    int _num = num;
    int n = 0;
    while(n > 0) {
        _num = n * 10 + _num;
        n = num % 10;
    }
    if (num < 2) {
      cout << "no" << endl;
      return 0;
    };
    for (int i = 2; i < sqrt(num); i ++) {
      if (num % i == 0) {
        cout << "no" << endl;
        return 0;
      }
    }
    cout << "yes" << endl;
    return 0;
}