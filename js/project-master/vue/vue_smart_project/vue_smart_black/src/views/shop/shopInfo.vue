<template>
<div id="main">
  <!--商品的头-->
  <div class="main_nav" :style="goodsnav">
      <ul>
        <li  v-if="index==0"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">
          <label style="cursor: pointer">{{goodsNamesbsb}} {{lbjn}}</label>
        </li>

        <div class="main_nav_lisb01" :style="goodstypeid!=137?otherGoodsstyle:''">
          <li @click="goOtherinfo(index)" v-if="index!=0" v-show="goodstypeid!=137&&index==2?hidegoods:showgoodsTotype"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">
            {{site}}
          </li>
        </div>

        <li class="main_nav_lisb02" >
          <button @click="goOtherinfo(3)">
            <label :style="main_nav_lisb02">{{gobuygoodsb}}</label>
          </button>
        </li>
      </ul>
  </div>

  <!--商品详情的主要内容-->
  <div class="main_divsb" >
    <!---------------oppofondx的视频-->
    <div class="main_divsb_video" v-if="goodsid==15">
      <video :src="videoSrc" :class="videoSrcclass" id="vid"  autoplay="autoplay">
        your browser does not support the video tag
      </video>
    </div>
    <!---------------vivonex3的背景视频-->
    <div v-if="goodsid==9" >
      <div class="id9div">
        <p class="id9divp01">5G 通讯</p>
        <p class="id9divp01" style="color: white">真未来 跨时代</p>
        <p class="id9divp02" >NEX系列5G首发，跨越时代，直通未来。NEX 3 采用高通骁龙855 Plus处理器，带来强劲运算与图形性能，多任务运行顺畅无阻。支持4G全球频段，超快下载速度、超低延迟滞后、超强网络覆盖，完整5G功能，独享新时代飞速手机体验。</p>
        <p class="id9divp03">注：仅5G版支持5G通信功能，本手机5G网络仅支持NSA模式，具体网络部署详情，请咨询当地运营商。</p>
      </div>
      <video :src="vivonex03" :class="videoSrcclass"  autoplay="autoplay" muted="true" loop="loop" playsinline="true" webkit-playsinline="true">
        your browser does not support the video tag
      </video>
    </div>

    <!--文本域-->
    <div v-html="goods.goodsInfo" id="goodsInfo">
    </div>

    <!--oppofindx的动画-->
    <div v-if="goodsid==15" class="xdiv">

      <transition name="xdiv_left" >
        <div class="xdiv_left" v-if="xdiv_left" :style="xdiv_leftstyle"></div>
      </transition>

      <transition name="xdiv_right" >
        <div class="xdiv_right" v-if="xdiv_right" :style="xdiv_rightstyle"></div>
      </transition>

      <transition name="xdiv_text">
        <div class="xdiv_text" v-if="xdiv_text">
          <p>超凡一体</p>
          <p>未来旗舰</p>
        </div>
      </transition>


    </div>

    <!--购买的按钮-->
    <transition name="xdiv_btn">
      <!--富文本中间的购买按钮-->
      <p class="main_divsb_divbtn" v-show="xdiv_btn" :class="goodsid==15?oppoxclass:''" :style="goodstypeid==137?noneBtnsb:noneBtn">
        <button id="btnsb01" :style="btnsb01" class="main_divsb_divbtn_btn" @click="goOtherinfo(3)">
          <label v-if="goodsid==15" style="cursor: pointer;">见证未来</label>
          <label v-if="goodsid!=15" style="cursor: pointer;">即刻购买</label>
          <i v-if="goodsid==15" style="position: relative;left: 10px" class="el-icon-loading"></i>
          <i v-if="goodsid!=15" style="position: relative;left: 10px" class="el-icon-arrow-right"></i>
        </button>

        <span id="btnsb02">
        <button :style="btnsb02" v-show="goodstypeid==137" @click="goOtherinfo(2)" :class="goodsid==15?main_divsb_divbtn_btnsb:main_divsb_divbtn_btn">
          <label v-if="goodsid==15" style="cursor: pointer;">探索未知</label>
          <label v-if="goodsid!=15" style="cursor: pointer;">参数规格</label>
          <i v-if="goodsid==15" style="position: relative;left: 10px" class="el-icon-loading"></i>
           <i v-if="goodsid!=15" style="position: relative;left: 10px" class="el-icon-arrow-right"></i>
        </button>
      </span>
      </p>
    </transition>

    <!--oppofindx兰博基尼-->
    <div v-if="goodsid==15" class="oppol" :style="oppol">
      <p>OPPO Automobili Lamborghini S.p.A</p>
    </div>

    <div v-if="goodsid==15" class="oppolimg" :style="oppolimg">
      <img src="http://118.178.187.197:888/static/shuchai/phone_看图王.jpg" class="oppolimgsb" :style="oppolimgsb">

      <div class="oppoldiv" :style="oppoldiv">
        <P class="oppoldivp01">Find X 兰博基尼版 探索设计与速度新境界</P>
        <P class="oppoldivp01">Changing The Future</P>
        <P class="oppoldivp02">
          玻璃机身下加入黑色碳纤维纹理，把深邃的力量和有深度的宝石质感融合，Find X 兰博基尼版呈现跃跃欲试的动感；悬浮立体的兰博基尼标志，无论从什么角度看去，它都像浮现在机身之上, 随光影流转的纵深感赋予了Find X 兰博基尼版独具一格的生命力。
        </P>
      </div>

      <div class="oppo_logo">
        <img class="oppo_logo_img" src="http://118.178.187.197:888/static/shuchai/sec-2-logo.png">
      </div>
    </div>

  </div>


  <!--oppofindx的页脚-->
  <div class="oppo_footer">
    <div class="oppo_footer_div">
      <P>备注:</P>
      <ol class="oppo_footer_ol">
        <li>1. 6.42 英寸为显示屏四个圆角拉伸为直角时，屏幕对角线的长度（实际可视区域较小）。</li>
        <li>2. 3730mAh 数据为 Find X 标准版电池容量典型值。</li>
        <li>3. AI 智能助手、智慧识屏功能适用于支持 ColorOS 5.0 及以上版本的 OPPO 手机，需用户自行设置方可开启。OPPO 云服务需用户自行设置方可开启。</li>
        <li>4. Find X 超级闪充版和 Find X 兰博基尼版采用 2*1700mAh 双电芯，等效于 3400mAh 电池能量。</li>
        <li>5. 需 35 分钟，即可充满一部手机：该数据来源于 OPPO 实验室检验报告；检验环境：温度 20℃-30℃，相对湿度 45%-75%，气压 86kPa-106kPa，初始电压 3.42-3.45V；测试条件：在手机电量为 1% 的情况下，关闭除通话以外的其他手机服务和功能，显示屏息屏，使用标配电源适配器充电。实际充电时间可能因手机使用具体条件而发生变化。</li>
        <li>6. 产品图片仅供参考，请以实物为准。产品某些规格和描述可能因供应商更换等原因而发生变化，请以产品实际为准。页面中所涉及到的数据均来源于我司设计技术参数、实验室及供应商测试数据，实际情况会因测试软件版本、具体测试环境、具体版本不同，而略有差异。</li>
      </ol>
    </div>
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
        goodsnavlist:["","概述","参数规格"],
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
        /*----------------------------------下面是关于视频的---*/
        videoSrc:"https://dsfs.oppo.com/cn/product/findx/files/sec-3-video-2.mp4?v=20180620032316",
        btnsb01:"",
        btnsb02:"",
        videoSrcclass:"videoSrcclass",
        oppoxclass:"oppoxclass",

        xdiv_left:false,
        xdiv_right:false,

        xdiv_leftstyle:"",
        xdiv_rightstyle:"",

        xdiv_text:false,
        main_divsb_divbtn_btn:"main_divsb_divbtn_btn",
        main_divsb_divbtn_btnsb:"main_divsb_divbtn_btnsb",
        xdiv_btn:true,
        gobuygoodsb:"购买",
        goodsNamesbsb:"",
        oppol:"",
        oppolimg:"",
        oppolimgsb:"",
        oppoldiv:"",

        main_nav_lisb02:"color: #D10D0D;cursor: pointer;font-family: OPPOfont1",
        lbjn:"",
        /*------------vivonex03--*/
        vivonex03:"https://wwwstatic.vivo.com.cn/vivoportal/files/resource/product/1571621513953/images/nex3-future-video.mp4",

        otherGoodsstyle:"left:1.5rem",
      }
    },
    mounted() {
      window.addEventListener('scroll', this.windowScroll);
      this.$store.commit('changNav');
      this.$store.commit('changheaderStyle',1);
      this.$store.commit('changfooterStyle',1);
      let id = this.$route.query.id;

      this.goodsid = id;
      this.getData();

      if (id==15){
        $('html,body').animate({scrollTop: 80}, 200);
        this.xdiv_btn = false;
      }else {
        $('html,body').animate({scrollTop: 0}, 10);
        this.xdiv_btn = true;
      }

      /*vivonex3*/
      if (id==9){
        this.goodsnav = "position: fixed;top:50px;transition: all 0.3s;background: black; color: white;" +
          " border: 1px black solid;";
        this.main_nav_lisb02 = "color: #008CF9;cursor: pointer;font-family: OPPOfont1";
      }

    },
    updated(){

/*
      $('#goodsInfo').find("img").css(({"height":"6rem","width":"9rem"}))
*/
      if (this.goodsid==15){
        $('#goodsInfo').find("[alt='oppofind02.jpg']").css(({"position":"relative","top":"16.1rem"}))
        $('#goodsInfo').find("[alt='oppofind03.jpg']").css(({"position":"relative","top":"16.1rem"}))
        $('#goodsInfo').find("[alt='oppofind04.jpg']").css(({"position":"relative","top":"16.1rem"}))
        $('#goodsInfo').find("[alt='oppofind05.jpg']").css(({"position":"relative","top":"16.1rem"}))
        $('#goodsInfo').find("p").css(({"height":"48.9rem"}))
      }

    },
    methods:{
      getData(){
        let formDatas = new FormData();
        formDatas.append("id", this.goodsid);
        f_getGoodsByid(formDatas).then(res => {
          this.goods = res.goods;
          this.goodstypeid = res.goods.goodsType3Id;
          console.log(this.goods)
          this.goodsNamesbsb = this.goods.goodsName;
          if (this.goodsid==15){
            this.showOtherVideo();
          }

        })
      },
      showOtherVideo(){

        let video = document.getElementById('vid');
        //视频结束触发得事件
        video.addEventListener("ended",function(){
        /*  alert(123)*/
        })

        //使用事件监听方式捕捉事件
        video.addEventListener("timeupdate",function(){
          let timeDisplay;
          //用秒数来显示当前播放进度
          timeDisplay = Math.floor(video.currentTime);
          console.log(Math.floor(video.currentTime))
          //当视频播放到 4s的时候做处理
          if (timeDisplay == 58){
            this.videoSrcclass="videoSrcclassb";
          }
          if(timeDisplay == 91){
            //处理代码
            $('html,body').animate({scrollTop: 790}, 1100);

          }

        },false);

        //视频暂停事件
        video.addEventListener('pause',function(){

        })
        //视频重新播放事件
        video.addEventListener('play',function(){

        });
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
      /*   console.log(scrollTop)*/

        if (scrollTop>=60){
          this.goodsnav = "position: fixed;top:0px";
        }else {
          this.goodsnav = "position: fixed;top:50px";
        }

        /*vivonex3*/
        if (this.goodsid==9&&scrollTop>=60){
          this.goodsnav = "position: fixed;top:0px;transition: all 0.4s;background: black; color: white;" +
            " border: 1px black solid;";
          this.main_nav_lisb02 = "color: #008CF9;cursor: pointer;font-family: OPPOfont1";
        }
        if (this.goodsid==9&&scrollTop<=60){
          this.goodsnav = "position: fixed;top:50px;transition: all 0.4s;background: black; color: white;" +
            " border: 1px black solid;";
          this.main_nav_lisb02 = "color: #008CF9;cursor: pointer;font-family: OPPOfont1";
        }


        /*进入oppofindx,自动播放视频,隐藏头部的导航*/
        if (this.goodsid==15){
          this.goodsnav = "position: fixed;top:-0.8rem;transition: all 1.2s;";
          this.xdiv_left = false;
          this.xdiv_right = false;
        }

        /*播放视频完毕后,滚动条到指定位置后出现导航*/
        if (this.goodsid==15&&scrollTop>=780){
          this.goodsnav = "position: fixed;top:0px;transition: all 1.2s;";
          /*this.xdiv_left = "left:205px;";*/
          this.xdiv_left = true;
          this.xdiv_right = true;
          this.goodsnavlist = ['','Find X','设计境界'];
          this.gobuygoodsb = "未来";
          this.goodsNamesbsb = "打破规则 - 见证未来";
          this.main_nav_lisb02 = "color: #D10D0D;cursor: pointer;font-family: OPPOfont1";
          this.lbjn = "";
        }

        if (this.goodsid==15&&scrollTop>=880){
          this.xdiv_leftstyle = "width: 2.2rem;";
          this.xdiv_rightstyle = "width: 0.8rem;top:10.4rem";
          this.xdiv_btn = true;
          this.xdiv_text = true;
        }else if (this.goodsid!=15) {
          this.xdiv_btn = true;
        }else {
          this.xdiv_text = false;
          this.xdiv_btn = false;
          this.xdiv_leftstyle = "width:1.102941rem;";
          this.xdiv_rightstyle = "width:1.102941rem;";

        }

        if (this.goodsid==15&&scrollTop>=1600){
          this.goodsnav = "position: fixed;top:0px;transition: all 0.7s;background: black; color: white;" +
            " border: none;";
          this.goodsnavlist = ['','概述','参数规格'];
          this.gobuygoodsb = "购买";
          this.goodsNamesbsb = this.goods.goodsName;
          this.main_nav_lisb02 = "color: #E5BD52;cursor: pointer;font-family: OPPOfont1";
          this.lbjn = " 兰博基尼版";

        }

        /*兰博极了的字*/
        if (this.goodsid==15&&scrollTop>=1590) {
          this.oppol = "position: fixed;margin: auto;top: -0.37rem;";
        }else {
          this.oppol = "position: absolute;";
        }

        /*兰博极了的图片*/
        if (this.goodsid==15&&scrollTop>=2350) {
          this.oppolimg = "position: fixed;margin: auto;top: 0.13rem;";
        }else {
          this.oppolimg = "position: absolute;";
        }

        /*放大*/
        if (this.goodsid==15&&scrollTop>=2500&&scrollTop<=2600) {
          this.oppolimgsb = "transform:scale(1.1);";
        }else if (this.goodsid==15&&scrollTop>=2600&&scrollTop<=2700) {
          this.oppolimgsb = "transform:scale(1.3);";
          this.oppoldiv = "top:630px; opacity: 0.0;";
        }else if (this.goodsid==15&&scrollTop>=2700&&scrollTop<=2800) {
          this.oppolimgsb = "transform:scale(1.5);filter: blur(1px);";
          this.oppoldiv = "top:-20px;opacity: 1;";


          /*小于2400则是正常大小*/
        } else if (this.goodsid==15&&scrollTop<=2400) {
          this.oppolimgsb = "transform:scale(1.0);";
          this.oppoldiv = "top:630px; opacity: 0.0;";
        }

        if (this.goodsid==15&&scrollTop>=2850) {
          this.oppol = "position: absolute;top:2820px";
          this.oppolimg = "position: absolute;top:2820px";
          this.oppolimgsb = "transform:scale(1.5);filter: blur(0px);";
        }

      },
    },

  }
