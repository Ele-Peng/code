#include <iostream>
#include <string.h>
#include <math.h>
#include <algorithm>
#include <vector>
#include <cstdio>

using namespace std;
string stu[1001];
int main(){
	int col,row;
	cin >> col >> row;
	int num[1001];
	int ans[1001];
	int find[row];
	for (int i = 0;i < row;i++) {
		cin >> find[i];
	}
	getchar();
	int count1 = 0;
	int count2 = 0;
	for (int i = 0;i < col;i++) {
		cin >> stu[i];
		cin >> num[i];
		if (num[i] == 0) {
			continue;
		}
		bool flag = false;
		int pos = 0;
		int temp;
		for (int j = 0;j < num[i];j++) {
			cin >> temp;
			for (int k = 0;k < row;k++) {
				if (find[k] == temp) {
					count2++;
					flag = true;
					ans[pos++] = temp;
				}	
			}
		}
		if (flag) {
			count1++;
			cout << stu[i] << ":";
			for (int i = 0;i < pos;i++) {
				printf(" %04d",ans[i]);
			}
			cout << endl;
		}	
	}
	cout << count1 << " " << count2; 
	return 0;
} 
