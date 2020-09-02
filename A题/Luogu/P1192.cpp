#include<iostream>
#include<cstdio>

using namespace std;
int a[100000], sum[100000], n, k, mod = 100003;
int main() {
  a[0] = 1;
  sum[0] = 1;
  cin >> n >> k;
  for (int i = 1; i <= k; i ++) {
    a[i] = sum[i - 1];
    sum[i] = (sum[i - 1] + a[i]) % mod;
  }
  for (int i = k + 1; i <= n; i ++) {
    a[i] = (sum[i - 1] - sum[i - 1 - k] + mod) % mod;
    sum[i] = (sum[i - 1] + a[i]) % mod;
  }
  cout << a[n];
  return 0;
}
