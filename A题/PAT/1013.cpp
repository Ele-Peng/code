#include <iostream>
#include <math.h>
#include <vector>
#include <cstdio>
using namespace std;

bool isPrime(int a) {
	int temp = sqrt(a);
	for (int i = 2;i <= temp;i++) {
		if (a % i == 0) {
			return false;
		} 
	}
	return true;
}

int main () {
	int M = 0, N = 0;  
    int num = 2, cnts = 0;  
    vector<int> vecPrimer;  
    int i = 0; 
    cin >> M >> N;  
    while(cnts < N)  
    {   
        if (isPrime(num))  
        {  
             vecPrimer.push_back(num);  
             cnts++;  
        }  
        num++;  
    }   
    cnts = 0;  
    for(i = M; i <= N; i++)  
    {  
        if(cnts == 0)  
        {  
            cout << vecPrimer[i-1];  
        }  
        else  
        {  
            cout << " " << vecPrimer[i-1];  
        }  
  
        if(cnts == 9)  
        {  
            cout << endl;  
            cnts = 0;  
        }  
        else  
        {  
            cnts++;  
        }  
  
    }  
    return 0;  
} 

