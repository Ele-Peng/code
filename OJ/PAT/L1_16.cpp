#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;


int main() {
	int n;
	cin >> n;
	getchar();
	char str[n][18];
	int temp[18];
	int add[17] = {7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2};  //所加权重
	char judge[11] = {'1','0','X','9','8','7','6','5','4','3','2'}; 
	int sum = 0;
	int jiaobiao[100] = {0};
	char logo;
	for (int i = 0;i < n;i++) {
		cin.getline(str[i],19);
		for (int j = 0;j < 17;j++) {
			sum = sum + (str[i][j] - '0') * add[j];
		}
		temp[i] = sum % 11;
		logo = judge[temp[i]];
		if (logo != str[i][17]) {
			jiaobiao[i]++;
		} 
		sum = 0;
	}
	bool flag = false;
	int count = 0;
	for (int i = 0;i < n;i++) {
		if (jiaobiao[i] != 0) {	
			count = 1;
			if (!flag) {
				flag = true;
			} else {
				cout << endl;
			}
			for (int  j = 0;j <= 17;j++) {
				cout << str[i][j];
			}
		}
	}
	if (count == 0) {
		cout << "All passed";
	}
	return 0;
} 
