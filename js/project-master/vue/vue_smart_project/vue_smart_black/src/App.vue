<template>
<div id="App_main">
     <header-nav></header-nav>
     <router-view></router-view>
     <v-footer></v-footer>
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
}
</script>

<style>
#App_main{

}
</style>
