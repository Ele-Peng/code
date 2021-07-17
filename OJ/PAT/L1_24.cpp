#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int now;
	cin >> now;
	if (now == 6 || now == 7) {
		cout << now + 2 - 7;
	} else {
		cout << now + 2;
	}
	return 0;
} 
