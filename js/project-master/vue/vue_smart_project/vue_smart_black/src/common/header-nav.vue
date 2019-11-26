<template>
  <div id="header" style="z-index: 100" >
    <!----------------------------------------------------------显示的头----->
    <div class="nav-global">
      <!--搜索框-->
      <transition name="show_search" >
        <div class="nav_search" v-if="show_search">
          <div class="nav_search_div">
            <img src="../assets/img/搜索.png" class="nav_search_div_img01">
            <input placeholder="搜索appom.com.cn"/>
            <img @click="show_searchs()" src="../assets/img/叉.png" class="nav_search_div_img02">
          </div>

          <div class="nav_search_div02">

          </div>
        </div>
      </transition>

      <transition name="show_nav">
        <div class="container" style="top: 0px" v-if="show_nav">
          <h1 class="nav-logo">
            <a href="javascript:;"></a>
          </h1>
          <!--个人信息-->
          <ul class="nav-aside" >
            <li>
              <img @click="show_searchs()" src="../assets/img/搜索.png" style="width: 18px;margin-top: 2px;cursor: pointer">
            </li>
            <li class="nav-user" style="z-index: 101">
              <a href="javascript:;">个人中心</a>
              <!--active-->
              <div class="nav-user-wrapper" >
                <div class="nav-user-list">
                  <dl class="nav-user-avatar">
                    <dd><span class="ng-scope"></span></dd>
                    <dt class="ng-binding">+86 138****9453</dt>
                  </dl>
                  <ul>
                    <li class="order">  <router-link :to="{ path: 'account' }">现在结算</router-link></li>
                    <li class="support"><a href="javascript:;">售后服务</a></li>
                    <li class="coupon"><a href="javascript:;">我的优惠</a></li>
                    <li class="information"><a href="javascript:;">账户资料</a></li>
                    <li class="address"><a href="javascript:;">收货地址</a></li>
                    <li class="logout"><a href="javascript:;">退出</a></li>
                  </ul>
                </div>
              </div>
            </li>
            <!--active-->
            <car-panel></car-panel>
          </ul>
          <ul class="nav-list">
            <li><a href="javascript:;">在线商城</a></li>
            <li><a href="javascript:;">坚果 Pro</a></li>
            <li><a href="javascript:;">Smartisan M1 / M1L</a></li>
            <li><a href="javascript:;">Smartisan OS</a></li>
            <li><a href="javascript:;">应用下载</a></li>
            <li><a href="javascript:;" @click="show_nav_subs()" style="color: #F06F9A">更多</a></li>
          </ul>
        </div>
      </transition>
    </div>
    <!----------------------------------------------------------fixed的头----->
    <transition name="showFix">
      <div class="nav-global" style="position: fixed;margin-top: -52px;width: 100%;height: 50px;box-shadow:0px 20px 10px -15px #EDEDED;z-index: 200"  v-if="shownav" v-cloak >
        <!--搜索框-->
        <transition name="show_search" style="z-index: 100000">
          <div class="nav_search" v-if="show_search">
            <div class="nav_search_div">
              <img src="../assets/img/搜索.png" class="nav_search_div_img01">
              <input placeholder="搜索appom.com.cn"/>
              <img @click="show_searchs()" src="../assets/img/叉.png" class="nav_search_div_img02">
            </div>

            <div class="nav_search_div02">

            </div>
          </div>
        </transition>

        <transition name="show_nav">
          <div class="container" style="top: 0px" v-if="show_nav">
            <h1 class="nav-logo">
              <a href="javascript:;"></a>
            </h1>
            <!--个人信息-->
            <ul class="nav-aside" >
              <li>
                <img @click="show_searchs()" src="../assets/img/搜索.png" style="width: 18px;margin-top: 2px;cursor: pointer">
              </li>
              <li class="nav-user" style="z-index: 101">
                <a href="javascript:;">个人中心</a>
                <!--active-->
                <div class="nav-user-wrapper" >
                  <div class="nav-user-list">
                    <dl class="nav-user-avatar">
                      <dd><span class="ng-scope"></span></dd>
                      <dt class="ng-binding">+86 138****9453</dt>
                    </dl>
                    <ul>
                      <li class="order">  <router-link :to="{ path: 'account' }">现在结算</router-link></li>
                      <li class="support"><a href="javascript:;">售后服务</a></li>
                      <li class="coupon"><a href="javascript:;">我的优惠</a></li>
                      <li class="information"><a href="javascript:;">账户资料</a></li>
                      <li class="address"><a href="javascript:;">收货地址</a></li>
                      <li class="logout"><a href="javascript:;">退出</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <!--active-->
              <car-panel></car-panel>
            </ul>
            <ul class="nav-list">
              <li><a href="javascript:;">在线商城</a></li>
              <li><a href="javascript:;">坚果 Pro</a></li>
              <li><a href="javascript:;">Smartisan M1 / M1L</a></li>
              <li><a href="javascript:;">Smartisan OS</a></li>
              <li><a href="javascript:;">应用下载</a></li>
              <li><a href="javascript:;">官方论坛</a></li>
            </ul>
          </div>
        </transition>
      </div>
    </transition>


    <!------------------------------------------------------2级头----->
    <transition name="nav_sub_show">
      <div @mouseleave="show=false" v-if="show_nav_sub">
      <div class="nav-sub">
        <div class="nav-sub-wrapper">
          <div class="container">
            <ul class="nav-list" style="padding-left: 360px">
              <li>
                <router-link :to="{ path: '/' }" @mouseover="show=true" @click="show=false">首页</router-link>
              </li>
              <li><a href="javascript:;" @mouseover="show=true">手机</a></li>
              <li><a href="javascript:;" @mouseover="show=true">官方配件</a></li>
              <li class="active">
                <router-link :to="{ path: '/Shop' }" @mouseover="show=true">服饰鞋包</router-link>
              <li><a href="javascript:;" @mouseover="show=true">畅呼吸</a></li>
              <li><a href="javascript:;" @mouseover="show=true">打印机</a></li>
              <li><a href="javascript:;" @mouseover="show=true">服务</a></li>
            </ul>
          </div>
        </div>
      </div>
      <!-----------------------------------------------鼠标悬浮出现的信息-->
      <transition name="bounce">
        <div id="main_div" v-if="show"  v-cloak>
            <div class="main_div_div">

                <ul>
                  <li>
                    <label>衣服</label>
                  </li>
                  <li>
                    <img src="../assets/img/logo.png">
                    <span>蓝牙耳机</span>
                  </li>
                  <li>
                    <img src="../assets/img/logo.png">
                    <span>蓝牙耳机</span>
                  </li>
                  <li>
                    <img src="../assets/img/logo.png">
                    <span>蓝牙耳机</span>
                  </li>
                </ul>

              <ul>
                <li>
                  <label>衣服</label>
                </li>
                <li>
                  <img src="../assets/img/logo.png">
                  <span>蓝牙耳机</span>
                </li>
                <li>
                  <img src="../assets/img/logo.png">
                  <span>蓝牙耳机</span>
                </li>
                <li>
                  <img src="../assets/img/logo.png">
                  <span>蓝牙耳机</span>
                </li>
              </ul>
            </div>
        </div>
      </transition>

    </div>
    </transition>

    <!--屏幕阴影-->
    <transition name="shadow_div">
      <div class="shadow_div" v-if="show_shadow">

      </div>
    </transition>
  </div>