</script>

<style scoped>

  .id9divp03{
    font-family: OPPOfont1;
    font-size: 10px;
    color: #AFAFAF;
    position: relative;
    top: 50px;
  }
  .id9divp02{
    font-family: OPPOfont1;
    font-size: 20px;
    color: whitesmoke;
    position: relative;
    top: 30px;
  }
  .id9divp01{
    font-family: OPPOfont1;
    font-size: 50px;
    color: #415FFF;
  }
  .id9div{
    position: absolute;
    left:0; right:0; top:130px; bottom:0;
    width: 800px;
    margin:auto;
    text-align: center;
  }

  .oppo_logo_img{
    width: 400px !important;
    height: auto !important;
    position: relative;
    top: 50px; left: 450px; bottom: 0; right: 0;
  }
  .oppo_logo{
    position: absolute;
  }

  .oppoldivp02{


    font-size: 24px;
    font-family: OPPOfont5;
    position: relative;
    top: 130px;
    opacity: 0.5;

  }
.oppoldivp01{
  position: relative;
  top: 20px;
  font-size: 40px;
  font-family: OPPOfont1;
  opacity: 1;
}
  .oppoldiv{
    position: absolute;
    z-index: 3;
    width: 850px;
    height: 350px;
    /*background: white;*/
    /*top: 100px;*/
    margin: auto;
    top: 630px; left: 0; bottom: 0; right: 0;
    text-align: center;
    color: white;
    opacity: 0;
    transition: all 0.7s;
  }
  .oppolimgsb{
    width: 80%;
    height: auto;
    transition: all 0.7s;
    position: relative;
  }

  .oppolimg{
    position: absolute;
    top: 2300px;
    width: 80%;
    height: auto;
    z-index: 2;
    /*transition: all 0.3s;*/
  }
  .oppol img{
    width: 100%;
    height: auto;
  }
  .oppol p {
    font-size: 60px;
    color: white;

  }
  .oppol{
    position: absolute;
    top: 1500px;
    width: 100%;
    height: 5.35rem;
    background: black;
    text-align: center;
    line-height: 5.35rem;
    margin: 0 auto;
    text-align: center;
  }

  #goodsInfo{


  }
  .oppo_footer_div{
    position: relative;
    top: 100px;

  }
  .oppo_footer_ol{
    margin: 0;
    padding: 0;
    list-style: none;
    font-weight: normal;
  }
  .oppo_footer{
    width: 1200px;
    height: 450px;
    background: white;
    margin: 0 auto;
    position: relative;
    font-family:OPPOfont1;
    color: #a1a1a1;
    text-align: left;
    line-height: 2;
    font-size: 12px;
    padding: 0;
  }
  .xdiv_btn-enter-active{
    animation: fadeInUp 1.5s;

  }
  .xdiv_btn-leave-active{
    animation: fadeOut 0.7s;
  }

  .main_divsb_divbtn_btnsb{
    width: 120px;
    height: 40px;
    border: 1px silver solid;
    border-radius: 20px;
    float: left;
    margin-left: 20px;
    transition: all 0.3s;
    color: silver;
    font-family: OPPOfont3;
    position: relative;
    left: -140px;
    top: -60px;
  }
  .xdiv_text-enter-active{
    animation: fadeInUp 1.0s;
  }
  .xdiv_text-leave-active{
    animation: fadeInUp 0.7s reverse;
  }
