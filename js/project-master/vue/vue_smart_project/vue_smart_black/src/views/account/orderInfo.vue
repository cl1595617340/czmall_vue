<template>
  <div class="account-content" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="account-order">
      <div class="gray-box">

        <div style="background: #F5F5F5;min-height: 10px;width: 100%">
          <div class="js-list-inner order_main" style="padding-top: 40px">

            <!--订单头部-->
            <div class="order_header">
              <!--支付的图片-->
              <div>
                <img src="../../../static/images/shuchai/支付模板.png">
              </div>
              <span style="margin-left: 40px;">
                <p style="font-size: 18px;margin-bottom: 20px;color: #f79a47;" v-if="orders.orderState==0">待付款</p>
                <p style="font-size: 18px;margin-bottom: 20px;color: #f79a47;" v-if="orders.orderState==1">待收货</p>
                <p style="font-size: 18px;margin-bottom: 20px;color: #f79a47;" v-if="orders.orderState==2">已完成</p>
                <p style="font-size: 18px;margin-bottom: 20px;color: #f79a47;" v-if="orders.orderState==3">已取消</p>
                订单号:
                <a> {{orders.orderNum}}</a>
              </span>
              <span class="order_found" style="margin-top: 44px;margin-left: 0px;border: none">
                创建时间: {{orders.orderFound}}
              </span>
              <!--订单完成时间-->
              <span  v-if="orders.orderState==2" style="margin-top: 44px;margin-left: 0px;border: none;position: absolute;top: -40px;left: 308px; color: #A0A0A0;">
                完成时间: {{orders.orderpayok2}}
              </span>
              <!--支付完成时间-->
              <span  v-if="orders.orderState==1" style="margin-top: 44px;margin-left: 0px;border: none;position: absolute;top: -40px;left: 308px; color: #A0A0A0;">
                支付时间: {{orders.orderPaydate}}
              </span>
              <span class="order_found" style="margin-top: 44px;margin-left: 99px;border: none">
                <label v-if="orders.orderState==1&&orders.order_send==0">待发货</label>
                <label v-if="orders.orderState==1&&orders.order_send==1">已发货</label>
              </span>

              <!--确认收货-->
              <span v-if="orders.orderState==1&&orders.order_send==1" class="order_found" style="position: relative;top: 30px;margin-left:160px;border: none">
               <el-button round @click="gosend()">确认收货</el-button>
              </span>

            </div>
            <!--订单地址等信息-->
            <div class="oinfo_address">
              <div class="oinfo_address_div01">
                <ul v-if="index==0" v-for="(site,index) in orders.orderRelationList">
                  <li>
                    <label style="width: 110px;display: inline-block">收件人</label>
                    <p class="oinfo_address_div01_sb">{{site.address.addressName}}</p>
                  </li>
                  <li>
                    <label style="width: 110px;display: inline-block">联系电话</label>
                    <p class="oinfo_address_div01_sb">{{site.address.addressIpone}}</p>
                  </li>
                  <li>
                    <label style="width: 110px;display: inline-block">配送地址</label>
                    <p class="oinfo_address_div01_sb" style="width: 281px">
                      {{site.address.addressProvince}} {{site.address.addressCity}}
                      {{site.address.addressCounty}} {{site.address.addressinfo}}</p>
                  </li>
                </ul>
                <ul style="margin-left: 60px">
                  <li>
                    <label style="width: 110px;display: inline-block">支付方式</label>
                    <p class="oinfo_address_div01_sb" v-if="orders.orderPaytype==0">支付宝</p>
                    <p class="oinfo_address_div01_sb" v-if="orders.orderPaytype==1">花呗</p>
                  </li>
                  <li>
                    <label style="width: 110px;display: inline-block">配送方式</label>
                    <p class="oinfo_address_div01_sb">快递</p>
                  </li>
                  <li>
                    <label style="width: 110px;display: inline-block">发票抬头</label>
                    <p class="oinfo_address_div01_sb">{{orders.orderCompany}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <!--订单商品-->
            <div class="cart_content_div_mian" style="border-bottom: 1px #EDEDED solid;width: 91%;margin-left: 50px;">
              <!--循环的-->
              <section class="cart_content_div_sec" v-for="(site,index) in orders.orderRelationList" style="margin-left: -50px;">
                <ul class="cart_content_div_sec_ul">

                  <li v-if="index==0" class="shp-col select" style="height: 30px;width: 70px;margin-top: 15px;margin-left: 45px">
                      <label>商品清单</label>
                  </li>
                  <li v-if="index!=0" class="shp-col select" style="opacity: 0;height: 30px;width: 70px;margin-top: 15px;margin-left: 45px">
                    <label>商品清单</label>
                  </li>

                  <li class="shp-col image"  style="margin-left:20px">
                    <div>
                      <img :src="site.goodscolor.goodscolorPicture">
                    </div>
                  </li>
                  <li class="shp-col" style="width: 220px">
                    <div class="name hide-row">
                      <div class="name-table shp-col-sb">
                        <a href="javascript:;" target="_blank" class="shp-col-name">{{site.goods.goodsName}}</a>
                        <ul class="attribute" style="margin-top: 5px">
                          <li>{{site.versions.versionsName}} - {{site.goodscolor.goodscolorName}}</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li class="shp-col" style="margin-top: 10px;margin-left: 25px;width: 100px">
                    <div class="shp-col-sb">¥ {{site.versions.versionsPrice}}.00</div>
                  </li>
                  <li class="shp-col" style="margin-top: 20px;margin-left: 100px">
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span class="num">× {{site.relation_count}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <!--赠品-->
                <section v-if="site.relationCompimg!=''" class="cart_content_div_sec_sec" style="margin-left: 235px;width: 82%;border-bottom: 1px #EDEDED solid;">
                  <ul style="margin-top: -20px">
                    <li style="width: 284px;">
                      <label class="oc-label">
                        <em>赠品</em>
                      </label>
                      <figure class="oc-figure">
                        <img :src="site.relationCompimg" style="width: 40px;height: auto">
                      </figure>
                      <a>{{site.relationCompname}}</a>
                    </li>
                  </ul>
                </section>
              </section>
            </div>
            <!--底部内容-->
            <div class="oinfo_fooder">
              <div class="shp-checkoutbar-subtotal">
                <ul class="oinfo_fooder_ul">
                  <li>
                    <label style="width: 140px;display: inline-block;text-align: left;position: relative;">
                      商品数量</label>
                    <span>{{orders.orderCount}}</span>
                  </li>
                  <li>
                    <label style="width: 140px;display: inline-block;text-align: left;position: relative;">
                      商品总额</label>
                    <span>￥{{orders.orderPrice}}.00</span>
                  </li>
                  <li>
                    <label style="width: 140px;display: inline-block;text-align: left;position: relative;">
                      回收代金券</label>
                    <span>￥0.00</span>
                  </li>
                  <li>
                    <label style="width: 140px;display: inline-block;text-align: left;position: relative;">
                      邮费</label>
                    <span>￥0.00</span>
                  </li>
                </ul>
              </div>
              <div class="oinfo_total">
                <div class="oinfo_total_price">
                  <label class="oinfo_total_price_label">订单金额:</label>
                  <strong class="oinfo_total_price_strong">￥{{orders.orderPrice}}.00</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { f_getOrderInfo } from '../../api/order';
  import { f_updateOrderState } from '../../api/order';
  import { f_updatePayOkDate } from '../../api/order';
  export default {
    data(){
      return{
        //订单的id
        orderid:0,
        //订单数据对象
        orders:{},
        fullscreenLoading: false,
      }
    },
    mounted() {
      this.openFullScreen1();
      $('html,body').animate({scrollTop: 0}, 10);
      this.$store.commit('changNav');
      //拿到订单的id
      let id = this.$route.query.id;
      this.orderid = id;
      this.getData();
     /* alert(this.orderid)*/

    },
    created(){

    },
    methods:{
      getData(){
          //得到登录的用户id
          let formDatas = new FormData();
          formDatas.append("id",this.orderid)
          f_getOrderInfo(formDatas).then(res => {
            this.orders = res.res;
            console.log(this.orders);
          })
        },
      /*确认收货的按钮*/
      gosend(){
        this.$confirm('确认收货吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          /* type: 'warning',*/
          center: true
        }).then(() => {
          let formDatas = new FormData();
          formDatas.append("id",this.orders.orderId)
          formDatas.append("state",2)
          f_updateOrderState(formDatas).then(res => {
            this.getData();
            this.openFullScreen1();
          })

          let formDatas2 = new FormData();
          formDatas2.append("id",this.orders.orderId)
          formDatas2.append("dates",this.timeFormat(new Date()))
          f_updatePayOkDate(formDatas2).then(res => {

          })

        }).catch(() => {

        });
      },
      //获取系统时间函数
      timeFormat(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        return  year + "-" + month + "-" + date +" "+hh+":"+mm +":"+ss;
      },
      openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000);
      },
    },
  }
