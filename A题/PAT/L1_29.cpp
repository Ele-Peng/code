#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	double weight;
	int height;
	cin >> height;
	weight = (height - 100 ) * 0.9 * 2.0;
	printf("%.1lf",weight); 
	return 0;
}
