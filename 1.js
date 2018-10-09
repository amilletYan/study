//var n=6;
//var arr=[[1,2],[2,3],[2,4],[5,4],[6,4],[7,4]];
//var map=new Map();
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



let arr=[15,14,0,12,11,10,0,8,7,6,5,4,3,2,1,0,0]
Array.prototype.toString=function(){
    for(let i=0;i<this.length;i++)
    console.log(this[i]);
}
//1.冒泡排序 
// 1.比较相邻的两个元素，如果前一个比后一个大，则交换位置。
// 2.第一轮的时候最后一个元素应该是最大的一个。
// 3.按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。
function Bubble(arr){
   let length=arr.length;
   let didSwap=false
   for(let i=length;i>0;i--){
       for(let j=0;j<i-1;j++ ){
             if(arr[j]>arr[j+1]){
                [arr[j],arr[j+1]]=[arr[j+1],arr[j]]
                didSwap=true//最好情况时间复杂度为n
             }
       }
       if(!didSwap)  return;
   }
}

//2.选择排序 
// 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置
// 然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾
function Selection(arr){
   let length=arr.length;
   let index;
   for(let i=0;i<length-1;i++){
        index=i;
    for(let j=i+1;j<length;j++){
        if(arr[index]>arr[j])
            index=j;//记录下未排序数组中最小元素索引
   }
   [arr[i],arr[index]]=[arr[index],arr[i]]
  }
}
  
//3.插入排序
//将数组分为无序和有序两组，从无序中拿出一个插入到有序中，默认第一个数为一个有序数组
function Insert(arr){
   let length=arr.length;
   for(let i=1;i<length;i++){
       let j=i
       let insertNode=arr[j]//无序数组中第一个元素
       while(j>0&&insertNode<arr[j-1]){//跟有序数组比较
        arr[j]=arr[j-1];//有序数组后移
        j--;
       }
        arr[j]=insertNode   
   }
}

//4.希尔排序
//先将整个待排记录序列分割成为若干子序列分别进行直接插入排序，待整个序列中的记录“基本有序”时，在对全体进行一次直接插入排序
//插入排序：1、 对几乎已经排好序的数据操作效率特别高，甚至可以达到线性O(n)   2、 对于一般的无序数据效率低，特别是逆序数据。
//那就先上数组变的相对有序，在用直接插入排序:把数据分组，组内排序，然后再次数据分组+组内排序;且分组数量递减，直到分组数为1，也就是直接插入排序 
//递减增量排序算法
// 1、希尔（Shell）原始步长序列：N / 2，N / 4，...，1（重复除以2）;
// 2、希伯德（Hibbard）的步长序列：1，3，7，...，2 k - 1;
// 3、克努特（Knuth）的步长序列：1，4，13，...，（3 k - 1）/ 2;
// 4、塞奇威克（Sedgewick） 的步长序列：1，5，19，41，109，....
// 　　它是通过交织两个序列的元素获得的： 步长序列数组下标 n 从0开始
// 　　n偶数用 ：1，19，109，505，2161，...，9（4 k - 2 k）+ 1，k = 0,1,2,3，... 
// 　　n奇数用 ：5，41，209，929，3905，...。k + 2（2 k + 2 - 3）+ 1，k = 0,1,2,3，...
function Shell(arr){
    let length=arr.length;
    for(let gap=Math.floor(length/2);gap>0;gap=Math.floor(gap/2)){
        for(let i=gap;i<length;i++){//这里的i++就是逐渐增大需要排序的子序列，在某个子序列增大之前，它一定是排序好的
            let temp=arr[i];
                while(i>0&&temp<arr[i-gap]){
                  arr[i]=arr[i-gap];
                  i-=gap;
                }
                arr[i]=temp;
        }
    }
}


