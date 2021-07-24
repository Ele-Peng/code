#include <iostream>
using namespace std;
int main(){
    int n;
    cin >> n;
    int count = 0;
    for (int i = 1; i <= n; i ++) {
        int a = i;
        while (a) {
            if ( a % 10 == 1) count ++;
            a /= 10;
        }
    }
    cout << count; 
    return 0;
}