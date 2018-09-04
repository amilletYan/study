/*----插入排序----*/
var insertSort = function (array) {
    var index = 1;
    while (index < array.length) {
        var i = index;
        var target = array[i];
        while (target > array[i - 1]) {
            array[i] = array[i - 1];
            i--;
        }
        array[i] = target;
        index++;
    }
};

var n = [9, 5, 1, 7, 3, 4, 6, 10, 2, 8, 11, 0];
var m = n.slice(0);

/*----快速排序----*/
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

//堆排序
heapfy用来形成二叉树，从数组中间开始（注意中间特殊性），将小的放在根
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
继续对交换下来的数进行比较，小的数已将放到了根部，此时small是放下来的数，需要比较它与它的叶子节点的大小
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

//BOM、DOM
javascript 有三部分构成
ECMAScript(核心):描述了JS的语法和基本对象。
文档对象模型（DOM）:处理网页内容的方法和接口,DOM是W3C 的标准； [所有浏览器公共遵守的标准]，document 是其的一个对象
浏览器对象模型（BOM）:与浏览器交互的方法和接口,BOM是各个浏览器厂商根据DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]，wiondow是其一个对象
window：是BOM 对象，而非 js 对象；javacsript是通过访问BOM（Browser Object Model）对象来访问、控制、修改客户端(浏览器)，
        浏览器的标签页，地址栏，搜索栏，书签栏，窗口放大还原关闭按钮，菜单栏等等
        浏览器的右键菜单
        document加载时的状态栏，显示http状态码等
        滚动条scroll bar
document：是DOM对象:body是DOM对象里的body子节点，即 <body> 标签；documentElement 是整个节点树的根节点root，即<html> 标签；
          当浏览器下载到一个网页，通常是HTML，这个HTML就叫document（当然，这也是 DOM 树中的一个 node），document 通常是整个 DOM 树的根节点。
          这个 document 包含了标题（document.title）、URL（document.URL）等属性，可以直接在 JS 中访问到。
          在一个浏览器窗口中可能有多个 document，例如，通过 iframe 加载的页面，每一个都是一个 document。

//node和element
Node是一个基类，DOM中的Element，Text和Comment都继承于它。不仅仅就这三个(attribute_node,notation_node...)
换句话说，Element，Text和Comment是三种特殊的Node，它们分别叫做ELEMENT_NODE,TEXT_NODE和COMMENT_NODE。
所以我们平时使用的html上的元素，即Element，是类型为ELEMENT_NODE的Node,<p>文本</p>这只算element_node，不算text_node
NodeList是Node的集合，ElementCollection是Element的集合。NodeList和ElementCollcetion都不是真正的数组
childNodes      children
parentNode      parentElement
nextSibling     nextElementSibling
previousSibling previousElementSibling



//搞清arguments,callee,caller
arguments是函数调用时，创建的一个类似的数组但又不是数组的对象，
并且它存储的是实际传递给函数的参数，并不局限于函数声明的参数列表
arguments instanceof Array   false
arguments instanceof Object  true
如同数组，arguments[0]=第一个参数
callee是arguments对象的一个成员，它的值为“正被执行的Function对象”。
caller是函数对象的一个属性，该属性保存着调用当前函数的函数。
如果没有父函数，则为null。

//搞清apply，call，bind
主要用在js对象各方法相互调用的时候，使当前this实例指针保持一致，或者在特殊情况下需要改变this指针
apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。
call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, args1,args2);即A对象调用B对象的方法。
bind：类似call
如果没有提供argArray和thisObj任何一个参数，那么Global对象将被用作thisObj，并且无法被传递任何参数。


//搞清slice(切片) splice(拼接) split(分裂) 
1.new=old.slice[start,end):不改变原数组或字符串，返回从start到end(end可省略，默认结尾)的数组或字符串
2.deleteArray=oldArray.splice(pos,n,element):改变原数组，返回被删除的项
  pos：要删除的第一项位置(包括)
  n:要删除的个数
  element：在pos处(前)插入的项
3.Array=string.split(separator,limit)
  separator：一个字符串或一个正则表达式。如果separator是一个空字符，会返回单字符的数组。
  limit：限制被分割的片段数量
  var s="我爱你好吗" 
  var a=s.split("",3)  （Array(3) [ "我", "爱", "你" ]）
  var s=a.join("")  ("我爱你")


//typeof 和 instanceof
typeof 一般只能返回如下几个结果："number"、"string"、"boolean"、"object"、"function" 和 "undefined"。
主要用于判断数据是不是基本数据类型：String、Number、Boolean、Null、Undefined
运算数为数字 typeof(x) == "number"
字符串 typeof(x) == "string" 
布尔值 typeof(x) == "boolean" 
对象,数组和null typeof(x) == "object" 
函数 typeof(x) == "function" 
undefined typeof undefined=="undefined"

