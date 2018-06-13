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



var birth=1991;
var obj = {
   
    birth: 1990,
    getAge: () =>{
        console.log(this.birth)// this指向obj对象,因为它在obj中定义的
        // var fn = () => {
        //     console.log(this.birth);
        // }; 
        // return fn();
    }
};
obj.getAge(); 

var obj = {
    birth: 1990,
    getAge: function(){
        console.log(this.birth)// this指向obj对象,因为它在obj中定义的
        // var fn = () => {
        //     console.log(this.birth);//this指向window，因为它在getAge箭头函数中定义的，但是函数不能当对象，this只能找window
        // }; 
        // return fn();
    } 
};
obj.getAge(); 

class Person{  
    // 构造  
    constructor(x,y){  
        this.x = x;  
        this.y = y;  
    }  
//不需要加function标识，不能加，分隔
    toString(){  
        return (this.x + "的年龄是" +this.y+"岁");  
    }  
} ;

Object.assign(Person.prototype,{  
    getWidth(){  
        console.log('12');  
    },  
    getHeight(){  
        console.log('24');  
    }  
});  

console.log(Object.keys(Person.prototype));//["getWidth", "getHeight"]  
console.log(Object.getOwnPropertyNames(Person.prototype));//["constructor", "toString", "getWidth", "getHeight"]

let person = new Person('lis',8);  
console.log(person.toString());  
console.log(person.hasOwnProperty('x'));//true  
console.log(person.hasOwnProperty('y'));//true  
console.log(person.hasOwnProperty('toString'));//false  
console.log(person.__proto__.hasOwnProperty('toString'));//true

class ThisStu{  
  
    getName(){  
        return this.name();  
    }  
  
    name(){  
        return '王五';  
    }  
  
}  

  
//index.js  
let thisStu = new ThisStu();  
console.log(thisStu.getName());  
const {getName} = thisStu;  
//getName();  
//Cannot read property 'name' of undefined


class StaticMethodParent{  

    constructor(){
        this.fatherCon=function(){console.log("father构造方法")}
    }
    static getCommon(){  
        return '父类的静态方法';  
    }  

    fatherOri(){console.log("father原型方法")}
}  
 
//定义静态属性和静态方法  
class StaticMethod extends StaticMethodParent{  
    //因为ES6明确规定，Class内部只有静态方法，没有静态属性,所以ES6在类中定义静态属性都是错误的。  
   // static lastName = 'pcaca';//ES6错误  
  
    //ES6实例属性只能在constructor构造函数中定义  
    constructor() {  
        super();  
        this.width = '40cm';  
    }  
  
    getWidth(){  
        return this.width;//使用的时候需要加上this  
    }  
  
    //定义静态方法  
    static getAge(){  
        //子类可以调用父类的静态方法  
        console.log(super.getCommon());  
        return '获取Age的静态方法';  
    }  
};  
//定义静态属性  
StaticMethod.firstName = 'pca';  
  
console.log(StaticMethod.getAge());//父类的静态方法,获取Age的静态方法  
console.log(StaticMethod.getCommon());  //父类的静态方法
console.log(StaticMethod.firstName); //pca 
//console.log(StaticMethod.lastName); //类里不能定义静态属性
let staticMethod = new StaticMethod();  
console.log(staticMethod.width);  //40cm
console.log(staticMethod.getWidth());  //40cm
staticMethod.fatherCon();//father构造方法
staticMethod.fatherOri();//father原型方法
//staticMethod.getAge();//实例对象不调用静态方法

const node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };
  
  let { loc, loc: { start }, loc: { start: {line}  } } = node;


  function add(a, b) {
    return a + b;
}
const curry = (fn, ...arg) => {
    let all = arg || [],
        length = fn.length;
    //函数参数个数，arguments.length是实际输入参数个数
    return (...rest) => {
        let _args = all.slice(0); //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错
        _args.push(...rest);
        if (_args.length < length) {
            //未满足函数要求个数，就接着递归调用
            return curry.call(this, fn, ..._args);
        } else {
            return fn.apply(this, _args);
        }
    }
}
let add2 = curry(add, 2)
console.log(add2(8));
add2 = curry(add);
console.log(add2(2, 8));
console.log(add2(2)(8));
let test = curry(function(a, b, c) {
console.log(a + b + c);
})
test(1, 2, 3);
test(1, 2)(3);//实际分两步调用
test(1)(2)(3);


var fibonacci=function(){
    var memo=[0,1];
    //记忆函数，避免反复计算
    var fib=function(i){
        var result=memo[i];
       if(typeof result!=="number"){
           result=fib(i-1)+fib(i-2);
       }
       return result;
    }
    return fib;
}();

console.log(fibonacci(10));


p={
    x:2,
    y:3,
}
a={};
c={};
a.b=p;
c.b=p;

console.log("hello"+c.b.x)