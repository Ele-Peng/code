#include <iostream>
using namespace std;

/*
int main() {
    char c[101][101];
    int n, m;
    cin >> n >> m;
    // create map
    for (int i = 0; i < n ; i ++) {
        for (int j = 0; j < m; j ++) {
            cin >> c[i][j];
        }
    }
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < m; j ++) {
            int sum = 0;
            if (c[i][j] == '*') cout << '*';
            else {
                if (c[i - 1][j + 1] == '*') sum ++;
                if (c[i][j + 1] == '*') sum ++;
                if (c[i + 1][j + 1] == '*') sum ++;
                if (c[i - 1][j] == '*') sum ++;
                if (c[i + 1][j] == '*') sum ++;
                if (c[i - 1][j - 1] == '*') sum ++;
                if (c[i][j - 1] == '*') sum ++;
                if (c[i + 1][j - 1] == '*') sum ++;
                cout << sum;
            }
        }
        cout << endl;
    }
    return 0;
}
*/

int n, m;
char matrix[101][101];
void dfs(int x, int y) {
    if (matrix[x][y] != '*') {
        for (int dx = -1; dx <= 1; dx ++) {
            for (int dy = -1; dy <= 1; dy ++) {
                int _x = dx + x, _y = dy + y;
                if (_x >= 0 && _y >= 0 && _x < n && _y < m && matrix[_x][_y] == '*') {
                    matrix[x][y] ++;
                }
            }
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 0;i < n; i ++) {
        for (int j = 0; j < m; j ++) {
            cin >> matrix[i][j];
            if (matrix[i][j] == '?') matrix[i][j] = '0';
        }
    }
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < m; j ++) {
            dfs(i, j);
        }
    }
    for (int i = 0; i < n; i ++) {
        for (int j = 0; j < m; j ++) {
            cout << matrix[i][j];
        }
        cout << endl;
    }
    return 0;
}