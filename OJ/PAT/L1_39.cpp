#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int n;
	cin >> n;
	getchar();
	char a[1000];
	cin.getline(a,1001);
	int len = strlen(a);
	int col;
	if (len % n == 0) {
		col = len / n;
	} else {
		col = len / n + 1;
	}
	char c[n][col];
	for (int i = 0;i < n;i++) {
		for (int j = 0;j < col;j++) {
			c[i][j] = ' ';
		}
	}
	int k = 0;
	for (int i = col - 1;i >= 0;i--) {
		for (int j = 0;j < n;j++) {
			if (a[k] != '\0') {
				c[j][i] = a[k];
				k++;	
			}
		}
	}
	for (int i = 0;i < n;i++) {
		for (int j = 0;j < col;j++) {
			cout << c[i][j];
		}
		cout << endl;
	}
	return 0;
} 
