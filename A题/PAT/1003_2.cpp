#include<iostream>
#include<string>
#include<sstream>
#include<algorithm>

using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        char str[1001];
        bool isYes = true;
        cin >> str;
        int p = -1, t = -1;
        int leftA = 0,centerA = 0,rightA = 0;
        for (int i = 0; str[i] != '\0'; i++) {
            if (str[i] == 'P') {
                if (p != -1) {
                    isYes = false;
                    break;
                }
                p = i;
            } else if (str[i] == 'T') {
                if (t != -1) {
                    isYes = false;
                    break;
                }
                t = i;
            } else if (str[i] == 'A') {
                if (p == -1) {
                    leftA++;
                } else if (t == -1) {
                    centerA++;
                } else {
                    rightA++;
                }
            }else {
                isYes = false;
                break;
            }
        }
        if (p == -1 || t == -1) {
            isYes = false;
        } else if (centerA == 0) {
            isYes = false;   
        }
        if (isYes) {
            if (rightA == leftA && centerA == 1) {
                cout << "YES" << endl;
            } else {
                int a = leftA;
                int b = centerA;
                int c = rightA - leftA * (b - 1);
                if (a == c) {
                    cout << "YES" << endl;
                } else {
                    cout << "NO" << endl;
                }
            }
        } else {
            cout << "NO" << endl;
        }
    }
    return 0;
}

