int main()
{
    int n;
    cin>>n;
    int x,y,z;
    int i=0;
    for(z=0; z<=n/5; z++) {
        for(y=0; y<=(n-z*5)/2; y++) {
            x=n-z*5-y*2; i++;
            cout<<setw(3)<<setfill('0')<<i;
            cout<<setw(12)<<setfill(' ')<<x<<setw(12)<<y<<setw(12)<<z<<endl; 
        }
    }
    return 0; 
}