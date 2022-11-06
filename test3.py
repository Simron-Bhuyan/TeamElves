
    #User function heyalate for python3
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
            heya=[]
            while i<x and j<y:
                if a[i][0]>b[j][0]:
                    heya.append(b[j])
                    j+=1
                else:
                    heya.append(a[i])
                    i+=1
            while i<x:
                heya.append(a[i])
                i+=1
            while j<y:
                heya.append(b[j])
                j+=1
            return heya
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
#Initial heyalate for Python 3




# } Driver Code Ends
    