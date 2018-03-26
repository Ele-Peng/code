#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int a,b;
	cin >> a >> b;
	int count = 0;
	bool flag = false;
	int sum = 0;
	for (int i = a - 1;i < b;) {
		i++;
		count++;
		if (count % 5 == 0) {
			count = 0;
			flag = false;
			printf("%5d",i);
			cout << endl;
		} else {
			if (!flag) {
				flag = true;
			}
			printf("%5d",i);
		}
		sum = sum + i;
	}
	if (flag) {
		cout << endl;
	} 
	cout << "Sum = " << sum;
	return 0;
}
