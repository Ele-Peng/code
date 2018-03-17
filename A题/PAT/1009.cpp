#include <iostream>  
#include <cstring>  
#include <cstdio>  
using namespace std;  
  
int main()  
{  
    char a[1001];  
    int j=0,flag=0;  
    gets(a);    
    int len=strlen(a);
    bool flag1 = false;
	for (int i = 0;a[i] != '\0';i++) {
		if (a[i] == ' ') {
			flag1 = true;
			break;
		}
	}  
	if (!flag1) {
		cout << a << endl;
		return 0;
	} 
    for(int i=len-1;i>=0;i--)  
    {  
        if(a[i]!=' ')  
        {  
            j++;  
        }  
        if(a[i]==' ')  
        {  
            flag=1;  
        }  
        if(flag)  
        {  
            for(int q=i+1;q<=i+j;q++)  
            {  
                cout<<a[q];  
            }  
            cout<<" ";  
            flag=0;  
            j=0;  
        }  
    }  
    for(int i=0;a[i]!=' ';i++)  
    {  
        cout<<a[i];  
    }  
    cout<<endl;  
    return 0;  
}  

