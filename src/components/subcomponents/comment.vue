<template>

<div>
<h3 style="font-size:16px">发表评论</h3>

<hr>

<textarea placeholder="请输入内容（最多吐槽120字）" maxlength="12" v-model="msg"></textarea>
    <mt-button type='primary' size='large' @click="postcomment">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-title">
                第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dataFormat}}
            </div>
            <div class="cmt-body">
                {{item.content}}
            </div>
        </div>
    </div>
    <mt-button type='primary' size='large' plain @click='getmore'>加载更多</mt-button>

</div>
    
</template>
<script>
import {Toast} from 'mint-ui'
export default{
    data(){
        return {
            pageindex:1,//默认展示第一页
            comments:[],
            msg:''

        }
        
    },
    created(){
        this.getcomments()  //在这个阶段就自动调用；
    },
    methods: {

        getcomments(){
            this.$http.get('http://www.liulongbin.top:3005/api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result=>{
                if(result.body.status===0){           //this.id 指的是父组件传过来的参数
                    this.comments=this.comments.concat(result.body.message); //这样在获取评论的时候，不会把老的数据给覆盖，而是拼接起来

                }else{
                    Toast('获取数据失败')
                }
            })
        },
        getmore(){
            this.pageindex++;
            this.getcomments()
        },
        postcomment(){

            if(this.msg.trim().length===0){
                return Toast('评论内容不能为空！') //跳出循环
            }

            this.$http.post('http://www.liulongbin.top:3005/api/postcomment/'+this.$route.params.id,{content:this.msg.trim()},{emulated:true}).then(result=>{
                if(result.body.status===0){
                    //1.拼接出一个评论对象
                    //2.获取当前页面的第一页评论内容
                    var cmt={user_name:'匿名对象',add_time:Date.now(),content:this.msg.trim()}
                };
                this.comments.unshift(cmt);
                this.msg=''
            })
        }


            
        },
        props:['id'] //接受来自父组件的参数
}

</script>
<style scoped>

textarea{
    font-size: 14px;
    height: 80px;
    margin: 3px;

}

.cmt-list{
    margin: 5px 0;
}

.cmt-title{
    background-color: #ccc;
    font-size: 12px;
    line-height: 35px;
    text-indent: 2em;

}

</style>