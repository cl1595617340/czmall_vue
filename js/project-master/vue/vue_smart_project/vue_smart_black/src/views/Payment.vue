<template>
  <div id="main" style="background: #F5F5F5">
    <div class="content page-order-payment">


      <div class="gray-box clear" style="position: relative;top: 40px;">
        <div style="width: 92%;border-bottom: 1px solid #EDEDED;margin: 0 auto">
          <!--支付的图片-->
          <div class="pay_img">
            <img src="../../static/images/shuchai/支付模板.png">
          </div>
          <div class="box-inner order-info">
            <h2 style="font-size: 23px">订单已提交,等待付款￥{{orderInfo.order_price}}.00</h2>
            <p class="payment-detail">请在  <span>{{minutesb}}:{{secondsb}}</span>完成支付，超时订单将自动取消。</p>
          </div>
          <!--  <div class="box-inner payment-checkout-panel clear">
                        <span class="jianguo-blue-main-btn big-main-btn js-payment-order" v-if="!orderInfo.isPay" @click="payNowHandle(orderInfo.orderId)">
                            <a>现在支付</a>
                            </span>
              <span v-else class="is-pay">已完成</span>
              <span class="prices"> 应付金额：   <em><span>¥ </span>{{orderInfo.price+orderInfo.freight}}.00</em>
                        </span>
            </div>-->
        </div>
      </div>

      <!--订单详情-->
      <div class="gray-box clear" style="position: relative;top: -20px;">
        <div style="width: 92%;border-bottom: 1px solid #EDEDED;margin: 0 auto">
          <div class="order-info" style="padding-top: 30px;text-align: left;
          padding-left: 50px;font-family: OPPOfont1;display: flex">
            <label class="orders-content-title">订单详情</label>
            <ul class="address-decrypt">
              <li>
                <label style="width: 120px">支付单号:</label>
                <label style="width: 200px">{{orderInfo.order_num}}</label>
              </li>
              <li>
                <label style="width: 120px">收货信息:</label>
                <label style="width: 250px">{{orderInfo.addressinfo.addressName}}</label>
                <label style="width: 130px">{{orderInfo.addressinfo.addressIpone}}</label>
                <label style="width: 400px">
                  {{orderInfo.addressinfo.addressProvince}}
                  {{orderInfo.addressinfo.addressCity}}
                  {{orderInfo.addressinfo.addressCounty}}
                  {{orderInfo.addressinfo.addressinfo}}
                </label>
              </li>
              <li  v-for="(site,index) in orderInfo.goodsinfo">
                <label style="width: 120px" v-if="index==0">商品信息:</label>
                <label style="width: 120px;opacity: 0" v-if="index!=0">商品信息:</label>
                <label style="width:250px">{{site.sub_title}} {{site.title}} {{site.spec_json.show_name}}</label>
                <label style="width: 200px" v-if="site.complimentary.compName!=''">赠品：{{site.complimentary.compName}}</label>
              </li>

              <li>
                <label style="width: 120px">交易金额:</label>
                <label style="width: 200px">￥{{orderInfo.order_price}}.00</label>
              </li>
              <li>
                <label style="width: 120px">交易时间:</label>
                <label style="width: 200px">{{orderInfo.order_found}}</label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--支付方法-->
      <div class="gray-box clear" style="position: relative;top: -80px;">
        <div style="width: 92%;height: 100px;border-bottom: 1px solid #EDEDED;margin: 0 auto;position: relative">
          <div class="order-info" style="padding-top: 30px;text-align: left;
          padding-left: 50px;font-family: OPPOfont1;display: flex">
            <label class="orders-content-title">支付平台</label>
            <ul class="address-decrypt pay_ul">
              <li @click="clickLi(0)" :style="jiantouindex==0?activeli:activelisb">
                <b class="img01">
                  <img src="../../static/images/shuchai/花呗 (1).png">
                </b>
                <a>
                  <span>花呗分期</span>
                </a>
                <strong>
                  <label class="oc-label">免息</label>
                </strong>
                <!--选中li的钩-->
                <i class="yesi" :style="jiantouindex==0?activejiantou:activejiantousb"></i>
                <i class="el-icon-check yesib" :style="jiantouindex==0?activejiantou:activelisb"></i>
              </li>

              <li @click="clickLi(1)" :style="jiantouindex==1?activeli:activelisb">
                <b class="img01">
                  <img src="../../static/images/shuchai/支付宝 (1).png">
                </b>
                <a>
                  <span>支付宝</span>
                </a>
                <strong>
                  <label class="oc-label">推荐</label>
                </strong>
                <!--选中li的钩-->
                <i class="yesi" :style="jiantouindex==1?activejiantou:activejiantousb"></i>
                <i class="el-icon-check yesib" style="left:218px" :style="jiantouindex==1?activejiantou:activejiantousb"></i>
              </li>

              <li @click="clickLi(2)" :style="jiantouindex==2?activeli:activelisb">
                <b class="img01">
                  <img src="../../static/images/shuchai/微信支付.png">
                </b>
                <a style="margin-left: 0px">
                  <span>微信支付</span>
                </a>
                <!--选中li的钩-->
                <i class="yesi" :style="jiantouindex==2?activejiantou:activejiantousb"></i>
                <i class="el-icon-check yesib" style="left: 218px" :style="jiantouindex==2?activejiantou:activejiantousb"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--支付的详情01-->
      <div class="gray-box clear" style="position: relative;top: -140px;" :style="jiantouindex==0?activejiantou:activejiantousb">
        <div style="width: 92%;border-bottom: 1px solid #EDEDED;margin: 0 auto;min-height: 100px;padding-bottom: 40px">
          <div class="order-info" style="padding-top: 30px;text-align: left;
          padding-left: 50px;font-family: OPPOfont1;display: flex">
            <ul class="address-decrypt paysb" style="width: 760px;margin: 0 auto;">

              <li @click="clickLoans(index,site.loansprice)" style="width: 230px"  v-for="(site,index) in loanslist" :style="loansindex==index?loansstyle:''">
                <a class="sba">
                  <section>
                    <p style="position: relative;top: 10px">￥{{site.loansprice}} x {{(index+1)*3+3}}期</p>
                    <p>
                      <strong style="color: #FF763D">手续费 ￥{{site.interest}} / 期 </strong>
                    </p>
                  </section>
                </a>
              </li>

            </ul>
          </div>

          <!--支付二维码-->
          <div class="payma">
            <img @click="gopay" src="../../static/images/shuchai/二维码.jpg">
            <label style="position: relative;top: 10px">打开手机支付宝 扫一扫继续付款</label>
          </div>
        </div>
      </div>

      <!--支付的详情02-->
      <div class="gray-box clear" style="position: relative;top: -140px;" :style="jiantouindex==1?activejiantou:activejiantousb">
        <div style="width: 92%;border-bottom: 1px solid #EDEDED;margin: 0 auto;min-height: 100px;padding-bottom: 40px">
          <div class="order-info" style="padding-top: 30px;text-align: left;
          padding-left: 50px;font-family: OPPOfont1;display: flex">
          </div>

          <!--支付二维码-->
          <div class="payma">
            <img @click="gopay" src="../../static/images/shuchai/二维码.jpg">
            <label style="position: relative;top: 10px">打开手机支付宝 扫一扫继续付款</label>
          </div>
        </div>
      </div>

      <!--支付的详情03-->
      <div class="gray-box clear" style="position: relative;top: -140px;" :style="jiantouindex==2?activejiantou:activejiantousb">
        <div style="width: 92%;border-bottom: 1px solid #EDEDED;margin: 0 auto;min-height: 100px;padding-bottom: 40px">
          <div class="order-info" style="padding-top: 30px;text-align: left;
          padding-left: 50px;font-family: OPPOfont1;display: flex">
          </div>

          <!--支付二维码-->
          <div class="payma">
            <img @click="gopay" src="../../static/images/shuchai/二维码.jpg">
            <label style="position: relative;top: 10px">打开手机支付宝 扫一扫继续付款</label>
          </div>
        </div>
      </div>
    </div>

    <!--箭头-->
    <div class="jiantoui" :style="jiantouindex==0?activejiantou:activejiantousb"></div>
    <div class="jiantoui" style="left: 680px;" :style="jiantouindex==1?activejiantou:activejiantousb"></div>
    <div class="jiantoui" style="left: 940px;" :style="jiantouindex==2?activejiantou:activejiantousb"></div>
  </div>
