// Author : Simron Bhuyan

#pragma GCC optimize("Ofast")
#pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,avx2,fma")
#pragma GCC optimize("unroll-loops")
#include <bits/stdc++.h>
#define ll long long int
#define _for(i, n) for(ll i = 0; i < n; i++)
#define _back(i, n) for(ll i = n; i >= 0; --i)
#define loop(i, a, b, c) for(ll i = a; i < b && i >= 0; i += c)
#define check(x) if(x) cout << "YES\n"; else cout << "NO\n"
#ifndef ONLINE_JUDGE
#define debug(x) cout << "\n\t" << #x << " : " << x << "\n";
#else
#define debug(x)
#endif
using namespace std;

int jumps(int pos,int vector<int> cost)
{
	int pos;
    if(pos==cost.size())
    {
    	return 0;
    }
int temp1{0},temp2{0};

  temp1=abs(cost[pos]-cost[pos+1])+jumps(pos+1,cost);
  temp2=abs(cost[pos]-cost[pos+2])+jumps(pos+2,cost);
  MIN=min(temp1,temp2);
  return MIN;
}


int main(int argc, char const *argv[])
{
        ios_base::sync_with_stdio(false);
        cin.tie(NULL);
        cout.tie(NULL);

        ll testCase {0};
        cin >> testCase;
        while (testCase--)
        {
                debug(testCase)
         int n;
         cin>>n;
         vector<int> cost[n];
         _for(i,n)
         {
                int temp;
                cin>>temp;
         	cin>>cost.push_back(temp);
         }       
         cout<<jumps(n,cost)<<"\n";
        }
        return 0;
}