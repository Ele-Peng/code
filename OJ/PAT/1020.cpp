#include<iostream>
#include<cmath>
#include<cstdio>
#include<algorithm>

using namespace std;

bool comp(pair<double, double> a, pair<double, double> b) {
    return a.second / a.first > b.second / b.first;
}
int main() {
    int n, m;
    cin >> n >> m;
    pair<double, double> item[1001];
    int num[1001];
    for (int i = 0; i < n; i++) {
        cin >> item[i].first;
    }
    for (int i = 0; i < n; i++) {
        cin >> item[i].second;
    }
    sort(item, item + n,comp);
    double s = 0;
    int i = 0;
    while (i < n) {
        int sell = min(item[i].first, (double)m);
        m -= sell;
        s += item[i].second * (double)sell / item[i].first;
        i++;
    }
    printf("%.2lf", s);
    return 0;
}
