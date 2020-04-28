 import VueRouter from 'vue-router'


import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import search from './components/tabbar/search.vue'
import shopcar from './components/tabbar/shopcar.vue'


import newslist from "./components/news/newslist.vue"


import newsinfo from './components/news/newsinfo.vue'

import photolist from './components/photos/photolist.vue'

import photoinfo from './components/photos/photoinfo.vue'

import goodslist from './components/goods/goodslist.vue'

import goodsinfo from './components/goods/goodsinfo.vue'

import goodsdesc from './components/goods/goodsdesc.vue'
import goodscomment from './components/goods/goodscomment.vue'


import feedback from './components/feedback/feedback.vue'


var router =new VueRouter({
    routes:[

        {path:'/',redirect:'/home'},

        {path:'/home',component:home},
        {path:'/member',component:member},
        
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},


        {path:'/home/newslist',component:newslist},  //这里不采用嵌套路由的写法，得这样写；path必须要和home.vue中的newslist路径一样

        {path:'/home/newsinfo/:id',component:newsinfo},

        {path:'/home/photolist',component:photolist},
        {path:'/home/photoinfo/:id', component:photoinfo},  //强调后面还要跟有页面

        {path:'/home/goodslist', component:goodslist},

        {path:'/home/goodsinfo/:id',component:goodsinfo},
        {path:'/home/goodsdesc/:id',component:goodsdesc,name:'goodsdesc'},
        {path:'/home/goodscomment/:id',component:goodscomment,name:'goodscomment'},

        {path:'/home/feedback',component:feedback}

    ],
    linkActiveClass:'mui-active'// 覆盖默认高亮的类。
})

export default router