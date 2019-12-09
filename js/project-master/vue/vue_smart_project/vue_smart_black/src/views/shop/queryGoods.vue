<template>
<div id="mainsb">
  <div class="main_div">
    <div style="padding-top: 20px;padding-left: 72px">
      <div style="margin-top: -5px">
        <p>保时捷（中国）汽车销售有限公司是保时捷在中国大陆</p>
        <p>市场及售后服务等环节为合作伙伴提供专业支持以及香港。</p>
      </div>
    </div>
  </div>

  <!--搜索框内容-->
  <div class="main_querdiv">
    <div class="main_querdiv_div">
      <div>
        <input @keyup.enter="goQueryGoods($event)" value="" v-model="searchValue">
        <i class="el-icon-search"></i>
      </div>

      <!--分类的div-->
      <div class="main_querdiv_typediv">
        <ul>
          <li @click="clickType(index)" v-for="(site,index) in type" :style="typeindex == index ? typeColor : ''" >
            {{site}}
            <label v-text="goodslistsSize" v-if="index==0"></label>
            <label v-text="othergoodslistsSize" v-if="index==1"></label>
            <label v-if="index==2">0</label>
            <label v-if="index==3">0</label>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!--搜索的主要内容-->
  <div class="query_div">
    <div class="query_div_div" v-show="showgoodss"  :style="goodsname8p == site.goodsName ? pColor : ''"   style="margin-top: 30px" v-for="(site,index) in goodslists">
      <img v-for="(siteimg,indeximg) in site.goodscolorList" v-if="indeximg==0" :src="siteimg.goodscolorPicture" style="width: 180px;height: auto">

      <div class="query_div_div_div">{{site.goodsName}}
        <label v-for="(siteprice,indexprice) in site.versionsList" v-if="indexprice==0" class="query_div_div_label">￥{{siteprice.versionsPrice}}</label>
      </div>

      <div class="query_div_div_div2">{{site.goodsDescribe}}</div>
      <!--进一步了解的按钮-->
      <div class="query_div_div_gobuy" :style="goodsname8p == site.goodsName ? pColor2 : ''">
        <p class="query_div_div_gobuy_p1">进一步了解<div class="line linesb"></div>
        </p>
        <p class="query_div_div_gobuy_p2">现在购买<div class="line linesb2"></div>
        </p>
      </div>
    </div>

    <div class="goodsNone" v-show="goodsNone">
asd
    </div>
  </div>


</div>
</template>

<script>
  import { f_likeGetGoods } from '../../api/goods'
  import { f_likeGetGoodsNot } from '../../api/goods'
  export default {
    data(){
      return {
        searchValue:"",
        type:["手机","其他","服务","体验店"],
        typeindex:-1,
        typeColor:"",
        /*发送给后台的参数*/
        querytype:"手机",
        /*手机数据集合*/
        goodslists:[],
        /*其他数据集合*/
        othergoodslists:[],
        /*长度*/
        goodslistsSize:"",
        othergoodslistsSize:"",
        /*因为8p图片的问题，所以要调整下样式*/
        goodsname8p:"iPhone 8 Plus",
        pColor:"padding-top: 2px;",
        pColor2:"margin-top: -20px;",

        showgoods:[],
        isshowgoods:1,
        judgeiponeNone:false,

        goodsNone:false,
        showgoodss:true,
      }
    },
    created() {

    },
    methods:{
      getData(){
        if (this.isshowgoods==1){
          let formDatas = new FormData();
          formDatas.append("name", this.searchValue);
          formDatas.append("type", this.querytype);
          f_likeGetGoods(formDatas).then(res => {
            this.goodslists = res.goodsList
            this.goodslistsSize = this.goodslists.length;
            /*判断空的提示*/
            if (this.goodslists.length==0){
              this.showgoodss =false;
              this.goodsNone =true;
            }else {
              this.showgoodss =true;
              this.goodsNone =false;
            }
            console.log(res.goodsList)
          });
          /*拿到除了手机分类外的数量*/
          f_likeGetGoodsNot(formDatas).then(res2 => {
            this.othergoodslistsSize = res2.goodsList.length;
          })

        }else {
          let formDatas2 = new FormData();
          formDatas2.append("name", this.searchValue);
          formDatas2.append("type", this.querytype);
          f_likeGetGoodsNot(formDatas2).then(res => {
            this.goodslists = res.goodsList
            this.othergoodslistsSize = this.goodslists.length;
            /*判断空的提示*/
            if (this.goodslists.length==0){
              this.showgoodss =false;
              this.goodsNone =true;
            }else {
              this.showgoodss =true;
              this.goodsNone =false;
            }
            console.log(res.goodsList)
          })

        }
      },
      /*查询*/
      goQueryGoods(e){
        var that = this;
        var val = e.target.value;
        this.searchValue = val;
        this.typeindex = 0;
        this.typeColor = 'color: rgb(0, 139, 214)';
        this.isshowgoods=1;
        if (val!=""){
          this.getData();
        }

      },
      /*点击不用的分类（类型）*/
      clickType(index){
        this.typeindex = index;
        this.typeColor = 'color: rgb(0, 139, 214)';
        this.judgeiponeNone = true;
        if (index==1){
          this.isshowgoods=2;
          this.getData();
        }else {
          this.isshowgoods=1;
          this.getData();
        }
      },
    },
    /*监听滚动条*/
    mounted() {
      let id = this.$route.query.id;
      this.searchValue = id;
      this.getData();
      this.clickType(0);
    },
  }
