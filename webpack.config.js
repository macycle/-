const path =require('path')

const htmlwebpackplugin=require('html-webpack-plugin')  

const VueLoaderPlugin=require('vue-loader/lib/plugin') // js可以省略，只指定具体的文件夹，
module.exports={
    entry:path.join(__dirname,'./src/main.js'),
    output:{
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js'
    },
    performance: {
 
        hints:false   
         
        },
        performance: {
            hints: "warning", // 枚举
            maxAssetSize: 30000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
            assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            
            }
        },
        
    plugins:[ 
        new htmlwebpackplugin({
            template:path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new VueLoaderPlugin()   //不需要参数，而且这个是内置在vue-loader中的
        

    ],

    mode:'development',

    module:{  //用于配置所以第三方加载器
        rules:[{test:/\.css$/,use:['style-loader','css-loader']},
              
               {test:/\.(jpg|png|gif|jpeg)$/,use:'url-loader?limit=100&name=[name].[ext]'} , //file-loader是url的内部依赖，只需安装不用写出来。
                {test:/\.(eot|svg|ttf|woff|woff2)$/,use:'url-loader'},
                {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//node_modules不用编译。
                {test:/\.vue$/,use:'vue-loader'}
    
            ]  //main.js会在这里寻找处理非js的loader
    }
}