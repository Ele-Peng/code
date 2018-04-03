#include <iostream>
using namespace std;

int main() {
    int a,b,c,d;
    cin >> a >> b;
    int matrix1[a][b];
    for (int i = 0;i < a;i++) {
        for (int j = 0;j < b;j++) {
            cin >> matrix1[i][j];
        }
    }
    cin >> c >> d;
    int matrix2[c][d];
    for (int i = 0;i < c;i++) {
        for (int j = 0; j < d;j++) {
            cin >> matrix2[i][j];
        }
    }
//  int matrix3[a][d];
    if (b != c) {
        cout << "Error: "<<b <<" != " <<c;
    } else {
        cout << a << " " << d << endl;
        int countCol = 0;
        for (int i = 0;i < a;i++) {
            for (int j = 0;j < d;j++) {
                int sum = 0;
                 for (int k = 0;k < b;k++){
                    sum = sum + matrix1[i][k]*matrix2[k][j];
                 }
                 if (j < d-1) {
                    cout << sum << " ";
                 } else {
                    cout << sum << endl; 
                 }
            }
        }
    }
    return 0;
}