</script>

<style scoped>
  .linesb2{

    position: relative;
    left: 138px;
    top: -23px;
  }
  .linesb{
    position: relative;
    left: 40px;
  }
  .line{
    width: 17px;
    height: 6px;
    border-width: 0 0 1px;
    border-style: solid;
    border-color: #008cdc;
    transition: all 0.6s;
  }
  .query_div_div_gobuy_p2:hover+.line{
    width: 40px;
  }
  .query_div_div_gobuy_p2{
    position: relative;
    left: 100px;
    top: -24px;
    font-size: 14px;
    line-height: 18px;
    color: #008cdc;
    cursor: pointer;
    margin-left: 30px;
  }
  .query_div_div_gobuy_p1:hover+.line{
    width: 50px;
  }
  .query_div_div_gobuy_p1{
    font-size: 14px;
    line-height: 18px;
    color: #008cdc;
    cursor: pointer;
    margin-left: 30px;
  }
  .query_div_div_gobuy{
    position: relative;
    left: 610px;
    top: -65px;
    width: 300px;
  }
  .query_div_div_div2{
    position: relative;
    left: 240px;
    top: -150px;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1.5px;
    width: 500px;
    cursor: pointer;
  }
  .query_div_div_label{
    display: inline-block;
    color: #f51919;
    padding: 0 20px;
    font-size: 20px;
    cursor: pointer;
  }
  .query_div_div_div{
    position: relative;
    left: 240px;
    top: -170px;
    color: #333333;
    display: block;
    font: normal 400 30px/12px "微软雅黑", serif;
    transform: scale(1, 1.1);
    width: 500px;
    cursor: pointer;
    letter-spacing: 1.5px;
  }
  .query_div_div>img{
    margin-left: 40px;
    margin-top: 30px;
    cursor: pointer;
  }
  .query_div_div{
    width: 850px;
    height: 265px;
    background: white;
    margin-left: 72px;
    padding-top: 18px;
  }
  .query_div{
    width: 100%;
    min-height: 200px;
    background: #F7F7F7;
    padding-top: 30px;
    padding-bottom: 80px;
  }
  /*----------------------------------搜索内容----------------*/
  .main_querdiv_typediv li:hover{
    color: rgb(0, 139, 214);
  }
  .main_querdiv_typediv li{
    float: left;
    cursor: pointer;
    font-size: 16px;
    line-height: 50px;
    color: #999;
    margin-left: 65px;
    transition: all 0.3s;
  }
  .main_querdiv_typediv ul{
    margin-left: -10px;
  }
  .main_querdiv_typediv{
    color: #CCCCCC;
  }
  .main_querdiv_div i{
    font-size: 24px;
    color: #CCCCCC;
    font-weight: 200;
   position: relative;
    left: -50px;
    top: 4px;
    cursor: pointer;
  }
  .main_querdiv_div input{
    height: 40px;
    width: 520px;
    color: whitesmoke;
    font-size: 14px;
    font-weight: 300;
    padding-left: 20px;
    background-color: transparent;
    border-radius: 20px;
    border: 1px solid #999;
  }
  .main_querdiv_div>div{
    width: 100%;
    height: 50%;
    padding-top: 20px;
  }

  .main_querdiv_div{
    width: 45%;
    height: 80%;
  /*  background: ghostwhite;*/
    position: relative;
    top: 20px;
    left: 72px;
  }

  .main_querdiv{
    height:140px;
    width: 100%;
    background: #000000;
    position: relative;
    top: 0px;
  }
  /*------------------------搜索框内容------*/
  .main_div p{
    width: 70%;
    text-align: left;
    font-weight: 200;

  }

  .main_div{
    font-family: "SF Pro SC","HanHei SC","SF Pro Text","Myriad Set Pro","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
    height: 60px;
    width: 100%;
    font-size: 13px;
    background: #F7F7F7;
    position: relative;

  }
  #mainsb{
    min-height: 200px;
    width: 100%;
    /*background: wheat;*/
    position: relative;
    top: 50px;
    overflow: hidden;
  }
</style>
