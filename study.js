/*----插入排序----*/
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

/*----快速排序----*/
// var quickSort=function(array,left,right){
//     if(array.length>1){
        
//         var index=partition(array,left,right);
//         if(left<index-1){
//             quickSort(array,left,index-1);
//         }
//         if(right>index){
//             quickSort(array,index,right);
//         }
 
//     }
//  }
 
//  var partition=function(array,left,right){
//      var pivot=array[Math.floor((left+right)/2)];
//        while(left<=right){
      
//            while(array[left]>pivot){
//                left++;
//            }
//            while(array[right]<pivot){
//                right--;
//            }
//            if(left<=right){
//                [array[left],array[right]]=[array[right],array[left]];
//                left++;
//                right--;
//                //此处一定要++--，因为若left=right，会死循环
//            }
//        }
//        //返回的left一定是right=left-1(前提pivot没有重复出现)，且[0，left)一定大于pivot,[left,length-1]小于等于pivot
//        return left;
//  }
 
//  var n = [12,21,13,16,22,17,6,30,2, 8, 10, 11,9, 5, 1, 7, 3, 4,25,14,29,18,24];
//  quickSort(n,0,n.length-1);
//  console.log(n);

//堆排序
//heapfy用来形成二叉树，从数组中间开始（注意中间特殊性），将小的放在根
var heapfy=function(array,i){
var left=i*2+1;
var right=i*2+2;
var small=i;
var length=array.length;
if(left<length&&array[left]<array[small]){
small=left;
}
if(right<length&&array[right]<array[small]){
small=right;
}
if(small!=i){
[array[i],array[small]]=[array[small],array[i]];
//继续对交换下来的数进行比较，小的数已将放到了根部，此时small是放下来的数，需要比较它与它的叶子节点的大小
heapfy(array,small);
}
}
var heapSort=function(array){
for(var i=Math.floor(array.length/2)-1;i>=0;i--){
heapfy(array,i);
}
var length=array.length;
var newArray=[];
while(length>0){
newArray.push(array[0]);//将最小的提出，末尾补上，此时需要重新构建二叉树，但不是从中间开始，因为除了第一位可能有错，其他节点都对
[array[0],array[length-1]]=[array[length-1],array[0]];
array=array.slice(0,--length)
heapfy(array,0)
}
console.log(newArray);
};
var n=[11,12,4,5,2,7,23,15,22,6,8,112,67,18,0,79,32,45,67,13,43,53,78];
heapSort(n);


//搞清arguments,callee,caller
// arguments是函数调用时，创建的一个类似的数组但又不是数组的对象，
// 并且它存储的是实际传递给函数的参数，并不局限于函数声明的参数列表
// arguments instanceof Array   false
// arguments instanceof Object  true
// 如同数组，arguments[0]=第一个参数
// callee是arguments对象的一个成员，它的值为“正被执行的Function对象”。
// caller是函数对象的一个属性，该属性保存着调用当前函数的函数。
// 如果没有父函数，则为null。

//搞清apply，call，bind
// 主要用在js对象各方法相互调用的时候，使当前this实例指针保持一致，或者在特殊情况下需要改变this指针
// apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
// call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。
// bind：类似call
// 如果没有提供argArray和thisObj任何一个参数，那么Global对象将被用作thisObj，并且无法被传递任何参数。


// 搞清slice(切片) splice(拼接) split(分裂) 
// 1.new=old.slice[start,end):不改变原数组或字符串，返回从start到end(end可省略，默认结尾)的数组或字符串
// 2.deleteArray=oldArray.splice(pos,n,element):改变原数组，返回被删除的项
//   pos：要删除的第一项位置(包括)
//   n:要删除的个数
//   element：在pos处(前)插入的项
// 3.Array=string.split(separator,limit)
//   separator：一个字符串或一个正则表达式。如果separator是一个空字符，会返回单字符的数组。
//   limit：限制被分割的片段数量
//   var s="我爱你好吗" 
//   var a=s.split("",3)  （Array(3) [ "我", "爱", "你" ]）
//   var s=a.join("")  ("我爱你")

//冒泡、捕获、阻止默认、阻止冒泡
/* <html>
<div id="div1">
        div1
    <div id="div2">
                div2
        <a id="div3" href="http://www.baidu.com">
                    div3
        </a>
    </div>
</div>
<script>
var div1 =document.getElementById('div1');
var div2 =document.getElementById('div2');
var div3 =document.getElementById('div3');
    div1.addEventListener('click',function(){
        alert('div1');
      },false);
    div2.addEventListener('click',function(){
        alert('div2捕获');
      },true);

    div2.addEventListener('click',function(){
        alert('div2冒泡');
      },false);

    //false为冒泡，默认也是冒泡
    div3.addEventListener('click',function(e){
        alert('div3');
        e.stopPropagation();//阻止冒泡，没有这句：div2捕获 div3 div2冒泡 div1
        e.preventDefault();//阻止默认，没有这句：弹窗结束后跳往百度
      },false);
</script>
</html> */

