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
    if (localStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
  input::-webkit-input-placeholder {
    color: #ccc;
  }

  input::-ms-input-placeholder {
    color: #ccc;
  }

  body{
    overflow-x: hidden;
  }
  /*右键复制文字背景变红色*/
  ::selection {
    background:#CC0033;
    color:white;
  }

  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 7px;
    background: rgba(255,255,255, 0.5);
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #C1C1C1;
    cursor: pointer;
  }
#App_main{
  background: white;
}
</style>
