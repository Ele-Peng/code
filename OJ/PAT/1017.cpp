#include <iostream>
#include <cstring>
using namespace std;

int main() {
	string a;
	int b; 
	cin >> a;
	cin >> b;
	int len = a.length();
	int q = 0;
	int r = 0;
	q = (a[0] - '0') / b;
	if (q != 0 && len > 1 || len == 1) {
		cout << q;
	}
	r = (a[0] - '0') % b;
	for (int i = 1; i < len;i++) {
		q = (r * 10 + a[i] - '0') / b;
		cout << q;
		r = (r * 10 + a[i] - '0') % b;
	}
	cout << " " << r;
 	return 0;
} 