</template>

<script>
  import { f_updateOrderState } from '../api/order';
  import { f_getOrderIdBynum } from '../api/order';
  import { f_updatePayType } from '../api/order';
  export default {
    data () {
      return {
        minutesb: 2,
        secondsb: 0,
        /*控制箭头*/
        jiantouindex:0,
        activejiantou:"display:block;",
        activejiantousb:"display: none;",
        /*li的样式*/
        activeli:"border: 1px #05B570 solid;",
        activelisb:"",
        //订单号
        order_num:0,

        orderend:"sb",

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
        loansstyle:"border: 1px #05B570 solid;",
        /*如果是花呗支付传到后台的金额*/
        loanspricesb:0,
      }
    },
    computed: {
      orderInfo () {
        let orderInfo = this.$store.state.orderData.filter((order) => {
          return order.orderId === this.$route.query.orderId
        })[0]
        return orderInfo
      }
    },
    created(){
      this.order_num = this.orderInfo.order_num;
      this.countloans();
    },
    mounted () {
      this.timer();
      $('html,body').animate({scrollTop: 0}, 10);

    },
    watch: {

      secondsb: {
        handler (newVal) {
         /* console.log(newVal+"==============")*/
          this.num(newVal)
        },
        deep: true
      },
      minutesb: {
        handler (newVal) {
          this.num(newVal)
        /*  console.log(newVal+"==============")*/
        },
        deep: true
      },
    },
    methods: {
      getData(){
        /*根据订单编号查询订单*/
        let formDatas2 = new FormData();
        formDatas2.append("num",this.order_num);
        f_getOrderIdBynum(formDatas2).then(res2 => {
          /* this.orderId = res2.res.orderId;*/
          /*计时器结束，修改订单成已取消状态*/
          let formDatas = new FormData();
          formDatas.append("id",res2.res.orderId)
          formDatas.append("state",3)
          f_updateOrderState(formDatas).then(res => {
            this.openFullScreen2();
          })
        })
      },
      /*点击花呗*/
      clickLoans(index,loansprice){
        this.loansindex = index;
        this.loanspricesb = loansprice;
      },
      /*计算花呗的通用方法*/
      countloans(){
        /*分期的金额*/
        this.loanslist[0].loansprice = (this.orderInfo.order_price/3).toFixed(2);
        this.loanslist[1].loansprice = (this.orderInfo.order_price/6).toFixed(2);
        this.loanslist[2].loansprice = (this.orderInfo.order_price/12).toFixed(2);
        /*分期的利息*/
        this.loanslist[0].interest = (this.loanslist[0].loansprice*0.02).toFixed(2);
        this.loanslist[1].interest = (this.loanslist[1].loansprice*0.02).toFixed(2);
        this.loanslist[2].interest = (this.loanslist[2].loansprice*0.02).toFixed(2);
      },
      /*点击二维码支付*/
      gopay(){
        /*判断是花呗支付还是支付宝支付*/
        if (this.loansindex != -1){
          /*花呗*/

          /*根据订单编号查询订单*/
          let formDatas2 = new FormData();
          formDatas2.append("num",this.order_num);
          f_getOrderIdBynum(formDatas2).then(res2 => {
            /* this.orderId = res2.res.orderId;*/
            /*修改订单的支付方式（花呗）*/
            let formDatas = new FormData();
            formDatas.append("id",res2.res.orderId)
            formDatas.append("type",1)
            f_updatePayType(formDatas).then(res => {
              location.href='http://localhost:8088/goAlipay?price='+this.loanspricesb+"&ordernumsb="+this.order_num;
            })
          })
        } else {
          /*支付宝*/
          location.href='http://localhost:8088/goAlipay?price='+this.orderInfo.order_price+"&ordernumsb="+this.order_num;
        }

      },
      /*点击li出现箭头*/
      clickLi(index){
        this.jiantouindex = index;
        this.loansindex = -1;
      /*  console.log(this.orderInfo.addressinfo);*/
      },
      // 倒计时
      num(n) {
        /*如果分和秒都为0就修改此订单状态为取消，并且跳转到用户订单页面*/
        if (this.secondsb==0 && this.minutesb==0){
          // this.getData();
        }
        return n < 10 ? '0' + n : '' + n
      },
      timer () {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.secondsb === 0 && _this.minutesb !== 0) {
            _this.secondsb = 59
            _this.minutesb -= 1
          } else if (_this.minutesb === 0 && _this.secondsb === 0) {
            _this.secondsb = 0
            window.clearInterval(time)
          } else {
            _this.secondsb -= 1
          }
        }, 1000)
      },
      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '订单已取消...',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.6)'
        });
        setTimeout(() => {
          loading.close();
          this.$router.push({path: 'Order'});
        }, 2600);
      },


      payNowHandle (id) {
        this.$store.commit('payNow', id)
        alert('成功支付' + (this.orderInfo.price + this.orderInfo.freight) + '元')
      }
    }
  }
