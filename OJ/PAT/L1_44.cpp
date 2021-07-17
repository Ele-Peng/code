#include<stdio.h>  
#include <string.h>  
int main(){  
    
  int num;  
  char str[10]={""};  
  int count=0;  
  int i;  
  char str1[10]={"ChuiZi"};  
    char str2[10]={"JianDao"};  
    char str3[10]={"Bu"};  
    char str4[10]={"End"};  
  scanf("%d",&num);  
  num++;  
    
  for(i=0; ;i++){  
      
    scanf("%s",str);  
       count++;  
    if(!strcmp(str,str4))  
      break;  
      
    if(!strcmp(str,str1)){  
      
      if(count%num==0){  
        printf("ChuiZi\n");  
        
      }  
        
      else{  
      printf("Bu\n");  
      
      }  
    }  
    else if(!strcmp(str,str3)){  
      
        if(count%num==0){  
        printf("Bu\n");  
      
      }  
        
      else{  
    printf("JianDao\n");  
      
      }  
          
    }  
    else if(!strcmp(str,str2)){  
      
        if(count%num==0){  
        printf("JianDao\n");  
        
      }  
        
      else{  
         printf("ChuiZi\n");  
        
      }  
          
      
    }  
      
      
}  
    
  return 0;  
}   
