#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int num[10] = {0};
	char a[1001];
	cin.getline(a,10001);
	int temp;
	for (int i = 0;a[i] != '\0';i++) {
		temp = a[i] - '0';
		num[temp]++;
	}
	for (int i = 0;i < 10;i++) {
		if (num[i] != 0) {
			cout << i << ":" << num[i] << endl; 
		}
	}
	return 0;
}
