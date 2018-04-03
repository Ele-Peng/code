#include<cstdio>  
#include<iostream>  
#include<string>  
using namespace std;  
struct Student{  
    int sex;//性别   
    string name;//姓名   
};  
int main(){  
    int n;  
    int a;  
    string s;  
    scanf("%d",&n);  
    Student stu[n];  
    int vis[50]={0};  
    for(int i=0 ;i<n ;i++){  
        cin>>stu[i].sex>>stu[i].name;  
    }  
    for(int i=0 ;i<n/2 ;i++){  
        cout<<stu[i].name<<" ";//输出前n/2名学生  
        //从后往前扫   
        for(int j=n-1 ;j>=n/2 ;j--){  
            if(vis[j]==0&&stu[j].sex!=stu[i].sex){  
                cout<<stu[j].name<<endl;  
                vis[j]=1;//标记已经被帮助   
                break;//如果找到一定要跳出   
            }  
        }  
    }  
      
    return 0;  
}
