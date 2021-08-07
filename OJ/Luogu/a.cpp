#include <iostream>
using namespace std;

int main(){
    int m, e = 0, q = 0, p = 0, b = 0, c = 1;
    cin >> m;
    int n[m];
    for (int a = 0; a < m; a ++) {
        cin >> n[a];
        
        if (q < n[a] || a != 0) {
            q = n[a];
            if (e >= p) {
                q = 0;
                q ++;
                p = 1;
                c = 0;
            }
            if (p > e) {
                e = 0;
                e ++;
                c = 1;
                p = 0;
            }
            if (q > n[a]) {
                q = n[a];
                e ++;
            }
        }
    }
    if (p == 1 || c == 0) {
        cout << q;
    } else {
        cout << e;
    }
    return 0;
}


// int main() {
//     int n, max = 0, cnt = 1;
//     cin >> n;
//     int ar[n];
//     for (int i = 0; i < n; i ++) {
//         cin >> ar[i];
//     }
//     for (int i = 1; i < n; i ++) {
//         if (ar[i] > ar[i - 1]) {
//             cnt ++;
//         } else {
//             cnt = 1;
//         }
//         if (max < cnt) {
//             max = cnt;
//         }
//     }
//     cout << max;
//     return 0;
// }

// int main() {
//     int n;
//     cin >> n;
//     int ar[n];
//     for (int i = 0; i < n; i ++) {
//         cin >> ar[i];
//     }
//     int j = n - 1, flag = 1;
//     for (int i = 0; i <= n/2; i ++) {
//         if (ar[i] != ar[j]) {
//             flag = 0;
//             cout << "No";
//             break;
//         }
//         j --;
//     }
//     if (flag == 1) {
//         cout << "Yes";
//     }
//     return 0;
// }

// int w[10001],ar[101];  
// int main ()
// {
//     int n,m,i,k,j,max;
//     cin>>n>>m;  
//     for(i=1;i<=n;i++) cin>>w[i];
//     for(i=1;i<=m;i++) ar[i]=w[i];//将前m个人派去接水 ，a[i]表示该水⻰头已被占用的接水时间
//     for(i=m+1;i<=n;i++) {
//         k=1;
//         for(j=2;j<=m;j++) //扫描下一个人应该排在哪个水⻰头上
//             if (ar[j]<ar[k]) k=j;  
//         ar[k]=ar[k]+w[i]; //增加该水⻰头的接水时间
//     }
//     max=0;
//     for(i=1;i<=m;i++)//扫描每个水⻰，找出那个水⻰头上的接水时间最⻓
//         if (ar[i]>max) max=ar[i];  
//     cout<<max;
//     return 0;
// }

// int main() {
//     char chr[20] = {0};
//     for (int i = 0; i < 20; i ++) {
//         cout << (int)chr[i];
//     }
//     return 0;
// }
