#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;
int n, k, a[100000], sum[100000], res[100000];
int main() {
  cin >> n >> k;
  int test = n;
  for (int i = 0; i < n; i ++) {
    cin >> a[i];
  }
  sum[0] = a[0];
  int max = a[0];
  for (int i = 1; i <= k; i ++) {
    res[i - 1] = sum[i - 1];
    sum[i] = sum[i - 1] + a[i];
    if (res[i - 1] > max) {
      max = res[i - 1];
    }
  }
  for (int i = k + 1;i <= n; i ++) {
    res[i - 1] = sum[i - 1] - sum[i - 1 - k];
    sum[i] = sum[i - 1] + a[i];
    if (res[i - 1] > max) {
      max = res[i - 1];
    }
  }
  cout << max;
  return 0;
}