</script>

<style >
  .oinfo_total_price_strong{
    color: #333;
    font-weight: normal;
    font-size: 30px;
    white-space: nowrap;
    width: 150px;
    max-width: 150px;
    position: relative;
    left: -30px;
    width: 540px;
    display: inline-block;
  }
  .oinfo_total_price_label{
    font-size: 16px;
    text-align: left;
    display: table-cell;
    position: relative;
    left: -29px;
    top: -7px;
  }
  .oinfo_total_price{
    width: 100%;
    display: table;
    padding-bottom: 20px;
  }
  .oinfo_total{
    display: inline-block;
    vertical-align: top;
    text-align: right;
    width: 250px;
  }
  .oinfo_fooder_ul li span{
    width: 105px;
    display: inline-block;
  }
  .oinfo_fooder_ul li{
    margin-top: 20px;
  }
  .oinfo_fooder_ul{
    width: 250px;
    display: inline-block;
    padding-bottom: 18px;
    border-bottom: 1px #EDEDED solid;
  }
  .shp-checkoutbar-subtotal{
    text-align: right;
    color: #666;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 30px;
    padding-right: 30px;
  }
  .oinfo_fooder{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: right;


  }
  .oc-figure{
    width: 42px;
    height: 42px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    margin-left: 0px;
  }
  .oc-label{
    color: #f79a47 !important;
    border-color: #f79a47 !important;
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
  .cart_content_div_sec_sec{
    padding-top: 35px;
    height: 95px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-top: 1px #EDEDED solid;
    margin-left: 270px;
    display: block;
  }
  /*---------------------------------赠品的样式--*/
  .shp-col-del:hover{
    opacity: 0.7;
  }
  .shp-col-del{
    transition: all 0.3s;
  }
  .shp-col-name:hover{
    opacity: 0.7;
  }
  .shp-col-name{
    transition: all 0.3s;
  }
  .shp-col-sb{
    margin-top: 10px;
  }
  .image{
    padding-right: 70px;
    padding-left: 20px;
    height: 80px;
    width: 80px;
    position: relative;
    text-align: center;
  }
  .select{

  }
  .shp-col{
    position: relative;
  }
  .cart_content_div_sec_ul img{
    width: 60px;
    height: auto;
  }
  .cart_content_div_sec_ul li{
    float: left;
  }
  .cart_content_div_sec_ul{
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    min-height: 120px;
    padding-top: 30px;
    /* border-top: 1px #EDEDED solid;*/
  }
  .cart_content_div_sec{
    width: 97%;
    min-height: 120px;
    /*  background: beige;*/
    box-sizing: border-box;
    /* border-top: 1px #EDEDED solid;*/
    /* border-bottom:1px #EDEDED solid;*/
    font-family: OPPOfont1;

  }
  .cart_content_div_mian{
    width: 100%;
    min-height: 100px;
    /* background: gainsboro;*/
    margin-top: 10px;
    /* border-bottom:1px #EDEDED solid;*/
  }
  /*-----------------订单商品的样式--*/
  .oinfo_address_div01 li{
    margin-top: 15px;
  }
  .oinfo_address_div01_sb{
   display: inline-block;
  }
  .oinfo_address_div01{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .oinfo_address{
    border-bottom: 1px #EDEDED solid;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 91%;
    margin: 0 auto;
    margin-top: 10px;
    padding-bottom: 20px;
  }
  .pay_img{

  }
  /*-------------------------------------------详细订单的样式---*/
  .order_fooder_price{
    margin-left: 20px;
    font-size: 17px;
    font-family: OPPOfont2;

  }
  .order_fooder{
    width: 91%;
    box-sizing: border-box;
    border-top: 1px #EDEDED solid;
    position: relative;
    padding-top: 20px;
    margin: 0 auto;
    margin-top: -30px;
  }
  .order_goodsname label{
    display: inline-block;
    vertical-align: middle;
    -webkit-transition: color 0.35s ease;
    transition: color 0.35s ease;
  }
  .order_img{
    padding: 0 20px 0 0;
    width: 60px;
    height: auto;
  }
  .shp-col{
    padding: 0 20px 0 0;
    width: 60px;
    height: auto;
    float: left;
  }
  /*shp-row就是ul*/
  .shp-row{
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 6px 0;
    height: 60px;
    line-height: 60px;
    margin-top: 2px;
  }
  .order_item{
    min-height: 10px;
    width: 700px;
    margin-left: 50px;
  }
  .order_content>label{
    position: relative;
    top: 28px;
  }
  .order_content{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 91%;
    margin: 0 auto;
    padding-top: 20px;
  }
  .order_state{
    font-weight: normal;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 18px;
  }
  .order_found{
    position: relative;
    padding-left: 20px;
    color: #A0A0A0;
   /* border-left: 1px #EDEDED solid;*/
    left: 18px;

  }
  .order_header{
    width: 91%;
    box-sizing: border-box;
    border-bottom: 1px #EDEDED solid;
    position: relative;
    padding-bottom: 20px;
    margin: 0 auto;
    display: flex;
  }
  .order_main{
    width: 100%;
    min-height: 200px;
    background: white;
    padding-bottom: 28px;
    padding-top: 40px;
    font-family: OPPOfont1;

  }
  /*----------------上面是我的样式-------------*/
  .account-order .gray-box{
    margin-bottom: 20px;
  }
  .gray-box .columns-title h2{
    float: left;
  }
  .gray-btn-menu{
    display: inline-block;
    height: 36px;
    background: #F2F2F2;
    background: linear-gradient(#FFF,#F5F5F5);
    border: 1px solid #DBDDE2;
    border-radius: 4px;
    line-height: 36px;
    cursor: pointer;
    text-align: center;
    user-select: none;
  }
  .account-order .sort-status-menu{
    width: 112px;
  }
  .gray-box .title .gray-btn-menu, .gray-box .title span.gray-normal-btn{
    margin: 10px 0 0 10px;
  }
  .gray-box .title .gray-btn-menu{
    overflow: visible;
    float: right;
  }
  .gray-btn-menu .label{
    position: relative;
    z-index: 1;
    display: block;
    padding: 0 13px 0 16px;
    text-align: left;
    color: #666;
  }
  .gray-box .title .gray-btn-menu .label{
    overflow: visible;
    float: none;
    margin-top: 0;
  }
  .gray-btn-menu .label .arrow{
    float: right;
    width: 10px;
    height: 7px;
    margin: 16px 0 0 6px;
    background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;
  }
  .gray-btn-menu .menu-list{
    display: none;
    position: absolute;
    right: -1px;
    top: -1px;
    width: 100%;
    padding: 38px 0 6px;
    background: #FFF;
    border: 1px solid #dbdde2;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #EEE;
  }
  .gray-btn-menu-on .menu-list, .white-btn-menu-on .menu-list{
    display: block;
  }
  .gray-btn-menu .menu-list li{
    height: 24px;
    line-height: 24px;
    padding: 0 3px 3px;
    text-align: left;
    font-size: 12px;
  }
  .gray-btn-menu .menu-list li a{
    display: block;
    padding: 0 15px;
    border-radius: 3px;
    color: #999;
  }
  .gray-btn-menu .menu-list li a:hover{
    background: #C7C7CA;
    color: #FFF;
  }
  .gray-btn-menu .menu-list li.selected a{
    background: #8F9096;
    color: #FFF;
    cursor: default;
  }
  .account-order .sort-time-menu{
    width: 118px;
  }
  .gray-btn-menu-on .label .arrow, .white-btn-menu-on .label .arrow{
    margin-top: 15px;
    background-position: -15px -521px;
  }
  .gray-btn-menu-on, .white-btn-menu-on{
    position: relative;
    z-index: 10;
    height: auto;
    background: #FFF;
  }
  .gray-btn-menu-on{
    border: 1px solid #DBDDE2;
  }
  .gray-box, .gray-btn-menu-on:hover{
    background: #FFF;
  }
  .gray-box .gray-sub-title{
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
  }
  .account-order .gray-box .box-inner:first-child .gray-sub-title{
    border-top: none;
  }
  .order-list-cart .cart-title span{
    float: right;
    text-align: center;
  }
  .order-list-cart .cart-title .operation, .order-list-cart .cart-title .order-detail, .order-list-cart .cart-title .sub-total{
    float: right;
  }
  .order-list-cart .cart-title .date, .order-list-cart .cart-title .order-id{
    float: left;
    text-align: left;
  }
  .order-list-cart .cart-title .date{
    width: 108px;
    padding-left: 6px;
  }
  .order-list-cart .cart-title .order-detail{
    width: 82px;
    padding-left: 24px;
    text-align: center;
  }
  .order-list-cart .cart-title .sub-total{
    width: 102px;
    padding-right: 18px;
    border-left: 1px solid #DBDBDB;
    text-align: right;
  }
  .order-list-cart .cart-title .operation{
    width: 95px;
    height: 38px;
    padding-right: 23px;
  }
  .order-list-cart .cart-title .num{
    width: 70px;
  }
  .order-list-cart .cart-title .price{
    width: 85px;
    padding-right: 27px;
    text-align: right;
  }
  .gray-box .gray-sub-title a{
    color: #6989E0;
  }
  .order-list-cart .cart{
    float: left;
    width: 737px;
    padding: 0;
    border-right: 1px solid #EBEBEB;
  }
  .order-cart .cart-items{
    position: relative;
    padding: 18px 0 28px;
    border-top: 1px solid #EFEFEF;
  }
  .order-list-cart .cart-items{
    height: 110px;
    padding: 0;
  }
  .order-cart .cart-items:first-child{
    border-top: none;
  }
  .order-cart .prod-info{
    position: relative;
    margin-left: 138px;
  }
  .order-list-cart .prod-info{
    padding: 15px 0 15px 111px;
    margin-left: 0;
    position: relative;
  }
  .order-list-cart .items-thumb{
    position: absolute;
    left: 30px;
    top: 15px;
    width: 78px;
    height: 78px;
    border: 1px solid #EBEBEB;
    border-radius: 3px;
  }
  .order-list-cart .items-thumb img{
    width: 78px;
    height: 78px;
  }
  .order-list-cart .items-params{
    float: left;
    height: 50px;
    padding: 15px 0;
    margin-left: 29px;
    border-bottom: none;
    line-height: 25px;
  }
  .order-cart .items-params .name{
    overflow: hidden;
    float: left;
    color: #666;
    width: 435px;
    height: 44px;
    text-align: left;
  }
  .order-list-cart .prod-info .name{
    float: none;
    width: 220px;
    height: 25px;
    line-height: 25px;
  }
  .order-list-cart .prod-info .vh-center{
    height: auto;
    line-height: 50px;
  }
  .hide-row, .order-cart .items-params .name, .support-cart .items-detail .detail{
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-list-cart .prod-info .num, .order-list-cart .prod-info .operation, .order-list-cart .prod-info .price, .order-list-cart .prod-info .subtotal{
    float: right;
    line-height: 80px;
    text-align: center;
  }
  .order-list-cart .prod-info .operation{
    display: table;
    width: 95px;
    height: 80px;
    padding-right: 23px;
    line-height: 25px;
  }
  .order-list-cart .prod-info .num{
    width: 70px;
  }
  .order-list-cart .prod-info .price{
    width: 85px;
    padding-right: 27px;
    text-align: right;
  }
  .order-list-cart .prod-operation{
    float: right;
    display: table;
    height: 110px;
  }
  .order-list-cart .prod-operation .total{
    display: table-cell;
    padding-right: 18px;
    line-height: 14px;
    text-align: right;
    vertical-align: middle;
  }
  .order-list-cart .prod-operation .status{
    display: table-cell;
    width: 80px;
    padding: 0 24px;
    text-align: center;
    vertical-align: middle;
  }
  .blue-small-btn, .orange-small-btn, .white-gray-small-btn{
    display: inline-block;
    height: 30px;
    padding: 0 13px;
    border-radius: 4px;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
  }
  .blue-small-btn{
    background: #6383C6;
    background: linear-gradient(#7EA3F5,#5A82F0);
    box-shadow: 0 1px 2px rgba(255,255,255,.1) inset, 0 0 0 1px rgba(0,0,0,.2) inset, 0 1px 3px rgba(0,0,0,.1);
    color: #FFF;
  }
  .blue-small-btn:hover{
    box-shadow: 0 1px 1px #7696DE inset, 0 0 2px #627DCA inset, 0 -2px 3px #5A77C7 inset, 0 0 100px rgba(48,77,147,.4) inset, 0 0 0 1px rgba(0,0,0,.3) inset, 0 1px 3px rgba(0,0,0,.1);
    color: #FFF;
  }
</style>