</template>

<script>
  import CarPanel from "../components/car-panel";
  export default {
        //默认暴露一个模块
      components:{
        CarPanel,
      },
      data(){
        return {
          show: false,
          shownav:false,
          show_search:false,
          sbi:0,
          show_nav:true,
          show_shadow:false,
          show_nav_sub:false,
          sbi2:0,
        }
      },
      mounted() {
        window.addEventListener('scroll', this.windowScroll)
      },
      methods:{

        windowScroll () {
          // 滚动条距离页面顶部的距离
          // 以下写法原生兼容
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          /*console.log(scrollTop)*/
          if (scrollTop>=100){
            this.shownav = true;
          }else {
            this.shownav = false;
          }
        },
        /*鼠标点击搜索框*/
        show_searchs(){
          if (this.sbi==0){
            this.show_search =true;
            this.show_nav=false;
            this.show_shadow = true;
            this.sbi++;
          }else {
            this.show_search =false;
            this.show_nav=true;
            this.show_shadow = false;
            this.sbi--;
          }
        },
        /*点击更多出现2级头*/
        show_nav_subs(){
          if (this.sbi2==0){
            this.show_nav_sub = true;
            this.sbi2++;
          } else {
            this.show_nav_sub = false;
            this.sbi2--;
          }
        }

      }
    }
