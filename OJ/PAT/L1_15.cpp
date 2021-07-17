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
	int col = 0;
	if (n % 2 == 1) {
		col = n / 2 + 1;
	} else {
		col = n / 2;
	}
	char c;
	cin >> c;
	for (int i = 0;i < col;i++) {
		for (int j = 0;j < n;j++) {
			cout << c;
		} 
		cout << endl;
	} 
	return 0;
}
