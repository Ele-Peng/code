#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
	char name[11];
	int count = 0;
	char a[11];
	char b[11];
	cin >> name;
	while (name[0] != '.'){
		count++;
		if (count == 2) {
			strcpy(a,name); 
		} else if (count == 14) {
			strcpy(b,name);
		}
		cin >> name;
	}
	if (count < 2) {
		cout << "Momo... No one is for you ..." << endl;
	} else if (count >= 2 && count < 14) {
	
		cout << a << " is the only one for you..."<< endl;
	} else {
		cout << a << " and " << b << " are inviting you to dinner..."<< endl;
	}
	return 0;
} 
