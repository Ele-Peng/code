#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	char a[11];
	cin.getline(a,12);
	int b[10] = {0}; 
	for (int i = 0;a[i] != '\0';i++) {
		b[a[i] - '0']++;
	}
	cout << "int[] arr = new int[]{";
	bool flag = false;
	int count = 0;
	int c[10] = {-1};
	for (int i = 9;i >= 0;i--) {
		if (b[i] > 0) {
			if (!flag) {
				flag = true;
			} else {
				cout << ",";
			}
			c[count] = i;
			count++;
			cout << i;
		}
	}
	cout << "};" << endl;
	cout << "int[] index = new int[]{";
	flag = false;
	for (int i = 0;i < 11;i++) {
		for (int j = 0;j < count;j++) {
			if ((c[j] + '0') == a[i]) {
				if (!flag) {
					flag = true;
				} else {
					cout << ",";
				}
				cout << j;
			}
		}
	}
	cout << "};";
	return 0;
} 