instanceof 运算符用来测试一个对象在其原型链(__proto__)中是否存在一个构造函数的 prototype 属性。
每个对象都有一个__proto__属性(隐式原型)，指向创建该对象的函数的prototype。
console.log([] instanceof Array/Object);//true
console.log({} instanceof Object);//true
console.log(/\d/ instanceof RegExp);//true
console.log(function(){} instanceof Function/Object);//true
//''和1属于基本数据类型，没有原型链
console.log('' instanceof String);//false
console.log(1 instanceof Number);//false
如果表达式 obj instanceof Foo 返回true，则并不意味着该表达式会永远返回ture
因为Foo.prototype属性的值有可能会改变，改变之后的值很有可能不存在于obj的原型链上
另外一种情况下，就是改变对象obj的原型链的情况，借助于非标准的__proto__魔法属性，是可以实现的。
比如执行obj.__proto__ = {}之后，obj instanceof Foo就会返回false了。

var str1 = "abc";var str2 = new String("abc");
typeof str1  "string"
typeof str2  "object"
str1 instanceof String   false
str2 instanceof String   true
通用(str instanceof String) || (typeof str).toLowerCase() == 'string'
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

    false为冒泡，默认也是冒泡
    div3.addEventListener('click',function(e){
        alert('div3');
        e.stopPropagation();//阻止冒泡，没有这句：div2捕获 div3 div2冒泡 div1
        e.preventDefault();//阻止默认，没有这句：弹窗结束后跳往百度
      },false);
</script>
</html> */

//JSON
parse把服务器传来的数据（一般为字符串）解析为javascript对象
stringify把将 JavaScript 对象转换为字符串。
eval() 可解析 JSON 文本，然后生成 JavaScript 对象。必须把文本包围在括号中
var txt = '{ "sites" : [' +
'{ "name":"菜鸟教程" , "url":"www.runoob.com" },' +
'{ "name":"google" , "url":"www.google.com" },' +
'{ "name":"微博" , "url":"www.weibo.com" } ]}';
var obj = eval ("(" + txt + ")");//obj是javascript对象
var obj = JSON.parse (txt);//obj是javascript对象
var obj = eval('('+JSON.stringify(obj)+')');//obj是javascript对象


class Person{  
    构造  
    constructor(x,y){  
        this.x = x;  
        this.y = y;  
    }  
不需要加function标识，不能加，分隔
    toString(){  
        return (this.x + "的年龄是" +this.y+"岁");  
    }  
} ;
Object.assign方法可以给对象Person动态的增加方法,而Person.prototype = {}是覆盖对象
Object.assign(Person.prototype,{  
    getWidth(){  
        console.log('12');  
    },  
    getHeight(){  
        console.log('24');  
    }  
});  


1.toString方法是Person类内部定义的方法，ES6中它是不可枚举的
es6
console.log(Object.keys(Person.prototype));//["getWidth", "getHeight"]  
console.log(Object.getOwnPropertyNames(Person.prototype));//["constructor", "toString", "getWidth", "getHeight"]


2.对象上有x,y属性,但是没有toString属性。也就是说x,y是定义在this对象上,toString定义在类上。
let person = new Person('lis',8);  
console.log(person.toString());  
console.log(person.hasOwnProperty('x'));//true  
console.log(person.hasOwnProperty('y'));//true  
console.log(person.hasOwnProperty('toString'));//false  
console.log(person.__proto__.hasOwnProperty('toString'));//true

3.constructor方法是类的构造函数是默认方法，通过new命令生成对象实例时，自动调用该方法。
一个类必须有constructor方法，如果没有显式定义，一个默认的constructor方法会被添加。所以即使你没有添加构造函数,也是有默认的构造函数的。
一般constructor方法默认返回实例对象this，但是也可以指定constructor方法返回一个全新的对象,让返回的实例对象不是该类的实例。
 class ConstructorStu{  
    // 构造  
    constructor() {  
        console.log('constructor');  
        return new Article();  
    }  
}  
let cons =  new ConstructorStu();  
cons.constructor();  //没运行
类的构造函数，不使用new是没法调用的,即使你使用实例对象去调用也是不行的


4.静态方法
1.在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用
2.StaticMethod继承StaticMethodParent,StaticMethodParent的静态方法，可以被StaticMethod继承，非静态方法也会被继承。
3.静态方法只能在静态方法中调用,不能在实例方法中调用，也不能被实例对象调用
4.Class内部只有静态方法，没有静态属性。
class StaticMethodParent{  

