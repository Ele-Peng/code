#include<iostream>
#include<cstring>
#include<cstdio>
#include<math.h>
#include<vector>
#include<string>
#include<sstream>
#include<algorithm>

using namespace std;
int visit[10001];
int main() {
	vector<int> v;
	int n;
	cin >> n;
	int m;
	while (n--) {
		cin >> m;
		v.push_back(m);
		while(m != 1) {
			if (m % 2 == 0) {
				m = m / 2;
			} else {
				m = (m * 3 + 1) / 2;
			}
			visit[m] = 1;
		}
		sort(v.begin(),v.end());
		reverse(v.begin(),v.end());
		for (int i = 0;i < v.size();i++) {
			if (visit[v[i]] == 0) {
				bool flag = false;
				if (!flag) {
					flag = true;
				} else {
					cout << " ";
				}
				cout << v[i];
			}
		}
	}
	return 0;
} 
