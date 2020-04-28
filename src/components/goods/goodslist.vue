<template>
<div class="goods-list">
    <a class="goods-item" v-for="item in goodslist" :key="item.id" @click='getdetail(item.id)'>
        <img :src="item.img_url" alt="">
        <h3 class="title">{{item.title}}</h3>
        <div class="info">
            <p class="price">
                <span class="now">￥{{item.sell_price}}</span>
                <span class="old">￥{{item.market_price}}</span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{item.stock_quantity}}件</span>
            </p>
        </div>
    </a>

    <mt-button type='danger' size='large' @click="getmore">加载更多</mt-button> 
</div>
    
</template>

<script>

export default {
    data(){  //data是本组件内部挂载的一些私有数据
        return {
            pageindex:1,  //分页的默认页数
            goodslist:[]  //存放商品列表的数组
        }
    },
    created(){
        this.getgoodslist()
    },
   
    methods:{
        getgoodslist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist=this.goodslist.concat(result.body.message);

                }
            })
        },
        getmore(){
            
            this.pageindex++;
            this.getgoodslist();
              
        },
        getdetail(id){
            //注意：一定要区分this.$route和this.$router这两个对象
            //其中this.$route是路由参数对象，所有路由中的参数，params，query都属于她
            //this.$router是一个路由导航对象，用它可以方便的使用js代码实现路由的前进、后退、跳转到新的url地址
            
            this.$router.push("/home/goodsinfo/"+id)
        }

    },
    
}
</script>

<style scoped>

.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;  /*让整个list居中*/
}

.goods-list .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    margin: 4px 0;
    padding: 2px;
    font-display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    position: relative;;

}

.goods-item img{
    width :100%
}
.goods-item .title{
    font-size: 12px;
    line-height: 12px;
    
}

.info {
    background-color: #eee;
    position: absolute;
    bottom: 2px;
    width: 100%;
    left:0;
}
.info p{
    margin: 0;
    padding: 5px;
}

.now{
    color:red;
    font-weight: blod;
    font-size: 16px;
}

.old{
    text-decoration: line-through;
    font-size: 12px;
    margin-left: 10px;
}

.sell{
    display: flex;

}
</style>