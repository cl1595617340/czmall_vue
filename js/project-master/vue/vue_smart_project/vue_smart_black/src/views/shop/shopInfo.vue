<template>
<div id="main">
  <!--商品的头-->
  <div class="main_nav" :style="goodsnav">
      <ul>
        <li v-text="goods.goodsName" v-if="index==0"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">

        </li>


        <div style="position: absolute;left: 100px">
          <li @click="goOtherinfo(index)" v-if="index!=0" v-show="goodstypeid!=137&&index==2?hidegoods:showgoodsTotype"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">
            {{site}}
          </li>
        </div>

        <li style="position: absolute;left: 270px;">
          <button @click="goOtherinfo(3)"><label style="color: #D10D0D;cursor: pointer">购买</label></button>
        </li>
      </ul>
  </div>

  <!--商品详情的主要内容-->
  <div class="main_divsb" >
    <div v-html="goods.goodsInfo">

    </div>
    <!--富文本中间的购买按钮-->
    <p class="main_divsb_divbtn" :style="goodstypeid==137?noneBtnsb:noneBtn">
      <button class="main_divsb_divbtn_btn" @click="goOtherinfo(3)">即刻购买<i style="position: relative;left: 10px" class="el-icon-arrow-right"></i></button>
      <button v-show="goodstypeid==137" @click="goOtherinfo(2)" class="main_divsb_divbtn_btn">参数规格<i style="position: relative;left: 10px" class="el-icon-arrow-right"></i></button>
    </p>
  </div>
</div>
</template>

<script>
  import { f_getGoodsByid } from '../../api/goods'


  export default {
    data(){
      return {
        goodsid:"",
        goodsnav:'',
        /*头部的字*/
        goodsnavlist:["iQOO Neo","概述","参数规格"],
        liname:"liname",
        linamesb:"linamesb",

        border_bottom:"border-bottom: 3px  #D10D0D solid;",
        /*查询的商品对象*/
        goods:{},

        /*拿到商品的id，如果不是手机，参数就消失，手机id是137*/
        goodstypeid:"",
        hidegoods:false,
        showgoodsTotype:true,
        noneBtn:"margin-left: 100px;",
        noneBtnsb:"margin-left: 0px;",
      }
    },
    mounted() {
      window.addEventListener('scroll', this.windowScroll);

      this.$store.commit('changNav');
      let id = this.$route.query.id;
      this.goodsid = id;
      this.getData();
      $('html,body').animate({scrollTop: 0}, 10);


    },

    methods:{
      getData(){
        let formDatas = new FormData();
        formDatas.append("id", this.goodsid);
        f_getGoodsByid(formDatas).then(res => {
          this.goods = res.goods;
          this.goodstypeid = res.goods.goodsType3Id;
          console.log(this.goods)

        })
      },
      /*去到手机的其他页面*/
      goOtherinfo(index){
        switch(index) {
          case 1:
            /*跳转页面并传值*/
            this.$router.push({path: '/ShopInfo',query:{ id:this.goodsid}});
            this.$router.go(0);
            break;
          case 2:
            /*跳转页面并传值*/
            this.$router.push({path: '/GoodsParameter',query:{ id:this.goodsid}});
            this.$router.go(0);
            break;
          case 3:
            /*跳转页面并传值*/
            this.$router.push({path: '/BuyGoods',query:{ id:this.goodsid}});
            this.$router.go(0);
            break;
        }

      },
      windowScroll () {
        // 滚动条距离页面顶部的距离
        // 以下写法原生兼容
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        /* console.log(scrollTop)*/
        if (scrollTop>=60){
          this.goodsnav = "position: fixed;top:0px";
        }else {
          this.goodsnav = "position: fixed;top:50px";
        }

      },
    },

  }
</script>

<style scoped>
  .main_divsb_divbtn_btn:hover{
    color: black;
    border: 1px  #56E0F3 solid;
    background:#B7EAE5 ;
  }
  .main_divsb_divbtn_btn{
    width: 120px;
    height: 40px;
    border: 1px silver solid;
    border-radius: 20px;
    float: left;
    margin-left: 20px;
    transition: all 0.3s;
    color: silver;
    font-family: OPPOfont3;
  }
  .main_divsb_divbtn{
    position: absolute;
    left: 525px;
    top: 360px;
    width: 300px;
    height: 80px;
    /*background: red;*/
    z-index: 2;
    padding-top: 20px;
  }
  /*-------------------------------富文本中间的购买按钮*/
  .main_divsb>>>img{
    width: 1364px;
    height: auto;
  }
  .main_divsb>div{
    width: 1364px;
    margin: 0 auto;
  }
  .main_divsb{
    width: 1364px;
    min-height: 300px;
    position: relative;
    top: -5px;
    /*background: wheat;*/
    padding-top: 3px;
    transition: all 0.5s;
  }
  /*------------------------------商品详情的主要内容---------------*/
  .li02:hover{
    color: rgb(0, 139, 214);
  }
  .li02{

  }
  .liname{
    position: relative;
    left: -905px;
    font-size: 15px;
  }
  .main_nav li{
    float: left;
    margin-left: 40px;
    letter-spacing: 1.5px;
    cursor: pointer;
    font-size: 12px;
    line-height: 60px;
    transition: all 0.3s;
    height: 59px;
    font-weight: 200;
  }
  .main_nav ul{
    position: relative;
    left: 935px;
  }
  .main_nav{
    height: 60px;
    width: 100%;
    background: #F7F7F7;
    z-index: 10;
    position: fixed;
    top:50px;
    transition: all 0.2s;
    border-bottom: 1px silver solid;
    background: rgba(255,255,255, 0.5)
  }
  /*---------------头----*/
#main{
  min-height: 500px;
  width: 100%;
  background: white;
  position: relative;
 /* top: 50px;*/
  overflow: hidden;
}
</style>
