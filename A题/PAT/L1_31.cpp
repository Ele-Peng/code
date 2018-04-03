#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int is_perfect(int height,double weightsj) {
	double weight;
	weight = (height - 100 ) * 0.9 * 2.0;
	double weightMax = weight + weight * 0.1;
	double weightMin = weight - weight * 0.1;
 	if ((weightsj > weightMin) && (weightsj < weightMax)) {
		return 0;
	} else if (weightsj <= weightMin) {
		return -1;
	} else if (weightsj >= weightMax){
		return 1;
	}
}

int main() {
	int n;
	cin >> n;
	int height[50] = {0};
	int weightsj[50] = {0};
	int result[50] = {2};
	for (int i = 0;i < n;i++) {
		cin >> height[i] >> weightsj[i];
		result[i] = is_perfect(height[i],weightsj[i]) ;
	}
	bool flag = false;
	for (int i = 0;i < n;i++) {
		if (result[i] == 0) {
			if (!flag) {
				flag = true;
			} else {
				cout << endl;
			}
			cout << "You are wan mei!";
		} else if (result[i] == 1) {
			if (!flag) {
				flag = true;
			} else {
				cout << endl;
			}
			cout << "You are tai pang le!";
		} else if (result[i] == -1) {
			if (!flag) {
				flag = true;
			} else {
				cout << endl;
			}
			cout << "You are tai shou le!";
		}
	}
	return 0;
}