//JSON
//parse把服务器传来的数据（一般为字符串）解析为javascript对象
//stringify把将 JavaScript 对象转换为字符串。
//eval() 可解析 JSON 文本，然后生成 JavaScript 对象。必须把文本包围在括号中
var txt = '{ "sites" : [' +
'{ "name":"菜鸟教程" , "url":"www.runoob.com" },' +
'{ "name":"google" , "url":"www.google.com" },' +
'{ "name":"微博" , "url":"www.weibo.com" } ]}';
var obj = eval ("(" + txt + ")");//obj是javascript对象
var obj = JSON.parse (txt);//obj是javascript对象
var obj = eval('('+JSON.stringify(obj)+')');//obj是javascript对象






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


//Object.assign方法可以给对象Person动态的增加方法,而Person.prototype = {}是覆盖对象
Object.assign(Person.prototype,{  
    getWidth(){  
        console.log('12');  
    },  
    getHeight(){  
        console.log('24');  
    }  
});  


//1.toString方法是Person类内部定义的方法，ES6中它是不可枚举的
//es6
console.log(Object.keys(Person.prototype));//["getWidth", "getHeight"]  
console.log(Object.getOwnPropertyNames(Person.prototype));//["constructor", "toString", "getWidth", "getHeight"]


//2.对象上有x,y属性,但是没有toString属性。也就是说x,y是定义在this对象上,toString定义在类上。
let person = new Person('lis',8);  
console.log(person.toString());  
console.log(person.hasOwnProperty('x'));//true  
console.log(person.hasOwnProperty('y'));//true  
console.log(person.hasOwnProperty('toString'));//false  
console.log(person.__proto__.hasOwnProperty('toString'));//true

//3.constructor方法是类的构造函数是默认方法，通过new命令生成对象实例时，自动调用该方法。
//一个类必须有constructor方法，如果没有显式定义，一个默认的constructor方法会被添加。所以即使你没有添加构造函数,也是有默认的构造函数的。
//一般constructor方法默认返回实例对象this，但是也可以指定constructor方法返回一个全新的对象,让返回的实例对象不是该类的实例。
//  class ConstructorStu{  
//     // 构造  
//     constructor() {  
//         console.log('constructor');  
//         return new Article();  
//     }  
// }  
// let cons =  new ConstructorStu();  
// cons.constructor();  //没运行
//类的构造函数，不使用new是没法调用的,即使你使用实例对象去调用也是不行的


//4.静态方法
//1.在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
//2.StaticMethod继承StaticMethodParent,StaticMethodParent的静态方法，可以被StaticMethod继承，非静态方法也会被继承。
//3.静态方法只能在静态方法中调用,不能在实例方法中调用，也不能被实例对象调用
//4.Class内部只有静态方法，没有静态属性。
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

//5.get、set
//创建一个类
var Person = function () {
    //属性：姓名，注意属性名与get和set的名称不能重复否则会报错
    this._username = 'tom';
}
//在原型中给set和get方法
//在原型中get和set方法的名称是一样的，方便调用
Person.prototype = {
    set username(name) {
        console.log('调用username的set方法');
        this._username = name;
    },
    get _username() {
        console.log('调用了username的get方法');
        return this._username;
    }
}
var p = new Person();
p.username = 'foo';//调用了username的set方法
console.log(p.username);//undefined,因为get方法名称和属性同名了


/*----对象解构赋值----*/
//解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
//然后进行属性名的匹配
let {toString: s} = 123;
s === Number.prototype.toString // true

const node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };
  
  let { loc, loc: { start }, loc: { start: {line}  } } = node;
  //loc: { start }找到loc对应的value，传给{start}，再从value里找start对应的value，传给start
  var {x: y = 3} = {x: 5};
y // 5


/*----数组解构赋值----*/
//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
//所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];
x // 1
let [z = 1] = [null];
z // null
//（1）交换变量的值 [x, y] = [y, x];
//（2）从函数返回多个值function example() {return [1, 2, 3];}let [a, b, c] = example();
//（3）提取JSON
// let jsonData = {
//     id: 42,
//     status: "OK",
//     data: [867, 5309]
//   };
//   let { id, status, data: number } = jsonData;
//   console.log(id, status, number);
// （4）函数默认值 {asy,glo}={asy:true,glo=1},这是为函数参数指定默认值
//下面是为变量asy和glo指定默认值
// function adg(url, {asy = true,glo = 1} ={}) {
//       if(asy)
//    console.log(glo)
//   };
// adg(12,{glo:2});


