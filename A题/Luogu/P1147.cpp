#include<iostream>
#include<cstdio>

using namespace std;
int res[2000000], sumArr[2000000], n;
int main() {
  cin >> n;
  for (int i = 0; i < n; i ++) {
    sumArr[i] = sumArr[i - 1] + i;
  }
  for (int i = 0; i < n; i ++) {
    for (int j = n; j >= 0; j --) {
      if (sumArr[j] - sumArr[i] == n) {
        cout << i + 1 << " " << j << endl;
      }
    }
  }
  cout << endl;
  return 0;
}