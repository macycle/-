<template>
<div class="newsinfo-container">
<h3 class="title">{{newsinfo.title}}</h3>  <!--在script区域里面才需要this-->
<p class="subtitle">
<span>发表时间：{{newsinfo.add_time|dataformat}}</span>
<span>点击：{{newsinfo.click}}</span>

</p>

<hr>

<!--内容区域-->
<div class="content" v-html="newsinfo.content"></div>

<!--评论区域-->
<comment-box :id="this.id"></comment-box>  <!--父组件向子组件传递值-->

</div>
    
</template>

<script>

import comment from '../subcomponents/comment.vue'
export default {

    data(){
        return{
            id:this.$route.params.id , //将存放在vue-resoure中的对应页面的id存放在id
            
            newsinfo:{}  // 是一个对象形式
        
        }
    },

    created(){
        this.getnewsinfo()
    },
    methods:{
        getnewsinfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id).then(result=>{  
                //这里的this.id指的就是windows下的vue-resource中的对应点击页面的id
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0] 


                }else{
                    Toast('失败')
                }
            })
        }
    },
    components:{
        'comment-box':comment
    }
    
}
</script>

<style >  

.newsinfo-container{

    padding: 0 4px;
    
    
    
}

.newsinfo-container >.title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
.newsinfo-container>.subtitle{
        font-size: 13px;
        color: #226aff;
        display:flex;
        justify-content: space-between;
    }
.newsinfo-container>.content{
        
        padding: 4px;
    }

</style>