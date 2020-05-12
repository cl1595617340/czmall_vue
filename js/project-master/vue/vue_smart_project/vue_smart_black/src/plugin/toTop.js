//1.引入vue
import Vue from 'vue';
//2.新创建一个vue实例
let v = new Vue();


export default {
  install (Vue, options) {
    Vue.prototype.$toTop = function () {
      v.$notify({
        dangerouslyUseHTMLString: true,
        title: '提示',
        message: "待开发中...",
        iconClass:'el-icon-warning-outline',
      });
    }
  }
}
