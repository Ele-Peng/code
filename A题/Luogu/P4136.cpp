#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;
int main() {
  while(true) {
    int temp;
    cin >> temp;
    if (!temp) break;
    if (temp % 2 == 0) {
      cout << "Alice" << endl;
    } else {
      cout << "Bob" << endl;
    }
  }
  return 0;
}