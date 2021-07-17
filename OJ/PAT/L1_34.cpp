#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
	int a[1001] = {0};
	int n;
	cin >> n;
	int idx;
	for (int i = 0;i < n;i++ ) {
		cin >> idx;
		int temp;
		for (int j = 0;j < idx;j++) {
			cin >> temp;
			a[temp]++;
		}
	} 
	int max = 0;
	int pos = 0;
	for (int i = 0;i < 1001;i++) {
		if (a[i] > max) {
				max = a[i];
				pos = i;
		} else if (a[i] == max) {
			if (i > pos){
				pos = i;
			}
		}
	}
	cout << pos << " " << max;
	return 0;
}
