<template>
    
      <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' style="height:25px" >
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" :value="initcount" @change='countchanged' ref="numbox" readonly/>  <!--ref这个是vue提供的，用来引用该元的值-->
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				</div>
    
</template>

<script>

import mui from '../../mui/js/mui.min.js'
export default {
    mounted(){
        mui(".mui-numbox").numbox();
    },
    methods:{
        countchanged(){
            this.$store.commit('updategoodsinfo',{id:this.goodsid,count:this.$refs.numbox.value})
              //每当数量改变，则立即吧最新的数量同步到购物车的state的数组中，
        }
    },
    props:['initcount','goodsid']
    
}
</script>

<style scoped>
 
</style>