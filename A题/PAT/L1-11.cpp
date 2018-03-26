#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	char a[10001];
	char b[10001];
	cin.getline(a,10002);
	getchar();
	cin.getline(b,10002);
	int lena = 0;
	for (int i = 0;a[i] != '\0';i++ ) {
		lena++;
	}
	int lenb = 0;
	for (int i = 0;b[i] != '\0';i++ ) {
		lenb++;
	}
	int count = 0;
	for (int i = 0;i < lenb;i++) {
		for (int j = 0;j < lena;j++) {
			if (b[i] == a[j]) {
				count++;
				for (int k = j;k < lena;k++) {
					a[k] = a[k + 1];
				}	
			}
		} 
		lena = lena - count;
		count = 0;
	}
	for (int i = 0;i < lena;i++) {
		cout << a[i];
	}
	return 0;
}