.xdiv_text{
  position: absolute;
  left: 205px;
  top: 1150px;
  font-family: OPPOfont1;
  font-size: 35px;
}

  .xdiv_right-enter-active {
    animation: fadeInRightBig 1.2s;

  }
  .xdiv_right-leave-active {
    animation: fadeInRightBig 1.2s reverse;
  }

  .xdiv_left-enter-active {
    animation: fadeInLeftBig 1s;
  }
  .xdiv_left-leave-active {
    animation: fadeInLeftBig 1s reverse;
  }

  .xdiv_right{
    position: absolute;
    height: 3px;
    background: #791F50;
    left: 205px;
    width: 155px;
    top: 1140px;
    opacity: 0.7;
    transition: all 1.2s;
  }
  .xdiv_left{
    position: absolute;
    height: 3px;
    left: 205px;
    top: 1070px;
    width: 155px;
    opacity: 0.7;
    transition: all 1.2s;
    background: #428DA8;
  }

  .xdiv{

  }

.main_nav_lisb01{
  position: absolute;left: 100px;
}

.main_nav_lisb02{
  position: absolute;left: 270px;
}

  .oppoxclass button:hover{
    background: firebrick;
    color: white;
  }
  .oppoxclass button{

  }
  .oppoxclass{
    top: 1310px !important;
    left: 185px !important;
  }
  #vid{

}

  #btnsb01{
    transition: all 0.5s;
  }
  #btnsb02{
    transition: all 0.5s;
  }
.videoSrcclassb{
  width: 100%;height: 730px;background: red;
}
  .videoSrcclass{
    width: 100%;height: 730px;background: black;
  }
  .main_divsb_video video{

   /* visibility: visible;*/

  }
  .main_divsb_video{

  }
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
    top: 460px;
    width: 300px;
    height: 80px;
    /*background: red;*/
    z-index: 2;
    padding-top: 20px;
   /* transition: all 2s;*/
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
    min-height: 650px;
    position: relative;
    top: -5px;
    background: black;
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
    background: rgba(255,255,255, 0.5);
    font-family: OPPOfont5;
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
