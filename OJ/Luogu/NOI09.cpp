#include <cstdio>
using namespace std;

int main() {
    int num = 5;
    int top_num = num / 2 + 1;
    int bottom_num = num / 2;
    char symbol;
    scanf("%c", &symbol);
    // top triangle
    for (int i = 0; i < top_num; i ++) {
        for (int j = 0; j < top_num - i - 1; j ++) {
            printf(" ");
        }
        for (int j = 0; j < 2 * i + 1; j ++) {
            printf("%c", symbol);
        }
        printf("\n");
    }

    // bottom triangle
    for (int i = 0; i < bottom_num; i ++) {
        for (int j = 0; j < i + 1; j ++) {
            printf(" ");
        }
        for (int j = 0; j < 2 * (bottom_num - i) - 1; j ++) {
            printf("%c", symbol);
        }
        printf("\n");
    }
    return 0;
}