<template>
  <div class="main">

    <!--第一个内容，轮播图-->
    <div id="home_div">
      <div class="block">
        <el-carousel trigger="click" height="615px" >
          <el-carousel-item>
            <div class="demo-carousel"><img src="../assets/img/test/1.jpg" ></div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="demo-carousel"><img src="../assets/img/test/2.jpg" ></div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="demo-carousel"><img src="../assets/img/test/3.jpg" ></div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="demo-carousel"><img src="../assets/img/test/4.jpg" ></div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!--第2个内容-->
    <div class="home_div_div02">
      <ul>
        <li class="hoverli">
          <img src="/static/images/shuchai/homes/手机专区.jpg">
        </li>
        <li class="hoverli">
          <img src="/static/images/shuchai/homes/配件专区.jpg">
        </li>
        <li class="hoverli">
          <img src="/static/images/shuchai/homes/以旧换新.jpg">
        </li>
        <li class="hoverli">
          <img src="/static/images/shuchai/homes/镭射.jpg">
        </li>
      </ul>
    </div>

    <!--第3个内容,专区,要循环的-->
    <div class="home_div_div03" v-for="(site,index) in generalizelist">
      <div class="home_div_div03_title">
        <p>{{site.generalizeName}}</p>
      </div>
      <div class="home_div_div03_content">
        <ul>
          <!--专区大图的li-->
          <li class="hoverli" @click="gogoodsinfo(site2.goods.goodsId)" v-if="site2.generalize_type==1" v-for="(site2,index2) in site.generalizeRelationList"  style="width: 610px;height: 305px">
            <a>
              <img style="margin-top: 0px" class="sbli_img" :src="site2.generalizeGoodsImg">
            </a>
          </li>

          <li class="hoverli" @click="gogoodsinfo(site2.goods.goodsId)" v-if="site2.generalize_type!=1"  v-for="(site2,index2) in site.generalizeRelationList">
            <a>
              <img :src="site3.goodscolorPicture" v-for="(site3,index3) in site2.goods.goodscolorList" v-if="index3==0">
            </a>
            <div class="home_div_div03_content_div">
              <p style="font-size: 16px">{{site2.goods.goodsName}}</p>
              <p class="sbpsb" style="font-size: 12px;color: #626262">{{site2.goods.goodsDescribe}}</p>
            </div>
            <div  class="home_div_div03_content_div" v-for="(site3,index3) in site2.goods.versionsList" v-if="index3==0">
              <p style="color: #f51919;margin-top: 30px;">￥{{site3.versionsPrice}}.00</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>

</template>
<script>
  import { f_GeneralizeList } from '../api/generalize';
  export default {
    data () {
      return {
        //推广数据
        generalizelist:[],

      }
    },
    mounted() {
      this.$store.commit('changNav2');
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        f_GeneralizeList().then(res => {
          this.generalizelist = res.res;
          console.log(res.res)
        })
      },
      /*点击图片进入商品详情*/
      gogoodsinfo(id){
        /*跳转页面并传值*/
        this.$router.push({path: '/ShopInfo',query:{ id:id}});
        this.$router.go(0);
      },
    },

  }
</script>


<style scoped>
  .sbpsb{
    font-size: 12px;
    color: rgb(98, 98, 98);
    width: 80%;
    margin: 0 auto;
    line-height: 15px !important;
  }
  .sbli_img{
    width: 610px !important;
    height:380px !important;
  }

 /* position: relative;
  top: -74px;*/
  /*-专区大图*/
  .home_div_div03_content_div p{
    line-height: 30px;
  }
  .home_div_div03_content_div{
    text-align: center;
    width: 100%;
    height: 50px;
    color: black;
    font-family: OPPOfont1;
    position: relative;
    top: 30px;
  }
  .home_div_div03_content img{
    width: 172px;
    height: 172px;
    margin: 0 auto;
    margin-top: 43px;
  }
  .home_div_div03_content li{
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    text-align: center;
    background-color: #fff;
    width: 300px;
    height: 380px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .home_div_div03_content ul{
    margin-top: 20px;
    margin-left: 60px;
  }
  .home_div_div03_content{
    width: 100%;
    min-height: 70px;
  }
  /*--专区内容-*/
  .home_div_div03_title p{
    color: #333;
    font-size: 24px;
    font-family: OPPOfont1;
  }
  .home_div_div03_title{
    text-align: center;

  }
  .home_div_div03{
    width: 100%;
    min-height: 100px;
    margin: 0 auto;
    margin-top: 50px;
  }
  /*------------------------------专区--------*/
  .hoverli:hover{
    box-shadow: #ccc 0px 10px 10px;
    top: -3px;
  }
  .hoverli{
    cursor: pointer;
    position: relative;
    transition: all 0.4s;
    top: 1px;
  }
  /*通用的鼠标悬浮*/
  .home_div_div02 img{
    width: 300px;
    height: auto;

  }
  .home_div_div02 ul{
  margin-top: 15px;
  margin-left: 55px;
  }
  .home_div_div02 li{
    float: left;
    margin-left: 10px;
    transition: all 0.4s;
  }
  .main{
  width: 100%;
  min-height: 200px;
  background: #F4F4F4;
    padding-bottom: 80px;
}
.home_div_div02{
  width: 100%;
  height: 160px;
  margin: 0 auto;
}
/*-----------------------------------------1.4*/
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
#home_div{
  width: 100%;
  min-height: 665px;
  background: black;
  cursor: pointer;
}
  .home_carousel{
    width: 100%;
    height: 665px;
  }
  .demo-carousel{
    background: black;
  }
.demo-carousel img{
  height: 665px;
  width: auto;
  margin: 0 auto;
}
</style>
