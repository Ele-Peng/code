#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;
struct student{
	long long id;
	int sj;
	int zs;	
};

int main() {
	int n;
	cin >> n;
	student stu[n];
	for (int i = 0;i < n;i++) {
		cin >> stu[i].id;
		cin >> stu[i].sj;
		cin >> stu[i].zs;
	}
	int count;
	cin >> count;
	int sja[count]; 
	for (int i = 0;i < count;i++) {
		cin >> sja[i];
	}
	for (int i = 0;i < count;i++) {
		for (int j = 0;j < n;j++) {
			if (sja[i] == stu[j].sj) {
				cout << stu[j].id << " " << stu[j].zs;
				if (i != (count  - 1)) {
					cout << endl;
				}
			}
		}
	}
	return 0;
}
