#include<cstdio>  
#include<iostream>  
#include<string>  
using namespace std;  
struct Student{  
    int sex;//�Ա�   
    string name;//����   
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
        cout<<stu[i].name<<" ";//���ǰn/2��ѧ��  
        //�Ӻ���ǰɨ   
        for(int j=n-1 ;j>=n/2 ;j--){  
            if(vis[j]==0&&stu[j].sex!=stu[i].sex){  
                cout<<stu[j].name<<endl;  
                vis[j]=1;//����Ѿ�������   
                break;//����ҵ�һ��Ҫ����   
            }  
        }  
    }  
      
    return 0;  
}
