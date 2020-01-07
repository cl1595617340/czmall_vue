<template>
	<div class="account-content" >
		<div class="account-order">
			<div class="gray-box" style="background: #F5F5F5">

        <div style="background: #F5F5F5;min-height: 10px;width: 100%;margin-top: -20px;">

          <!--查询-->
          <div class="order_query">
            <ul >
              <li :style="jiantouindex==0?activejiantou:activejiantousb" @click="clickQueryli(0)">
                <label>待付款</label>
              </li>
              <li :style="jiantouindex==1?activejiantou:activejiantousb" @click="clickQueryli(1)">
                <label >待收货</label>
              </li>
              <li :style="jiantouindex==2?activejiantou:activejiantousb" @click="clickQueryli(2)">
                <label >已完成</label>
              </li>
              <li :style="jiantouindex==3?activejiantou:activejiantousb" @click="clickQueryli(3)">
                <label >已关闭</label>
              </li>
            </ul>
          </div>
          <div class="js-list-inner order_main"  v-for="(site,index) in orderlist">

            <!--订单头部-->
            <div class="order_header">
              <span>订单号:<a style="color: #D5001C" @click="goOrderInfo(site.orderId)"> {{site.orderNum}}</a></span>
              <span class="order_found"> {{site.orderFound}}</a></span>
              <strong class="order_state" style="display: flex" v-if="site.orderState==0">
                待付款
                <!--待付款出现的付款按钮-->
                <span  class="order_found" style="position: relative;top: -10px;;border: none;left: -5px;">
                  <el-button round @click="gopay(site.orderNum,site.orderPrice)">去付款</el-button>
                </span>
              </span>
              </strong>
              <strong class="order_state" v-if="site.orderState==1">待收货</strong>
              <strong class="order_state" v-if="site.orderState==2">已完成</strong>
              <strong class="order_state" v-if="site.orderState==3">已取消</strong>



            </div>
            <!--订单商品-->
            <div class="order_content" :style="index2==0?goodsstyle:goodsstylesb" v-for="(site2,index2) in site.orderRelationList">
              <label v-if="index2==0">商品清单</label>
              <label v-if="index2!=0" style="opacity: 0">商品清单</label>
              <div class="order_item">
                <ul class="shp-row">
                  <li class="shp-col order_img">
                    <img style="width: 60px;height: 60px;" :src="site2.goodscolor.goodscolorPicture">
                  </li>
                  <li class="shp-col order_goodsname" style="width: 230px;">
                    <label>{{site2.goods.goodsName}} {{site2.versions.versionsName}} {{site2.goodscolor.goodscolorName}}</label>
                  </li>
                  <li class="shp-col">
                    <label>×{{site2.relation_count}}</label>
                  </li>
                </ul>
                <!--赠品ul-->
                <ul class="shp-row" :style="site2.relationCompname!=''?compstyle:compstylesb" style="line-height: 10px;height: 10px">
                  <li class="shp-col order_img" style="opacity: 0">
                    <!--这个背景图是占位置的-->
                    <img style="width: 60px;height: 60px;" src="../../../static/images/shuchai/背景图.jpg">
                  </li>
                  <li class="shp-col order_goodsname" style="width: 230px;">
                    <label>{{site2.relationCompname}}</label>
                  </li>
                 <!-- <li class="shp-col">
                    <label>×1</label>
                  </li>-->
                </ul>
              </div>
            </div>
            <!--订单底部金额-->
            <div class="order_fooder">
              <span>订单金额</span>
              <span class="order_fooder_price">￥{{site.orderPrice}}.00</span>
            </div>
            <!--	<div class="box-inner order-cart order-list-cart clear" v-for="order,index in orderData">
                            <div class="gray-sub-title cart-title">
                                <span class="date">{{order.iDate}}</span>
                                <span class="order-id"> 订单号： <a href="javascript:;">{{order.orderId}}</a> </span>
                                <span class="order-detail"><router-link :to="{name: 'Payment', query: {orderId:order.orderId}}">查看详情&gt;</router-link> </span> <span class="sub-total">应付总额</span>
                                <span class="operation">商品操作</span>
                                <span class="num">数量</span>
                                <span class="price">单价</span>
                            </div>
                            <div class="cart">
                                <div class="cart-items clear" v-for="item,index in order.goodsData">
                                    <div class="prod-info clear">
                                        <div class="items-thumb">
                                            <a href="javascript:;" target="_blank"><img :src="item.ali_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"></a>
                                        </div>
                                        <div class="items-params clear">
                                            <div class="name vh-center">
                                                <a href="javascript:;" target="_blank" :title="item.title+'（'+item.spec_json.show_name+'）'">{{item.title}}（{{item.spec_json.show_name}}）</a>
                                            </div>
                                            <div class="detail"></div>
                                        </div>
                                        <div class="operation">
                                            <div class="operation-list">

                                            </div>
                                        </div>
                                        <div class="num">{{item.count}}</div>
                                        <div class="price">¥ {{item.price}}.00</div>
                                    </div>
                                </div>
                            </div>
                            <div class="prod-operation">
                                <div class="total">¥ {{order.price+order.freight}}.00</div>
                                <div class="status">
                                    <router-link :to="{name: 'Payment', query: {orderId:order.orderId}}" class="blue-small-btn js-payment-order" v-if="!order.isPay">现在付款</router-link>
                                    <span v-else>已完成</span>
                                </div>
                            </div>
                        </div>-->
          </div>

          <!--查询为空-->
          <div class="order_query_none" v-if="orderlist.length==0">
            <div style="position: relative;top: 100px">
              <img src="/static/images/shuchai/order_none.png">
              <label>您还没有订单</label>
            </div>
          </div>
        </div>

			</div>
		</div>
	</div>
