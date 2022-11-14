import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   //element-ui样式
import router from './router'   //引入vue-router
import store from './store'     //引入vuex
import './api/mock'             //mockjs
import Cookie from 'js-cookie'

Vue.config.productionTip = false
Vue.config.devtools = true;

Vue.use(ElementUI);    //全局引入

// 全局前置路由守卫 ---每个路由被切换之前调用
router.beforeEach((to,from,next)=>{
  // 判断token是否存在
  const token = Cookie.get('token')
  if (!token && to.name !== 'login'){   //token不存在--用户未登录，要跳转登录页
    next({ name:'login' })
  }else if (token && to.name === 'login'){    //token存在--已经登录，跳转至首页
    next({ name:'home' })
  }else{   //拦截 --- 只要不调用next()就不放行
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
