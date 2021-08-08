#include <iostream>
using namespace std;

long long ar[100005] = {0}, n = 0;

// 简单来说，就是挤得太近会难受，
// 每两个人之间都要保持一定距离，但是距离远一点没有关系。
// 我们把第一个人看成固定的，对于之后的每一个人，他自身有一个对距离的要求，
// 他前面的人也有一个对距离的要求，那么他们之间的距离就应该为比较大的距离要求。

int main() {
    long long ans = 0;
    cin >> n;
    for (int i = 0; i < n; i ++) {
        cin >> ar[i];
    }
    for (int i = 1; i < n; i ++) {
        ans += max(ar[i], ar[i - 1]);
    }
    cout << ans;
    return 0;
}