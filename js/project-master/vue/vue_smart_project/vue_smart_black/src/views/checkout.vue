<template>
  <div id="main" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="content page-order-checkout checkout">
      <div class="js-checkout-address-box">
        <div class="gray-box clear">
          <div class="title columns-title pre-title">
            <h3>收货信息</h3>
          </div>
          <div class="box-inner js-checkout-address-panel ">
            <div class="address-common-table js-multiple-address-panel">
              <ul class="address-item-list clear js-address-item-list">
                <li class="js-choose-address " :class="{'selected-address-item':receiveIndex==index}" v-for="(info,index) in addresslist" @click="chooseReceive(index,info)">
                  <div class="address-item">
                    <div class="name-section">
                      {{info.addressName}}
                      <label class="oc-label" v-if="info.addressDefault==0">
                        <em> 默认</em>
                      </label>
                      <span v-if="info.addressDefault!=0">
                      </span>

                    </div>
                    <div class="mobile-section">{{info.addressIpone}}</div>
                    <div class="detail-section"> {{info.addressProvince}} {{info.addressCity}} {{info.addressCounty}}<br>{{info.addressinfo}} </div>
                  </div>

                  <div class="operation">
                    <div style="position: relative;left: -20px;top: 10px">
                      <i class="el-icon-edit-outline outlinesb" @click="updateAddressb(info)" style="position: relative;left: -20px"></i>
                      <i class="el-icon-delete closesb" @click="delAddressb(info.addressId)"></i>
                    </div>
                  </div>
                </li>
                <li class="add-address-item js-add-address" @click="addReceive">
                  <p>使用新地址</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="gray-box">
        <div class="title">
          <h3>发票信息</h3>
        </div>
        <div class="box-inner invoice-box js-invoice-box">
          <p class="invoice-detail"> 发票类型：电子发票 </p>
          <div class="invoice-detail"> 发票抬头：
            <div class="radio-box">
              <label>
                <input type="radio" class="hide">
                <span class="blue-radio" :class="{'blue-radio-on':invoice.personal}" @click="checkedInvoice(true)"><a></a></span>  个人
              </label>
              <label>
                <input type="radio" class="hide">
                <span class="blue-radio"  :class="{'blue-radio-on':!invoice.personal}" @click="checkedInvoice(false)"><a></a></span>  单位
              </label>
            </div>
            <div class="module-form-row form-item js-invoice-title" v-show="!invoice.personal">
              <div class="module-form-item-wrapper no-icon small-item">
                <i v-show="!invoice.name">请填写公司发票抬头</i>
                <input type="text" class="js-verify" v-model="invoice.name">
                <div class="verify-error" v-show="!invoice.name">必填</div>
              </div>
            </div>
          </div>
          <p class="invoice-detail">发票内容：购买商品明细</p> <p class="invoice-label"> 电子发票是税务局认可的有效收付款凭证，可作为售后服务凭据。电子发票打印后可以用于企业报销。 </p>
        </div>
      </div>

      <div class="gray-box">
        <div class="title pre-title">
          <h3>购物清单</h3>
        </div>
        <!--购买的商品-->
        <div class="cart_content_div_mian">
          <!--循环的-->
          <section class="cart_content_div_sec" :key="index" v-for="(item,index) in carPanelData">
            <ul class="cart_content_div_sec_ul">

              <li class="shp-col select shp-col01" >
                {{index+1}}
              </li>

              <li class="shp-col image"  style="margin-left:50px">
                <div>
                  <img :src="item.spec_json.image">
                </div>
              </li>
              <li class="shp-col shp-col02" >
                <div class="name hide-row">
                  <div class="name-table shp-col-sb">
                    <a href="javascript:;"  class="shp-col-name">{{item.sub_title}}</a>
                    <ul class="attribute" style="margin-top: 5px">
                      <li>{{item.spec_json.show_name}} - {{item.title}}</li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="shp-col shp-col03">
                <div class="shp-col-sb">¥ {{item.price}}</div>
              </li>
              <li class="shp-col" style="margin-top: 20px;margin-left: 170px">
                <div class="item-cols-num">
                  <div class="select js-select-quantity">
                    <span class="num">{{item.count}} 件</span>
                  </div>
                </div>
              </li>
              <!--单个商品共-->
              <li class="shp-col" style="margin-top: 20px;margin-left: 160px">
                <div class="item-cols-num">
                  <div class="select js-select-quantity">
                    <span class="num">¥ {{item.price * item.count}}.00</span>
                  </div>
                </div>
              </li>
            </ul>
            <!--赠品-->
            <section class="cart_content_div_sec_sec" v-if="item.complimentary.compName!=''">
              <ul style="margin-top: -20px">
                <li class="shp-col04" >
                  <label class="oc-label">
                    <em>赠品</em>
                  </label>
                  <figure class="oc-figure">
                    <img :src="item.complimentary.img" class="shp-col05"  >
                  </figure>
                  <a>{{item.complimentary.compName}}</a>
                </li>
              </ul>
            </section>
          </section>
        </div>



        <div class="box-inner box-innersb">
          <div class="order-discount-line">
            <p> 商品总计： <span>¥ {{checkedPrice + freight}}.00</span> </p>
            <p> 运费： <span>+ ¥ {{freight}}.00</span> </p>
            <p class="discount-line js-discount-cash"> <em>现金券</em>： <span> - 0 </span> </p>
          </div>
        </div>
        <div class="box-inner" style="font-family: OPPOfont1">
          <div class="last-payment clear">
            <span class="jianguo-blue-main-btn big-main-btn payment-blue-bt fn-right js-checkout" @click="submitOrderHandle">
              <a>{{btntext}}</a> </span>
            <span class="prices fn-right">应付金额： <em>¥  {{checkedPrice + freight}}.00</em></span>
          </div>
        </div>
      </div>
    </div>
    <adress-pop v-show="popShow" @getDatasb="getDatasb" :gridData="gridData"  @close="closePop"></adress-pop>
  </div>
