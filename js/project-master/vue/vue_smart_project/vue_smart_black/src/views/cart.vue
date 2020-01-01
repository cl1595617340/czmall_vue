<template>
  <div id="main" class="hander-car">
<!--  <div class="store-content">
      <div class="cart-box">
        <div class="title">
          <h2>购物清单</h2>
        </div>
        <div class="cart-inner">
          <div v-if="count<=0" class="empty-label">
            <h3>您的购物车中还没有商品</h3>
            <router-link class="link" :to="{ path: '/' }">现在选购</router-link>
          </div>
          <div>
            <div v-if="count>0" class="cart-table-title">
              <span class="name">商品信息</span>
              <span class="operation">操作</span>
              <span class="subtotal">小计</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>

            <div class="cart-table">
              <div class="cart-group">
                &lt;!&ndash;购物列表&ndash;&gt;
                <div class="cart-top-items" :key="index" v-for="(item,index) in carGoodsData">
                  <div class="cart-items">
                    <div class="items-choose">
                      <span class="blue-checkbox-new " @click="checked(item.sku_id)" :class="{' checkbox-on':item.checked}"><a></a></span>
                    </div>
                    <div class="items-thumb">
                      <img :src="item.spec_json.image">
                   &lt;!&ndash;   <a href="javascript:;" target="_blank"></a>&ndash;&gt;
                    </div>
                    <div class="name hide-row" >
                      <div class="name-table">
                        <a href="javascript:;" target="_blank">{{item.sub_title}}</a>
                        <ul class="attribute">
                          <li>{{item.spec_json.show_name}}</li>
                        </ul>
                      </div>
                    </div>
                    <div class="operation">
                      <a class="items-delete-btn" @click="delCarPanelHandle(item.sku_id)"></a>
                    </div>
                    <div class="subtotal">¥ {{item.price*item.count}}</div>
                    <div class="item-cols-num">
                      <div class="select js-select-quantity">
                        <span class="down" :class="{' down-disabled':item.count<=1}" @click="subCarPanelHandle(item.sku_id)">-</span>
                        <span class="num">{{item.count}}</span>
                        <span class="up" :class="{' up-disabled':item.count>=item.limit_num}" @click="plusCarPanelHandle(item.sku_id)">+</span>
                      </div>
                    </div>
                    <div class="price">¥ {{item.price}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="count>0"  class="cart-bottom-bg fix-bottom">
          <div class="cart-bar-operation">
            <div>
              <div class="choose-all js-choose-all">
                <span class="blue-checkbox-new "  @click="checkallbtn(checkAll)" :class="{'checkbox-on':checkAll}"><a></a></span>
                全选
              </div>
              <div class="delete-choose-goods" @click="delCheckGoods" >删除选中的商品</div>
            </div>
          </div>
          <div class="shipping">
            <div class="shipping-box">
              <div class="shipping-total shipping-num">
                <h4 class="">
                  已选择 <i>{{checkedcount}}</i> 件商品
                </h4>
                <h5>
                  共计 <i >{{count}}</i> 件商品
                </h5>
              </div>
              <div class="shipping-total shipping-price">
                <h4 class="">
                  应付总额：<span>￥</span><i >{{checkedprice}}</i>
                </h4>
                <h5 class="shipping-tips">
                  应付总额不含运费
                </h5>

              </div>
            </div>
            <span class="jianguo-blue-main-btn big-main-btn js-checkout " :class="{'disabled-btn':checkedcount==0}">
              <router-link :to="{ path: 'checkout' }">现在结算</router-link>
            </span>
          </div>
        </div>
      </div>
    </div>-->


    <div class="cart_content">
      <div class="cart_content_div"  v-if="carGoodsData.length!=0">
        <div class="cart_content_div_name">
          购物车
        </div>

        <div class="cart_content_div_mian">
          <!--循环的-->
          <section class="cart_content_div_sec" :key="index" v-for="(item,index) in carGoodsData">
            <ul class="cart_content_div_sec_ul">

              <li class="shp-col select" style="height: 30px;width: 30px;margin-top: 15px;margin-left: 20px">
                <span class="blue-checkbox-new" @click="checked(item.sku_id)" :class="{' checkbox-on':item.checked}"><a></a></span>
              </li>

              <li class="shp-col image"  style="margin-left:50px">
                <div>
                  <img :src="item.spec_json.image">
                </div>
              </li>
              <li class="shp-col" style="width: 200px">
                <div class="name hide-row">
                  <div class="name-table shp-col-sb">
                    <a href="javascript:;" target="_blank" class="shp-col-name" @click="goGoodsinfo(item.sku_id)">{{item.sub_title}}</a>
                    <ul class="attribute" style="margin-top: 5px">
                      <li>{{item.spec_json.show_name}} - {{item.title}}</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="shp-col" style="margin-top: 10px;margin-left: 100px;width: 50px">
                <div class="shp-col-sb">¥ {{item.price}}</div>
              </li>
              <li class="shp-col" style="margin-top: 10px;margin-left: 200px">
                <div class="item-cols-num">
                  <div class="select js-select-quantity">
                    <span class="down" :class="{' down-disabled':item.count<=1}" @click="subCarPanelHandle(item.sku_id)">-</span>
                    <span class="num">{{item.count}}</span>
                    <span class="up" :class="{' up-disabled':item.count>=item.limit_num}" @click="plusCarPanelHandle(item.sku_id)">+</span>
                  </div>
                </div>
              </li>
              <li class="shp-col" style="margin-top: 20px;margin-left: 140px">
                <div>
                  <a class="shp-col-del"><i style="font-size: 20px" class="el-icon-delete" @click="delCarPanelHandle(item.sku_id)"></i></a>
                </div>
              </li>
            </ul>
            <!--赠品-->
            <section class="cart_content_div_sec_sec" v-if="item.complimentary.compName!=''">
              <ul style="margin-top: -20px">
                <li style="width: 284px;">
                  <label class="oc-label">
                    <em>赠品</em>
                  </label>
                  <figure class="oc-figure">
                    <img :src="item.complimentary.img" style="width: 40px;height: auto">
                  </figure>
                  <a>{{item.complimentary.compName}}</a>
                </li>
              </ul>
            </section>

          </section>
        </div>

        <!--结算的div-->
        <div v-if="count>0" class="cart_bar">
          <section class="cart_bar_sec">
            <i class="el-icon-shopping-cart-2" style="font-size: 22px"></i>
            <label>继续选购</label>
          </section>

          <section class="cart_bar_total">
            <section class="cart_bar_total_price">
              <label>应付:</label>
              <span>
                <strong class="cart_bar_total_sum01">￥</strong>
                <strong class="cart_bar_total_sum">{{checkedprice}}.00</strong>
              </span>
            </section>
            <section class="cart_bar_total_price">
              <label>共计:</label>
              <span>
                <strong class="cart_bar_total_sum">{{checkedcount}}件</strong>
              </span>
            </section>
            <!--结算按钮-->
            <section class="cart_bar_total_btn">
              <a @click="gocheckout">去结算</a>
            </section>
          </section>
        </div>
      </div>

      <!--购物车为空的div-->
      <div class="cart_content_nonediv" v-if="carGoodsData.length==0">
        <img src="../../static/images/shuchai/carNone.png">
        <label>你的购物车还是空的，快去逛逛吧 。</label>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        //默认暴露一个模块
      computed:{
        carGoodsData () {
          return this.$store.state.carPanelData
        },
        count () {
          return this.$store.getters.totleCount
        },
        totle () {
          return this.$store.getters.totlePrice
        },
        //根据选择商品的状态决定-》按钮的状态
      checkAll(){
        return this.$store.getters.checkAll;
       },
        checkedcount(){
          return this.$store.getters.checkedCount;
        },
        checkedprice(){
          return this.$store.getters.checkedPrice;
        }
      },
      created() {
        this.$store.commit('changNav');
        $('html,body').animate({scrollTop: 0}, 10);
        /*拦截器，没有登录的话去到登录页面*/
        if (this.$store.state.memberinfo.avatar==undefined) {
          this.$router.push({path: '/memLogin'});
        }
      },
      methods:{
        /*点击去到购物车的商品信息*/
        goGoodsinfo(id){
          let routeData = this.$router.resolve({ path: '/ShopInfo', query: {  id: id } });
          window.open(routeData.href, '_blank');
        },
        gocheckout(){
          this.$router.push({path: '/checkout'});
          this.$store.state.isCarOrOne = 0;//赋值给状态管理是怎么买的判断
        },
        /*删除购物车商品*/
        delCarPanelHandle (id) {
          this.$confirm('确认要删除此商品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
           /* type: 'warning',*/
            center: true
          }).then(() => {
            this.$store.commit('delCarPanelData',id)
          }).catch(() => {

          });

        },
        plusCarPanelHandle(id){
          this.$store.commit('plusCarPanelData',id)
        },
        subCarPanelHandle(id){
          this.$store.commit('subCarPanelData',id)
       },
        checked(id){
          this.$store.commit('Checked',id)
        },
        checkallbtn(checked){
          this.$store.commit('CheckAllbtn',checked);
        },
        delCheckGoods(){
          this.$store.commit('delCheckGoods');
        }
      },


    }