</template>

<script>
  import { f_memOrderList } from '../../api/order';
  import { f_getMemIdByavatar } from '../../api/member';
	export default {
    data(){
      return{
        orderlist:[],
        goodsstyle:"",
        goodsstylesb:"margin-top: -50px;",
        compstyle:"",
        compstylesb:" opacity: 0;",
        /*查询条件点击样式*/
        jiantouindex:-1,
        activejiantou:" border-bottom: 2px silver solid;height: 25px;",
        activejiantousb:"",
        //传到后台的订单状态
        order_stae:"",
        //用户id
        memid:0,
      }
    },
    created(){
      $('html,body').animate({scrollTop: 0}, 10);
      this.initmem();
      this.$store.commit('changNav');
    },
	  computed: {
	    orderData () {
	      return this.$store.state.orderData
	    }
	  },
    methods:{
      //拿到会员id的方法
      initmem(){
        //得到登录的用户id
        let formDatas2 = new FormData();
        formDatas2.append("avater",this.$store.state.memberinfo.avatar);
        f_getMemIdByavatar(formDatas2).then(res => {
          this.memid = res.res.memberId;
          this.getData();
        })

      },
      getData(){
        let formDatas = new FormData();
        formDatas.append("id",this.memid)
        formDatas.append("state",this.order_stae)
        f_memOrderList(formDatas).then(res => {
          this.orderlist = res.res;
          console.log(this.orderlist)
        })
      },
      /*去付款的按钮*/
      gopay(ordernum,price){
        location.href='http://localhost:8088/goAlipay?price='+price+"&ordernumsb="+ordernum;

      },
      clickQueryli(index){
        this.jiantouindex = index;
        this.order_stae = index;
        this.getData();
      },
      //去到订单的详细信息
      goOrderInfo(id){
        this.$router.push({path: 'orderInfo',query:{ id:id}});
      /*  this.$router.go(0);*/
      },
    },
	}
</script>

<style >
  .order_query_none label{
    font-family: OPPOfont1;
  }
  .order_query_none img{
    width: 130px;
    height: auto;
    margin: 0 auto;
  }
  .order_query_none{
    width: 100%;
    height: 500px;
    background: white;
    text-align: center;
  }
  /*-----------------------查询为空------*/
  .order_query ul{
    position: relative;
    top: 35px;
    font-family: OPPOfont2;

  }
  .order_query li label{
    cursor: pointer;
  }
  .order_query li{
    float: left;
    margin-left: 60px;

  }
  .order_query{
    width: 100%;
    height: 60px;
    background: white;
  }
  /*--------------------------------------查询的样式--*/
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
    border-left: 1px #EDEDED solid;
    left: 18px;
  }
  .order_header{
    width: 91%;
    box-sizing: border-box;
    border-bottom: 1px #EDEDED solid;
    position: relative;
    padding-bottom: 20px;
    margin: 0 auto;
  }
  .order_main{
    width: 100%;
    min-height: 200px;
    background: white;
    padding-bottom: 28px;
    padding-top: 40px;
    font-family: OPPOfont1;
    margin-top: 20px;
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
