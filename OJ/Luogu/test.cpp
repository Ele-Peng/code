#include<iostream>
#include<cstdio>
#include<cmath>

using namespace std;

int n, cur = 1;

bool isPrime(int x){
	for (int i = 2; i * i <= x; i ++) {
		if (x % i == 0) return false;
	}
	return true;
}

int main() {
  /**
  计算2的幂
  int n;
  cin >> n;
  int ans = 1;
  for (int i = 1; i <= n; i ++) {
    ans *= 2;
  }
  cout << ans << endl;
  return 0;
  */

  /*
  甲流疫情死亡率
  double n, m;
  cin >> n >> m;
  printf("%.3lf%%", (m * 100) / n);
  return 0;
  */

  /*
  含k个3的数
  int n;
  cin >> n;
  int k;
  cin >> k;
  int count_for_3 = 0;
  if (n % 19 == 0) {
    while (n > 0) {
      if (n % 10 == 3) {
        count_for_3 ++;
      }
      n = n / 10;
    }
  } else {
    cout << "NO";
    return 0;
  }
  if (count_for_3 == k) {
    cout << "YES";
  } else {
    cout << "NO";
  }
  return 0;
  */

/**
 * 求分数序列和
 int n;
 cin >> n;
 double sum = 0;
 double pi = 1, qi = 2;
 double pi_1 = pi, qi_1 = qi;
 for (int i = 1; i <= n; i ++) {
    sum += (qi_1 / pi_1);
    qi_1 = qi + pi;
    pi_1 = qi;
    qi = qi_1;
    pi = pi_1;
 }
 printf("%.4lf", sum);
 return 0;

 */
	cin >> n;
	while (n != 0) { 
		cur ++;
    cout << cur << endl;
		if(isPrime(cur)){
			n --; 
		}
	}
	cout << cur;
	return 0;
}