</script>

<style>
  .payma img{
    width: 115px;
    height: 115px;
    margin: 0 auto;
    position: relative;
    top: -20px;
    cursor: pointer;

  }
  .payma{
    position: relative;
    width: 100%;
    margin: 0 auto;
    font-family: OPPOfont1;
    text-align: center;
  }
  /*--------------------------支付二维码--*/
  .sba{

  }

  .paysb li{
    float: left;
    position: relative;
    width: 236px;
    height: 68px;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px #EDEDED solid;
    border-radius: 4px;
    font-size: 13px;
    color: #333;
    text-align: center;
    margin-left: 20px;
  }


  .yesib{
    display: none;
    position: absolute;
    left: 220px;
    top: 28px;
    color: white;
  }
  .yesi{
    width: 30px;
    height: 30px;
    background: #05B570;
    position: absolute;
    transform: rotate(45deg);
    top: 27px;
    left: 218px;
    text-align: center;
    font-size: 15px;
    color: white;
  }
  /*-选中li的钩*/
  .jiantoui{
    position: absolute;
    width: 15px;
    height: 15px;
    /*background: red;*/
    transform:rotate(45deg);
    border-left: 1px solid #EDEDED;
    border-top: 1px solid #EDEDED;
    top: 690px;
    left: 410px;
    background: white;
  }
  /*箭头*/
  .img01 img{
    position: absolute;
    width: 25px;
    height:auto;
    left: 50px;
    top: 8px;
  }
  .oc-label{
    display: inline-block;
    vertical-align: middle;
    width: auto;
    padding: 0 .4em;
    height: 20px;
    line-height: 1.5;
    text-align: center;
    margin-right: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px;
    color: #333;
    border: 1px #666 solid;
    border-radius: 2px;
    overflow: hidden;
  }
  .pay_ul a{
    margin-left: 40px;
  }
  .pay_ul li{
    display: inline-block;
    position: relative;
    margin: 10px;
    display: inline-block;
    position: relative;
    width: 236px;
    height: 44px;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px #EDEDED solid;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    text-align: center;
    line-height: 44px;
    cursor: pointer;


  }
  .pay_ul{

  }
  /*-------------------------------支付平台的ul----*/
  .address-decrypt label{
    display: inline-block;
  }
  .address-decrypt li{
    margin-top: 10px;
  }
