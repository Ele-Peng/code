#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int F;
	cin >> F;
	int C = 5 * (F - 32) / 9;
	cout << "Celsius = " << C;
	return 0;
}
