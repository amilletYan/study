const webpack=require('webpack');
const path=require('path');
const packagejson = require("./package.json");
module.exports={
    entry:{
        app:'./index.js',
        vendor:Object.keys(packagejson.dependencies)//获取生产环境依赖的库,
    },
    output:{
        path:path.join(__dirname,'/public/out'),
        filename:'app.bundle.js'
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        //指引index.html位置，静态文件全部从public目录来获取，相当于根目录
        //生成的静态文件bundle.js也在public目录之下
        //不过要访问它必须要加上publicPath路径才可以
        contentBase: path.join(__dirname, "public"),
       // publicPath:path.join(__dirname, "out"),
        port:3000,
        //显示编译错误
        overlay:true,
        //编译过程中只显示错误信息
        stats:"errors-only",
        //页面会自动刷新，我们所做的修改会直接同步到页面上，而不需要我们刷新页面，或重新开启服务
        inline:true,
        //热替换（HMR）机制里，不是重载整个页面，HMR程序会只加载被更新的那一部分模块，然后将其注入到运行中的APP中
        hot:true,
        
    },
    devtool:"source-map",
    module: {
        loaders: [
              {test: /\.js$/, loader: "babel-loader",query: {presets: ['react','es2015']}},
              {test: /\.jsx$/,loader: 'babel-loader', query: {presets: ['react', 'es2015']}},
              {test: /\.css$/, loader: "style!css"},
              {test: /\.(jpg|png|otf)$/, loader: "url?limit=8192"},
              {test: /\.scss$/, loader: "style!css!sass"}
        ]
  }
   
}