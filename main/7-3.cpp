#include<bits/stdc++.h>
using namespace std;
#define ll long long
const ll MAX = 1e6 + 10;
ll tree[MAX] = {0};
const ll sz = 4e5;
const ll mod = 998244353;
ll slipSum(ll index)
{
	ll sum = 0;

	index = index + 1;

	while (index > 0)
	{
		sum += tree[index];
		sum %= mod;
		index -= index & (-index);
	}
	return sum % mod;
}

void update(ll n, ll index, ll val)
{
	index = index + 1;

	while (index <= n)
	{
		tree[index] += val;
		tree[index] %= mod;

		index += index & (-index);
	}
}

void s() {
	ll n;
	cin >> n;
	ll a[n];
	for (ll i = 0; i < n; i++) {
		cin >> a[i];
	}
	for (ll i = 0; i < MAX; i++)
		tree[i] = 0;
	for (ll i = 0; i < n; i++) {
		update(sz, a[i], slipSum(a[i] - 1) + 1);
	}
	cout << (slipSum(sz) + 1) % mod << endl;
}
int main()
{

	s();

}