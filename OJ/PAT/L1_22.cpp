#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int n ;
	cin >> n;
	int even = 0;
	int odd = 0;
	int temp;
	for (int i = 0;i < n;i++) {
		cin >> temp;
		if (temp % 2 == 0) {
			even++;
		} else {
			odd++;
		}
	}
	cout << odd << " " << even;
	return 0;
} 
