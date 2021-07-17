#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	char a[10];
	cin >> a;
	int nian;
	int yue;
	int ri;
	int count = 0;
	for (int i = 0;a[i] != '\0';i++) {
		if (a[i] == '-' && count == 0) {
			yue = (a[i - 2] - '0') * 10 + a[i - 1] - '0';
			count++;
		} else if (a[i] == '-' && count != 0) {
			ri = (a[i - 2] - '0') * 10 + a[i - 1] - '0';
		} 
		if (i == 9) {
			nian = (a[i - 3] - '0') * 1000 + (a[i - 2] - '0')*100 + (a[i - 1] - '0')*10 + a[i] - '0';
		}
	}
	printf("%04d",nian);
	cout << "-";
	printf("%02d",yue);
	cout << "-";
	printf("%02d",ri); 
	return 0;
} 
