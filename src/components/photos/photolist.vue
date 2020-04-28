<template>
<div>
    <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id== 0 ? 'mui-active' :'']"  v-for="item in cates" :key="item.id" @tap='getphotolistbycateid(item.id)'>
                            {{item.title}}
						</a>
						
					</div>
				</div>

	</div>

    <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to='"/home/photoinfo/"+item.id' tag="li"> <!--后面的style样式是给li渲染的，但是这路改为router-link，所以用tag改一下-->
            <img v-lazy="item.img_url">
            <div class="info">
                <p class="info-title">{{item.title}}</p>
                <div class="info-body">{{item.zhaiyao}}</div>
            </div>
        </router-link>
    </ul>
</div>
    
</template>

<script>

import mui from '../../mui/js/mui.min.js'  //导入mui组件

export default {
    data(){
        return {
            cates:[],//所以分类的图片

            list:[]
        }
    },
    created(){
        this.getallcategory();
        this.getphotolistbycateid(0) //默认进入页面就请求所有数据
            },
    mounted(){  //当组件中的dom结构被渲染完并放到页面上，会执行这个钩子函数
        mui('.mui-scroll-wrapper').scroll({  //初始化滑动部件
             deceleration :0.0005

    })
    
},
    methods: {
        getallcategory(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result=>{
                if(result.body.status===0){
                  result.body.message.unshift({title:'全部',id:0});//手动拼接出一个完整的类
                  this.cates=result.body.message;
                }
            })
        },
        getphotolistbycateid(cateId){  //根据分类id获取图片列表
         this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+cateId).then(result=>{
             if(result.body.status===0){
                 this.list=result.body.message;
             }
         })

        }
    },

}
</script>

<style scoped>
* {
touch-action:pan-y}

.photo-list li img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}

.photo-list li {

    background-color: #ccc;
    text-align: center;
    margin-bottom: 15px;
    box-shadow: 0 0 9px;
    position: relative;
    overflow: hidden;

    
}
.photo-list li img{
    width:100%;
    vertical-align: middle;
}

.photo-list{
    list-style: none;
    padding: 10px;
    margin: 0;
    padding-bottom: 0px;
}

.photo-list li .info{
    color:white;
    font-size: 13px;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    max-height: 85px;
    
}

.photo-list li .info .info_title,.photo-list li .info .info_body{
    font-size: 12px;
}

</style>