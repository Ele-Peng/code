#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

struct student{
	char name[10];
	int maibo;
	int huxi;
	int flag;
};

int main() {
	int n;
	cin >> n;
	student stu[10];
	for (int i = 0;i < n;i++) {
		scanf("%s %d %d",&stu[i].name,&stu[i].maibo,&stu[i].huxi);
		stu[i].flag = 0;
		if (stu[i].maibo < 15 || stu[i].maibo > 20) {
			stu[i].flag = 1;
		}
		if (stu[i].huxi < 50 || stu[i].huxi > 70) {
			stu[i].flag = 1;
		}
	}
	bool temp = false;
	for (int i = 0;i < n;i++) {
		if (stu[i].flag != 0) {
			if (!temp) {
				temp = true; 
			} else {
				cout << endl;
			}
			cout << stu[i].name;	
		}
	}
	return 0;
} 
