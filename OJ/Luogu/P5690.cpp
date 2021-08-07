#include <iostream>
#include <cmath>
#include <bits/stdc++.h>
using namespace std;

int main() {
    int a, b;
    scanf("%d-%d", &a, &b);
    const int month[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int left = 0,right = 0;
    if(a > 12)
    {
        left += 1;
        if (a / 10 == 1) a = 10;
        else if (a % 10 == 0) a = 10;
        else if (a % 10 == 2) a = 12;
        else a = a % 10;
    }
    else if (a == 0){ left += 1; a = 1;}
    if (b == 0)
    {
        right += 1; b = 1;
    }
    else if (b <= 31 && b > month[a])
    {
        if (a <= 9) { left += 1; a = 1;}
        else if (a > 10){ left += 1; a = 10;}
    }
    else if (b > 31)
    {
        b = 10 + b % 10;
        right += 1;
    }
    cout << left + right << '\n';
    return 0;
}