    constructor(){
        this.fatherCon=function(){console.log("father构造方法")}
    }
    static getCommon(){  
        return '父类的静态方法';  
    }  

    fatherOri(){console.log("father原型方法")}
}  
 
定义静态属性和静态方法  
class StaticMethod extends StaticMethodParent{  
    因为ES6明确规定，Class内部只有静态方法，没有静态属性,所以ES6在类中定义静态属性都是错误的。  
   static lastName = 'pcaca';//ES6错误  
  
    ES6实例属性只能在constructor构造函数中定义  
    constructor() {  
        super();  
        this.width = '40cm';  
    }  
  
    getWidth(){  
        return this.width;//使用的时候需要加上this  
    }  
  
    定义静态方法  
    static getAge(){  
        子类可以调用父类的静态方法  
        console.log(super.getCommon());  
        return '获取Age的静态方法';  
    }  
};  
定义静态属性  
StaticMethod.firstName = 'pca';  
  
console.log(StaticMethod.getAge());//父类的静态方法,获取Age的静态方法  
console.log(StaticMethod.getCommon());  //父类的静态方法
console.log(StaticMethod.firstName); //pca 
console.log(StaticMethod.lastName); //类里不能定义静态属性
let staticMethod = new StaticMethod();  
console.log(staticMethod.width);  //40cm
console.log(staticMethod.getWidth());  //40cm
staticMethod.fatherCon();//father构造方法
staticMethod.fatherOri();//father原型方法
staticMethod.getAge();//实例对象不调用静态方法

5.get、set
创建一个类
var Person = function () {
    属性：姓名，注意属性名与get和set的名称不能重复否则会报错
    this._username = 'tom';
}
在原型中给set和get方法
在原型中get和set方法的名称是一样的，方便调用
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
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象
然后进行属性名的匹配
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
  loc: { start }找到loc对应的value，传给{start}，再从value里找start对应的value，传给start
  var {x: y = 3} = {x: 5};
y // 5


/*----数组解构赋值----*/
ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];
x // 1
let [z = 1] = [null];
z // null
（1）交换变量的值 [x, y] = [y, x];
（2）从函数返回多个值function example() {return [1, 2, 3];}let [a, b, c] = example();
（3）提取JSON
let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  };
  let { id, status, data: number } = jsonData;
  console.log(id, status, number);
（4）函数默认值 {asy,glo}={asy:true,glo=1},这是为函数参数指定默认值
下面是为变量asy和glo指定默认值
function adg(url, {asy = true,glo = 1} ={}) {
      if(asy)
   console.log(glo)
  };
adg(12,{glo:2});


//ES6扩展运算符
任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
扩充：当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
1. 展开运算符(spread operator)，把东西展开。可以用在array和object上
    let a = [1,2,3];
    let b = [0, ...a, 4]; // [0,1,2,3,4]
    let obj = { a: 1, b: 2 };
    let obj3 = { ...obj, a: 3 }; // { a:3, b:2 }
2.剩余操作符(rest operator)，是解构的一种，意思就是把剩余的东西放到一个array里面赋值给它
    let a = [1,2,3];
    let [b, ...[c,d,e]] = a;
    b; // 1
    c; // 2
    d; // 3
    e; // undefined
     
    

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

//变量提升和暂时性死区
function f() { console.log('I am outside!'); }
(function () {
  f();//
  if (false) {
  var f = function(){ console.log('I am outside!'); }
  }
  //仅有这句时，TypeError: f is not a function，对于f的声明在后面但是它被提升(即使在false中)，覆盖了外面的f，但是声明之前的f值为undefined
  let f = function(){ console.log('I am outside!'); }
  //仅有这句时,ReferenceError: can't access lexical declaration `f' before initialization，let不存在变量提升
  //但是在代码块内，使用let命令声明变量之前，该变量都是不可用的，所以它是由于暂时性死区导致外面的f不可用
}());

再来说说const，const 声明的变量都会被认为是常量，意思就是它的值被设置完成后就不能再修改了。
还有，如果const的是一个对象，对象所包含的值是可以被修改的。抽象一点儿说，就是对象所指向的地址没有变就行。

