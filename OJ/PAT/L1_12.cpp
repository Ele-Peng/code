#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int n;
	cin >> n;
	int sum = 1;
	for (int i = 0;i < n;i++) {
		sum = sum * 2;
	}
	cout << "2^" << n << " = " << sum;
	return 0;
}
