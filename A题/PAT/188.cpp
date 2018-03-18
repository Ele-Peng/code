#include <iostream>
#include <cstdio>
using namespace std;

int main() {
	int n;
	cin >> n;
	string s;
	getchar();
	getline(cin,s);
	int col = (s.length() - 1) / n+1;
	char map[n][col];
	for (int i = 0;i < n;i++) {
		for (int j = 0;j < col;j++) {
			map[i][j] = ' ';
		}
	}
	int order = 0;
	for (int j = col - 1;j >= 0;j--) {
		for (int i = 0;i < n;i++) {
			if (order < s.length()) {
				map[i][j] = s[order++];
			}
		}
	}
	for (int i = 0;i < n;i++) {
		for (int j = 0;j < col;j++) {
			cout << map[i][j];
		}
		cout << endl;
	}
	return 0;
}
