#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	char a,b,c,d;
	cin >> a >> b;
	scanf(":");
	cin >> c >> d;
	int h = (a - '0') * 10 + (b - '0');
	int m = (c - '0') * 10 + (d - '0');
	if (h < 12) {
		cout << "Only " << a << b << ":" << c << d << ".  Too early to Dang.";
	} else {
		if (h == 12 && m == 0) {
			cout << "Only " << a << b << ":" << c << d << ".  Too early to Dang.";
		}  else {
			if (m == 0) {
				for (int i = 0;i < h - 12;i++) {
					cout << "Dang";
				}
			} else {
				for (int i = 0;i < h - 12 + 1;i++) {
					cout << "Dang";
				}
			}
		}
	}
	return 0;
}
