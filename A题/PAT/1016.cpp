#include <iostream>
using namespace std;

int main () {
	char a[11],a2,b[11],b2;
	cin >> a >> a2 >> b >> b2;
	int temp1 = 0;
	for (int i = 0;a[i] != '\0';i++) {
		if (a[i] == a2) {
			temp1++;
		}
	}
	int sum1 = 0;
	for (int i = 0;i < temp1;i++) {
		sum1 = sum1 * 10;
		sum1 = sum1 + (a2-'0');
	}
	int temp2 = 0;
	for (int i = 0;b[i] != '\0';i++) {
		if (b[i] == b2) {
			temp2++;
		}
	}
	int sum2 = 0;
	for (int i = 0;i < temp2;i++) {
		sum2 = sum2 * 10;
		sum2 = sum2 + (b2-'0');
	}
	cout << sum1 + sum2;
	return 0;
}
