#include <iostream>
#include <cmath>
#include <algorithm>
using namespace std;

int main() {
    int arr[5][5];
    int row_max[5];
    for (int i = 0; i < 5; i ++) {
        for (int j = 0; j < 5; j ++) {
            cin >> arr[i][j];
            // 找出每行最大值
            if (j == 0) row_max[i] = arr[i][j];
            else row_max[i] = row_max[i] < arr[i][j] ? arr[i][j] : row_max[i];
        }
    }
    int col_min[5];
    // 找出每列最小的值
    for (int i = 0; i < 5; i ++) {
        for (int j = 0; j < 5; j ++) {
            if (j == 0) col_min[i] = arr[j][i];
            else col_min[i] = col_min[i] > arr[j][i] ? arr[j][i] : col_min[i];
        }
    }
    for (int i = 0; i < 5; i ++) {
        for (int j = 0; j < 5; j ++) {
            if (row_max[i] == col_min[j]) {
                cout << i + 1 << " " << j + 1 << " " << row_max[i];
                return 0;
            }
        }
    }
    cout << "not found";
    return 0;
}