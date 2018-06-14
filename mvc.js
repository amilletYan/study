/*----寄生继承----*/
function inheritObjection(o){
    function tempF(){};
    tempF.prototype=o;
    return new tempF();
}
 

function inheritPrototype(son,father){
    var temp=inheritObjection(father.prototype);
    temp.constructor=son
    son.prototype=temp;
}


function son(name,age){father.call(this,name);this.age=age};
function father(name){this.name=name};
father.prototype.gf=["xf","jy"];
inheritPrototype(son,father);
var s1=new son("me",18);
var s2=new son("you",19);
s1.gf.push("xs");
console.log(s2.gf);//s2依然被修改了
// //寄生组合式继承与组合继承的区别：
// // 都用到了构造函数继承，但是在原型继承上组合继承是通过类式继承，寄生组合继承是通过寄生式继承
// // 子类原型继承父类原型，并不是通过son.prototype=new father();
// // 而是function tempF(){};tempF.prototype=father.prototype;temp=new tempF();son.prototype=temp;
// // 这样s=new son();s._proto_=son.prototype;son.prototype._proto_=temp._proto_=tempF.prototype=father.prototype,所以s的原型链就是son.prototype--->father.prototype--->Object.prototype
// //注意temp作为中间体是son.prototype，他应该有constructor属性，但是temp只是tempF的实例没有这个属性，所以要手动设置其constructor为son
// // 与组合继承相比好处就是，在原型继承上不会再次调用父类构造函数,，但是依然共享父类原型属性


/*----工厂模式----*/
var Factory=function(type,content){
    if(this instanceof Factory){
        return this[type](content);
    }else
    return new Factory(type,content);
}

var animal=function(name,age){this.name=name;this.age=age}
animal.prototype.action=function(){console.log("hi i`m"+this.gf)};

Factory.prototype={
    cat:function(content){
        var cat={gf:content[2]};
        animal.call(cat,content[0],content[1]);
        return cat;       
    },
    dog:function(content){
        var dog={gf:content[2]};
        animal.call(dog,content[0],content[1]);
        return dog;       
    },
    bird:function(content){
        var bird={gf:content[2]};
        animal.call(bird,content[0],content[1]);
        return bird;       
    },  
}

var content=["tom","12","mary"];
var cat=Factory("cat",content);
var content=["jack","16","rose"];
var dog=new Factory("dog",content);


//发布订阅模式
//发布订阅模式,有一个消息队列，key是消息类型，value是订阅者的动作函数
//学生订阅一个问题，并且给该问题配一个回答函数
//老师发布一个问题，遍历消息队列，将该问题对应的订阅者的动作函数执行
//学生取消一个问题订阅，将消息队列中该问题下该同学的回答动作函数删除
var observer=(function(){
    var _message={};
    return {
    regist:function(type,fn){
    if(typeof _message[type]=="undefined"){
    _message[type]=[fn];
    }else{
    _message[type].push(fn);
    }
    },
    fire:function(type,args){
    if(typeof _message[type]=="undefined")
    return;
    var events={type:type,args:args||{}};
    for(var i=0;i<_message[type].length;i++){
    _message[type][i].call(this,events);
    }
    },
    remove:function(type,fn){
    if(_message[type] instanceof Array){
    for(var i=0;i<_message[type].length;i++){
    _message[type][i]==fn&&_message[type].splice(i,1);
    }
    }
    }
    }
    })();
    
    var student=function(result){
    this.say=function(){
    console.log(result);
    };
    };
    student.prototype.answer=function(question){
    observer.regist(question,this.say);
    };
    student.prototype.sleep=function(question){
    observer.remove(question,this.say);
    }
    
    var teacher=function(){};
    teacher.prototype.ask=function(question){
    observer.fire(question);
    }
    
    var s1=new student("学生1回答问题");
    var s2=new student("学生2回答问题");
    var s3=new student("学生3回答问题");
    s1.answer("什么是爱");
    s1.answer("什么是恨");
    s2.answer("什么是爱");
    s2.answer("什么是恨");
    s3.answer("什么是爱");
    s2.sleep("什么是恨");
    var t=new teacher();
    t.ask("什么是恨");



