import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
/*import 'element-ui/lib/theme-chalk/index.css'; // 默认主题*/
import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import qs from 'qs';
import axios from 'axios';
import moment from 'moment'
import animated from 'animate.css'

//Vue全局对象可用
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$moment = moment;

//与后端进行数据交换的时候带上cookie
axios.defaults.withCredentials = true;
let svsv = localStorage.getItem('ms_token');
axios.defaults.headers.common['token'] = svsv;  // 在header中添加token


Vue.filter("dateFilter", function(date, formatPattern){
    return moment(date).format(formatPattern || "YYYY-MM-DD");
});



Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(moment);
Vue.use(animated)
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | zh666`;
    const role = localStorage.getItem('ms_username');//登录进来的名字
  /*  alert(role)
    alert(to.path)*/

    if (!role && to.path !== '/login') {
        alert("回话过期，请重新登录")
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});


new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
