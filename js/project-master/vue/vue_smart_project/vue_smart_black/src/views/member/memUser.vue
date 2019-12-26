<template>
  <div id="main">
    <div class="main_content">

        <div style="font-family: OPPOfont2;font-size: 16px;color: black;margin-top: 20px">
          <img :src="member.avatar">
          <label style="position: relative;top: 10px">{{member.nickName}}</label>
          <br/>
        </div>
        <div style="font-family: OPPOfont4;font-size: 15px;margin-top: 20px;color: black;">
          绑定安全手机
        </div>

        <div style="font-family: OPPOfont4;font-size: 15px;position: relative;top: 30px">
          <input placeholder="请输入手机号" class="input_sb">
        </div>
        <div style="font-family: OPPOfont4;font-size: 15px;position: relative;top: 50px">
          <input placeholder="请输入密码" class="input_sb">
        </div>

        <div style="font-family: OPPOfont4;position: relative;top: 80px">
          <button class="login_btn">继续</button>
        </div>


      </div>

  </div>
</template>

<script>
  import { sbzfb } from '../../api/goods'
  import $ from 'jquery'
  export default {
    data(){
      return{
        member:{}
      }
    },
    created() {
      this.$store.commit('changNav');
      this.getData();
    },
    methods:{
      getData(){

        sbzfb().then(res => {
          this.$store.state.memberinfo = res.sb;
          console.log(this.$store.state.memberinfo);
        })
        this.member = this.$store.state.memberinfo;
      },
    },
    mounted() {
      this.$store.commit('changheaderStyle',0);
      this.$store.commit('changfooterStyle',0);
    },
    destroyed: function () {
      this.$store.commit('changheaderStyle',1);
      this.$store.commit('changfooterStyle',1);
    },
  }
</script>

<style scoped>
  img{
    width: 50px;
    height: auto;
    border-radius: 50% 50%;
    margin: 0 auto;
  }
  .zfbimg{
    width: 32px;
    height: auto;
    position: relative;
    left: 175px;
    cursor: pointer;
  }
  .sb_fieldset{
    border: none;
    border-top: 1px solid #e0e0e0;
    padding-top: 10px;
    width: 80%;
    margin: 0 auto;
  }
  .login_btn{
    border-radius: 9px;
    display: block;
    font-size: 14px;
    height: 40px;
    margin: 0 auto;
    text-indent: 16px;
    width: 80%;
    background: indianred;
    color: white;
    font-family: OPPOfont2;
  }
  .input_sb{
    background: #f7f7f7;
    border-radius: 9px;
    box-sizing: border-box;
    color: #000;
    display: block;
    font-size: 14px;
    height: 40px;
    line-height: 1x;
    margin: 0 auto;
    text-indent: 16px;
    width: 80%;
  }

  .main_content{
    width: 370px;
    height: 350px;
    background: white;
    position: relative;
    left: 320px;
    top: 160px;
    padding-top: 10px;
    text-align: center;
  }
  /*-------------------------中间的内容------*/
  #main{
    position: absolute;
    background: url(../../../static/images/shuchai/12-27.png);
    background-position:50%;
    background-size: 200% 100%;
    left:0;
    right:0;
    bottom:0;
    top:0;

    color: white;
  }
</style>
