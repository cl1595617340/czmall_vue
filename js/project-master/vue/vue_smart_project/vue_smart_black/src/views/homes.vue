<template>
  <div class="main">

    <!--第一个内容，轮播图-->
    <div id="home_div">
      <div class="block">
        <el-carousel trigger="click" height="668px" >
          <el-carousel-item>
            <div class="demo-carousel">
              <img src="http://118.178.187.197:888/static/shuchai/homes/fs-head-7aba14b451.jpg" >

            </div>
            <a class="lbtbtn lbtbtnsb01" @click="gogoodsinfo(15)">探索</a>
          </el-carousel-item>

          <el-carousel-item>
            <div class="demo-carousel"><img src="http://118.178.187.197:888/static/shuchai/homes/201912260412525e0470ac3c573.jpg" ></div>
            <a class="lbtbtn lbtbtnsb02" @click="gogoodsinfo(11)">发现</a>
          </el-carousel-item>

          <el-carousel-item>
            <div class="demo-carousel"><img src="http://118.178.187.197:888/static/shuchai/homes/d857fe20bae1e592dfa3116e108892ae.jpg" ></div>
            <div class="lbtdiv">
              <p class="lbtdivp01">NEX3 5G</p>
              <p class="lbtdivp02">无界瀑布屏</p>
              <p class="lbtdivp02">高通骁龙855 Plus</p>
              <a class="lbtdiva01" @click="gogoodsinfo(9)">寻找</a>
            </div>
          </el-carousel-item>


        </el-carousel>
      </div>
    </div>

    <!--第2个内容-->
    <div class="home_div_div02">
      <ul>
        <li class="hoverli" @click="Todevelop">
          <img src="http://118.178.187.197:888/static/shuchai/homes/12.jpg">
        </li>
        <li class="hoverli">
          <img @click="goiponeinfo" src="http://118.178.187.197:888/static/shuchai/homes/13.jpg">
        </li>
        <li class="hoverli">
          <img @click="gogoodsinfosb" src="http://118.178.187.197:888/static/shuchai/homes/14.jpg">
        </li>
        <li class="hoverli" @click="Todevelop">
          <img src="http://118.178.187.197:888/static/shuchai/homes/15.jpg">
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
          <li class="hoverli bigcontent" @click="gogoodsinfo(site2.goods.goodsId)" v-if="site2.generalize_type==1" v-for="(site2,index2) in site.generalizeRelationList"   >
             <div class="bigcontent_div">
                <div class="bigcontent_div01" v-text="site2.goods.goodsName">

                </div>
               <div class="bigcontent_div02" v-text="site2.goods.goodsDescribe">

               </div>
               <div class="bigcontent_div01 bigcontent_div01_color">
                 进一步了解
               </div>
               <div class="bigcontent_div01 bigcontent_div01_sb">

               </div>
            </div>
            <a>
              <img style="margin-top: 0px" class="sbli_img" :src="site2.generalizeGoodsImg">
            </a>
          </li>

          <li class="hoverli" @click="gogoodsinfo(site2.goods.goodsId)" v-if="site2.generalize_type!=1"  v-for="(site2,index2) in site.generalizeRelationList">

            <span class="hoverli_spansb" v-if="site2.goods.goodsId==15">
              <label>视频</label>
            </span>
            <span class="hoverli_spansb2" v-if="site2.goods.goodsId==9">
              <label>5 G</label>
            </span>

            <a>
              <img :src="site3.goodscolorPicture" v-for="(site3,index3) in site2.goods.goodscolorList" v-if="index3==0">
            </a>
            <div class="home_div_div03_content_div">
              <p class="home_div_div03_content_div_p01" >{{site2.goods.goodsName}}</p>
              <p class="sbpsb" >{{site2.goods.goodsDescribe}}</p>
            </div>
            <div  class="home_div_div03_content_div" v-for="(site3,index3) in site2.goods.versionsList" v-if="index3==0">
              <p class="home_div_div03_content_div_p02">￥{{site3.versionsPrice}}.00</p>
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
      if (this.$store.state.Resolutionprompt){
        this.$alert('<strong>首先真的非常非常感谢您能抽出宝贵的时间访问本网站,' +
          '但在您正式进入网站前,请先将电脑分辨率<label style="color: firebrick">设置为1366*768分辨率</label>,因为在写样式时并没有过多的考虑适配性,' +
          '所以在其他分辨率时和移动端时,部分页面的样式会错乱,非常影响您的体验.<br/><br/>因为服务器带宽和项目采用了中文字体' +
          ',所有在第一次进去网站时,会加载的比较慢.<br/><br/>如在这里耽搁了您宝贵的时间,我本人真的表示深深的歉意,' +
          '望见谅.</strong>', '很重要的提示', {
          dangerouslyUseHTMLString: true
        });
        this.$store.commit('changResolutionprompt');
      }
      this.$store.commit('changNav2');
      this.$store.commit('changheaderStyle',1);
      this.$store.commit('changfooterStyle',1);
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
      /*sbcarousel(){
        this.$notify.info({
          title: '信息',
          message: '轮播图并没有绑定数据,请到别处看看0.0'
        })
      },*/
      /*通用的待开发*/
      Todevelop(){
        this.$toTop()
      },
      /*点击图片进入商品详情*/
      gogoodsinfo(id){
        /*跳转页面并传值*/
        this.$router.push({path: '/ShopInfo',query:{ id:id}});
        this.$router.go(0);
      },
      /*点击手机专区*/
      goiponeinfo(){
        this.$router.push("/shop");
        this.$router.go(0);
      },
      /*点击配件专区*/
      gogoodsinfosb(){
        this.$router.push({path: '/AllOtherGoods',query:{ id:2,name:"官方配件"}});
        this.$router.go(0);
      },
    },

  }