</template>

<script>
  import AdressPop from '../components/address-pop';
  import { f_getMemIdByavatar } from '../api/member';
  import { f_memAddressBuId } from '../api/member';
  import { delAddress } from '../api/member';
  import { addOrder } from '../api/order';
  import { addOrderRelation } from '../api/order';
  import { f_getOrderIdBynum } from '../api/order';
    export default {
        //默认暴露一个模块
      data(){
          return {
            //地址默认被选中的数值
           receiveIndex:-1,
            //界面是否显示
            popShow:false,
            invoice: {
              personal: true, //用来控制，显示单位还是个人
              name: ''
            },
            /*地址的集合数据*/
            addresslist:[],
            addressmem:{
              memberId:"",
            },
            fullscreenLoading: false,
            gridData:{
              "name": "",
              "phone": "",
              "province": "",
              "city": "",
              "county": "",
              "add": "",
              "default": false,
              "provinceId": 0,
              "cityId": 0,
              "countyId": 0,
            },
            /*当前时间*/
            create_time:"",
            /*选中的地址id*/
            addressid:-1,
            /*当前提交的订单id*/
            orderId:-1,
            /*按钮文字*/
            btntext:"提交订单",
            /*提交订单后显示在页面的*/
            addressinfo:{},
            goodsinfo:{},
            //用户名字，1.7做订单添加用
            mmebername:"",
          }
      },
      components:{
        AdressPop
      },
      created(){
        this.getData();
        /*拦截器，没有登录的话去到登录页面*/
       /* if (this.$store.state.memberinfo.avatar==undefined) {
          this.$router.push({path: '/memLogin'});
        }*/
        $('html,body').animate({scrollTop: 0}, 10);
        this.$store.commit('changheaderStyle',1);
        this.$store.commit('changfooterStyle',1);
        //页面创建的时候确定当前被选中的index数值
        this.$store.state.receiveInfo.forEach((item,index)=>{
           if(item.default){
             this.receiveIndex = index;
             return;
           }
        })

      },
      computed:{
        //被选中的所有的商品
        carPanelData(){
          if (this.$store.state.isCarOrOne==0){
            return this.$store.getters.checkedCarPanelData;
          } else {
            return this.$store.state.carPanelDataOne;
          }

        },
        checkedPrice(){
          if (this.$store.state.isCarOrOne==0){
            return this.$store.getters.checkedPrice;
          } else {

            return this.$store.getters.getBuyGoodsPrice;
          }
        },
        //运费
        freight () {
          let freight = 8
          if(this.$store.getters.checkedPrice>88)
            freight = 0
          return freight
        },
        receiveInfo(){
          return this.$store.state.receiveInfo;
        }
      },
      methods:{
        getData(){
          this.openFullScreen1();
          //得到登录的用户id
          let formDatas = new FormData();
          formDatas.append("avater",this.$store.state.memberinfo.avatar);
          f_getMemIdByavatar(formDatas).then(res => {
            //得到登录的用户id
            this.addressmem.memberId = res.res.memberId;
            this.mmebername = res.res.memberName;
            /*//-------------------------查看用户的地址*/
            let formDatas2 = new FormData();
            formDatas2.append("id",this.addressmem.memberId);
            f_memAddressBuId(formDatas2).then(resb => {
              this.addresslist = resb.res.addressList;

              /*循环拿到默认的下标，再根基下标选中默认的地址*/
              let i = 0;
              for (const argument of this.addresslist) {
                if (argument.addressDefault==0){
                  this.receiveIndex = i;
                  this.invoice.name = argument.addressName;
                  this.addressid = argument.addressId;
                  this.addressinfo = argument;
                }
                i++;
              }
            })
          })
        },
        /*修改地址*/
        updateAddressb(obj){
          let defaddress = false;
          this.gridData.name = obj.addressName;
          this.gridData.phone = obj.addressIpone;
          this.gridData.province = obj.addressProvince;
          this.gridData.city = obj.addressCity;
          this.gridData.county = obj.addressCounty;
          this.gridData.add = obj.addressinfo;

          this.gridData.provinceId = obj.provinceId;
          this.gridData.cityId = obj.cityId;
          this.gridData.countyId = obj.countyId;
          //id
          this.gridData.addressId = obj.addressId;
          if (obj.addressDefault==0){
            defaddress = true;
          } else {
            defaddress = false;
          }
          this.gridData.default = defaddress;

          this.popShow = true;
        },
        /*删除地址*/
        delAddressb(id){
          let formDatas = new FormData();
          formDatas.append("state",1);
          formDatas.append("id",id);
          this.$confirm('确认删除此地址吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            center: true
          }).then(() => {
            delAddress(formDatas).then(res => {
              if (res.res){
                this.getData();
              }
            })
          }).catch(() => {

          });

        },
        /*子组件的请求,添加后再请求数据*/
        getDatasb(){
          this.getData();
        },
        //用来地址的选中
         chooseReceive(index,address){
          this.addressinfo = address;
          this.addressid = address.addressId;
           this.invoice.name = address.addressName;
           this.receiveIndex = index;
         },
        //关闭窗口，子类调用
        closePop () {
          this.popShow = false;
          this.$store.state.receiveInfo.forEach((item,index)=> {
            if (item.default) {
              this.receiveIndex = index;
              return;
            }
          })
        },
        addReceive (){
          //this.oldReceive = null
          this.popShow = true
        },
        //点击的时候切换单位和个人
        checkedInvoice (boole) {
          this.invoice.personal = boole
        },
        /*提交订单后添加订单关系表*/
        submitOrderRelation(){
          /*判断是直接购买还是购物车购买的*/
          let goodsdata = [];
          if (this.$store.state.isCarOrOne==0){
            goodsdata = this.carPanelData;
          }else {
            goodsdata = this.$store.state.carPanelDataOne;
          }
          for (const obj of goodsdata) {
            let data = {
              relation_order_id:this.orderId,
              relation_member_id:this.addressmem.memberId,
              relation_goods_id:obj.good_id,
              relation_address_id:this.addressid,
              relation_color_id:obj.spec_json.color_id,
              relation_versions_id:obj.versionsid,
              relation_compName:obj.complimentary.compName,
              relation_compimg:obj.complimentary.img,
              relation_count:obj.count,
            }
            let formDatas2 = new FormData();
            formDatas2.append("obj",JSON.stringify(data));
            addOrderRelation(formDatas2).then(res2 => {

            })
          }
        },

        //提交订单
        submitOrderHandle () {
          if (this.addressid==-1){
            this.$message({
              message: '没有写地址哦',
              type: 'warning'
            });
            return;
          }
          if (this.carPanelData.length==0&&this.$store.state.carPanelDataOne.length==0){
            this.$message({
              message: '没有商品',
              type: 'warning'
            });
            return;
          }
          this.btntext = '提交订单中...';
          /* //判断
          if(!this.invoice.personal&&!this.invoice.name) return
          if(this.invoice.personal){
            this.invoice.name = "个人"
          }*/
          let receiveInfo = this.receiveInfo[this.receiveIndex] //当前被选中的默认的地址栏
          let iDate = new Date();

          //获取当前时间
          this.create_time = this.timeFormat(new Date());

          /*判断是直接购买还是购物车购买的*/
          let goodsdata=[];
          if (this.$store.state.isCarOrOne==0){
            goodsdata = this.carPanelData;
            this.goodsinfo = this.carPanelData;
          }else {
            goodsdata = this.$store.state.carPanelDataOne;
            this.goodsinfo = this.$store.state.carPanelDataOne;
          }
         /* console.log(goodsdata)*/

          /*订单的商品数量*/
          let count = 0;
          for (const obj of goodsdata) {
            count+=obj.count;
          }

          /*发票类型*/
          let order_invoicetypes = -1;
          if (this.invoice.personal) {
            order_invoicetypes = 0;
          }else{
            order_invoicetypes = 1;
          }

            let data = {
              order_num: iDate.getTime(), //订单号
              memberName:this.mmebername,
            /*  goodsData: goodsdata, //商品*/
              order_price: this.checkedPrice, //总价格
              order_logistics:iDate.getFullYear(),//物流号
              order_found: this.create_time, //创建时间
            /*  freight: this.freight, //运费*/
              order_invoicetype: order_invoicetypes, //发票类型
              order_company: this.invoice.name, //发票抬头,个人就是他地址的名字，公司的话就是this.invoice.name
            /*  receiveInfo: receiveInfo, //地址
              isPay: false,//是否付款*/
              order_count:count,//订单的商品数量
              addressinfo:this.addressinfo,
              goodsinfo:this.goodsinfo,
          }
          /*-----------------------------------------------------------添加订单到数据库-----*/
          let formDatas = new FormData();
          formDatas.append("obj",JSON.stringify(data));
          addOrder(formDatas).then(res => {
            /*根据订单编号查询订单，做添加订单编号用*/
            let formDatas2 = new FormData();
            formDatas2.append("num",data.order_num);
            f_getOrderIdBynum(formDatas2).then(res2 => {
                this.orderId = res2.res.orderId;
                this.submitOrderRelation();
                setTimeout(() => {
                  this.$router.push({name: 'Payment', query: {orderId:data.orderId}}) //路由跳转
                }, 2000);
                this.$store.commit('submitOrder',data);//里面有清空购物车数据的操作
            })
          })
        /*  console.log(data);*/

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
      }
    }
