#include <iostream>
#include <vector>
#include <algorithm>
#include <math.h>
#include <cstdio>
#include <cstring>
#include <string>
using namespace std;

int main() {
	int jiaMax;
	int yiMax;
	cin >> jiaMax >> yiMax;
	int n;
	cin >> n;
	int jiahejiu = 0;
	int yihejiu = 0;
	int jiahan;
	int jiahua;
	int yihan;
	int yihua;
	int sum = 0;
	int flag = 0; 
	for (int i = 0;i < n;i++) {
		cin >> jiahan >> jiahua >> yihan >> yihua;
		sum = jiahan + yihan;
		if (jiahua == sum && yihua != sum) {
			jiahejiu++;
			if (jiahejiu > jiaMax) {
				flag = 1;
				break;
			}
		} else if (jiahua!= sum && yihua == sum) {
			yihejiu++;
			if (yihejiu > yiMax) {
				flag = 2;
				break;
			}
		}	
	}
	if (flag == 1) {
		cout << "A" << endl;
		cout << yihejiu;
	} else if (flag == 2){
		cout << "B" << endl;
		cout << jiahejiu; 
	} 
	return 0;
}
