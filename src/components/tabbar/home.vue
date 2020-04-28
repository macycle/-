<template>
<div>
<!--轮播图区域-->
 <swiper :lunbolist="lunbolist" :isfull="true"></swiper>


<ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">  <!--这样设置，放在了home目录下-->

                <span class="mui-icon mui-icon-extra mui-icon-extra-classroom"></span>
                <div class="mui-media-body">手机资讯</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/photolist">
                <span class="mui-icon mui-icon mui-icon-image"></span>
                <div class="mui-media-body">休闲图片</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/goodslist">
                <span class="mui-icon mui-icon-extra mui-icon-extra-phone"></span>
                <div class="mui-media-body">购买靓机</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/feedback">
                <span class="mui-icon mui-icon mui-icon-chat"></span>
                <div class="mui-media-body">留言反馈</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <span class="mui-icon mui-icon mui-icon-videocam"></span>
                <div class="mui-media-body">视频专区</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <span class="mui-icon mui-icon-extra mui-icon-extra-at"><span class="mui-badge">5</span></span>
                <div class="mui-media-body">联系我们</div>
            </router-link>
        </li>
       
</ul> 

</div>
</template>

<script>

import {Toast} from 'mint-ui'
import swiper from '../subcomponents/swiper.vue'

export default {

    data(){
        return{
            lunbolist:[],


        }
    },
    created(){
        this.getlunbo(); //挂载数据
    },
    components:{
        swiper
    },

    methods:{
        getlunbo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/90').then(result=>{
                if(result.body.status===0){

                   result.body.message.forEach(item=>{
                        item.picUrl=item.src;  //修改swiper的img属性
                    })
                    //Toast('获取轮播图ok！')
                    //console.log('okkkkkk')

                }
                 this.lunbolist=result.body.message;

            })
        }
    }
}

</script>

<style scoped>

img{
    width:100%
}

.mui-grid-view .mui-grid-9{

    background-color: #fff;
    border:none
}

.mui-grid-view .mui-grid-9 .mui-table-view-cell{
    border:0
}



</style>