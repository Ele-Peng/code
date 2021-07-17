#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
	int n;
	cin >> n;
	scanf(" ");
	char c;
	cin >> c;
	getchar();
	char a[10001]; 
	cin.getline(a,10002);
	getchar();
	int len = 0;
	if (n == 0) {
		cout << endl;
		return 0;
	}
	for (int i = 0;a[i] != '\0';i++) {
		len++;
	}
	if (len == 0) {
		return 0;
	}
	if (n >= len) {
		for (int i = 0;i < n-len;i++) {
			cout << c; 
		}
		cout << a;
	} else {
		for (int i = len - n;i < len;i++) {
				cout << a[i]; 
		}
	}
	return 0;
}
