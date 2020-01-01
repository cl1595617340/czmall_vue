<template>
<div id="main">
  <!--商品的头-->
  <div class="main_nav" :style="goodsnav">
    <ul>
      <li v-text="goodszh.goodsName" v-if="index==0"  :style="index==1?border_bottom:''" :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">

      </li>


      <div style="position: absolute;left: 100px">
        <li @click="goOtherinfo(index)" v-if="index!=0" v-show="goodstypeid!=137&&index==2?hidegoods:showgoodsTotype"  :class="index==0?liname:'li02'" v-for="(site,index) in goodsnavlist">
          {{site}}
        </li>
      </div>

      <li style="position: absolute;left: 270px;">
        <button :style="border_bottom" style="height: 60px;" @click="goOtherinfo(3)"><label style="color: #D10D0D;cursor: pointer">购买</label></button>
      </li>
    </ul>
  </div>


  <!--主要内容-->
  <div class="main_nav_sb">
    <!--左边的手机图片-->
    <div class="main_left" :style="main_left">
      <div class="main_left_item" :style="main_left_item">
          <img :src="colorImg==index?site.goodscolorPicture:''" v-for="(site,index) in goodszh.goodscolorList">
      </div>
    </div>



    <!--右边的价格版本什么的-->
    <div class="main_right" :style="main_right">
      <div class="main_right_item">
          <!--第一个div，价格标题什么的-->
          <div class="main_right_item_div01" style="border-bottom: 1px solid #EDEDED">
            <p class="p_title">{{goodszh.goodsName}}</p>
            <p class="p_text">{{goodszh.goodsDescribe}}</p>

            <p class="p_title" style="color: #F51200">
              ￥<label v-text="versionsPrice==index?site.versionsPrice:''" v-for="(site,index) in goodszh.versionsList"></label>.00
            </p>

            <p class="p_text" v-if="goodszh.goods_loans==0 || goodszh.goods_oldToNew==0">商品支持：
              <label v-if="goodszh.goods_loans==0"><i class="el-icon-bank-card" ></i>花呗分期</label>
              <label v-if="goodszh.goods_oldToNew==0"><i class="el-icon-mobile" ></i>以旧换新</label>
            </p>
          </div>

        <!--其他按钮的div-->
        <div class="main_right_item_div01" style="padding-top: 20px;">

          <div class="main_right_item_div01sb">
            <p class="P_color">颜色</p>
            <div class="main_right_item_div01_btn">
              <button @click="clickColor(index,site.goodscolorName)" :style="colorName==index?activeColor:''" class="color_btn" v-for="(site,index) in goodszh.goodscolorList">
                <i class="main_right_item_div01_btn_i" :style="{background: 'linear-gradient(to right bottom, '+site.goodscolor_linearS+', '+site.goodscolor_linearE+')'}"></i>
                 {{site.goodscolorName}}
              </button>
            </div>
          </div>

          <div class="main_right_item_div01sb">
            <p class="P_color">版本</p>
            <div class="main_right_item_div01_btn">
              <button @click="clickVersion(index,site.versionsPrice,site.versionsName)" :style="versionsName==index?activeVersions:''" class="color_btn" v-for="(site,index) in goodszh.versionsList">
                {{site.versionsName}}
              </button>
            </div>
          </div>

          <div class="main_right_item_div01sb" v-if="goodszh.goods_complimentary==0">
            <p class="P_color">选择赠品</p>
            <div class="main_right_item_div01_btn main_right_item_div01_complimentary">

              <p class="complimentary_p"  v-for="(site,index) in complimentarylist">
                <img @click="gocomplimentary(site.goodsId)" v-for="(siteimg,indeximg) in site.goodscolorList" v-if="indeximg==0" :src='siteimg.goodscolorPicture'>
                <label @click="getcomplimentary(index,site.goodsName,site.goodscolorList)"  style="color: #ABABAB">{{site.goodsName}}</label>
                <br>
                <label @click="getcomplimentary(index,site.goodsName,site.goodscolorList)"  v-for="(siteprice,indexprice) in site.versionsList" v-if="indexprice==0" style="position: relative;top: 15px">
                  <i v-if="activecomplimentary==index" style="color: indianred" class="el-icon-success"></i>
                  ￥{{siteprice.versionsPrice}}
                </label>
              </p>

            </div>
          </div>

          <div class="main_right_item_div01sb" style="margin-top: 20px" v-if="goodszh.goods_loans==0">
            <p class="P_color">花呗分期</p>
            <div class="main_right_item_div01_btn ">

              <button @click="clickloans(index)" :style="loansindex==index?activeloans:''"  v-html="" v-for="(site,index) in loanslist" class="color_btn" style="font-size: 11px;font-family: OPPOfont1;height: 70px;">
                ¥ {{site.loansprice}} x {{(index+1)*3+3}} 期
                <P style="color: #B6B6B6;margin-top: 10px">手续费 ¥{{site.interest}} / 期</P>
              </button>

              <button :style="noisloans" @click="noisloansb()" class="color_btn" style="font-size: 11px;font-family: OPPOfont1;height: 70px;">
                不需要
                <P style="color: #B6B6B6;margin-top: 10px">通常来说，分期需要的金额更多</P>
              </button>

            </div>
          </div>

          <div class="main_right_item_div01sb" style="border-bottom: 1px solid #EDEDED;padding-bottom: 30px">
            <p class="P_color">选择数量</p>
            <div class="main_right_item_div01_btn">
              <p style="position: relative;top: 20px">
                <el-input-number v-model="num" @change="handleChange" :min="1" :max="5"></el-input-number>
              </p>
            </div>
          </div>

          <!--用户选中的信息-->
          <div class="main_right_item_div01sb">
            <div class="main_right_item_div01_btn">
              <p class="sum_price">￥{{priceGoods}}</p>
              <p class="sum_price_info">
                已选： {{activeGodos.versions}} {{activeGodos.color}} {{activeGodos.nums}}件
              </p>

              <div v-if="goodszh.goods_complimentary==0 && goodszh.goods_complimentary==0">
                <p class="sum_price"></p>
                <p class="sum_price_info">
                  赠品： {{activeGodos.complimentary}}
                </p>
              </div>

              <p class="sum_price"></p>
              <p class="sum_price_info" v-text="isloans==true?'是否分期： 是':'是否分期： 否'">
              </p>
            </div>
          </div>

          <!--最后的购买按钮-->
          <div class="main_right_item_div01sb">
            <div class="main_right_item_div01_btn">
              <button @click="addCarPanelHandle" v-show="!isloans" class="color_btn" style="background:#353434;color: white">加入购物车</button>
              <button @click="buyGoods" class="color_btn" style="background:#EA0041;color: white">购买</button>
            </div>
          </div>

          <!--结尾i-->
          <div class="enddiv">
            <p>
              1GB = 10 亿字节；实际可用容量会由于诸多因素而减少并有所差异。请参阅 https://support.apple.com/zh-cn/HT208948 了解可用容量详情。
            </p>
            <p>
              为预计时间，实际发货和送货时间可能根据你选择的付款方式、完成付款时间和产品存货状况而有所变化。
            </p>
            <p>
              产品图像仅供参考，请以实际销售实物为准。
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
  import { f_getGoodsByid } from '../../api/goods'
  import { f_getParameterinfo } from '../../api/goods'
  import { f_likeGetGoodsNot } from '../../api/goods'
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
        /*拿到商品的id，如果不是手机，参数就消失，手机id是137*/
        goodstypeid:"",
        hidegoods:false,
        showgoodsTotype:true,

        main_left:"",
        main_left_item:'',
        main_right:'',

        /*数量*/
        num: 1,
        /*数据对象*/
        goodszh:{},
        /*赠品集合*/
        complimentarylist:[],

        colorName:"",
        activeColor:"background: indianred;color: white;",
        versionsName:"",
        activeVersions:"background: indianred;color: white;",
        /*显示图片的下标*/
        colorImg:0,
        versionsPrice:0,

        //计算花呗利息的容器
        loanslist:[
          {
            loansprice:213,
            interest:6.4,
          },
          {
            loansprice:112,
            interest:1.2,
          },
          {
            loansprice:213,
            interest:6.4,
          }
        ],
        loansindex:-1,
        activeloans:"background: indianred;color: white;",
        /*判断用户是否分期，如果分期就无法加入购物车*/
        isloans:false,
        noisloans:"",
        /*当前手机的价格*/
        priceGoods:0,
        /*固定的手机价格，计算数量的价格用的*/
        priceGoodsb:0,
        /*用户所有选择的参数对象*/
        activeGodos:{goodsid:"-1",color:"qwe",versions:"123",nums:"123333",complimentary:"暂无"},
        complimentaryCar:{name:"",img:""},
        activecomplimentary:-1,

        /*左边手机不是固定定位的位置,默认是970，如果没有赠品和花呗的话要重新计算*/
        leftposition:"970px",
        leftscrollTop:"1100",

        /*当前商品的图片对象集合*/
        imglist:{},
        activeimglist:"",//用户选中的商品图片对象
      }
    },
    created() {

    },
    methods:{
      getData(){
        let formDatas = new FormData();
        formDatas.append("id", this.goodsid);
        /*手机数据*/
        f_getParameterinfo(formDatas).then(res => {
          this.goodszh = res.goodsList;
          console.log(this.goodszh)

          this.imglist = this.goodszh.goodscolorList;
          /*用户所有选择的参数对象,拿到当前商品的id*/
          this.activeGodos.goodsid = this.goodszh.goodsId;
          /*拿到默认第一个价格计算花呗*/
          let i =0;
          for (const formDatum of this.goodszh.versionsList) {
            i++;
            if (i==1){
              this.priceGoods = formDatum.versionsPrice;
              this.priceGoodsb = this.priceGoods;
              this.countloans();
              this.activeGodos.versions=formDatum.versionsName;
              this.goodszh.versions = formDatum.versionsName;
            }

          }
          let i2 =0;
          for (const formDatum of this.goodszh.goodscolorList){
            i2++;
            if (i2==1){
              this.activeGodos.color=formDatum.goodscolorName;
              this.activeGodos.nums = this.num;
              this.activeimglist = formDatum;//默认第一个用户选中的商品图片对象
            }
          }


          if (this.goodszh.goods_complimentary==1){
            this.leftposition = "630px";
            this.leftscrollTop = "780";
          }
          if (this.goodszh.goods_loans==1){
            this.leftposition = "800px";
            this.leftscrollTop = "800";
          }
          if (this.goodszh.goods_complimentary==1&&this.goodszh.goods_loans==1){
            this.leftposition = "350px";
            this.leftscrollTop = "480";
            this.windowScroll();
          }
        })
        /*赠品*/
        let formDatas2 = new FormData();
        formDatas2.append("name",  "");
        formDatas2.append("type", "手机");
        f_likeGetGoodsNot(formDatas2).then(res2 => {
          this.complimentarylist = res2.goodsList;
         /* console.log( this.complimentarylist)*/
        })
        f_getGoodsByid(formDatas).then(res => {
          /*判断商品是不是手机*/
          this.goodstypeid = res.goods.goodsType3Id;
        })

      },
      /*--------------------------直接购买商品的方法---*/
      buyGoods(){
        /*购买需要的数据格式*/
        let datalist = [];
        let data = {
          good_id:this.goodszh.goodsId,
          checked: true,
          count: this.num,
          limit_num: 5,
          price: this.priceGoodsb,
          sku_id: this.activeGodos.goodsid,
          sub_title:  this.goodszh.goodsName,//这个标题改名字
          title: this.activeGodos.versions,//这个标题改版本
          spec_json:{
            image: this.activeimglist.goodscolorPicture,
            show_name: this.activeimglist.goodscolorName,
          },
          /*赠品*/
          complimentary:{
            compName:this.complimentaryCar.name,
            img:this.complimentaryCar.img,
          }
        };
        datalist.push(data);
        this.$store.state.carPanelDataOne = datalist;//赋值给状态管理
        this.$store.state.isCarOrOne = 1;//赋值给状态管理是怎么买的判断
        console.log(this.$store.state.carPanelDataOne);
        this.$router.push({path: '/checkout'});
        this.$router.go(0);

      },
      /*计算花呗的通用方法*/
      countloans(){
        /*分期的金额*/
        this.loanslist[0].loansprice = (this.priceGoods/3).toFixed(2);
        this.loanslist[1].loansprice = (this.priceGoods/6).toFixed(2);
        this.loanslist[2].loansprice = (this.priceGoods/12).toFixed(2);
        /*分期的利息*/
        this.loanslist[0].interest = (this.loanslist[0].loansprice*0.02).toFixed(2);
        this.loanslist[1].interest = (this.loanslist[1].loansprice*0.02).toFixed(2);
        this.loanslist[2].interest = (this.loanslist[2].loansprice*0.02).toFixed(2);
      },

      /*加入购物车*/
      addCarPanelHandle(){
        /*购物车需要的数据格式*/
        let data = {
          good_id:this.goodszh.goodsId,
          checked: true,
          count: 1,
          limit_num: 5,
          price: this.priceGoodsb,
          sku_id: this.activeGodos.goodsid,
          sub_title:  this.goodszh.goodsName,//这个标题改名字
          title: this.activeGodos.versions,//这个标题改版本
          spec_json:{
            image: this.activeimglist.goodscolorPicture,
            show_name: this.activeimglist.goodscolorName,
          },
          /*赠品*/
          complimentary:{
            compName:this.complimentaryCar.name,
            img:this.complimentaryCar.img,
          }
        };
        let ItemData = [data,this.num]
        this.$store.commit('addCarPanelData',ItemData)
        /*点击*/
        $('html,body').animate({scrollTop: 0}, 700);
        console.log(data);
      },
      /*点击赠品去到赠品页面*/
      gocomplimentary(id){
        /*vue中$router.push打开新窗口*/
        let routeData = this.$router.resolve({ path: '/ShopInfo', query: {  id: id } });
        window.open(routeData.href, '_blank');
      },
      /*点击赠品*/
      getcomplimentary(index,name,imglist){
        this.activecomplimentary = index;
        this.activeGodos.complimentary = name;
        //给购物车的数据
        this.complimentaryCar.name = name;
        let isbsb = 0;
        for (const nameElement of imglist) {
          isbsb++;
          if (isbsb==1){
            this.complimentaryCar.img = nameElement.goodscolorPicture;
          }
        }
      },
      noisloansb(){
        this.isloans = false;
        this.noisloans = "background: indianred;color: white";
        this.loansindex = -1;
      },
      clickloans(index){
          this.loansindex = index;
          this.isloans = true;
        this.noisloans = "";

      },
      clickVersion(index,price,name){
        this.versionsName = index;
        this.versionsPrice = index;
        this.priceGoods = price;
        this.priceGoodsb = this.priceGoods;
        this.num = 1;//切换版本，数量回到1
        this.countloans();
        this.activeGodos.versions=name;
      },
      clickColor(index,name){
        this.colorName = index;
        this.colorImg = index;
        this.activeGodos.color=name;
        this.activeimglist = this.imglist[index];
      },
      /*计算数量的方法*/
      handleChange(value) {
        this.priceGoods = this.priceGoodsb*value;
        this.countloans();
        this.activeGodos.nums = value;
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
       /*  console.log(scrollTop)*/
        if (scrollTop>=100){
          this.main_left = "position: fixed;top:0px;";
          this.main_left_item = "padding-top: 100px;";
          this.main_right = "left:680px;";
        }else {
          this.main_left = "position: relative;";
          this.main_left_item = "padding-top: 50px;";
          this.main_right = "left:0px;";
        }


        if (scrollTop>=this.leftscrollTop){
          this.main_left = "position: relative;top:"+this.leftposition;
          this.main_left_item = "padding-top: 50px;";
          this.main_right = "left:0px;";
        }else {

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

  .main_right_item_div01_btn_i{
    position: relative;
    display: inline-block;
    background-color: transparent;
    vertical-align: middle;
    margin-top: -5px;
    margin-right: 0;
    border-radius: 50%;
    width: 16px;
    height: 16px;
  }
  /*-------------------------------每个颜色对应的彩色i-----------*/
  .enddiv>p{
    position: relative;
    top: 170px;

  }
  .enddiv{
   /* background: wheat;*/
    width: 200%;
    height: 250px;
    position: relative;
    left: -550px;
    z-index: 99;
    font-size: 10px;

  }
  /*----------------------------结尾div-----------*/
  .sum_price_info{
    vertical-align: top;
    color: #666;
    line-height: 2;
    font-size: 16px;
    word-break: break-all;
    word-wrap: break-word;
    font-family: OPPOfont5;
    position: relative;
    left: 135px;
    width: 350px;
  }
.sum_price{
  height: 26px;
  line-height: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: 18px;
  padding-right: 18px;
  font-size: 25px;
  color: #f51200;
  white-space: nowrap;
  margin-top: 3px;
  position: relative;
  top: 30px;
  width: 90px;
}
  .complimentary_p label{
    position: relative;
    top: 10px;
    font-size: 11px;
    cursor: pointer;
  }
  .complimentary_p{
    width: 100px;
    position: relative;
    top:30px;
    left: 20px;
    text-align: center;
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }
  .main_right_item_div01_complimentary img{
    width: 70px;
    height: auto;
    position: relative;
    left: 12px;
  }
.main_right_item_div01_complimentary{
  background: #FCFCFC;
  height: 172px;
  margin-top: 20px;
}
  .main_right_item_div01sb{
    min-height: 100px;
    margin-top: 10px;
  }
  .color_btn:hover{
    border: 1px #A5C261 solid;
  }
  .color_btn{
    width: 235px;
    height: 45px;
    border: 1px gainsboro solid;
    border-radius: 5px;
    margin-top: 20px;
    margin-right: 15px;
    transition: all 0.2s;
    color: #333;
    font-size: 15px;
    font-family:OPPOfont1;

  }
  .main_right_item_div01_btn{
    padding-bottom: 20px;
  }
  .P_color{
    color: black;
    font-size:15px;
  }
  .p_text{
    position: relative;
    display: inline-block;
    color: #5F5F5F;
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 12px;
    font-weight: 300;
  }
  .p_title{
    color: #333;
    font-size: 28px;
    line-height: 39px;
    margin-bottom: 7px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .main_right_item_div01{
    width: 100%;
    min-height: 100px;
    background: white;
    text-align: left;
    /*border-bottom: 1px solid #EDEDED;*/
    padding-bottom: 20px;
  }
.main_right_item{
  width: 75%;
  height: 100%;
  padding-top: 50px;
 /* background: wheat;*/
  margin-left: 60px;
}
  .main_right{
    min-height: 1000px;
    width: 50%;
   /* background: whitesmoke;*/
    float: left;
    position: relative;
    /*left: 675px;*/
    z-index: 1;
    font-family:OPPOfont1;
  }
  .main_left_item img{
    width: 450px;
    height: auto;
    margin-left: 130px;
    transition: all 0.4s;
  }
  .main_left_item{
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding-top: 50px;
    transition: all 0.4s;
  }
  .main_left{
    height: 660px;
    width: 50%;
    background: white;
    float: left;
    z-index: 2;
  }
  .main_nav_sb{
    min-height: 500px;
    width: 100%;
    padding-top:1px;

  }
  /*---------------------主要内容--------*/
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
    /*position: fixed;*/
    top:50px;
    transition: all 0.2s;
    border-bottom: 1px white solid;
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