</script>

<style scoped>
  .cart_content_nonediv label{

    position: relative;
    top: 70px;
  }
.cart_content_nonediv img{
  width: 75px;
  height: auto;
  margin: 0 auto;
  position: relative;
  top: 50px;
}
  .cart_content_nonediv{
    width: 250px;
    height: 250px;
    margin: 0 auto;
    position: relative;
    top: 70px;
    text-align: center;
    font-family: OPPOfont1;
  }
  /*------------------------购物车空的样式--*/
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

  .cart_bar_total_btn a:hover{
    background:rgba(5, 181, 112, 0.8);
  }
  .cart_bar_total_btn a{
    width: 210px;
    height: 60px;
    line-height: 60px;
    color: #fff;
    background-color: #D5001C;
    font-size: 16px;
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    background-image: none;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: background-color 0.35s ease;
    transition: background-color 0.35s ease;
  }
  .cart_bar_total_btn{
    display: block;
  }
  .cart_bar_total_sum01{
    font-size: 21px;
  }
  .cart_bar_total_sum{
    color: #333;
    font-weight: normal;
    font-size: 30px;
    display: table-cell;
    white-space: nowrap;
    overflow: hidden;
  }
  .cart_bar_total_price label{
    text-align: left;
    display: table-cell;
    color: #666;
  }
  .cart_bar_total_price{
    width: 100%;
    display: table;
    padding-bottom: 20px;
  }
  .cart_bar_total{
    vertical-align: top;
    text-align: right;
    font-family: OPPOfont1;
    width: 210px;
  }
  .cart_bar_sec label{
    position: relative;
    top: -3px;
    cursor: pointer;
  }
  .cart_bar_sec :hover{
    opacity: 0.7;
  }
