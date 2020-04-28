<template>
    <div>

        <div class="mui-card" style="margin-bottom: 35px;">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell mui-media" v-for="item in message" :key="item.id"> <!--用v-bind绑定，会将“”中的数据识别为对象，如果有字符串，还得再加一个引号-->
						<router-link :to="'/home/newsinfo'+item.id">   
							<img class="mui-media-object mui-pull-right" :src="item.img_url">
                            
							
                            <div class="mui-media-body">
								<h4 v-html="item.title"></h4>
                                <div>
                                <span>发表时间：{{item.add_time|dataFormat}}</span>
                                <span>点击：{{item.click}}次</span>


                                </div>
								
							</div>
						</router-link>
					</li>
					
				</ul>
			</div>
    </div>
</template>

<script>

 import {Toast} from 'mint-ui'
export default {

    data(){
        return{

            message:[]
        }
    },
    created(){
        this.getNews()
    },
    methods:{
        getNews(){
            
            this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result=>{
                if(result.body.status===0){

                    this.message=result.body.message
                }else{
                    Toast("添加失败！")
                }
            })
        }
    }
    
}
</script>

<style scoped>

.mui-table-view>li>h1{
    font-size: 14px;
}

.mui-media-body> div{

    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
}



</style>