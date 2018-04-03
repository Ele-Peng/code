#include<iostream>
#include<cstring>
#include<cstdio>
#include<math.h>
#include<vector>
#include<string>
#include<sstream>
#include<algorithm>

using namespace std;

struct student{
	char name[11];
	char num[11];
	int score;
};

int main() {
	int n;
	cin >> n;
	student max;
	student min;
	int maxScore = -1;
	int minScore = -1;
	int count = 0;
	for (int i = 0; i < n;i++) {
		student stu;
		cin >> stu.name;
		scanf(" ");
		cin >> stu.num;
		scanf(" ");
		cin >> stu.score;
		if (count == 0) {
			maxScore = stu.score;
			strcpy(max.name,stu.name);
			strcpy(max.num,stu.num);
			minScore = stu.score;
			strcpy(min.name,stu.name);
			strcpy(min.num,stu.num);
		}
		if (stu.score > maxScore) {
			strcpy(max.name,stu.name);
			strcpy(max.num,stu.num);
			maxScore = stu.score;
		}
		if (stu.score < minScore) {
			strcpy(min.name,stu.name);
			strcpy(min.num,stu.num);
			minScore = stu.score;
		}
		count++;
	}
	cout << max.name << " " << max.num<< endl;
	cout << min.name << " " << min.num;
	return 0;
}
