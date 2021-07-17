#include <iostream>
using namespace std;

int main () {
	int n;
	cin >> n;
	int jiawin = 0;
	int ping = 0;
	int yiwin = 0;
	int jia[3] = {0};
	int yi[3] = {0};
	char a,b;
	for (int i = 0;i < n;i++) {
		cin >> a >> b;
		if (a == 'J') {
			if (b == 'J') {
				ping++;
			} else if (b == 'C') {
				yiwin++;
				yi[1]++;
			} else {
				jiawin++;
				jia[0]++;
			}
		} else if (a == 'B') {
			if (b == 'B') {
				ping++;
			} else if (b == 'J') {
				yiwin++;
				yi[0]++;
			} else {
				jiawin++;
				jia[2]++;
			}
		} else {
			if (b == 'C') {
				ping++;
			} else if (b == 'B') {
				yiwin++;
				yi[2]++;
			} else {
				jiawin++;
				jia[1]++;
			}
		}
	}
	cout << jiawin << " " << ping << " " << (n-jiawin-ping) << endl;
	cout << (n-jiawin-ping) << " " << ping << " " << jiawin <<endl;
	int maxjia = 0;
	if (jia[0] > jia[1]) {
		if (jia[0] > jia[2]) {
			maxjia = 0;
		} else {
			maxjia = 2;
		}
	} else {
		if (jia[1] > jia[2]) {
			maxjia = 1;
		} else {
			maxjia = 2;
		}
	}
	int maxyi = 0;
	if (yi[0] > yi[1]) {
		if (yi[0] > yi[2]) {
			maxyi = 0;
		} else {
			maxyi = 2;
		}
	} else {
		if (yi[1] > yi[2]) {
			maxyi = 1;
		} else {
			maxyi = 2;
		}
	}
	if (maxjia == 0) {
		cout << "J";
	} else if (maxjia == 1) {
		cout<< "C";
	} else {
		cout<< "B";
	}
	cout <<" ";
	if (maxyi == 0) {
		cout << "J"; 
	} else if (maxyi == 1) {
		cout<< "C";
	} else {
		cout << "B"; 
	}
	return 0;
}
