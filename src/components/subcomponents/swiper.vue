<template>
<div>
    <mt-swipe :auto="3000">

        <!--谁使用该轮播图，谁提供lunbolist-->
        <!--父组件向子组件传值-->
  <mt-swipe-item v-for='item in lunbolist' :key='item.id' >
      <img :src='item.picUrl' alt='' class="img" :class="{'isfull':isfull}"> <!--注意src前面有两点-->
  </mt-swipe-item>
  
</mt-swipe>
</div>
    
</template>

<script>
export default {
    props:['lunbolist','isfull']
    
}
</script>

<style scoped>
.mint-swipe{
    
    height: 400px;
}
.mint-swipe-item{
    
    text-align: left;
}
    


img{
    
    height: 100%;
}

.isfull{
    width: 100%;
}

</style>