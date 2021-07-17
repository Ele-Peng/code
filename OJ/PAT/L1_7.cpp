#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	char c;
	int count = 0;
	bool flag = false;
	while (cin >> c) {
		if (!flag) {
			flag = true;
		} else {
			cout << " ";	
		}
		if (count == 0 && c == '-') {
			cout << "fu";
		} 
		if ( c - '0' == 0) {
			cout << "ling";
		} else if (c - '0' == 1) {
			cout << "yi";
		} else if (c - '0' == 2) {
			cout << "er";
		} else if (c - '0' == 3) {
			cout << "san";
		} else if (c - '0' == 4) {
			cout << "si";
		} else if (c - '0' == 5) {
			cout << "wu";
		} else if (c - '0' == 6) {
			cout << "liu";
		} else if (c - '0' == 7) {
			cout << "qi";
		} else if (c - '0' == 8) {
			cout << "ba";
		} else if (c - '0' == 9) {
			cout << "jiu";
		} 
	}
	return 0;
}
