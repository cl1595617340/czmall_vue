<template>
  <div id="header" style="z-index: 100;">
    <!----------------------------------------------------------显示的头----->
    <div class="nav-global" :style="this.$store.state.navStyle">
      <!--搜索框-->
      <transition name="show_search" >
        <div class="nav_search" v-if="show_search">
          <div class="nav_search_div">
            <img src="../assets/img/搜索.png" class="nav_search_div_img01">
            <input @keyup.enter="goQueryGoods($event)" placeholder="搜索appom.com.cn - 回车显示搜索的更详细内容"
                   @input="specifiName($event)"/>
            <img @click="show_searchs()" src="../assets/img/叉.png" class="nav_search_div_img02">
          </div>

          <!--输入建议-->
          <div class="nav_search_div02" v-show="nav_search">
            <label>快速链接</label>
            <ul>
              <li @click="Todevelop" >查找零售店</li>
              <li @click="Todevelop" >佳节好礼</li>
              <li @click="Todevelop" >配件</li>
              <li @click="Todevelop" >服务网店查询</li>
              <li @click="Todevelop" >关于我们</li>
            </ul>
          </div>

          <!--输入建议模糊查询-->
          <div class="nav_search_div02" v-show="isnav_search" style="padding-top: 0px">
            <div v-for="site in goodstype3ListAndGoods" style="    padding-top: 20px;">
              <label style="top: 0px">{{site.goodstype3Name}} {{site.goodsList.length}}</label>
              <ul v-for="site2 in site.goodsList">
                <li @click="goqueryGoods(site2.goodsId)">{{site2.goodsName}}</li>
              </ul>
            </div>
          </div>

          <!--输入建议为空的时候-->
          <div class="nav_search_div02" v-show="isnav_searchNone" style="padding-top: 00px">
            <div style="padding-top: 20px">
              <label style="top: 0px;font-weight: 200">星空下流浪的你 仍然是秘密的距离_ &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp空</label>
            </div>
          </div>

        </div>
      </transition>

      <transition name="show_nav">
        <div class="container" style="top: 0px" v-if="show_nav">
          <h1 class="nav-logo" @click="gohomepage">
            <a href="javascript:;"></a>
          </h1>
          <!--个人信息-->
          <ul class="nav-aside" >
            <li>
              <img @click="show_searchs()" src="../assets/img/搜索.png" class="sbwenhao">
            </li>
            <li class="nav-user" style="z-index: 101">
              <a href="javascript:;">个人中心</a>
              <!--active-->
              <div class="nav-user-wrapper" >
                <div class="nav-user-list">
                  <dl class="nav-user-avatar">
                    <dd v-if="this.$store.state.memberinfo.avatar==undefined"><span class="ng-scope"></span></dd>
                    <dd v-if="this.$store.state.memberinfo.avatar!=undefined"><img :src="this.$store.state.memberinfo.avatar" class="memImg"></dd>
                  </dl>
                  <!--如果登录就出现这个-->
                  <ul v-if="this.$store.state.memberinfo.avatar!=undefined" style="font-family: OPPOfont1">
                    <li class="order">  <router-link :to="{ path: 'Order' }">我的订单</router-link></li>
                    <li class="support" @click="Todevelop"><a href="javascript:;">售后服务</a></li>
                    <li class="coupon" @click="Todevelop"><a href="javascript:;">我的优惠</a></li>
                    <li class="information"><a href="javascript:;">账户资料</a></li>
                    <li class="address"><a href="javascript:;">收货地址</a></li>
                    <li class="logout"><a href="javascript:;" @click="exitmem">退出</a></li>
                  </ul>

                  <!--如果没有登录就出现这个-->
                  <div v-if="this.$store.state.memberinfo.avatar==undefined" class="logindiv">
                    <p @click="gpLogin"><i class="el-icon-news" style="margin-left: -5px"></i>
                      <label style="margin-left: 5px">登录</label>
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <!--active-->
            <car-panel></car-panel>
          </ul>
          <ul class="nav-list nav-listsb" style="font-family: OPPOfont5;position: relative;left:-40px">
            <li><a href="javascript:;" @click="gohomepage">在线商城</a></li>
            <li><a href="javascript:;" @click="Todevelop">智能硬件</a></li>
            <li><a href="javascript:;" @click="goiponeinfo02">Youth Dream Forward</a></li>
            <li><a href="javascript:;" @click="goiponeinfo03">关于C-ZMall</a></li>
            <li><a href="javascript:;" @click="show_nav_subs()" style="color: #F06F9A">更多</a></li>
          </ul>
        </div>
      </transition>


      <!------------------------------------------------------2级头----->
      <transition name="nav_sub_show">
        <div @mouseleave="show=false" v-if="show_nav_sub">
          <div class="nav-sub">
            <div class="nav-sub-wrapper">
              <div class="container">
                <ul class="nav-list" style="margin-left: 270px">
                  <li>
                    <a  @click="gohomepage">首页</a>
                  </li>
                  <li v-for="site in goodstypeList">
                    <a class="goodstypeListfont"  @click="goitem(site.goodstypeId,site.goodstypeName)"  @mouseover="showGoodsTypeAll(site.goodstypeId)">{{site.goodstypeName}}</a>
                  </li>
                  <li>
                    <a href="javascript:;" @mouseover="showServe()">服务</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-----------------------------------------------鼠标悬浮出现的信息-->
          <transition name="bounce">
            <div id="main_div" v-if="show"  v-cloak>
              <div class="main_div_div" >

                <transition-group name="typelistsb">
                  <div style="margin-top: 25px" v-for="site in goodstype2List" v-show="sbsb2" :key="site.goodstype2Id">

                    <!--显示所有的分类信息-->
                    <ul  v-if="site.goodstype2Name!='手机'">
                      <li>
                        <label style="cursor: pointer">{{site.goodstype2Name}}</label>
                      </li>
                      <li v-for="site2 in site.goodstype3" @click="goOtherType(site2.goodstype3Id,site.goodstype2Name,site2.goodstype3Name)">
                        <img :src="site2.goodstype3Picture">
                        <span :style="spanStyle">{{site2.goodstype3Name}}</span>
                      </li>
                    </ul>


                    <!--显示所有的手机-->
                    <ul v-for="(goodlist,indexsb) in goodslist"   v-if="site.goodstype2Name=='手机'&&indexsb<6" >
                      <li>
                        <label>{{goodlist.goodsName}}</label>
                      </li>
                      <li class="goodsimgli" @click="goshopinfo(goodlist.goodsId)" v-for="goodcolorList in goodlist.goodscolorList" :key="goodcolorList.goodscolorId">
                        <img class="goodsimgsb"  :src="goodcolorList.goodscolorPicture">
                        <span class="goodsimgsbspan"  :style="spanStyle">{{goodcolorList.goodscolorName}}</span>
                      </li>
                    </ul>

                  </div>
                </transition-group>

              </div>
            </div>
          </transition>

        </div>
      </transition>
    </div>


    <!--屏幕阴影-->
    <transition name="shadow_div">
      <div class="shadow_div" v-if="show_shadow">
      </div>
    </transition>
  </div>
