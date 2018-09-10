var n=6;
var arr=[[1,2],[2,3],[2,4],[5,4],[6,4],[7,4]];
var map=new Map();
function maxProfit(n,arr){    
      for(let i=0;i<arr.length;i++){
         if(!map.has(arr[i][0])){
            map.set(arr[i][0],[]);
         }
          map.get(arr[i][0]).push(arr[i][1]);

          if(!map.has(arr[i][1])){
            map.set(arr[i][1],[]);
         }
          map.get(arr[i][1]).push(arr[i][0]); 
      }

      let max=0;

      for(let i=0;i<arr.length;i++){
          if(map.get(arr[i][0]).length>=2&&map.get(arr[i][1]).length>=2){
            let newArray0=map.get(arr[i][0]).remove(arr[i][1]);
            let newArray1=map.get(arr[i][1]).remove(arr[i][0]);
            let l0=maxLength(newArray0,0,arr[i][0],true);
            let l1=maxLength(newArray1,0,arr[i][1],true);
            let temp=allLength(l0,l1);
            if(temp>max) max=temp;
          }
      }
      console.log(max);
     
}

function allLength(l0,l1){
    let temp0=l0[0];
    let temp1=l1[0];
    if(l0.length>1) temp0+=l0[1];
    if(l1.length>1) temp1+=l1[1];
    return temp0*temp1
}

function maxLength(arr,length,ori,arrFlage=false){
    if(arr.length==0) return length;
    else{
        length++;
        let l=[];
        for(let i=0;i<arr.length;i++){ 
            let temp= map.get(arr[i]).remove(ori);
            let li=maxLength(temp,length,arr[i]);
            l.push(li);
        }
        l.sort((a,b)=>b-a);
        let maxlenth=l[0];
        if(arrFlage) maxlenth=l;
        return maxlenth;
    }
}

Array.prototype.remove=function(ele){
      let index=this.indexOf(ele);
      let newArray=[...this];
      if(index!=-1){   
          newArray.splice(index,1);
      }
      return newArray;
}

maxProfit(n,arr)