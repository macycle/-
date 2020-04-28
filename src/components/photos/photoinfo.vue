<template>
<div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
        <span>发表时间{{photoinfo.add_time| dataFormat}}</span>
        <span>点击次数：{{photoinfo.click}}次</span>
    </p>
    <hr>

    <div class="thumbs">
        <img class="preview-img" v-for="(item, i) in list" :src="item.src" height="100" @click="$preview.open(i,list)" :key="item.src"> <!--还得绑定key-->
       <!--img中的class属性不可以删-->

    </div>

    

    <div class="content" v-html="photoinfo.content"></div>

    <cmt-box :id='id'></cmt-box>
</div>
    
</template>
<script>
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return{
            
            id:this.$route.params.id,  //从路由中获取到的图片id
            photoinfo:{}, //图片详情
            list:[]
        }
    },
    created(){
     this.getphotoinfo()
    },
    methods: {
        getphotoinfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.photoinfo=result.body.message[0];

                }
            })

        },
        getthumbs(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    result.body.message.forEach(item=>{  //因为所有的img的src都放在一个数组中，得一个个循环出来。
                        item.w=600;  //赋予宽度值
                        item.h=400;
                    });

                    this.list=result.body.message
                }
            })
        }
    },
    components:{
        'cmt-box':comment
    }
}
</script>


<style scoped>
.photoinfo-container{
    padding: 3px;
}

h3{
    color: #26a2ff;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
}

.subtitle{
    display: flex;
    justify-content: space-between;
    font-size: 13px;
}
.content{
    font-size: 13px;
    line-height: 30px;

}

.thumbs img{
    margin: 10px;
    box-shadow: 0 0 3px #999;
}


</style>