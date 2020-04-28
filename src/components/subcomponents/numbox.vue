<template>
    <!--可以使用watch属性监听，来监听父组件传递过来的max值，不管watch是否发生变化-->
      <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max' >
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input class="mui-input-numbox" type="number" value="1" @change='countchanged' ref="numbox"/>  <!--ref这个是vue提供的，用来引用该元的值-->
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
            //子组件改变，马上传给父组件
            //console.log(this.$refs.numbox.value)  //$refs
            this.$emit('getcount',parseInt(this.$refs.numbox.value))
        }
    },
    props:['max'],
    watch:{
        "max":function(newval,oldval){
            //使用js API设置 动态设置最新值
            mui(".mui-numbox").numbox().setOption("max",newval)
        }
    }

    
}
</script>

<style scoped>
 
</style>