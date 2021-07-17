#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int jiecheng(int a) {
	int temp = 1;
	for (int i = a;i > 0;i--) {
		temp = temp * i;
	}
	return temp;
}

int main() {
	long long a;
	long long i;
	cin >> a;
	int result = 0;
	for (i = 1;i <= a;i++){
		result = result + jiecheng(i);
	}
	cout << result;
	return 0;
}
