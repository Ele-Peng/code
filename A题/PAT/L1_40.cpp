#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int n;
	cin >> n;
	double a[10];
	char sex;
	double height;
	for (int i = 0;i < n;i++) {
		cin >> sex;
		scanf(" ");
		cin >> height;
		if (sex == 'M') {
			a[i] = height / 1.09;
		} else {
			a[i] = height * 1.09;
		}
	}
	bool flag = false;
	for (int i = 0;i < n;i++) {
		if (!flag) {
			flag = true;
		} else {
			cout << endl;
		}
		printf("%.2lf",a[i]);
	}
	return 0;
} 