.cart_bar_sec{
  /*background: wheat;*/
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  vertical-align: top;
  text-align: left;
  font-family: OPPOfont1;
  transition: all 0.3s;
}
.cart_bar{
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

}
  /*--------------------------------底部结算的div------*/
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
  .blue-checkbox-new{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-new.png) no-repeat 0 -20px;
    cursor: pointer;
    vertical-align: middle;
  }
  .checkbox-on{
    background: url(../assets/img/checkbox-new.png) no-repeat 0 0;
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
  }
  .cart_content_div_sec{
    width: 100%;
    min-height: 120px;
  /*  background: beige;*/
    box-sizing: border-box;
    border-top: 1px #EDEDED solid;
   /* border-bottom:1px #EDEDED solid;*/
    font-family: OPPOfont1;

  }
  /*----------------------------上面是循环的项--*/
  .cart_content_div_mian{
    width: 100%;
    min-height: 100px;
   /* background: gainsboro;*/
    margin-top: 10px;
    border-bottom:1px #EDEDED solid;
  }
  .cart_content_div_name{
    font-family: OPPOfont2;
    font-size: 18px;
  }
.cart_content_div{
  width: 93%;
  min-height: 380px;
 /* background: silver;*/
  margin: 0 auto;

}
  .cart_content{
    width: 1200px;
    min-height: 380px;
    background: white;
    margin: 0 auto;
    position: relative;
    top: 60px;

    padding-top:25px;
    padding-bottom: 30px;
  }

  #main{
  min-height: 650px;
  width: 100%;
  background: #F5F5F5;
  position: relative;
  /* top: 50px;*/
  overflow: hidden;
  padding-bottom: 100px;
}

  /*---------------------------------------------------上面是我的样式---*/
  .cart-box{
    position: relative;
    margin-top: 40px;
    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  }
  .cart-box .title{
    position: relative;
    z-index: 10;
    height: 60px;
    padding: 0 10px 0 30px;
    border-bottom: 1px solid #d4d4d4;
    border-radius: 8px 8px 0 0;
    box-shadow: rgba(0,0,0,.06) 0 1px 7px;
    background: #f3f3f3;
    background: linear-gradient(#fbfbfb,#ececec);
    line-height: 60px;
    font-size: 18px;
    color: #333;
  }
  .cart-box .cart-inner{
    padding-bottom: 91px;
  }
  .cart-box .empty-label{
    height: 49px;
    padding: 385px 0 0 0;
    background: url(../assets/img/cart-box-empty.png) no-repeat center 50px;
    text-align: center;
  }
  .cart-box .empty-label h3{
    font-size: 14px;
    line-height: 1.5;
    color: #8d8d8d;
    margin-bottom: 17px;
  }
  .cart-box .empty-label>a.link{
    width: 151px;
    line-height: 38px;
    height: 38px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    display: inline-block;
    color: #999;
    font-size: 12px;
    background: #f9f9f9;
    background: -webkit-linear-gradient(#fff,#f0f0f0);
    background: linear-gradient(#fff,#f0f0f0);
  }
  .cart-box .cart-table-title{
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,.08);
  }
  .cart-box .cart-table-title span {
    float: right;
    text-align: center;
  }
  .cart-box .cart-table-title .name{
    float: left;
    text-align: left;
  }
  .cart-box .cart-table-title .operation,
  .cart-box .cart-table-title .num,
  .cart-box .cart-table-title .price,
  .cart-box .cart-table-title .subtotal{
    width: 137px;
  }
  .cart-box .cart-table-title .subtotal{
    text-align: right;
  }
  .cart-box .cart-group{
    position: relative;
  }
  .cart-box .cart-group .cart-items{
    border-top: 1px dashed #eee;
    position: relative;
    height: 140px;
    margin-left: 74px;
  }
  .cart-box .cart-group .cart-top-items:first-child .cart-items{
    border-top: none;
  }
  .cart-box .cart-items .items-choose, .cart-items .items-thumb, .cart-items .name{
    float: left;
  }
  .cart-box .cart-items .items-choose{
    position: absolute;
    left: -74px;
    top: 0;
    width: 74px;
    height: 20px;
    padding: 60px 0 0 31px;
    font-size: 12px;
    color: #999;
  }
  .cart-box .blue-checkbox-new{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(../assets/img/checkbox-new.png) no-repeat 0 -20px;
    cursor: pointer;
    vertical-align: middle;
  }
  .cart-box .checkbox-on{
    background: url(../assets/img/checkbox-new.png) no-repeat 0 0;
  }
  .cart-box .cart-items .items-thumb{
    position: relative;
    margin-top: 30px;
    overflow: hidden;
  }
  .cart-box .cart-items .items-thumb, .cart-items .items-thumb img{
    width: 80px;
    height: 80px;
  }
  .cart-box .cart-items .items-thumb>a, .cart-items .items-thumb>i{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 3px;
    border: 0 solid rgba(255,255,255,.1);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.06);
  }
  .cart-box .cart-items .name{
    width: 380px;
    margin-left: 20px;
    color: #323232;
    display: table;
  }
  .hide-row{
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .cart-items .name-table{
    display: table-cell;
    vertical-align: middle;
    height: 140px;
  }
  .cart-items .name a{
    color: #333;
    font-size: 16px;
  }
  .cart-items .name .attribute, .cart-items .name p{
    color: #999;
    font-size: 12px;
    padding-top: 4px;
    line-height: 17px;
  }
  .hander-car .cart-items .name .attribute li{
    float: left;
    padding: 0 10px;
    position: relative;
  }
  .hander-car .cart-items .name .attribute li:first-child{
    padding-left: 0;
  }
  .hander-car .cart-items .item-cols-num,
  .hander-car .cart-items .operation,
  .hander-car .cart-items .price,
  .hander-car .cart-items .subtotal{
    overflow: hidden;
    float: right;
    width: 137px;
    text-align: center;
    color: #666;
    line-height: 140px;
  }
  .hander-car .cart-items .operation{
    padding: 58px 0 0;
    font-size: 12px;
    line-height: 24px;
  }
  .hander-car .cart-items .operation .items-delete-btn{
    display: block;
    width: 24px;
    height: 24px;
    margin: 0 auto;
    color: #C2C2C2;
    background: url(../assets/img/delete-btn-icon.jpg);
    background-size: 100% auto;
    transition: none;
  }
  .cart-items .operation .items-delete-btn:hover{
    background-position: 0 -36px;
  }
  .cart-items .subtotal{
    font-weight: 700;
    text-align: right;
  }
  .cart-items .item-cols-num{
    padding-top: 50px;
    line-height: 40px;
  }
  .cart-items .select{
    width: 112px;
    height: 40px;
    padding-top: 4px;
    margin: 0 auto;
    line-height: 40px;
  }
  .select .down, .select .up{
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 34px;
    height: 37px;
    margin-right: 5px;
    background: url(../assets/img/cart-updown.jpg) no-repeat;
    background-image: url(../assets/img/cart-updown.jpg);
    background-size: 100% auto;
    line-height: 40px;
    text-indent: -9999em;
    cursor: pointer;
    user-select: none;
  }
  .select .down{
    background-position: 0 -60px;
  }
  .select .down:hover{
    background-position: 0 -180px;
  }
  .select .down.down-disabled, .select .down.down-disabled:hover{
    background-position: 0 -300px;
    cursor: not-allowed;
  }
  .select .num{
    position: relative;
    overflow: hidden;
    float: left;
    display: inline-block;
    width: 36px;
    height: 18px;
    margin: 7px 0 0;
    border: none;
    border-radius: 3px;
    line-height: 18px;
    text-align: center;
    font-size: 14px;
  }
  .select input{
    width: 36px;
    height: 18px;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    text-align: center;
    line-height: 18px;
    font-size: 14px;
    padding: 0;
  }
  .select ul{
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 36px;
  }
  .select ul li{
    width: 36px;
    height: 18px;
  }
  .select .up{
    float: right;
    margin: 0;
    background-position: 0 0;
  }
  .select .up:hover{
    background-position: 0 -120px;
  }
  .select .up.up-disabled, .select .up.up-disabled:hover{
    background-position: 0 -240px;
    cursor: not-allowed;
  }
  .gray-box .cart-bottom-bg{
    /*height: 80px;
      background: url(.../assets/img/store/library/cart-wrapper-bg.jpg) repeat-x;
      border-top: 1px solid #D9D9D9;*/
    border-radius: 0 0 8px 8px;
  }
  .fix-bottom{
    height: 90px;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    background-position: center;
    background: #fdfdfd;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
  }
  .cart-bar-operation{
    float: left;
    padding: 35px 26px;
    font-size: 12px;
  }
  .choose-all, .delete-choose-goods, .selected-count{
    float: left;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
    position: relative;
  }
  .delete-choose-goods{
    position: relative;
    margin-left: 21px;
    color: #bbb;
  }
  .delete-choose-goods-disabled{
    cursor: not-allowed;
  }
  .shipping{
    display: inline-block;
    float: right;
    padding: 20px 30px;
  }
  .shipping-box{
    display: inline-block;
    padding-top: 1px;
    margin-right: 10px;
  }
  .shipping-total{
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
  }
  .shipping-total:first-child{
    border: none;
  }
  .shipping-total.shipping-num{
    text-align: right;
  }
  .shipping-total h4{
    color: #323232;
  }
  .shipping-total h4 i{
    font-size: 18px;
    font-weight: 700;
  }
  .shipping-total.shipping-num i{
    width: 28px;
    display: inline-block;
    text-align: center;
  }
  .shipping-total h4.highlight i, .shipping-total h4.highlight span{
    color: #d44d44;
  }
  .shipping-total h5{
    color: #959595;
  }
  .shipping-total h5 i{
    width: 28px;
    display: inline-block;
    text-align: center;
  }
  .shipping-total{
    display: inline-block;
    border-left: 1px solid #e1e1e1;
    padding: 0 20px;
  }
  .shipping-total.shipping-price{
    width: 155px;
    padding-right: 0;
  }
  .blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
    display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 9px;
    background: #015e94;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    cursor: pointer;
    user-select: none;
  }
  .jianguo-blue-main-btn{
    background: #567CE6;
    background: linear-gradient(#799CEA,#567CE6);
    box-shadow: 0 1px 3px rgba(0,0,0,.1), inset 0 -1px 2px rgba(0,0,0,.2);
  }
  .cart-box .big-main-btn{
    height: 48px;
  }
  .cart-box .big-main-btn{
    float: right;
    background: #5d86e5;
    background: -webkit-linear-gradient(#688fe8,#5079e1);
    background: linear-gradient(#688fe8,#5079e1);
  }
  .cart-box .big-main-btn.jianguo-blue-main-btn.disabled-btn{
    background: #A9A9A9;
    background: linear-gradient(#BFBFBF,#999);
    box-shadow: none;
  }
  .cart-box .blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
    display: block;
    padding: 2px 0;
    border-radius: 9px;
    background: #5f7ed7;
    background: linear-gradient(#739fe1,#5f7ed7);
    box-shadow: inset 0 1px 3px #92b6ec, inset 0 0 2px #627dca, inset 0 -2px 3px #4c69b8;
    text-shadow: #4f70b3 0 -1px 0;
    cursor: pointer;
    color: #fff;
    transition: all .3s ease;
  }
  .cart-box .jianguo-blue-main-btn a{
    background: #6C94F3;
    background: linear-gradient(#7EA3F5,#5A82F0);
    box-shadow: none;
    text-shadow: none;
    color: #FFF;
    transition: all .3s ease;
  }
  .cart-box .big-main-btn a{
    height: 44px;
    line-height: 45px;
    font-size: 18px;
  }
  .cart-box .big-main-btn a{
    padding: 2px 32px;
    font-size: 16px;
  }
  .jianguo-blue-main-btn.disabled-btn a,
  .jianguo-blue-main-btn.disabled-btn:active a,
  .jianguo-blue-main-btn.disabled-btn:hover a{
    background: #B7B7B7;
    background: linear-gradient(#C3C3C3,#ABAAAA);
    box-shadow: inset 0 1px 3px #CCC;
  }
  .disabled-btn, .disabled-btn a{
    opacity: .7;
    cursor: not-allowed;
  }
</style>
