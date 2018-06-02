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