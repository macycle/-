<template>
<div class="shopcar-container"> 

    
    <div class="goodslist">
        <!--商品列表区域-->
        <div class="mui-card" v-for="(item,i) in goodslist" :key='item.id'>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						
                        <mt-switch 
                        v-model="$store.getters.getgoodsselected[item.id]"
                        @change="selectedchanged(item.id,$store.getters.getgoodsselected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h2>{{item.title}}</h2>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getgoodscount[item.id]" :goodsid="item.id"></numbox>
                                <!--创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的id作为对象的属性名，count值作为对象属性值，这样，当吧
                                所有商品循环一边，就会得到一个对象-->
                                
                                
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>
    </div>
    <!--商品结算区域-->
    <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品<span class="red">{{$store.getters.getgoodscountandamount.count}}</span>件，总价￥<span class="red">{{$store.getters.getgoodscountandamount.amount}}</span></p>

                        </div>
                         <mt-button type="danger">去结算</mt-button>
					</div>
                   
				</div>
			</div>
 

</div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default{
    data(){
        return {
            goodslist:[]  // 购物车所有商品
        }

    },
    created(){
        this.getgoodslist()
    },
    methods:{
        getgoodslist(){

            //获取到store中所有商品的id
            var idarr=[]
            this.$store.state.car.forEach(item=>idarr.push(item.id))
            
            //如果购物车没有商品，则直接跳出，不需要请求任何数据，否则会报错
            if(idarr.length<=0){
                return;
            }
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+idarr.join(',')).then(result=>{
                if(result.body.status===0){                                 //将数组转化为字符串 idarr.join('.')
                    this.goodslist=result.body.message; 
                }
            })
        },
        remove(id,index){
            //点击删除，吧商品从store中根据传递的id删除，同时，吧当前组件中的goodslist对应的index删除
            this.goodslist.splice(index,1);
            this.$store.commit("removefromcar",id)
        },
        selectedchanged(id,val){
            //每当点击开关，把最新的开关状态同步到state
            console.log(id+"----"+val)
            this.$store.commit('updategoodsselected',{id,selected:val})
        }

    },
    components:{
        numbox
    }
}
</script>

<style scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
}

.mui-card-content-inner  img{
    width: 60px;
    height: 60px;
}
.mui-card-content-inner .info h2{
    font-size: 13px;

}
t .mui-card-content-inner .info{
    display: flex;
    flex-direction:column;
    justify-content: space-between;

}
.info .price{
  color: red;
  font-weight: bold;
}


.mui-card-content .mui-card-content-inner{
    display: flex;
    align-items: center;
}

.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.red{
    color:red;
    font-weight: bold;
}
</style>