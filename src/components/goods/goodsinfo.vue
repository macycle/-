<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
             <div class="ball" v-show="ballflag" ref="ball"></div>
        </transition>

        <!--商品的轮播图区域-->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<swiper :lunbolist="lunbootu" :isfull='false'></swiper>   <!--lunbolist是swiper那边的props，而lunbootu是该页面的数据-->
					</div>
				</div>
		</div>
        
        <!--商品的详情区域-->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="">
                            市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                        </p>
                        <div class="goodsnum">
                         <p>购买数量：<numbox @getcount="getselectedcount" :max='goodsinfo.stock_quantity'></numbox></p>
                        
                        </div>
                        <div class="shopbutton">
                            <p><mt-button type='primary' size='small'>立即购买</mt-button></p>
                            <p><mt-button type='danger' size='small' @click="addtoshopcar()">加入购物车</mt-button></p>
                        </div>
					</div>
				</div>
				
		</div>



        <!--商品的参数区域-->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                         <p>上架时间：{{goodsinfo.add_time}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type='primary' size='large' plain @click="godesc(id)">图文介绍</mt-button>
                    <mt-button type='danger' size='large' plain @click="gocomment">商品评论</mt-button>
                </div>
		</div>


    </div>
</template>

<script>

import numbox from '../subcomponents/numbox.vue'

import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,//路由参数对象中的id挂载到data上。
            lunbootu:[], //轮播图数据
            goodsinfo:{},  //获取到的商品信息
            ballflag:false,  //控制小球的显示与隐藏
            selectedcount:1,  //保存用户选中的数量，默认购买一个
        }

    },
    created(){
        this.getlunbo();
        this.getgoodsinfo();
    },
    methods:{
        getlunbo(){
            
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    //先循环轮播图数组的每一项，为item添加img属性，因为轮播图组件中只认识item.img,不认识item.src
                    result.body.message.forEach(item=>{
                        item.picUrl=item.src;  //修改swiper的img属性
                    })
                    this.lunbootu=result.body.message

                }
            })
        },
        getgoodsinfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0];

                }
            })
        },
        godesc(id){
            //使用编程式
            this.$router.push({name:'goodsdesc',params:{id}});
        },
        gocomment(id){
            this.$router.push({name:'goodscomment',params:{id}});

        },
        addtoshopcar(){
            //添加到购物车

            this.ballflag=!this.ballflag;
            var goodsinfo={id:this.id,count:this.selectedcount,price:this.goodsinfo.sell_price,selected:false}


            //调用store中的mutation来讲商品加到购物车
            this.$store.commit('addtocar',goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"; //相对位置0，0

        },
        enter(el,done){
            el.offsetWidth;

            //获取小球在页面中的位置
            const ballposition=this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中位置
            const badgeposition=document.getElementById("badge").getBoundingClientRect();

            const xdist=badgeposition.left - ballposition.left;
            const ydist=badgeposition.top - ballposition.top;

            el.style.transform=`translate(${xdist}px,${ydist}px)`
            el.style.transition="all 1s cubic-bezier(0.4,-0.3,1,0.68)"
            done()
        },
        afterEnter(el){
            this.ballflag=!this.ballflag;

        },
        getselectedcount(count){
            //当子组件把选中的数量传给父组件的时候，保存在data中
            this.selectedcount=count;
            console.log()

        }

    },
    components:{
        swiper,
        numbox
    }
    
}
</script>
<style scoped>

.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;   /*隐藏goodsinfo的margin */
}

.now_price{
    color: red;
    font-size: 16px;
    font-weight: bold;
}

.mui-card-footer{
    display: block;
}

.mint-button {
    margin: 8px 0;
}

.goodsnum{
    display: flex;
    
}

.goodsnum p{
    margin-top: 8px;
    margin-right: 5px;
}

.shopbutton{
    margin-top: 10px;
    display: flex;
}
.ball{
    width:15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 999;
    top:607px;
    left:146px;
   
}

</style>