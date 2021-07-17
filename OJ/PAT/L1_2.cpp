#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int c;
	cin >> c;
	char symbol;
	cin >> symbol;
	int i = 0;
	int sy = 0;
	int  count = 1;
	int sum = 0;
	while (true) {
		if (c >= sum) {
			i = (count - 1) * 2 + 1;
			sum = (1 + i)*count;//等差数列求和公式  
			count++;	
		} else {
			int temp = (count - 1)*2-1; 
			sy = c - (sum - temp * 2  - 1);
			break;
		}
	}
	for (int i = 0;i < (count-1)*2 - 1;i++) {
		cout << "*";
		for (int j = 0;j < i - 1;j++ ) {
			cout << " ";
		}
		cout << endl; 
	}
	cout << sy;
	return 0;
} 
