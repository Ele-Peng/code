#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int a,b;
	cin >> a >> b;
	if (b == 0) {
		cout << a << "/" << b << "=Error";
	} else if (b < 0) {
		cout << a << "/(" << b << ")=";
		printf("%.2lf",(double)a/b);
	} else {
		cout << a << "/" << b  <<"=";
		printf("%.2lf",(double)a/b);
	}
	return 0;
} 
