<template>
<div id="main">
  <!--商品的头-->
  <div class="main_nav" :style="goodsnav">
    <ul>
      <li v-text="goodszh.goodsName" v-if="index==0"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">

      </li>

      <div style="position: absolute;left: 100px">
        <li  @click="goOtherinfo(index)" v-if="index!=0"  :style="index==2?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">
          {{site}}
        </li>
      </div>

      <li style="position: absolute;left: 270px;">
        <button @click="goOtherinfo(3)"><label style="color: #D10D0D;cursor: pointer">购买</label></button>
      </li>
    </ul>
  </div>

  <!--手机参数内容-->
  <div class="main_divsb">
    <!--手机颜色-->
    <div class="main_divsb_img">
      <div class="main_divsb_img_item">
        <label>产品颜色</label>

        <div class="main_divsb_img_item_div" v-for="site in goodszh.goodscolorList">
          <img class="img01" :src="site.goodscolorPicture">
          <label>{{site.goodscolorName}}</label>
        </div>
      </div>
    </div>

    <!--正常的项-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">物理规格</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>高度:  {{goodszh.parameter.parameterHeight}}</li>
          <li>宽度:  {{goodszh.parameter.parameterWidth}}</li>
          <li>厚度:  {{goodszh.parameter.parameterThickness}}</li>
          <li>重量:  {{goodszh.parameter.parameterWeight}}</li>
        </ul>
      </div>
    </div>

    <!--正常的项-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">价格</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li v-for="site in goodszh.versionsList">{{goodszh.goodsName}}（{{site.versionsName}}）：{{site.versionsPrice}}元</li>
        </ul>
      </div>
    </div>

    <!--正常的项-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">上市时间</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>{{goodszh.parameter.parameterShowtime}}</li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">处理器</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>CPU型号</label>
              <p>{{goodszh.parameter.parameterCpu}}</p>
            </div>
          </li>

          <li>
            <div>
              <label>CPU主频</label>
              <p>{{goodszh.parameter.parameterCpunum}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">电池信息</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>电池容量</label>
              <p>{{goodszh.parameter.parameterCell}}（典型值）</p>
            </div>
          </li>

        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">屏幕显示</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>尺寸（英寸）</label>
              <p>{{goodszh.parameter.parameterSize}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>分辨率</label>
              <p>{{goodszh.parameter.parameterDistinguishability}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>屏幕类型</label>
              <p>{{goodszh.parameter.parameter_screen}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>触摸屏</label>
              <p>{{goodszh.parameter.parameterTouch}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">拍摄功能</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>前置摄像头像素</label>
              <p>{{goodszh.parameter.parameterFrontpixel}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>前置摄像头像素</label>
              <p>{{goodszh.parameter.parameterLaternumcameras}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>后置闪光灯</label>
              <p v-if="goodszh.parameter.parameterLaterflashlight==0">支持</p>
              <p v-if="goodszh.parameter.parameterLaterflashlight!=0">不支持</p>
            </div>
          </li>
          <li>
            <div>
              <label>自动对焦</label>
              <p v-if="goodszh.parameter.parameterAutofocusing==0">支持</p>
              <p v-if="goodszh.parameter.parameterAutofocusing!=0">不支持</p>
            </div>
          </li>
          <li>
            <div>
              <label>拍摄模式</label>
              <p>{{goodszh.parameter.parameterRecmode}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">音乐与音响</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>MP3铃声</label>
              <p v-if="goodszh.parameter.parameterMp3ringtone==0">支持</p>
              <p v-if="goodszh.parameter.parameterMp3ringtone!=0">不支持</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">指纹识别</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>{{goodszh.parameter.parameterFingerprintrecognition}}</li>
        </ul>
      </div>
    </div>

    <!--正常的项-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">操作系统</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>{{goodszh.parameter.parameterOs}}</li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">网络参数</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>网络类型</label>
              <p>{{goodszh.parameter.parameterNetworktype}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>双卡使用说明</label>
              <p>{{goodszh.parameter.parameterNeworkinstructions}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">数据连接</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>WLAN</label>
              <p v-if="goodszh.parameter.parameterWlan==0">支持</p>
              <p v-if="goodszh.parameter.parameterWlan!=0">不支持</p>
            </div>
          </li>
          <li>
            <div>
              <label>蓝牙传输</label>
              <p v-if="goodszh.parameter.parameterBluetooth==0">支持</p>
              <p v-if="goodszh.parameter.parameterBluetooth!=0">不支持</p>
            </div>
          </li>
          <li>
            <div>
              <label>OTG</label>
              <p v-if="goodszh.parameter.parameterOtg==0">支持</p>
              <p v-if="goodszh.parameter.parameterOtg!=0">不支持</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">传感器</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>重力感应器</label>
              <p v-if="goodszh.parameter.parameterGravitysensor==0">支持</p>
              <p v-if="goodszh.parameter.parameterGravitysensor!=0">不支持</p>
            </div>
          </li>
          <li>
            <div>
              <label>光敏感应器</label>
              <p v-if="goodszh.parameter.parameterPhotosensitivesensor==0">支持</p>
              <p v-if="goodszh.parameter.parameterPhotosensitivesensor!=0">不支持</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--正常的项 ，有右边的详细信息-->
    <div class="main_divsb_item">
      <!--左边的标题-->
      <label class="main_divsb_item_label">内置应用</label>
      <!--右边的信息-->
      <div class="main_divsb_item_div">
        <ul>
          <li>
            <div>
              <label>社交</label>
              <p>{{goodszh.parameter.parameterSns}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>影视音乐</label>
              <p>{{goodszh.parameter.parameterMovieandtv}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>常用工具</label>
              <p>{{goodszh.parameter.parameterTools}}</p>
            </div>
          </li>
          <li>
            <div>
              <label>生活</label>
              <p>{{goodszh.parameter.parameterLive}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</div>
</template>

<script>
  import { f_getParameterinfo } from '../../api/goods'
  export default {
    data(){
      return {
        goodsid:"",
        goodsnav:'',
        /*头部的字*/
        goodsnavlist:["vivo S5","概述","参数规格"],
        liname:"liname",
        linamesb:"linamesb",

        border_bottom:"border-bottom: 3px  #D10D0D solid;",
        /*数据对象*/
        goodszh:{},
      }
    },
    methods:{
      getData(){
        let formDatas = new FormData();
        formDatas.append("id", this.goodsid);
        f_getParameterinfo(formDatas).then(res => {
          this.goodszh = res.goodsList;
          console.log(this.goodszh)
        })
      },
      /*去到手机的其他页面*/
      goOtherinfo(index){
        switch(index) {
          case 1:
            /*跳转页面并传值*/
            this.$router.push({path: '/ShopInfo',query:{ id:this.goodsid}});
            /*this.$router.go(0);*/
            break;
          case 2:
            /*跳转页面并传值*/
            this.$router.push({path: '/GoodsParameter',query:{ id:this.goodsid}});
            /*this.$router.go(0);*/
            break;
          case 3:
            /*跳转页面并传值*/
            this.$router.push({path: '/BuyGoods',query:{ id:this.goodsid}});
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
    mounted() {
      window.addEventListener('scroll', this.windowScroll);
      this.$store.commit('changNav');
      let id = this.$route.query.id;
      this.goodsid = id;
      this.getData();
      $('html,body').animate({scrollTop: 0}, 10);
    },
  }
</script>

<style scoped>

  .main_divsb_item_div p{
    margin-left: 300px;
    margin-top: -50px;
  }
  .main_divsb_item_div{
    word-wrap: break-word;
    font-size: 16px;
    line-height: 50px;
    color: #666;
    text-align: left;
    font-weight: 300;
    width: 850px;
    position: relative;
    left: 300px;
    top: -45px;
  }
  .main_divsb_item_label{
    width: auto;
    height: auto;
    border: 0;
    padding-top: 0;
    font-size: 28px;
    color: #333;
  }

.main_divsb_item{
  width: 1200px;
  min-height: 100px;
  border-bottom: 1px #E5E5E5 solid;
  margin-left:72px;
  padding-top: 50px;
  border-bottom: 50px;
  border-bottom: 1px #E5E5E5 solid;
}

  /*---------------------------------------正常项--*/
  .main_divsb_img_item>label{
    width: auto;
    height: auto;
    border: 0;
    padding-top: 0;
    font-size: 28px;
    color: #333;
    position: absolute;
    top: 110px;
    left: 70px;
  }
  .main_divsb_img_item_div>label{
    position: relative;
    top: 20px;
  }
.main_divsb_img_item_div{
  width: 220px;
  float: left;
  text-align: center;
}
  .main_divsb_img_item img{
    width: 220px;
    height: auto;
    margin: 0 auto;
    float: left;
  }
  .main_divsb_img_item{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-left: 200px;
    padding-top: 100px;

  }
  .main_divsb_img{
    width: 1200px;
    height: 450px;
    /*background: #FAFAFA;*/
    overflow: hidden;
    border-bottom: 1px #E5E5E5 solid;
    margin-left:72px;
  }
  .main_divsb{
    width: 1364px;
    min-height: 1000px;
    position: relative;
    top: -5px;
    /*background: wheat;*/
    padding-top: 3px;
    transition: all 0.5s;

  }
  /*-------------------------------------------------主要部分--*/
  .li02:hover{
    color: rgb(0, 139, 214);
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

  #main{
    min-height: 500px;
    width: 100%;
    background: white;
    position: relative;
    /* top: 50px;*/
    overflow: hidden;
  }
</style>