//MVC model-view-controller 模型-视图-控制器，将业务逻辑、数据、视图分离
//比如创建导航栏，在数据层存储导航栏的文本、图标、连接等
//在视图层设置导航栏容器的dom节点，和每个导航按钮模板，通过调用数据层数据
//控制器层为视图添加交互方法，比兔元素绑定事件交互，动画特效等
//var $ = require('jquery')(require("jsdom").jsdom().defaultView);
var MVC = (function () {
    //初始化MVC对象
    var MVC = MVC || {};
    //初始化MVC数据模型
    MVC.model = (function () { })();
    //初始化MVC视图层
    MVC.view = (function () { })();
    //初始化MVC控制器层
    MVC.ctrl = (function () { })();
    return MVC;
})();
//三个对象是一个自动执行函数，是为了为其他对象调用提供接口方法
MVC.model = (function () {
    //内部数据对象
    var M = {};
    M.data = {};
    M.conf = {};
    return {
        //获取服务器端数据
        getData: function (m) {
            //根据数据字段获取数据
            return M.data[m];
        },
        getConf: function (c) {
            //根据配置数据字段获取配置数据
            return M.conf[c];
        },
        setData: function (m, v) {
            //设置数据字段m对应的数据v
            M.data[m] = v;
            //这里调用setData的肯定是return的这个匿名对象，也就是MVC.model,因此可以连续调用函数
            //console.log(MVC.model.setData("tool",[1,2,3]).getData("tool"));
            //MVC.model.setData("tool",[1,2,3]);console.log(MVC.model.getData("tool"));
            return this;
        },
        setConf:function(c,v){
            M.conf[c]=v;
            return this;
        }
    }
})();

MVC.view=(function(){
    //模型数据层对象操作方法引用
    var M=MVC.model;
    //内部视图创建方法对象
    var V={};
    //获取视图接口方法
    return function(v){
        //根据视图名称返回视图对应方法
        V(v)();
    }
})();

MVC.ctrl=(function(){
    //模型数据层对象操作方法引用
    var M=MVC.model;
    //视图数据层对象操作方法引用
    var V=MVC.view;
    //控制器创建方法对象
    var C={};
})();

//MVP模式
//在MVC中视图层与数据层耦合在一起，视图层直接调用数据层的数据，而这一切控制器并不知情，当数据发生变化时，视图层和控制层都要修改
//P指管理层（presenter），负责管理数据、UI视图创建、交互逻辑、动画特效等一切事务，数据层只负责存储数据，视图层只负责创建视图模板，相比MVC就是把视图层的业务逻辑移到P管理层

//MVVM模式
//VM-视图模型：为视图层量身定做一套视图模型，并在视图模型中创建属性和方法，为视图层绑定数据并实现交互
//操作管理器创建视图太困难，MVVP可以通过html创建视图
//创建视图本质就是在页面中写html代码，因此将视图层作用提升，在页面中直接书写HTML代码创建视图组件，让控制器或管理器去监听这些试图组件，并完成组件预期功能。
<div class="first" data-bind="type:'slider',data:demo1"></div>
<div class="second" data-bind="type:'progressbar',data:demo2"></div>
var VM=function(){
    var Method={
        //dom容器
        //data数据
        progressbar:function(dom,data){
        },
        slider:function(dom,data){
            //创建滑动条结构
            //添加交互事件
        }
    }，
    //获取视图层组件渲染数据的映射信息
    function getBindData(dom){
        //获取组件自定义属性data-bind值
        var data=dom.getAttribute('data-bind');
        //将自定义属性data-bind值转化为对象,"return ({"+data+"})"是匿名函数的函数体,此处data—bind数据就像一个对象
        return !!data&&(new Function("return ({"+data+"})"))();
    }，

    return function(){
        //获取所以视图组件
             var doms=document.body.getElementsByTagName("div");
             ctx=null;
             for(var i=0;i<doms.length;i++){
                 //从组件得到其类型和数据名称
                 ctx=getBindData(doms[i]);
                 //通过组件type调用对应函数
                 ctx.type&&Method[ctx.type]&&Method[ctx.type](doms[i],ctx);
             }
    }
}
var demo1={//组件数据}
//MVVM也是用来分离视图和数据，但它更灵活，可以独立于数据层，视图层，
//并且视图模型层可以对应多个视图或数据，MVVM是对视图模型层的高度抽象
//因此对个视图对应同一个视图模型层时,也使视图模型层的代码高度复用