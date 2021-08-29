#include <iostream>  
using namespace std;

int main() {
    int n;
    cin >> n;
    int k;
    cin >> k;
    // 准备报数
    // 1 代表"在场上"，0 代表"出局"
    int  x[100]={0};
    for (int i = 1; i <= n; i ++){
        x[i] = 1;
    }
    // 开始报数
    int m = n;
    int s = 0;
    if (k == 1) {
    	cout << n << endl;
    } else {
	    while (n > 1) {
	        for (int i = 1; i <= m; i ++) {
	            s += x[i];
	            if (s == k) {
	                x[i] = 0; // 当前人的状态出局，置为 0
	                s = 0; // 累加器回置到0
	                n --; // 人数减一
	                if (n == 1) break;
	            }
	        }
	    }
	    // 输出最后留下的人
	    for (int i = 1; i <= m; i ++) {
	        if (x[i] == 1) {
	            cout << i << endl;
	        }
	    }
    }
    return 0;
}
