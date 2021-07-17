#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int a[100000] = {0};
	int n;
	cin >> n;
	int youquanNum;
	for (int i = 0;i < n;i++) {
		cin >> youquanNum;
		int temp;
		cin >> temp;
		int temp2 = temp;
		for (int j = 1; j < youquanNum;j++) {
			temp2 = temp;
			cin >> temp;
			if (temp2 != temp) {
				a[temp2]++;
			}
		}
		if (temp2 != temp) {
			a[temp]++;
		}
	}
	int chan;
	cin >> chan;
	int b[100001] = {0};
	int count = 0;
	int is_show[100000] = {0};
	for (int i = 0;i < chan;i++) {
		int tempcha;
		cin >> tempcha;
		if (a[tempcha] == 0 && is_show[tempcha] == 0) {
			is_show[tempcha]++;
			b[count] = tempcha;
			count++;
		}
	}
	bool flag = false;
	for (int i = 0;i < count;i++) {
		if (!flag) {
			flag = true;
		} else {
			cout << " ";
		}
		printf("%05d", b[i]);
	}
	if (count == 0) {
		cout << "No one is handsome";
	}
	return 0;
}