</template>

<script>
  import CarPanel from "../components/car-panel";
  import { getAllGoodsTypeByF } from '../api/goodtype'
  import { getGoodstypeTo23ByF } from '../api/goodtype'
  import { f_getGoodsListToType } from '../api/goods'
  import { getType3AndGoods } from '../api/goods'
  import $ from 'jquery'
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
          /*-----------------我的属性--*/
          //装1级分类的数组
          goodstypeList:{},
          //装2级分类的数组
          goodstype2List:{},
          spanStyle:"",
          /*----------------分类显示所有手机--*/
          goodslist:{},
          sbsb:false,
          sbsb2:false,

          /*发送到后台的查询条件，主页的，不给会报错*/
          querylistsb:{laterNumcameras:"",tab:"",cell:"",cpunum:"",screen:""},

          /*主页大模糊查询的集合*/
          goodstype3ListAndGoods:[],
          nav_search:true,
          isnav_search:false,
          isnav_searchNone:false,

          /*退出登录给store里的用户信息赋值为空*/
          memberNone:{},
          /*退出登录给store里的购物车信息赋值为空*/
          catNone:[],
        }
      },

      created() {
        this.getData();
        console.log(this.$store.state.memberinfo+"-----------------");
      },

      methods:{
        getData(){
          let formDatas = new FormData();
          formDatas.append("obj", JSON.stringify(this.querylistsb));
          formDatas.append("endGoodsid", 100);
          /*分类缓存*/
          getAllGoodsTypeByF().then(res => {
            this.goodstypeList = res;
          })


          f_getGoodsListToType(formDatas).then(res => {
            this.goodslist = res.goodsList;
          })
        },
        goiponeinfo02(){
          this.$notify.info({
            title: '',
            message: '青春 梦想 前进'
          })
        },
        goiponeinfo03(){
          this.$notify.info({
            title: '',
            message: '以梦为马,不负韶华'
          })
        },
        /*通用的待开发*/
        Todevelop(){
          this.$toTop()
        },
        /*点击分类*/
        goOtherType(id,name,name2){
          this.$router.push({path: '/AllOtherGoods',query:{ id:id,name:name,name2:name2}});
          this.$router.go(0);
        },
        /*点击手机进入详细信息*/
        goshopinfo(id){
          /*跳转页面并传值*/
          this.$router.push({path: '/ShopInfo',query:{ id:id}});
          this.$router.go(0);
        },
        /*退出登录*/
        exitmem(){
         /* //保存用户退出前的页面路径
          this.$store.state.memberExitUrl = window.location.href;*/
          /*存储到store的用户删除*/
          this.$store.state.memberinfo = this.memberNone;
       /*   this.$store.state.carPanelData = this.catNone;*/
          setTimeout(() => {
            this.$router.push({path: '/'});
          }, 2000);
          this.openFullScreen2();
        },
        /*全屏加载动画*/
        openFullScreen2() {
          const loading = this.$loading({
            lock: true,
            text: '正在退出',
            spinner: 'el-icon-loading',
            background: 'rgba(255,255,255, 0.8)'
          });
          setTimeout(() => {
            loading.close();
          }, 2600);
        },
        /*去到登录页面*/
        gpLogin(){
          //保存用户登录前的页面路径
          this.$store.state.memberloginUrl = window.location.href;
          this.$router.push({path: '/memLogin'});
          this.$router.go(0);

        },
        /*输入提示点击查询进入商品*/
        goqueryGoods(id){
          /*跳转页面并传值*/
          this.$router.push({path: '/ShopInfo',query:{ id:id}});
          this.$router.go(0);
        },
        /*----------------------回车搜索框*/
        goQueryGoods(e){
          var that = this;
          var val = e.target.value;
          /*跳转页面并传值*/
          this.$router.push({path: '/queryGoods',query:{ id:val}});
          this.$router.go(0);
        },
        /*---------------输入框change事件并获取值*/
        specifiName(e) {
          var that = this;
          var val = e.target.value;

          let formDatas = new FormData();

          /*-------------------输入的值为空出现快速链接*/
          if (val==""){
            this.goodstype3ListAndGoods = [];
            this.nav_search = true;
            this.isnav_search = false;
            this.isnav_searchNone = false;
          } else {
            formDatas.append("name", val);
            getType3AndGoods(formDatas).then(res => {
              this.goodstype3ListAndGoods = res.goodstype3List;

              if (this.goodstype3ListAndGoods.length==0){
                this.isnav_searchNone = true;
                this.isnav_search = false
                this.nav_search = false;
              }else {
                this.isnav_searchNone = false;
                this.nav_search = false;
                /*有数据*/
                this.isnav_search = true;
              }
            })
          }

        },
        /*回到首页*/
        gohomepage(){
          this.show = false;
          this.$store.commit('changNav2');
          this.$router.push("/");
          this.$router.go(0);
        },
        /*----------------点击2级头跳转页面*/
        goitem(id,name){
          this.show = false;
          if (name=="手机"){
            this.$router.push("/shop");
          }else {
            this.$router.push({path: '/AllOtherGoods',query:{ id:id,name:name}});
          }
          this.$router.go(0);
        },

        /*悬浮1级分类显示其下的所有分类信息,(id是1级分类的id)*/
        showGoodsTypeAll(id){
          this.sbsb2 = true;
          this.show = true;
          let formDatas = new FormData();
          formDatas.append("id", id);
          getGoodstypeTo23ByF(formDatas).then(res => {
            this.goodstype2List = res.goodstype.goodstype2;
          })

        },

        /*鼠标悬浮服务*/
        showServe(){
          this.sbsb2 = true;
          this.show = true;
          this.goodstype2List=[{
            goodstype2Id:9999,
            goodstype2Name: '',
            goodstype3: [
              {goodstype3Name: '自助服务'},
              {goodstype3Name: '在线客服'},
              {goodstype3Name: '修理门店'},
              {goodstype3Name: '服务政策'},
              {goodstype3Name: '发起售后'},
              ]}, {
          }]
          console.log(this.goodstype2List)
        },


        windowScroll () {
          // 滚动条距离页面顶部的距离
          // 以下写法原生兼容
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          /*console.log(scrollTop)*/
          if (scrollTop>=70){
            this.shownav = true;
          }else {
            this.shownav = false;
          }
        },
        /*鼠标点击搜索框*/
        show_searchs(){
          this.show_nav_sub = false;
          this.sbi2 = 0;
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

      },
      /*监听滚动条*/
      mounted() {
        window.addEventListener('scroll', this.windowScroll)
      },
    }
