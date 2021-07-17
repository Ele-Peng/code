#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;

bool findDivisor(int a, int b) {
  int _min = min(a, b);
  int i = 2;
  for (; i <= _min; i ++) {
    if (a % i == 0 && b % i == 0) {
      return true;
    }
  }
  if (i > _min) {
    return false;
  }
}


int main() {
  int n;
  cin >> n;
  while(n--) {
    int a, b;
    cin >> a >> b;
    if (findDivisor(a, b)) {
      cout << "Ollie wins" << endl;
    } else {
      cout << "Stan wins" << endl;
    }
  }
  return 0;
}