//ES6扩展运算符
// 任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
// 扩充：当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
// 1. 展开运算符(spread operator)，把东西展开。可以用在array和object上
//     let a = [1,2,3];
//     let b = [0, ...a, 4]; // [0,1,2,3,4]
//     let obj = { a: 1, b: 2 };
//     let obj3 = { ...obj, a: 3 }; // { a:3, b:2 }
// 2.剩余操作符(rest operator)，是解构的一种，意思就是把剩余的东西放到一个array里面赋值给它
//     let a = [1,2,3];
//     let [b, ...[c,d,e]] = a;
//     b; // 1
//     c; // 2
//     d; // 3
//     e; // undefined
     
    

//柯里化
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

//深浅拷贝
var o = {
name: "tom",
age: 39,
num: [1, 4, 7, 9],
gf: {
name: ["a", "b", "c"],
age: 18,
parents:{
mother:{name:"am",
hus:["am1","am2"]},
father:"af"
}
},
say: function () { console.log("hello") }
}

var object = function (o) {
var result;
if (typeof o == "object") {
result = {};
for (var pro in o) {
if (typeof o[pro] == "object") result[pro]=deepcopy(o[pro]);
else result[pro] = o[pro];
}
}
else result = o;
//深拷贝
function deepcopy(ele) {
var temp;
if(ele instanceof Array){
temp=ele.slice(0);
}else if(ele instanceof Function)
{
temp=ele;
}else{
temp={};
for(var p in ele){
if (typeof ele[p] == "object") temp[p]=deepcopy(ele[p]);
else temp[p]=ele[p];
}
}
return temp;
};
return result;
}
var r=object(o);



//判断是否为数组
var arr=[1,2];
console.log(Object.prototype.toString.apply(arr)==='[object Array]');//true
console.log(Array.prototype.toString.apply(arr));//1,2
console.log(arr.toString());//1,2
console.log(arr.constructor===Array);//true

// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
   //var f = undefined;
  if (false) {
    //块级作用域内声明的函数，行为类似于var声明的变量。如上
    function f() { console.log('I am inside!'); }
  }
  //f();//TypeError: f is not a function
}());


// 传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
// let s = 'Hello world!';
// s.startsWith('world', 6) // true
// s.endsWith('Hello', 5) // true
// s.includes('Hello', 6) // false
// 上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

// 1.for in适合遍历对象，for of遍历数组
// 使用for in 也可以遍历数组，但是会存在以下问题：
// 1).index索引为字符串型数字，不能直接进行运算
// 2).遍历顺序有可能不是按照实际数组的内部顺序
// 3).使用for in会遍历数组所有的可枚举属性，包括原型。
// 2.for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值,不包括数组的原型属性
// 3.for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性
// for (var key in myObject) {
// 　　if（myObject.hasOwnProperty(key)){
// 　　　　console.log(key);
// 　　}
// }
  
/*Set*/
// 1.类似于数组，但是成员的值都是唯一的，没有重复的值。
// 2.Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
// const set = new Set([1, 2, 3, 4, 4]);
// 3.向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。在 Set 内部，两个NaN是相等。两个对象总是不相等的。
// 4.Array.from方法可以将 Set 结构转为数组。
// 这就提供了去除数组重复成员的另一种方法。
// function dedupe(array) {
//   return Array.from(new Set(array));
// }
// dedupe([1, 1, 2, 3]) // [1, 2, 3]


// const map = new Map();
//任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数
//const m2 = new Map([['baz', 3]]);[['baz', 3]],第一个[]是数组具有Iterator 接口，第二个[]是成员，它是双元素的数组
// map.set(['a'], 555);
// map.get(['a']) // undefined
// 上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
// 同理，同样的值的两个实例，在 Map 结构中被视为两个键。
// Map 转为数组，使用扩展运算符（...）。
// const myMap = new Map()
//   .set(true, 7)
//   .set({foo: 3}, ['abc']);
// [...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]


// Symbol
// 1.原始数据类型Symbol，表示独一无二的值。let s = Symbol(); typeof s// "symbol"
//   它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
//   对象的属性名现在可以有两种类型，一种是原来就有的字符串
//   另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
//   这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
// 2.构造
//   Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
//   let s1 = Symbol('foo'); s1.toString() // "Symbol(foo)"
// 3.属性名遍历
//   Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
//   但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
//   Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
// 4.Symbol.for()，Symbol.keyFor()
//   它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
//   如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
//   Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
//   let s1 = Symbol.for("foo");
//   Symbol.keyFor(s1) // "foo"
//   let s2 = Symbol("foo");
//   Symbol.keyFor(s2) // undefined
// 5.Symbol.hasInstance：它是ES6提供的Symbol的一个实例（内置的 Symbol 值），用作对象的一个属性名，指向一个函数，
//   这个函数在对象使用instanceof运算符时会调用
//   foo instanceof Foo等同于Foo[Symbol.hasInstance](foo)
//   class MyClass {
//     [Symbol.hasInstance](foo) {
//       return foo instanceof Array;
//     }
//   }
//   [1, 2, 3] instanceof new MyClass() // true

//Iterator
一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”，才可以使用for...of