#include <iostream>
#include <cstdio>
#include <cstring>
#include <string>
#include <math.h>
#include <vector>
#include <algorithm>
#include <bits/stdc++.h>

using namespace std;

int main() {
	string s;
	getline(cin,s);
	stringstream in(s);
	int erbaiwu;
	int count = 0;
	while (in >> erbaiwu) {
		if (erbaiwu == 250) {
			cout << count + 1;
			break;
		}
		count++;
	}
	if (count == 0) {
		return  0;
	}
	
	return 0;
} 
