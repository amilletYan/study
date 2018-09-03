var canPartitionKSubsets = function(nums, k) {
    var visited=new Array(nums.length)
    visited.fill(0);
      var start=visited.indexOf(0);
      var all=0;
    
      nums.forEach(element => {
          all+=element;
      });
      var sum=all/k;
      while(start!=-1){
              if(buildArrayBySum(nums,sum,visited,start))  {
                start=visited.indexOf(0);
                if(start==-1) 
                return true;
              }
              else return false;
            }
};


function buildArrayBySum(nums,sum,visited,start){
            if(sum==0) return true;   
            for(let i=start;i<nums.length;i++){
                if(!visited[i]){
                    visited[i]=1;
                    sum-=nums[i];
                    if(buildArrayBySum(nums,sum,visited,i+1)) return true;
                    else {
                        visited[i]=0;  
                        sum+=nums[i];
                        if(i==nums.length-1) return false;
                        }        
                }
            }  
          
    }



    nums = [2,2,10,5,2,7,2,2,13];
//console.log(canPartitionKSubsets(nums,3));

