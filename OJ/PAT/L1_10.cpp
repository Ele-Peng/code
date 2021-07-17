#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int n = 3;
	int a[3];
	for (int i = 0;i < 3;i++) {
		cin >> a[i];
	}
	sort(a,a+3);
	bool flag = false;
	for (int i = 0;i < 3;i++) {
		if (!flag) {
			flag = true;
		} else {
			cout << "->";
		}
		cout << a[i];
	}
	return 0;
}