.address-decrypt{
  margin-left: 9.25px;
  line-height: 30px;
  color: #5E5E5E;
  margin-top: -8px;
}
  .orders-content-title{
    width: 115px;
    height: 44px;
    line-height: 30px;
    font-size: 18px;
  }
  .shp-pmmethod-orders{

  }
  /*------------------------------------------------订单详情1--------*/
  .pay_img{
    position: absolute;
    top: 66px;
    left: 370px;
  }
  .pay_img>img{
    width: 83px;
    height: auto;
  }
  /*-----------------------------------------------上面是我的样式------*/
  .header-desktop{
    display: none;
  }
  .content{
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }
  .page-order-payment{
    padding-top: 0px;
  }
  .gray-box{
    overflow: hidden;

    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    background: #fff;
  }
  .page-order-payment .gray-box{
    margin: 0 auto 60px;
  }
  .gray-box .title{
    height: 60px;
    padding: 0 10px 0 28px;
    /* background: #F5F5F5;
     background: linear-gradient(#FFF,#F5F5F5);*/
    /* border-bottom: 1px solid #DCDCDC;*/
    /*   border-radius: 10px 10px 0 0;
       box-shadow: 0 1px 7px rgba(0,0,0,.06);*/
    line-height: 60px;
    color: #646464;
    font-family: OPPOfont1;
  }
  .gray-box .title h2{
    font-size: 18px;
    font-weight: 400;
    color: #626262;
  }
  .page-order-payment p{
    font-family: OPPOfont2;
  }
  .page-order-payment .order-info{
    padding: 60px 0 55px;
    color: #333;
    text-align: center;
    /*font-family: OPPOfont2;*/
  }
  .page-order-payment .order-info h2{
    padding-bottom: 14px;
    line-height: 36px;
    text-align: center;
    font-size: 26px;
    color: #333;
    font-family: OPPOfont1;
    font-size: 26px;
    position: relative;
    left: 30px;
    top: 15px;
  }
  .page-order-payment .order-info .payment-detail{
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #999;
  }
  .page-order-payment .order-info .payment-detail span{
    font-weight: bolder;
    color: #DE4037;
  }
  .page-order-payment .order-info .payment-detail{
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #999;
    position: relative;
    left: 21px;
    top: 10px
  }
  .page-order-payment .payment-checkout-panel{
    padding: 10px 10px 10px 0;
    line-height: 61px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .jianguo-blue-main-btn{
    background: linear-gradient(#6383C6,#4262AF);
    box-shadow: none;
  }
  .blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
    display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 6px;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    font-family: 'Microsoft Yahei','微软雅黑','PingFang SC',sans-serif;
    cursor: pointer;
    user-select: none;
  }
  .page-order-payment .big-main-btn{
    float: right;
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 10px;
  }
  .jianguo-blue-main-btn a{
    display: block;
    border-radius: 6px;
    cursor: pointer;
    background: linear-gradient(#6F97E5,#527ED9);
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
    transition: all .3s ease;
  }
  .page-order-payment .big-main-btn a{
    height: 40px;
    padding: 0;
    line-height: 40px;
    font-size: 16px;
  }
  .jianguo-blue-main-btn:hover a{
    box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
  }
  .page-order-payment .prices{
    float: right;
    line-height: 24px;
    padding: 6px 20px 6px 0;
    font-size: 14px;
  }
  .page-order-payment .prices em{
    margin-left: 5px;
    font-size: 24px;
    color: #D44D44;
  }
  .page-order-payment .confirm-detail{
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
  }
  .page-order-payment .confirm-detail .info-title{
    height: 14px;
    padding: 30px 0 17px;
    line-height: 14px;
    font-weight: bolder;
    color: #333;
  }
  .page-order-payment .confirm-detail .info-detail{
    line-height: 24px;
    color: #666;
  }
  .page-order-payment .confirm-table-title{
    padding: 3px 0 0 30px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
  }
  .page-order-payment .confirm-table-title .num, .page-order-payment .confirm-table-title .price, .page-order-payment .confirm-table-title .subtotal{
    width: 175px;
    padding-right: 29px;
    text-align: right;
  }
  .page-order-payment .confirm-goods-table{
    padding-left: 30px;
    border-top: 1px solid #D5D5D5;
  }
  .page-order-payment .cart-items{
    height: 80px;
    border-top: 1px solid #D5D5D5;
  }
  .page-order-payment .cart-items:first-child{
    border-top: none;
  }
  .hide-row{
    overflow: hidden;
    word-break: keep-all;
  }
  .page-order-payment .cart-items .name{
    display: table;
    width: 540px;
    height: 100%;
  }
  .page-order-payment .cart-items .name-cell{
    display: table-cell;
    line-height: 22px;
    vertical-align: middle;
    color: #333;
  }
  .page-order-payment .cart-items .name-cell a{
    color: #333;
  }
  .page-order-payment .cart-items .goods-num, .page-order-payment .cart-items .price, .page-order-payment .cart-items .subtotal{
    width: 175px;
    padding-right: 29px;
    line-height: 80px;
    text-align: right;
  }
  .page-order-payment .cart-items .goods-num{
    width: 28px;
    padding-left: 147px;
    text-align: center;
  }
  .page-order-payment .order-discount-line{
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
  }
  .page-order-payment .order-discount-line p:first-child{
    line-height: 32px;
    text-align: right;
    font-size: 14px;
    font-weight: bolder;
  }
  .is-pay{
    float: right;
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 10px;
    display: block;
    padding: 1px;
    text-align: center;
    font-size: 16px;
  }
</style>
