<template>
<div class="App-container">

    <!--顶部区域-->

    <mt-header fixed title="3C之家">
		<span  slot="left" @click="goback" v-show="flag">
			<mt-button icon="back">返回</mt-button>
		</span>

	</mt-header>
    <!--body区域-->

	<transition>

	<router-view></router-view>

	</transition>



	<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1 " to="/home" >
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/member">
				<span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item1"  to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getallcount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item1"  to="search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
	</nav>



   

</div>
</template>

<script>
export default {
	data(){
		return {
			flag:false
		}
	},
	created(){
		this.flag=this.$route.path==="/home"?false:true;
	},
	methods:{
		goback(){
			this.$router.go(-1)
		}
	},
	watch:{
		'$route.path':function(newval){
			if(newval==="/home"){
				this.flag=false
			}else{
				this.flag=true
			}
		}
	}

}
</script>

<style  scoped>

.mint-header{

	z-index: 90;
}

.App-container{
    padding-top: 40px;
	padding-bottom: 40px;
	overflow-x: hidden;
}

.v-enter{ /*进入的动画*/
	opacity: 0;
	transform: translateX(100%); /*从右往左进入*/
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);/*从右往左出去*/
	position: absolute;
}

.v-enter-active,.v-leave-active{  /*进入的半场动画*/
	transition: all 0.5s ease;
}


/*修改类名，解决tabbar无法点击切换的问题*/

.mui-active{
	color:#007aff;
	z-index: 999;
}
.mui-bar-tab .mui-tab-item1{
	display: table-cell;
	overflow: hidden;
	width: 1%;
	height : 50px;
	text-align: center;
	vertical-align: middle;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #c0c0c0;
}


.mui-bar-tab .mui-tab-item1 .mui-icon{
	top: 3px;
	width: 24px;
	height: 24px;
	padding-top: 0;
	padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label{
	font-size: 11px;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
}

</style>