</script>

<style>
  /*-------------------------------搜索框*/
  .shadow_div{
    position: fixed;
    width: 100%;
    height: 120%;
    background: rgba(0,0,0,0.48);
    z-index: 102;
  }


  .nav_search_div_img01{
    width: 20px;
    position: absolute;
    top: 15px;
  }
  .nav_search_div_img02{
    width: 20px;
    position: absolute;
    top: 15px;
    left: 720px;
    cursor: pointer;
  }
  .nav_search_div02{
    width: 100%;
    height: 84%;
    box-shadow:0px 4px 10px #888888;
    border-radius: 0px 0px 20px 20px;
    z-index: 100;
  }
  .nav_search_div input{
    background: black;
    width: 100%;
    height: 50px;
    color: whitesmoke;
    font-size: 14px;
    font-weight: 300;
    padding-left: 40px;
  }
  .nav_search_div{
    background: black;
    width: 100%;
    height: 50px;
  }
  .nav_search{
    position: absolute;
    width: 745px;
    height: 340px;
    background: white;
    z-index: 1000;
    left: 310px;
    border-radius: 0px 0px 20px 20px;
  }
  /*--------------------------------2级头---*/
  .main_div_div img{
    width: 80px;
    display: inline;
  }
  .main_div_div span{
    position: relative;
    top: -30px;
  }
  .main_div_div label{
    position: relative;
    color: black;
    top: 7px;
  }
  .main_div_div li{
    margin: 20px auto;
    text-align: center;
  }
  .main_div_div ul{
    margin-top: -15px;
    margin-left: 50px;
    float: left;
  }


  /*解决屏幕刷新会闪现的bug*/
  [v-cloak] {
    display: none;
  }
.main_div_div{
  width: 70%;
  height: 100%;
/*  background: whitesmoke;*/
  margin: 0 auto;
  padding-left: 120px;
}

  .bounce-enter-active {
    animation: fadeInUp 0.3s;
  }
  .bounce-leave-active {
    animation: fadeInUp 0.2s reverse;
  }
  .showFix-enter-active {
    animation: fadeInDown 1s;
  }
  .show_search-enter-active {
    animation: fadeIn 1.2s;
    }
  .show_search-leave-active {
    animation: fadeIn 0.3s reverse;
  }

  .show_nav-enter-active {
    animation: fadeInRightBig 1s;
  }
  .show_nav-leave-active {
    animation: fadeInRightBig 1s reverse;
  }

  .shadow_div-enter-active {
    animation: fadeIn 0.5s;
  }
  .shadow_div-leave-active {
    animation: fadeIn 0.5s reverse;
  }

  .nav_sub_show-enter-active {
    animation: fadeInDown 0.5s;
  }
  .nav_sub_show-leave-active {
    animation: fadeInDown 0.5s reverse;
  }
#main_div{
  width: 100%;
  height: 340px;
  background: white;
  z-index: 50;
  position: absolute;
  box-shadow:0px 20px 10px -15px #ccc;

}
  input::-webkit-input-placeholder {
    color: #ccc;
  }

  input::-ms-input-placeholder {
    color: #ccc;
  }

  body{
    overflow-x: hidden;
  }
</style>
