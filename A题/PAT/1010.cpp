#include <iostream>
using namespace std;

int main() {
	int a;
	int b;
	bool flag = false;
	while (true) {
		cin >> a >> b;
		if (b == 0) {
			break;
		} else {
			if (!flag) {
				flag = true;
			}else {
				cout << " ";
			}
			cout << a * b;
			cout << " ";
			cout << b - 1;
		}
	}
	return 0;
}
