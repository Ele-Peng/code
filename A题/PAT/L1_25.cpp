#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	char a[4];
	char b[4];
	cin >> a; 
	scanf (" ");
	cin >> b;
	int lena = 0;
	int suma;
	if (a[0] == ' '){
		cout << "?";
	} else {
		for (int i = 0;a[i] != '\0';i++) {
			if ((a[i] - '0') < 0 || (a[i] - '0') > 9) {
				cout << "?";
				lena = 0;
				break;
			} else {
				lena++;
			}
		}
		suma = 0;
		for (int i = 0;i < lena;i++) {
			suma = pow(10,lena - i - 1) * (a[i] - '0') + suma;
		}
		if (lena != 0) {
			cout << suma;	
		}
	}
	
	
	cout << " + ";
	
	
	int lenb = 0;
	for (int i = 0;b[i] != '\0';i++) {
		if ((b[i] - '0') < 0 || (b[i] - '0') > 9) {
			cout << "?";
			lenb = 0;
			break;
		} else {
			lenb++;
		}
	}
	int sumb = 0;
	for (int i = 0;i < lenb;i++) {
		sumb = pow(10,lenb - i - 1) * (b[i] - '0') + sumb;
	}
	if (lenb != 0) {
		cout << sumb;	
	}
	
	cout << " = ";
	if (lena == 0 || lenb == 0) {
		cout << "?";
	} else {
		cout << suma + sumb;
	}
	return 0;
} 
