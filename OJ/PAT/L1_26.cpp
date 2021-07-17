#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	char a[12] = "I Love GPLT";
	bool flag = false;
	for (int i = 0;a[i] != '\0';i++) {
		if (!flag) {
			flag = true;
		} else {
			cout << endl; 
		}
		cout << a[i]; 
	}
	return 0;
} 
