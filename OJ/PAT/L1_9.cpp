#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int yueshu(int a,int b) {
	int s = 1;
	int k = sqrt(a);
	for (int i = 1;i < k;i++) {
		if (a % i == 0 && b % i == 0) {
			s = s * i;
			a = a / i;
			b = b / i;
			i = 1;
		}
	}
	return s;
}

int main() {
	int n;
	cin >> n;
	long long fengzi[101];
	long long fengmu[101];
	for (int i = 0;i < n;i++) {
		cin >> fengzi[i];
		scanf("/");
		cin >> fengmu[i];
		if (fengzi[i] != 0) {
			i--;
		}
	}
	long long fm = 1;
	long long fz = 0;
	int temp[101];
 	for (int i = 0;i < n;i++) {
 		fm = fengmu[i] * fm;
 	}
 	for (int i = 0;i < n;i++) {
 		temp[i] = fm / fengmu[i];
 	}
 	for (int i = 0;i < n;i++) {
 		fz = fengzi[i] * temp[i] + fz;
 	}
 	int k;
 	if (fz > fm) {
 		k = yueshu(fm,fz);
 	} else {
 		k = yueshu(fz,fm);
 	}
 	fz = fz / k;
 	fm = fm / k;
 	int zs = 0;
 	if (fz > fm) {
 		zs = fz / fm;
 		fz = fz % fm;
 		cout << zs; 
 	} 
 	if (fz != 0 && fm != 0 && zs != 0) {
 		cout << " " << fz << "/" <<fm; 	
 	} else if (fz != 0 && fm != 0 && zs == 0) {
 		cout << fz << "/" <<fm; 	
 	}
	return 0;
}