//5.归并排序
//自顶向下:把数组元素不断的二分，直到子数组的元素个数为一个，因为这个时候子数组（只有一个元素）必定是已有序的
//然后将两个有序的序列合并成一个新的有序的序列，两个新的有序序列又可以合并成另一个新的有序序列，以此类推，直到合并成一个有序的数组
//自底向上:数组中先一个一个归并成两两有序的序列，两两有序的序列归并成四个四个有序的序列，然后四个四个有序的序列归并八个八个有序的序列
//以此类推，直到，归并的长度大于整个数组的长度，此时整个数组有序,需要注意的是数组按照归并长度划分，最后一个子数组可能不满足长度要求
//自顶下下的归并排序算法一般用递归来实现，而自底向上可以用循环来实现。
function mergeTop(arr){
    if(arr.length<2) 
       return arr;//不能仅仅return，仅剩一个数时将此数返回，那么merge函数第一次会合并两个数
    let middle=Math.floor(arr.length/2);
    let left=arr.slice(0,middle);
    let right=arr.slice(middle);
    let newArr=merge(mergeTop(left),mergeTop(right));
    return newArr;

    function merge(left,right){
        let newArr=[];
        while(left.length&&right.length){
            if(left[0]>right[0])//不能加=，这样能保证稳定性
              newArr.push(right.shift());
            else 
              newArr.push(left.shift());
        }
        while(left.length){
            newArr.push(left.shift());
        }
        while(right.length){
            newArr.push(right.shift());
        }
        return newArr;
    }
}

function mergeBottom(arr){
     let length=arr.length;
     for(let n=1;n<length;n=n*2){//n表示每小组的元素个数
     for(let i=0;i<length;i+=2*n){//加2n表示每两组进行比较，因此每次跳过两组
         let arr1=arr.slice(i,i+n);
         let arr2=arr.slice(i+n,i+2*n);//i+2*n可能会超出数组长度，此时默认截取到结尾
         let newArr=[];
         while(arr1.length&&arr2.length){
            if(arr1[0]>arr2[0])
              newArr.push(arr2.shift());
            else 
              newArr.push(arr1.shift());
         }
         while(arr1.length){
            newArr.push(arr1.shift());
         }
         while(arr2.length){
             newArr.push(arr2.shift());
         }
         arr.splice(i,2*n,...newArr);//把之前没有排序的删除，然后添加排序好的
     }
    }
}

//6.快速排序
//通过一趟排序将待排记录分割成独立的两部分，其中一部分记录关键字均比另一部分的关键字小，
//则可分别对这两部分记录继续进行排序，以达到整个序列有序
function Quick1(arr){
    let length=arr.length;
    if(length<2) 
        return arr;
    let pivot=arr[Math.floor(length/2)];
    let left=[],right=[],equ=[];
    for(let i=0;i<length;i++){
        if(arr[i]<pivot)
          left.push(arr[i]);
        else if(arr[i]>pivot)//不能写>=，因为pivot放入右边后，下次Quick(right)时pivot若还是原pivot就是死循环了
          right.push(arr[i]);
        else 
          equ.push(arr[i]);
    }
    return Quick1(left).concat(equ,Quick1(right));
}

function Quick2(arr,left,right){
    if(left>=right) return arr.slice(left,right);
    let pivot=arr[right-1];
    let index=left-1;//指向比pivot大或相等的元素的前一位(肯定是比pivot小的数)
    for(let i=left;i<right;i++){
         if(arr[i]<pivot){
              index++;
              [arr[index],arr[i]]=[arr[i],arr[index]]
         }
    }
    return Quick2(arr,left,index+1).concat([pivot],Quick2(arr,index+1,right-1));
    
}

//7.堆排序
function Heap(arr){
    let newArr=[];
    let length=arr.length;


    for(let i=Math.floor(length/2)-1;i>=0;i--){
         heapfy(arr,i);
    }

    //method1
    // while(arr.length>1){
    //     newArr.push(arr.shift());
    //     arr.unshift(arr.pop());//当arr只剩一个时，arr.shift弹出队头，arr.pop弹出队尾时弹的是undefined
    //     heapfy(arr,0);
    // } 
    // newArr.push(arr.shift());

    //method2
    while(length>0){
         length--;
         [arr[0],arr[length]]=[arr[length],arr[0]];
         ////将最小的提出，末尾补上，此时需要重新构建二叉树，但不是从中间开始，因为除了第一位可能有错，其他节点都对
         newArr.push(arr.pop());
         heapfy(arr,0);
    }

    return newArr;
    //heapfy用来形成二叉树，从数组中间开始（注意中间特殊性），将小的放在根
    function heapfy(arr,root){
       let left=root*2+1;
       let right=root*2+2;
       let small=root;
       if(left<arr.length&&arr[left]<arr[small]) small=left;//当arr长度<1时没有left
       if(right<arr.length&&arr[right]<arr[small]) small=right;//right不一定有
       if(small!=root) {
           [arr[root],arr[small]]=[arr[small],arr[root]];
           //继续对交换下来的数进行比较，小的数已将放到了根部，此时small是放下来的数，需要比较它与它的叶子节点的大小
           heapfy(arr,small);
       }

    }
}


