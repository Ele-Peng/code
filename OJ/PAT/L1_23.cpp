#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	char a[10001];
	cin.getline(a,10002);
	int b[4] = {0};
	int count = 0;
	for (int i = 0;a[i] != '\0';i++) {
		if (a[i] == 'G' || a[i] == 'g') {
			count++;
			b[0]++;
		} else if (a[i] == 'P' || a[i] == 'p') {
			count++;
			b[1]++;
		} else if (a[i] == 'L' || a[i] == 'l') {
			count++;
			b[2]++;
		} else if (a[i] == 'T' || a[i] == 't'){
			count++;
			b[3]++;
		}
	}
	int k = 0;
	for (int i = 0;i < count;i++) {
		if (b[0] != 0) {
			b[0]--;
			k++;
			cout << "G";
		}
		if (b[1] != 0) {
			b[1]--;
			k++;
			cout << "P";
		}
		if (b[2] != 0) {
			b[2]--;
			k++;
			cout << "L";
		}
		if (b[3] != 0) {
			b[3]--;
			k++;
			cout << "T";
		}
	}
	return 0;
} 
