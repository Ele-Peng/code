#include<iostream>
#include<cstring>
#include<cstdio>
#include<math.h>
#include<vector>
#include<string>
#include<sstream>
#include<algorithm>

using namespace std;

int main() {
	int n;
	cin >> n;
	int step;
	cin >> step;
	int a[n];
	for (int i = 0;i < n;i++) {
		cin >> a[i];
	}
	bool flag = false;
	for (int j = 0;j < n;j++) {
		if (!flag) {
			flag = true;
		} else {
			cout << " ";
		}
		cout << a[(j + step) % n];
	}
	return 0;
}