var functionOne = function() {};//函数表达式，创建了一个匿名函数，然后将匿名函数赋值给一个变量
function functionTwo() {}//函数声明（会被提升），有functionTwo.name="functionTwo"
不同点在于functionOne只会在到达赋值的那一行才会被真正定义，而functionTwo会在包含它的函数或script脚本执行的时候马上被定义
function x(){alert(2)};
x();//3 ,最后一个函数声明被提升，函数表达式还没执行;var x虽然存在变量提升，但是此时它还没有定义，只是声明了，所以依然调用函数x而不是变量x
var x = function(){alert(0)};
x();//0
var x=function(){alert(1)};
x();//1
function x(){alert(3)};
x();//1 ，后面的函数表达式执行后，x有了定义覆盖了被提升的函数声明




传统上，JavaScript 只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';
s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false
上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

1.for in适合遍历对象，for of遍历数组
使用for in 也可以遍历数组，但是会存在以下问题：
1).index索引为字符串型数字，不能直接进行运算
2).遍历顺序有可能不是按照实际数组的内部顺序
3).使用for in会遍历数组所有的可枚举属性，包括原型。
2.for in遍历的是数组的索引（即键名），而for of遍历的是数组元素值,不包括数组的原型属性
let arr = [3, 5, 7];
arr._proto_.foo = 'hello';
for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}
for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}
3.for in 可以遍历到myObject的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性
for (var key in myObject) {
　　if（myObject.hasOwnProperty(key)){
　　　　console.log(key);
　　}
}
  
/*Set*/
1.类似于数组，但是成员的值都是唯一的，没有重复的值。
2.Set 函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。
const set = new Set([1, 2, 3, 4, 4]);
3.向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。在 Set 内部，两个NaN是相等。两个对象总是不相等的。
4.Array.from方法可以将 Set 结构转为数组。
这就提供了去除数组重复成员的另一种方法。
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]

