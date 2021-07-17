#include <iostream>
#include <vector>
#include <cstdio>
#include <algorithm>
using namespace std;

int compareMax (int a,int b) {
	return a > b;
}

int compareMin (int a,int b) {
	return a < b; 
}

int main () {
	int n;
	cin >> n;
	int a[4] = {0};
	int order = 3;
	while (n != 0 && order != -1) {
		a[order--] = n % 10;
		n = n / 10;
	}
	order = 3;
	if (a[0] == a[1] && a[1] == a[2] && a[2] == a[3]) {
		cout<<a[0]<<a[1]<<a[2]<<a[3] << " - " << a[0]<<a[1]<<a[2]<<a[3] << " = " << "0000" << endl;
		return 0;
	}
	int b[4] = {0};
	int result = 0;
	int k = 0;
	while (result != 6174) {
		for (int i = 0;i < 4;i++) {
			b[i] = a[i];
		}
		sort(a,a+4,compareMax);
		sort(b,b+4,compareMin);
		int suma = a[0]*1000 + a[1]*100 + a[2]*10 + a[3]*1;
		int sumb = b[0]*1000 + b[1]*100 + b[2]*10 + b[3]*1;
		result = suma -sumb;
		if (result / 1000 == 0) {
			cout << a[0]<<a[1]<<a[2]<<a[3] << " - " << b[0]<<b[1]<<b[2]<<b[3] <<" = " <<"0"<<result<<endl;
		} else if (result / 100 == 0) {
			cout << a[0]<<a[1]<<a[2]<<a[3] << " - " << b[0]<<b[1]<<b[2]<<b[3] <<" = " <<"00"<<result<<endl;
		} else if (result / 10 == 0) {
			cout << a[0]<<a[1]<<a[2]<<a[3] << " - " << b[0]<<b[1]<<b[2]<<b[3] <<" = " <<"000"<<result<<endl;
		} else {
			cout << a[0]<<a[1]<<a[2]<<a[3] << " - " << b[0]<<b[1]<<b[2]<<b[3] <<" = " <<result<<endl;	
		}
		k = result;
		for (int i = 0;i < 4;i++) {
			a[i] = 0;
		}
		while (result != 0 && order != -1) { 
			a[order--] = result % 10;
			result = result / 10;
		}
		result = k;
		order = 3;
	}
	return 0;
}
