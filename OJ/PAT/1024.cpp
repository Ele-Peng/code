#include <iostream>
#include <string>

using namespace std;

string a;
string b;
string c;
string d;
int i = 1;
int n = 0;
int len;
void solve_1() {
    cout << b << endl;
}
void solve_2() {
    i = 0;
    bool flag = true;
    n = n - len;
    while (b[i] != '\0') {
        if (flag && (b[i] == '0' || b[i] == '.')) {
            i++;
            continue;
        }
        flag = false;
        if (b[i] != '.') {
            cout << b[i];
        }
        i++;
    }
    i = 0;
    while (i < n) {
        cout << '0';
        i++;
    }
    cout << endl;
}
void solve_3() {
    i = 0;
    bool flag = true;
    while (b[i] != '\0') {
        if (flag && b[i] == '0') {
            i++;
            continue;
        }
        flag = false;
        if (i == n + 2) {
            cout << '.';
            cout << b[i];
        } else if (b[i] == '.') {
            cout << b[++i];
        } else {
            cout << b[i];
        }
        i++;
    }
}
void solve_4() {
    cout << "0.";
    n--;
    i = 0;
    while (i < n) {
        cout << '0';
        i++;
    }
    i = 0;
    while (b[i] != '\0') {
        if (b[i] != '.') {
            cout << b[i];
        }
        i++;
    }
    cout << endl;
}

int main() {
    cin >> a;
    bool isFuShu = false;
    if (a[0] == '-') {
        isFuShu = true;
    }
    i =1;
    while (a[i] != 'E') {
        b.push_back(a[i++]);
    }
    bool isZhengShu = false;
    i++;
    if (a[i] == '+') {
        isZhengShu = true;
    }
    i++;
    while (a[i] != '\0') {
        c.push_back(a[i++]);
    }
    int j = 0;
    while (c[j] != '\0') {
        n *= 10;
        n += c[j++] - '0';
    }
    if (isFuShu) {
        cout << '-';
    }
    if (n == 0) {
        solve_1();
        return 0;
    }
    if (isZhengShu) {
        len = b.length() - 2;
        if (len <= n) {
            solve_2();
        } else {
            solve_3();
        }
    } else {
        solve_4();
    }
    return 0;
} 