/*Map*/
const map = new Map();
任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构都可以当作Map构造函数的参数
const m2 = new Map([['baz', 3]]);[['baz', 3]],第一个[]是数组具有Iterator 接口，第二个[]是成员，它是双元素的数组
map.set(['a'], 555);
map.get(['a']) // undefined
上面代码的set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的，因此get方法无法读取该键，返回undefined。
同理，同样的值的两个实例，在 Map 结构中被视为两个键。
Map 转为数组，使用扩展运算符（...）。
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
[ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

//Proxy
  Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
  var proxy = new Proxy(target, handler);
  target参数表示所要拦截的目标对象(为空针对就是proxy对象)，handler参数也是一个对象，用来定制拦截行为(为空proxy等同于原对象(引用))
  如果要绑定一个函数的this对象，可以这样写fn.apply(obj, args)，但是如果函数定义了自己的apply方法，就只能写成Function.prototype.apply.call(fn, obj, args)
  （Function.prototype.apply）.call(fn, obj, args)与fn.apply(obj, args)对比，Function.prototype.apply等同于fn，call等同于apply，只是call形参不是数组
  将Function.prototype.apply函数的this绑定为fn，然后执行绑定this后的apply函数(就是执行fn的原生apply方法)，fn.apply(obj, args),再次将函数fn的this绑定为obj
  采用Reflect对象可以简化这种操作,Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
  var twice = {
      apply (target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
      }
    };
    function sum (left, right) {
      return left + right;
    };
    var proxy = new Proxy(sum, twice);
    //apply方法拦截函数的调用、call和apply操作。
    //apply方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
    //Function.prototype.apply.call(sum, undefined, [1, 2]),target为sum,ctx为undefined，args为[1, 2]
    //将sum的this绑定为window(undefined时默认绑定到全局)，然后传入[1,2]执行sum
    proxy(1, 2) // 6
    //Function.prototype.apply.call(sum, null, 5,6)，此时ctx为null
    proxy.call(null, 5, 6) // 22
    proxy.apply(null, [7, 8]) // 30

//Reflect
    将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
    作用：1.这样就可以将共用的方法与原型脱离，即使你修改了原型方法，在Reflect依然能的到原生方法
          2.修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false
          3.让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

//Promise
    简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
    Promise 是一个对象，提供统一的 API，各种异步操作都可以用同样的方法进行处理。
    有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
    只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
    Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected
    区别：如果改变已经发生了，你再对Promise对象添加回调函数（通过.then添加回调），也会立即得到这个结果。
          事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。
    const promise = new Promise(function(resolve, reject) {
        // ... some code
        if (/* 异步操作成功 */){
            resolve(value);
        } else {
            reject(error);
        }
        });
    函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
    value和error两个参数会被传递到.then中对应的两个函数中
    promise.then(function(value) {
        // success
      }, function(error) {
        // failure
      });
    第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数（可选）是Promise对象的状态变为rejected时调用

 //Symbol
1.原始数据类型Symbol，表示独一无二的值。let s = Symbol(); typeof s// "symbol"
  它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
  对象的属性名现在可以有两种类型，一种是原来就有的字符串
  另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
  这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
2.构造
  Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
  let s1 = Symbol('foo'); s1.toString() // "Symbol(foo)"
3.属性名遍历
  Symbol 作为属性名，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
  但是，它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
  Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
4.Symbol.for()，Symbol.keyFor()
  它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
  如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
  Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
  let s1 = Symbol.for("foo");
  Symbol.keyFor(s1) // "foo"
  let s2 = Symbol("foo");
  Symbol.keyFor(s2) // undefined
5.Symbol.hasInstance：它是ES6提供的Symbol的一个实例（内置的 Symbol 值），用作对象的一个属性名，指向一个函数，
  这个函数在对象使用instanceof运算符时会调用
  foo instanceof Foo等同于Foo[Symbol.hasInstance](foo)
  class MyClass {
    [Symbol.hasInstance](foo) {
      return foo instanceof Array;
    }
  }
  [1, 2, 3] instanceof new MyClass() // true

//Iterator
执行这个属性(遍历器生成函数),会返回一个遍历器对象。该对象的根本特征就是具有next方法。
每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。
原生具备 Iterator 接口的数据结构如下。Array;Map;Set;String;TypedArray;函数的arguments对象;NodeList 对象
Iterator 的作用有三个：
1.为各种数据结构，提供一个统一的、简便的访问接口；
  对象添加 Iterator 接口的例子。
  let obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
      const self = this;
      let index = 0;
      return {
        next() {
          if (index < self.data.length) {
            return {
              value: self.data[index++],
              done: false
            };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
  };


  存在数值键名(0,1,2)和length属性，可以直接使用数组的iterator生成器
  let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
  }
  
  2.使得数据结构的成员能够按某种次序排列；

  3.Iterator默认使用场合
  1）for...of
  2）对数组和 Set 结构进行解构赋值时
  let set = new Set().add('a').add('b').add('c');
  let [x,y] = set;// x='a'; y='b'
  let [first, ...rest] = set;// first='a'; rest=['b','c'];
  3）扩展运算符（...）只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组。
  
//Generator
  Generator 函数是一个状态机，封装了多个内部状态。
  执行 Generator 函数会返回一个遍历器对象，还是一个遍历器对象生成函数。
  返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。
1.与Iterator接口关系
  可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口
  var myIterable = {};
  myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
  };
  [...myIterable] // [1, 2, 3]
  Generator 函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身。
  function* gen(){}
  var g = gen();
  g[Symbol.iterator]() === g// true
2.next 方法的参数
  function* foo(x) {
    var y = 2 * (yield (x + 1));//含有yield的语句被暂停不执行，但它的表达式会被返回
    var z = yield (y / 3);
    return (x + y + z);
  }
  var b = foo(5);
  //第一次执行next方法，等同于启动执行 Generator 函数的内部代码
  b.next() // { value:6, done:false }，第一次next没有上一个yield，V8 引擎直接忽略第一次使用next方法时的参数
  b.next(12) // { value:8, done:false }，给上一个yield赋值，所以y=2*12
  b.next(13) // { value:42, done:true }，z=13
3.for...of 循环
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;//不包括return返回的对象
  }
  for (let v of foo()) {
    console.log(v);
  }// 1 2 3 4 5
4.yield* 表达式
  如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象
  yield*后面的 Generator 函数（没有return语句时），等同于在 Generator 函数内部，部署一个for...of循环。
  function* gen(){
    yield* ["a", "b", "c"];
  }
  gen().next() // { value:"a", done:false }
5.this
  Generator函数g返回的遍历器obj，是g的实例，而且继承了g.prototype
  但是，如果把g当作普通的构造函数，并不会生效，因为g返回的总是遍历器对象，而不是this对象。
  function* g() {this.a="a";yield 1;}
  g.prototype.hello = function () {return 'hi!';};
  let obj = g();
  obj.a;//undefined
  obj.next();//Object { value: 1, done: false }
  obj instanceof g // true
  obj.hello() // 'hi!'
  Generator 函数返回一个正常的对象实例，既可以用next方法，又可以获得正常的this,方法：
  function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
  }
  function F() {
    return gen.call(gen.prototype);//F返回遍历器函数，call方法将gen.prototype绑定为遍历器对象的this，这样访问f.a实际访问的是函数gen原型上的a
  } 
  var f = new F();
  f.__proto__==gen.prototype//true
  f.next();  // Object {value: 2, done: false}
  f.next();  // Object {value: 3, done: false}
  f.next();  // Object {value: undefined, done: true} 
  f.a // 1
  f.b // 2
  f.c // 3

  