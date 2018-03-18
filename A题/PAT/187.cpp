#include <iostream>
#include <cstring>
#include <cstdio>
using namespace std;

int main() {
	int n;
	cin >> n;
	char logo;
	cin >> logo;
	getchar();
	char str[105];
	gets(str);
	int len = strlen(str);
	if (len >= n) {
		for (int i = len - n;i < len;i++) {
			cout << str[i];
		}
	} else {
		for (int i = 0;i < n - len;i++) {
			cout << logo;
		}
		cout << str;
	}
	return 0;
} 
