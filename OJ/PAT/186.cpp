#include <iostream>
using namespace std;

int main() {
	int num;
	cin >> num;
	int a[100001] = {0};
	int n = 0;
	int temp = 0;
	for (int i = 0;i < num;i++) {
		cin >> n;
		for (int j = 0;j < n;j++) {
			cin >> temp;
			if (n == 1) {
				continue;
			} else {
				a[temp] = 1;
			}
		}
	}
	bool state = false;
	int member;
	cin >> member;
	int singleDog = 0;
//	bool flag = false;
	for (int i = 0;i < member;i++) {
		cin >> singleDog;
//		if (!flag) {
//			flag = true;
//		} else {
//			cout << " ";
//		}
		if (a[singleDog] != 1) {
			a[singleDog] = 1;
			if (state == false) {
				if (singleDog / 10000 == 0) {
					state = true;
					cout << "0" <<singleDog;
				} else if (singleDog / 1000 == 0) {
					state = true;
					cout << "00" <<singleDog;
				} else if (singleDog / 100 == 0) {
					state = true;
					cout << "000" <<singleDog;
				} else if (singleDog / 10 == 0) {
					state = true;
					cout << "0000" <<singleDog;
				} else {
					state = true;
					cout << singleDog;
				}
			} else {
				if (singleDog / 10000 == 0) {
					state = true;
					cout << " 0" <<singleDog;
				} else if (singleDog / 1000 == 0) {
					state = true;
					cout << " 00" <<singleDog;
				} else if (singleDog / 100 == 0) {
					state = true;
					cout << " 000" <<singleDog;
				} else if (singleDog / 10 == 0) {
					state = true;
					cout << " 0000" <<singleDog;
				} else {
					cout << " " << singleDog;
				}
			}
		}
	}
	if (!state) {
		cout << "No one is handsome";
	}
	return 0;
}
