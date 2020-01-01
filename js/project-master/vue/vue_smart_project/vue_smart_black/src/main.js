// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import animated from 'animate.css'
import qs from 'qs';
import axios from 'axios';
// 导入组件库
import ElementUI from 'element-ui';
// 导入组件相关样式
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/font.css'
//引入vue-wechat-title
import VueWechatTitle from 'vue-wechat-title'

//Vue全局对象可用
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;



Vue.config.productionTip = false

// 配置 Vue 插件
Vue.use(ElementUI);
Vue.use(animated)
Vue.use(VueWechatTitle)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

