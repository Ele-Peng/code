#include<iostream>
#include<cstdio>

using namespace std;
char s1[10000], s2[10000];
int len1, len2, flag;
int main() {
  cin >> s1;
  len1 = strlen(s1);
  cin >> s2;
  len2 = strlen(s2);

  int position = 0;
  for (int i = 0; i < len1; i ++) {
    flag = 1;
    for (int j = 0; j < len2; j ++) {
      if (s1[i + j - 1] == s2[j]) flag = 0;
    }
    if(flag) {
      cout << i << endl;
    }
  }
  return 0;
}
