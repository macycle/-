<template>
<div class="feedback">
    <div class="header">
			
			
			<h1 class="mui-title">问题反馈</h1>
            <button id="submit" class="mui-pull-right">发送</button>
	</div>
		<div class="mui-content">
			<div class="mui-content-padded">
				<div class="mui-inline">问题和意见</div>
				
				
				
			</div>
			<div class="row mui-input-row">
				<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
			</div>
			<p>图片(选填,提供问题截图,总大小10M以下)</p>
			<div id='image-list' class="row image-list"></div>
			<p>QQ/邮箱</p>
			<div class="mui-input-row">
				<input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
			</div>
			<div class="mui-content-padded">
				<div class="mui-inline">应用评分</div>
				<div class="icons mui-inline" style="margin-left: 6px;">
					<i data-index="1" class="mui-icon mui-icon-star"></i>
					<i data-index="2" class="mui-icon mui-icon-star"></i>
					<i data-index="3" class="mui-icon mui-icon-star"></i>
					<i data-index="4" class="mui-icon mui-icon-star"></i>
					<i data-index="5" class="mui-icon mui-icon-star"></i>
				</div>
			</div><br />
		</div>


</div>
    
</template>

<script>
export default {
    
}
</script>

<style scoped>
.feedback{
    background-color: #eee;
}
.header{
    display: flex;
    background-color: #eee;
    margin:0 
    
    
}


</style>