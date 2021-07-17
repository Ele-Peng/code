#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;
int main() {
  int n;
  cin >> n;
  while(n--) {
    int temp;
    cin >> temp;
    if (temp % 2 == 0) {
      cout << "pb wins" << endl;
    } else {
      cout << "zs wins" << endl;
    }
  }
  return 0;
}