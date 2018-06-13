// var insertSort = function (array) {
//     var index = 1;
//     while (index < array.length) {
//         var i = index;
//         var target = array[i];
//         while (target > array[i - 1]) {
//             array[i] = array[i - 1];
//             i--;
//         }
//         array[i] = target;
//         index++;
//     }
// };

// var n = [9, 5, 1, 7, 3, 4, 6, 10, 2, 8, 11, 0];
// var m = n.slice(0);



// function inheritObjection(o){
//     function tempF(){};
//     tempF.prototype=o;
//     return new tempF();
// }
 

// function inheritPrototype(son,father){
//     var temp=inheritObjection(father.prototype);
//     temp.constructor=son
//     son.prototype=temp;
// }


// function son(name,age){father.call(this,name);this.age=age};
// function father(name){this.name=name};
// father.prototype.gf=["xf","jy"];
// inheritPrototype(son,father);
// var s1=new son("me",18);
// var s2=new son("you",19);
// s1.gf.push("xs");
// console.log(s2.gf);//s2依然被修改了
// //寄生组合式继承与组合继承的区别：
// // 都用到了构造函数继承，但是在原型继承上组合继承是通过类式继承，寄生组合继承是通过寄生式继承
// // 子类原型继承父类原型，并不是通过son.prototype=new father();
// // 而是function tempF(){};tempF.prototype=father.prototype;temp=new tempF();son.prototype=temp;
// // 这样s=new son();s._proto_=son.prototype;son.prototype._proto_=temp._proto_=tempF.prototype=father.prototype,所以s的原型链就是son.prototype--->father.prototype--->Object.prototype
// //注意temp作为中间体是son.prototype，他应该有constructor属性，但是temp只是tempF的实例没有这个属性，所以要手动设置其constructor为son
// // 与组合继承相比好处就是，在原型继承上不会再次调用父类构造函数

// var Factory=function(type,content){
//     if(this instanceof Factory){
//         return this[type](content);
//     }else
//     return new Factory(type,content);
// }

// var animal=function(name,age){this.name=name;this.age=age}
// animal.prototype.action=function(){console.log("hi i`m"+this.gf)};

// Factory.prototype={
//     cat:function(content){
//         var cat={gf:content[2]};
//         animal.call(cat,content[0],content[1]);
//         return cat;       
//     },
//     dog:function(content){
//         var dog={gf:content[2]};
//         animal.call(dog,content[0],content[1]);
//         return dog;       
//     },
//     bird:function(content){
//         var bird={gf:content[2]};
//         animal.call(bird,content[0],content[1]);
//         return bird;       
//     },  
// }

// var content=["tom","12","mary"];
// var cat=Factory("cat",content);
// var content=["jack","16","rose"];
// var dog=new Factory("dog",content);


var quickSort=function(array,left,right){
   if(array.length>1){
       
       var index=partition(array,left,right);
       if(left<index-1){
           quickSort(array,left,index-1);
       }
       if(right>index){
           quickSort(array,index,right);
       }

   }
}

var partition=function(array,left,right){
    var pivot=array[Math.floor((left+right)/2)];
      while(left<=right){
     
          while(array[left]>pivot){
              left++;
          }
          while(array[right]<pivot){
              right--;
          }
          if(left<=right){
              [array[left],array[right]]=[array[right],array[left]];
              left++;
              right--;
              //此处一定要++--，因为若left=right，会死循环
          }
      }
      //返回的left一定是right=left-1(前提pivot没有重复出现)，且[0，left)一定大于pivot,[left,length-1]小于等于pivot
      return left;
}

var n = [12,21,13,16,22,17,6,30,2, 8, 10, 11,9, 5, 1, 7, 3, 4,25,14,29,18,24];
quickSort(n,0,n.length-1);
console.log(n);

var h=[1,2,3];
h.map((item)=>{console.log("item*item")});