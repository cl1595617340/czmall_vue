<template>
    <div class="main" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="main_div">
        <div class="main_div_div">
          <div style="display: flex">
            <img src="/static/images/shuchai/success.png" style="width: 120px;height: 120px">
            <div class="main_div_div_content">
              <p style="font-size: 22px;font-family: OPPOfont1">
                成功支付
              </p>
              <p>
                请耐心等待发货
              </p>
              <p>
                订单号:{{ordernum}}
              </p>
              <p>
                支付时间:{{nowDate}}
              </p>
            </div>
          </div>
          <!--按钮-->
          <div class="main_div_btn">
            <router-link :to="{ path: 'Order' }">我的订单</router-link>
            <router-link :to="{ path: '' }">继续购物</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import { getOrderNum } from '../api/order';
  import { f_updateOrderState } from '../api/order';
  import { f_getOrderIdBynum } from '../api/order';
  import { f_updatePayok } from '../api/order';
  export default {
    data (){
      return{
        //订单号
        ordernum:"",
        //支付时间
        nowDate:"",

        fullscreenLoading: false,
      }
    },
    created(){
      this.openFullScreen1();
      this.getData();
    },
    methods:{
      getData(){
        getOrderNum().then(res => {
          this.ordernum = res.res;
          this.nowDate = this.timeFormat(new Date());

          /*根据订单编号查询订单*/
          let formDatas2 = new FormData();
          formDatas2.append("num",this.ordernum);
          f_getOrderIdBynum(formDatas2).then(res2 => {
            /* this.orderId = res2.res.orderId;*/
            /*修改订单成已待收货状态*/
            let formDatas = new FormData();
            formDatas.append("id",res2.res.orderId)
            formDatas.append("state",1)
            f_updateOrderState(formDatas).then(res3 => {

            })

            /*用户成功支付后，修改他订单的支付时间*/
            let formDatas3 = new FormData();
            formDatas3.append("id",res2.res.orderId)
            formDatas3.append("dateok",this.nowDate);
            f_updatePayok(formDatas3).then(res4 => {

            })
          })

        })
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
    mounted() {
      window.addEventListener('scroll', this.windowScroll);
      this.$store.commit('changNav');
      $('html,body').animate({scrollTop: 0}, 10);
    },
  }
</script>

<style scoped>
  .main_div_btn a:hover{
    background: indianred;
    color: black;
  }
  .main_div_btn a{
    line-height: 40px;
    width: 120px;
    height: 40px;
    border: 1px silver solid;
    border-radius: 20px;
    float: left;
    margin-left: 20px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    color: silver;
    font-family: OPPOfont3;
  }
  .main_div_btn{
    position: relative;
    top: 120px;
    width: 100%;
    height: 90px;
  }
  .main_div_div_content p{
    margin-top: 9px;
    margin-left: 20px;
    font-family: OPPOfont1;
  }
  .main_div_div_content{
    text-align: left;
  }
  .main_div_div{
    width: 400px;
    height: 300px;
  /*  background: wheat;*/
    margin: 0 auto;
    position: relative;
    top: 70px;
    padding-top: 20px;
  }
  .main_div{
    width: 90%;
    height: 500px;
    background: white;
    margin: 0 auto;
    position: relative;
    top: 40px;
    text-align: center;
  }
  .main{
    width: 100%;
    min-height: 200px;
    background: #F4F4F4;
    padding-bottom: 80px;
  }
</style>
