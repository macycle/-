//项目入口
import Vue from 'vue'

import VueRouter from "vue-router"  //路径默认需要加引号
// js文件中，最终的结果将会通过export暴露出来，所以可以用是vuerouter接受，但是css文件则不可以


Vue.use(VueRouter) //这里也要使用vuerouter


//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，就先调用main.js，在刚调用的时候，先从本地存储中读取数据
var car =JSON.parse(localStorage.getItem('car')||'[]')


var store =new Vuex.Store({
  state :{  //this.$store.state.***
    car:car  //购物车中的商品的数据，用一个数组存储起来，car数组中，存储一些商品的对象，
                //{id:商品的id,count:要购买的数量,price:商品的单价，selected:false}
    
  },
  mutations:{  //this.$store.commit（'方法名','按需传递唯一的参数'）
      addtocar(state,goodsinfo){
        //点击购物车，把商品信息保存到store中的car中

        //如果购物车已经有对应的商品，则需要更新数量
        //如果没有，则吧商品数据push到car

        //假设在购物车中没有找到对应的商品
        var flag=false

        state.car.some(item=>{
          if(item.id==goodsinfo.id){
            item.count+=parseInt(goodsinfo.count)
            flag=true
            return true
          }
        })

        

        if (!flag){
          state.car.push(goodsinfo)
        }

        //当更新car之后，把car数组，存储到本地的localstorage
        localStorage.setItem('car',JSON.stringify(state.car))

      },
      updategoodsinfo(state,goodsinfo){
        //修改购物车商品数量
        state.car.some(item=>{
          if(item.id==goodsinfo.id){
            item.count=parseInt(goodsinfo.count)
            return true
          }
        })
        //当修改为商品的数量，把最新的购物车数据保存到本地
        localStorage.setItem('car',JSON.stringify(state.car))


      },
      removefromcar(state,id){
        //根据id从store中的购物车从删除对应的那条商品数据
        state.car.some((item,i)=>{
          if(item.id==id){
            state.car.splice(i,1)
            return true;
          }
        })
        //将删除完毕后的，最新的购物车数据同步到本地储存中
        localStorage.setItem('car',JSON.stringify(state.car))
      },
      updategoodsselected(state,info){
        state.car.some(item=>{
          if(item.id==info.id){
            item.selected=info.selected
          }
        })

        //吧最新的所有购物车商品状态同步到state 中
        localStorage.setItem('car',JSON.stringify(state.car))


      }
  },
  getters:{  //this.$store.getters.***

    getallcount(state){
      var c=0;
      state.car.forEach(item=>{
        c+=item.count
      })

      return c
    },
    getgoodscount(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.count  //id作为键，数量作为key
      })
      return o
    },
    getgoodsselected(state){
      var o={}
      state.car.forEach(item=>{
        o[item.id]=item.selected
      })
      return o
    },
    getgoodscountandamount(state){
      var o ={
        count:0, //勾选的数量
        amount:0  //勾选的总价
      }
      state.car.forEach(item=>{
        if(item.selected){
        o.count+=item.count
        o.amount+=item.price*item.count}
      })
      return o
    }

  }

})

import moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

import VueResource from 'vue-resource'

Vue.use(VueResource)  //全局使用

import MintUI from 'mint-ui'

import 'mint-ui/lib/style.css'

Vue.use(MintUI);


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import app from './App.vue'
import router from './router.js'



import './mui/css/mui.min.css'  
import './mui/css/icons-extra.css'







var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store //挂载vuex
})



