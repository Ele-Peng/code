#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

bool is_prime(int a) {
	if (a == 0 || a == 1 ) {
		return false; 
	}
	if (a == 2 || a == 3 ) {
		return true;
	}
	int temp = sqrt(a);
	for (int i = 2;i < temp + 1;i++) {
		if (a % i == 0) {
			return false;
		}
	}
	return true;
}

int main() {
	int n;
	cin >> n;
	int a[10] = {0};
	for (int i = 0;i < n;i++) {
		int temp;
		cin >> temp;
		if (is_prime(temp)) {
			a[i] = 1;
		} 
	}
	bool flag = false;
	for (int i = 0; i < n;i++) {
		if (!flag) {
			flag = true;
		} else {
			cout << endl; 
		}
		if (a[i] == 1) {
			cout << "Yes"; 
		} else {
			cout << "No";
		}
	}
	return 0;
} 
