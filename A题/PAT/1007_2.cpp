#include<iostream>
#include<cstring>
#include<cstdio>
#include<math.h>
#include<vector>
#include<string>
#include<sstream>
#include<algorithm>

using namespace std;
bool isprime(int a) {
	 for (int i = 2; i * i <= a; i++) {  
        if (a % i == 0)  
            return false;  
    }  
    return true;  
} 

int main() {
	int n;
	cin >> n;
	int count = 0;
	for (int i = 5;i <= n;i++) {
		if (isprime(i - 2) && isprime(i)) {
			count++;
		}
	}
	cout << count;
	return 0; 
}

