#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	char a[52];
	cin.getline(a,53);
	double weishu = 0.0;
	double count = 0.0;
	double len = 0.0;
	if (a[0] == '-') {
		weishu = 1.5;
		for (int i = 1;a[i] != '\0';i++) {
			if (a[i] == '2') {
				count++;
			}
			len++;
		}
	} else {
		for (int i = 0;a[i] != '\0';i++) {
			if (a[i] == '2') {
				count++;
			}
			len++;
		}
	}
	double er;
	if (weishu != 0.0) {
		if ((a[(int)len] - '0') % 2 == 0) {
			er = count / len * 2.0 * weishu * 100;
		} else {
			er = count / len * weishu * 100;
		}
	} else {
		er = count / len * 100;
	}
	printf("%.2lf",er);
	cout << "%";
	return 0;
}