</script>

<style scoped>

  .nav-listsb{
    margin-left: 240px!important;
  }
  .sbwenhao{
    width: 18px;margin-top: 2px;cursor: pointer
  }
  .goodstypeListfont{
    font-size: 5px
  }


  .memImg{
    width: 50px;
    height: auto;
    border-radius: 50% 50%;
    margin: 0 auto;
    position: relative;
    top: -10px;
  }
  .logindiv p:hover{
    color: white;
    background: #D5001C;
    cursor: pointer;
  }
  .logindiv p{
    width: 80%;
    height: 40px;
    background: whitesmoke;
    cursor: pointer;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    position: relative;
    top: 20px;
    transition: all 0.3s ease;
  }
  .logindiv{
    width: 100%;
    height: 80px;

    font-family: OPPOfont2;
  }
  /*----------------------------上面的没有登录的div---*/
.nav-list{

}
  /*--------------------鼠标悬浮头部的手机图片动画*/
  .goodsimgsb{
    background: white;
    transition: all 0.8s ease;
    position: relative;
    left: 20px;

  }
  .goodsimgli:hover .goodsimgsb{
    left: -5px;
  }
  .goodsimgli:hover .goodsimgsbspan{
    left: 5px;
    opacity: 1;
  }
  /*图片的颜色字*/
  .goodsimgsbspan{
    position: relative;
    left: -20px;
    transition: all 0.8s;
    opacity: 0;
  }


  /*-------------------------------搜索框*/
  .shadow_div{
    position: fixed;
    width: 100%;
    height: 120%;
    background: rgba(0,0,0,0.48);
    z-index: 102;
    margin-top: -5px;
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


.nav_search_div02 label{
  font-size:9px;
  position: relative;
  top: -10px;
  left: 2px;
  font-weight: 600;
  font-family: OPPOfont1;
}
.nav_search_div02 li{
  line-height: 35px;
  width: 100%;
  padding-left: 25px;
  cursor: pointer;
}
.nav_search_div02 li:hover{
  background: ghostwhite;
  color: indianred;
  transition: all 0.2s;
}
.nav_search_div02 ul{
  width: 91%;
  height: 100%;
  font-size: 10px;
  position: relative;
  top: 7px;
}
  .nav_search_div02{
    width: 100%;
    min-height: 20%;

    border-radius: 0px 0px 20px 20px;
    z-index: 100;
    padding-left: 20px;
    padding-top: 30px;
    padding-bottom: 25px;
    font-weight: 300;
    font-family: OPPOfont1;
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
    background: white;
    z-index: 1000;
    left: 310px;
    border-radius: 0px 0px 20px 20px;
    min-height: 50px;
    font-weight: 300;
  }
  /*--------------------------------2级头---*/
  .main_div_div img{
    width: 50px;
    display: inline;
  }
  .main_div_div span{
    position: relative;
    top: -20px;
  }
  .main_div_div label{
    position: relative;
    color: black;
    top: 2px;
  }
  .main_div_div li{
    margin: 20px 20px;
    text-align: center;
    cursor: pointer;
  }

  .main_div_div ul{
    margin-top: -15px;
    margin-left: 50px;
    float: left;
   /* background: red;*/
  }


  /*解决屏幕刷新会闪现的bug*/
  [v-cloak] {
    display: none;
  }
.main_div_div{
  width: 100%;
  height: 100%;
 /* background: whitesmoke;*/
  margin: 0 auto;
  padding-left: 110px;
  display: inline-block;
  overflow: hidden;
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
  /*商品*/
  .goodslist-enter-active {
    animation: fadeInDown 0.8s;
  }
/*分类*/
  .typelistsb-enter-active {
    animation: fadeInDown 1s;

  }


#main_div{
  width: 100%;
  height: 340px;
  background: white;
  z-index: 50;
  position: absolute;
  box-shadow:0px 20px 10px -15px #ccc;
  margin-top: -10px;
  font-size: 12px;
  font-weight: 300;
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
  /*右键复制文字背景变红色*/
  ::selection {
    background:#CC0033;
    color:white;
  }

</style>