</script>


<style scoped>

  .lbtdiva01:hover{
    color: #008CF9;
    border: 1px #008CF9 solid;

  }
  .lbtdiva01{
    display: block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    transition: all 0.3s;

    font-family: OPPOfont1;
    border: 1px white solid;
    width: 160px;
    height: 50px;
    margin: 30px auto;
    color: white;
  }
  .lbtdivp02{
    width: 100%;
    height: auto;
    margin-top: 5px;
    font-size: 35px;
    line-height: 45px;
    color: #fff;
    text-align: center;
  }
  .lbtdivp01{
    width: 100%;
    height: 24px;
    font-size: 20px;
    line-height: 25px;
    color: #fff;
    text-align: center;
  }

  .lbtdiv{
    position: absolute;
    left:-700px; right:0; top:-200px; bottom:0;
    margin:auto;
    width: 400px;
    height: 50px;
    /* background: red;*/
    display: block;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    transition: all 0.3s;

    font-family: OPPOfont1;
  }
  .lbtbtnsb02:hover{
    color: #E8401C;
    border: 1px #E8401C solid;
  }

  .lbtbtnsb02{
    border: 1px black solid;
    color: black;
    top: 520px !important;
  }
  .lbtbtnsb01:hover{
    color: #35748E;
    border: 1px #35748E solid;
  }
  .lbtbtnsb01{
    border: 1px white solid;
    color: white;
  }

  .lbtbtn{
    position: absolute;
    left:0; right:0; top:450px; bottom:0;
    margin:auto;
    width: 100px;
    height: 50px;
   /* background: red;*/
    display: block;
    width: 160px;
    height: 50px;

    text-align: center;
    line-height: 50px;
    cursor: pointer;
    transition: all 0.3s;

    font-family: OPPOfont1;
  }

  .home_div_div03_content_div_p02{
    color: #f51919;margin-top: 30px;
  }

.home_div_div03_content_div_p01{
  font-size: 16px
}


  .hoverli_spansb2:hover{
    background-color: rgba(65,95,255,0.15);
  }
  .hoverli_spansb2 label{
    cursor: pointer;
  }
.hoverli_spansb2{
  position: absolute;
  font-family: OPPOfont2;
  color: #415FFF;
  border: 1px solid #415FFF;
  /* background-color: rgba(0,198,120,0.15);*/
  width: 60px;
  height: 25px;
  line-height: 25px;
  top: 300px;
  left: 120px;

  transition: all 0.3s;
}

  .hoverli_spansb label{
    cursor: pointer;
  }
  .hoverli_spansb:hover{
    background-color: rgba(219,76,117,0.15);
  }
  .hoverli_spansb{
    position: absolute;
    font-family: OPPOfont2;
    color: #DB4C75;
    border: 1px solid #DB4C75;
   /* background-color: rgba(0,198,120,0.15);*/
    width: 60px;
    height: 25px;
    line-height: 25px;
    top: 300px;
    left: 120px;

    transition: all 0.3s;
  }


  .bigcontent_div01_color:hover+.bigcontent_div01_sb{
    width: 55px;
    opacity: 0.9;
  }
  .bigcontent_div01_sb{
    border-top: 0.007353rem salmon solid;
    width: 20px;
    margin-left: 80px;
    margin-top: 10px;
    transition: all 0.6s;
    opacity: 0.8;
  }
  .bigcontent_div01_color{
    color: rgb(245, 25, 25);
    margin-top: 10px;
    font-family: OPPOfont5  !important;
    transition: all 0.6s;
    opacity: 0.8;
  }
  .bigcontent_div02{
    font-size: 16px;
    font-family: OPPOfont5;
    width: 220px;
    margin-top: 10px;
    transition: all 0.6s;
  }
  .bigcontent_div01{
    font-size: 14px;
    font-family: OPPOfont2;
    transition: all 0.6s;
  }

  .bigcontent_div{
    position: absolute;
    left: 350px;
    top: 110px;
    transition: all 0.6s;
  }
  /*大图*/
  .bigcontent{
    width: 610px !important;
    height: 305px !important;
    padding-bottom: 70px;
  }
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
    width: 302px;
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
  #home_div img{
    width: 100%;
    height: 665px;
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
