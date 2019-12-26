<template>
<div id="App_main">
     <header-nav v-show="this.$store.state.headerStyle"></header-nav>
     <router-view></router-view>
     <v-footer v-show="this.$store.state.footerStyle"></v-footer>
</div>
</template>

<script>
  import HeaderNav from "./common/header-nav";
  import vFooter from "./common/footer";

export default {
    components:{
      HeaderNav,
      vFooter,
    },
    data(){
      return {
      }
    },
    created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
#App_main{
  background: white;
}
</style>