//8.计数排序
function Count(arr){
 let c=[];//
 let b=[];//排序后新数组
 let length=arr.length;
 let min=arr[0],max=arr[0];
 for(let i=0;i<length;i++)
 {
 //统计出元素最大和最小值，保证遍历次数是max-min，而不是max
    if(min>arr[i])  min=arr[i];
    if(max<arr[i])  max=arr[i];
 //c[i]记录等于i的元素的个数
    if(typeof c[arr[i]]=="undefined") c[arr[i]]=1;
    else c[arr[i]]++;
 }

//c[i]记录小于等于i的元素的个数
 for(let i=min+1;i<=max;i++){
    if(typeof c[i]=="undefined") c[i]=0;
   c[i]+=c[i-1];
 }

 //c[5]=4,说明小于等于5的元素有4个，因此这个5的位置在数组第4-1位，保证稳定排序
 for(let i=0;i<length;i++){
   b[--c[arr[i]]]=arr[i];
 }

 return b;
}


//9.桶排序
// 基本思想：是将阵列分到有限数量的桶子里。每个桶子再个别排序（有可能再使用别的排序算法或是以递回方式继续使用桶排序进行排序）。
//          桶排序是鸽巢排序的一种归纳结果。当要被排序的阵列内的数值是均匀分配的时候，桶排序使用线性时间（Θ（n））。
//          但桶排序并不是 比较排序，他不受到 O(n log n) 下限的影响。
//          简单来说，就是把数据分组，放在一个个的桶中，然后对每个桶里面的在进行排序。  
// 例如要对大小为[1..1000]范围内的n个整数A[1..n]排序  
// 首先，可以把桶设为大小为10的范围，具体而言，设集合B[1]存储[1..10]的整数，集合B[2]存储(10..20]的整数，……集合B[i]存储((i-1)*10,i*10]的整数，i=1,2,..100，总共有100个桶。
// 然后，对A[1..n]从头到尾扫描一遍，把每个A[i]放入对应的桶B[j]中。  再对这100个桶中每个桶里的数字排序，这时可用冒泡，选择，乃至快排，一般来说任 何排序法都可以。
// 最后，依次输出每个桶里面的数字，且每个桶中的数字从小到大输出，这样就得到所有数字排好序的一个序列了。  
// 假设有n个数字，有m个桶，如果数字是平均分布的，则每个桶里面平均有n/m个数字。如果  
// 对每个桶中的数字采用快速排序，那么整个算法的复杂度是  O(n+m*n/m*log(n/m))=O(n+nlogn-nlogm)  
// 从上式看出，当m接近n的时候，桶排序复杂度接近O(n)  
// 当然，以上复杂度的计算是基于输入的n个数字是平均分布这个假设的。
// 当数据并不是均匀分布时，所有的数字都落在少数几个桶，甚至同一个桶中，那就退化成一般的排序了。  
// 前面说的几大排序算法 ，大部分时间复杂度都是O（n^2），也有部分排序算法时间复杂度是O(nlogn),而桶式排序却能实现O（n）的时间复杂度。
// 但桶排序的缺点是：
// 1）首先是空间复杂度比较高，需要的额外开销大。排序有两个数组的空间开销，一个存放待排序数组，一个就是所谓的桶，比如待排序值是从0到m-1，那就需要m个桶，这个桶数组就要至少m个空间。
// 2）其次待排序的元素都要在一定的范围内均匀分布
// 3）桶式排序是一种分配排序。分配排序的特定是不需要进行关键码的比较，但前提是要知道待排序列的一些具体情况，比如最大值最小值，用于决定桶的数量

//10.基数排序
// 基数排序又称为“桶子法”，从低位开始将待排序的数按照这一位的值放到相应的编号为0~9的桶中。
// 等到低位排完得到一个子序列，再将这个序列按照次低位的大小进入相应的桶中，一直排到最高位为止，数组排序完成。
function radix(arr,maxDigit){
   let length=arr.length;
   let counter=[];

   for(let mod=10,div=1,i=0;i<maxDigit;mod*=10,div*=10,i++){
    for(let i=0;i<length;i++){
        let base=Math.floor(arr[i]%mod/div);//除以div可能为小数
        if(typeof counter[base]=="undefined")  counter[base]=[];
        counter[base].push(arr[i]); 
    }
    let index=0;
    for(let i=0;i<counter.length;i++){
        while(counter[i]!=undefined&&counter[i].length!=0)
        arr[index++]=counter[i].shift();//保证稳定性
    }
   }
}

