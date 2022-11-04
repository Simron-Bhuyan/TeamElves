#User function Template for python3
class Solution:
    def constructLowerArray(self,arr, n):
        # code here
        def merge(a,b):
            i,j=0,0
            x,y=len(a),len(b)
            while i<x:
                a[i][1]+=j
                while j<y and a[i][0]>b[j][0]:
                    j+=1
                    a[i][1]+=1
                i+=1
            i,j=0,0
            temp=[]
            while i<x and j<y:
                if a[i][0]>b[j][0]:
                    temp.append(b[j])
                    j+=1
                else:
                    temp.append(a[i])
                    i+=1
            while i<x:
                temp.append(a[i])
                i+=1
            while j<y:
                temp.append(b[j])
                j+=1
            return temp
        def mergesort(a):
            x=len(a)
            if x<2:
                return a
            else:
                mid=x//2
                return merge(mergesort(a[:mid]),mergesort(a[mid:]))
        a=[[arr[i],0,i] for i in range(len(arr))]
        ans=mergesort(a)
        ans.sort(key=lambda x: x[2])
        return list([ans[i][1] for i in range(len(ans))])





#{ 
 # Driver Code Starts
#Initial Template for Python 3



if __name__ == '__main__':
    tc = int(input())
    while tc > 0:
        n = int(input())
        arr = list(map(int, input().strip().split()))
        ob = Solution()
        ans = ob.constructLowerArray(arr, n)
        for x in ans:
            print(x, end=" ")
        print()
        tc -= 1

# } Driver Code Ends