</script>


<style scoped>
  .box-innersb{
    font-family: OPPOfont1;
    font-size: 15px;
  }
  .shp-col06img{
    width: 40px;height: auto
  }

  .shp-col06{
    width: 284px;
  }

  .shp-col04{
    width: 400px
  }

  .shp-col05{
    width: 40px;height: auto
  }

  .shp-col03{
    margin-top: 10px;margin-left: 100px;width: 50px
  }
  .shp-col02{
    width: 200px
  }

  .shp-col01{
   height: 30px;width: 30px;margin-top: 15px;margin-left: 32px
  }
  /*响应性*/


  .closesb:hover{
    color: #D5001C;
  }
  .closesb{
    transition: all 0.3s ease;
    position: relative;
    z-index: 100;
  }
  /*上面是删除图标*/
  .outlinesb:hover{
    color: #D5001C;
  }
  .outlinesb{
    position: relative;
    transition: all 0.3s ease;
    z-index: 100;
  }
  /*上面是修改图标*/
  .operation{
    width: 100%;
    height: 30px;
   /* background: wheat;*/
    text-align: right;
    font-size: 15px;
    position: relative;
    z-index: 100;
  }
  /*--------------------------操作的样式--*/
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
    font-size: 14px;
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
  .title>h3{
    border-bottom:1px #EDEDED solid;
    width: 98%;
  }
  #main{
    width: 100%;
    background: #F5F5F5;
  }
  /*------------------------------------------------上面是我的样式------*/
  /*.nav-sub{
      display: none;
  }*/
  .content{
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }
  .page-order-checkout{
    padding-top: 40px;
  }
  .checkout .gray-box{
    overflow: hidden;
   /* border: 1px solid #D1D1D1;
    border-color: rgba(0,0,0,.14);*/
   /* border-radius: 8px;*/
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  }
  .checkout .gray-box, .gray-btn-menu-on:hover{
    background: #FFF;
  }
  .checkout .gray-box{
    margin-bottom: 30px;
  }
  .checkout .gray-box .title{
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
  .checkout .gray-box .pre-title{
    position: relative;
    z-index: 2;
  }
  .checkout .gray-box .title h2{
    font-size: 18px;
    font-weight: 400;
    color: #626262;
  }
  .checkout .gray-box .columns-title h2{
    float: left;
  }
  .checkout .address-common-table .address-item-list{
    padding: 30px 13px 0;
  }
  .checkout .address-common-table .address-item-list li{
    overflow: hidden;
    float: left;
    width: 276px;
    height: 158px;
    margin: 0 0 30px 16px;
    border: 1px solid #E5E5E5;
    border-radius: 3px;
    /*background: #FAFAFA;*/
    line-height: 14px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
    color: #626262;
    cursor: pointer;
    user-select: none;
    position: relative;
    z-index: 1;
  }
  .checkout .address-common-table .address-item-list li:hover{
    background: none !important;
  }
  .checkout .address-common-table .address-item-list li.selected-address-item{
    background: #FFF;
    border-color: #D5001C;
  }
  .checkout .address-common-table .address-item-list .address-item{
    padding: 19px 14px 0 19px;
  }
  .checkout .address-common-table .name-section{
    height: 16px;
    padding-right: 20px;
    line-height: 16px;
    font-size: 16px;
    color: #666;
    font-family: OPPOfont1;
  }
  .checkout .address-common-table .mobile-section{
    height: 14px;
    padding-top: 17px;
    line-height: 14px;
    color: #999;
    font-family: OPPOfont5;
  }
  .checkout .address-common-table .detail-section{
    padding-top: 6px;
    line-height: 24px;
    color: #999;
  }
  .checkout .address-common-table .address-item-list li.selected-address-item:after{
   /* content: '√';*/
    display: block;
    position: absolute;
    right: 17px;
    top: 19px;
    font-size: 24px;
    color: #6A8FE5;
  }
  .checkout .address-common-table .operation-section{
    visibility: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 28px;
    background: #E1E1E1;
    border-top: 1px solid #E1E1E1;
    transform: translate(0,29px);
  }
  .checkout .address-common-table .operation-section .delete-btn,
  .checkout .address-common-table .operation-section .update-btn{
    float: left;
    display: block;
    height: 28px;
    background: #FFF;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    transition: background .15s ease;
  }
  .checkout .address-common-table .operation-section .update-btn{
    width: 137px;
  }
  .checkout .address-common-table .operation-section .delete-btn{
    float: right;
    width: 138px;
  }
  .checkout .address-common-table .add-address-item::before{
    content: '+';
    display: block;
    position: absolute;
    left: 50%;
    top: 54px;
    height: 24px;
    margin-left: -10px;
    line-height: 24px;
    text-align: center;
    font-size: 24px;
    color: #626262;
  }
  .checkout .address-common-table .add-address-item p{
    height: 14px;
    padding-top: 85px;
    line-height: 14px;
    text-align: center;
    color: #999;
  }
  .checkout .address-common-table .address-item-list li:hover{
    background: #F2F2F2;
  }
  .checkout .invoice-box{
    padding: 22px 29px 29px 28px;
  }
  .checkout .invoice-box .invoice-detail{
    position: relative;
    height: 36px;
    line-height: 36px;
    color: #666;
  }
  .checkout .invoice-box .radio-box{
    position: absolute;
    left: 65px;
    top: 0;
    padding: 0;
    margin: 0;
  }
  .checkout .invoice-box .radio-box>label{
    margin-right: 5px;
  }
  .checkout .blue-radio{
    overflow: hidden;
    display: inline-block;
    position: relative;
    top: 2px;
    width: 10px;
    height: 10px;
    padding: 4px;
    background: #F9F9F9;
    background: linear-gradient(#F5F6F6,#FDFDFD);
    border: 1px solid #E6E6E6;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,.05) inset;
    cursor: pointer;
  }
  .checkout .invoice-box .blue-radio{
    top: 4px;
    margin: 0 3px 0 6px;
  }
  .checkout .blue-radio-on a, .choose-radio-on .blue-radio a{
    overflow: hidden;
    display: block;
    width: 8px;
    height: 8px;
    background: #6C94F3;
    background: linear-gradient(#749AF4,#668EF2);
    border: 1px solid #5D81D9;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0,0,0,.2);
  }
  .checkout .module-form-row .small-item{
    width: 180px;
    height: 36px;
    border-radius: 4px;
    line-height: 36px;
    font-size: 14px;
  }
  .checkout .invoice-box .module-form-row{
    position: absolute;
    left: 215px;
    top: -1px;
    padding: 0;
    margin: 0;
  }
  .checkout .module-form-item-wrapper i{
    position: absolute;
    left: 15px;
    top: 0;
    font-style: normal;
    font-size: 16px;
    color: #bebebe;
  }
  .checkout .module-form-row .small-item i{
    font-size: 14px;
  }
  .checkout .invoice-box .module-form-item-wrapper{
    width: 338px;
    height: 34px;
    line-height: 34px;
  }
  .checkout .module-form-item-wrapper{
    display: block;
    position: relative;
    width: 372px;
    height: 46px;
    background-color: #FFF;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    border: 1px solid #CCC;
    border-radius: 6px;
    line-height: 46px;
    font-size: 16px;
    opacity: 1;
    transition: opacity .3s ease-in;
  }
  .checkout .invoice-box .module-form-item-wrapper i{
    left: 11px;
  }
  .checkout .module-form-item-wrapper input{
    position: relative;
    z-index: 3;
    width: 290px;
    padding: 0 13px 0 15px;
    background: 0 0;
    border: none;
    font-size: 16px;
    color: #333;
  }
  .checkout .module-form-row .small-item input{
    padding-left: 15px;
    margin-top: 8px;
    width: 137px;
    font-size: 14px;
  }
  .checkout .invoice-box .module-form-item-wrapper input{
    width: 310px;
    padding-left: 11px;
  }
  .checkout .invoice-box .invoice-label{
    position: relative;
    padding-top: 25px;
    margin-top: 11px;
    border-top: 1px solid #E5E5E5;
    line-height: 12px;
    text-indent: 10px;
    font-size: 12px;
    color: #999;
  }
  .checkout .gray-box .gray-sub-title{
    height: 38px;
    padding: 0 24px;
    background: white;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
  }
  .checkout .ui-goods-cart .cart-table-title{
    padding: 0 0 0 29px;
    border-top: none;
    font-size: 12px;
  }
  .checkout .ui-goods-cart .cart-table-title span{
    float: right;
    text-align: center;
  }
  .checkout .ui-goods-cart .cart-table-title .name{
    float: left;
    text-align: left;
  }
  .ui-goods-cart .cart-table-title .num, .ui-goods-cart .cart-table-title .operation, .ui-goods-cart .cart-table-title .price, .ui-goods-cart .cart-table-title .subtotal{
    width: 130px;
    padding-right: 29px;
    text-align: right;
  }
  .ui-goods-cart .cart-table-title .num{
    width: 132px;
  }
  .ui-goods-cart .cart-table-title .price{
    width: 120px;
  }
  .ui-goods-cart .cart-group, .ui-goods-cart .cart-items{
    border-top: 1px solid #EBEBEB;
  }
  .ui-goods-cart .cart-items{
    position: relative;
    height: 110px;
    padding-left: 29px;
    color: #666;
  }
  .ui-goods-cart .cart-group:first-child, .ui-goods-cart .cart-items:first-child{
    border-top: none;
  }
  .ui-goods-cart .cart-items .items-choose, .ui-goods-cart .cart-items .items-thumb, .ui-goods-cart .cart-items .name{
    float: left;
  }
  .ui-goods-cart .cart-items .items-thumb, .ui-goods-cart .cart-items .items-thumb img{
    width: 78px;
    height: 78px;
    border-radius: 4px;
  }
  .ui-goods-cart .cart-items .items-thumb{
    margin-top: 15px;
    border: 1px solid #EBEBEB;
  }
  .ui-goods-cart .cart-items .name{
    display: table;
    width: 420px;
    height: 100%;
    margin-left: 30px;
    line-height: 24px;
  }
  .ui-goods-cart .cart-items .name-cell{
    display: table-cell;
    vertical-align: middle;
  }
  .ui-goods-cart .cart-items .name a{
    color: #333;
  }
  .ui-goods-cart .cart-items .subtotal{
    float: right;
    display: table;
    width: 129px;
    height: 100%;
    padding-right: 29px;
    text-align: right;
    line-height: 24px;
    color: #333;
  }
  .ui-goods-cart .cart-items .subtotal-cell{
    display: table-cell;
    vertical-align: middle;
  }
  .ui-goods-cart .cart-items .goods-num, .ui-goods-cart .cart-items .operation, .ui-goods-cart .cart-items .price, .ui-goods-cart .cart-items .select{
    overflow: hidden;
    float: right;
    width: 129px;
    padding-right: 29px;
    line-height: 110px;
    text-align: right;
    color: #333;
  }
  .ui-goods-cart .cart-items .goods-num{
    width: 64px;
    padding: 0 9px 0 90px;
    text-align: center;
  }
  .ui-goods-cart .cart-items .price{
    width: 120px;
  }
  .page-order-checkout .order-discount-line{
    width: 90%;
    padding: 21px 30px;
    border-top: 1px solid #EBEBEB;
    line-height: 30px;
    text-align: right;
    margin-left: 30px;
  }
  .page-order-checkout .order-discount-line span{
    float: right;
    width: 157px;
  }
  .page-order-checkout .last-payment{
    padding: 22px 60px 19px 30px;
   /* background: linear-gradient(#FCFCFC,#F5F5F5);*/
    /*border-top: 1px solid #DADADA;*/
  /*  box-shadow: -3px 0 8px rgba(0,0,0,.04);*/
  }
  .blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
    display: block;
    padding: 1px;
    margin: 0 auto;
   /* border-radius: 6px;*/
    background: #015e94;
   /* background: linear-gradient(#5598c9,#2a6da2);*/
    text-align: center;
   /* text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    font-family: 'Microsoft Yahei','微软雅黑','PingFang SC',sans-serif;*/
    font-family: OPPOfont1;
    cursor: pointer;
   /* -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;*/
  }
  .jianguo-blue-main-btn{
    background: #6383C6;
    background: linear-gradient(#6383C6,#4262AF);
    box-shadow: none;
  }
  .checkout .big-main-btn{
    height: 46px;
  }
  .page-order-checkout .payment-blue-bt, .page-order-checkout .payment-blue-bt a{
    width: 136px;
    font-size: 16px;
  }
  .blue-main-btn a, .gray-main-btn a, .jianguo-blue-main-btn a{
    display: block;
    padding: 2px 0;
    border-radius: 6px;
  }
  .jianguo-blue-main-btn a{
    background: linear-gradient(#6F97E5,#527ED9);
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
    transition: all .3s ease;
  }
  .checkout .big-main-btn a{
    height: 42px;
    line-height: 42px;
    width: 136px;
    font-size: 16px;
  }
  .jianguo-blue-main-btn:hover a{
    box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
  }
  .page-order-checkout .last-payment .prices{
    padding: 0 40px;
    line-height: 50px;
    font-size: 14px;
  }
  .page-order-checkout .last-payment .prices em{
    display: inline-block;
    position: relative;
    top: 3px;
    margin-top: -4px;
    font-size: 24px;
    color: #D44D44;
  }
  .verify-error {
    display: block;
    position: absolute;
    right: 6px;
    top: 4px;
    z-index: 5;
    padding: 0 9px;
    border-radius: 5px;
    line-height: 26px;
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    background: #E66157;
    opacity: 1;
  }
</style>
