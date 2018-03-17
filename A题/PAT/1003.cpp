#include <iostream>
#include <string.h>
using namespace std;

bool judge (char* a){
    int len = strlen(a);
    int pos[5] = {0};
    for (int i = 0; i < len; i++) {
        if (a[i] != 'P' || a[i] != 'A' || a[i] != 'T') {
            return false;
        } 
        if (a[i] == 'P') {
            pos[0]++;   //P的数量 
            if (pos[0] > 1 || pos[1] != 0){
                return false;
            }
        } else if (a[i] == 'T') {
            pos[1]++;   //T的数量 
            if (pos[1] > 1) {
                return false;
            }
        } else {
            if (pos[0] != 0 && pos[1] == 0){
                pos[3]++;   //中间A的数量 
            } else if (pos[1] != 0){
                pos[4]++;   //T后面的A的数量 
            } else {
                pos[2]++;   //P前面A的数量 
            }
        }   
    }
    if (pos[3] == 0 || pos[2] * pos[3] != pos[4]) {
        return false;
    } else if (pos[0] == 0 || pos[1] == 0) {
        return false;
    } else {
        return true;
    }
}

int main(){
    int n;
    cin >> n;
    for (int i = 0;i < n;i++) {
        char a[101];
        cin >> a;
        if (judge(a)) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        } 
    }
    return 0;
}
