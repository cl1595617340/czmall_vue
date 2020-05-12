<template>
    <div id="main" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="box_header">
        <ul class="box_header_ul">
          <li @click="gohomepage">Mall官网</li>
          <li @click="Todevelop">colorOS</li>
          <li @click="Todevelop">云服务</li>
        </ul>
        <ul class="box_header_ul2">
          <li @click="Todevelop">帮助中心</li>
          <li @click="Todevelop">简体中文</li>
        </ul>
      </div>

      <div class="main_box">
        <div class="main_box_logo">
          <div class="main_box_logo_sb"></div>
          <p style="color: black;font-family: OPPOfont1">登录 Mall 帐号可享受更多的服务</p>
        </div>
      </div>

      <div class="box_content">
        <div class="index_content">
          <div class="index_content_div01" >
            账号登录
          </div>
          <div class="index_content_div02" >
            密码登录
          </div>
          <div class="index_content_div03">
            <input placeholder="请输入手机号" class="input_sb" v-model="ipone">
          </div>
          <div class="index_content_div04" >
            <input placeholder="请输入密码" class="input_sb" v-model="pwd" type="password">
          </div>
          <div @click="Todevelop" class="zhnone index_content_div05"  >
            忘记密码
          </div>
          <div class="index_content_div06" >
            <button class="login_btn" @click="submit">登陆</button>
          </div>
          <div class="index_content_div07" >
            <label @click="Todevelop"  class="zhnone index_content_div0701">账号隐私声明</label>
            <label @click="registeruser" class="index_content_div0702" >注册账号</label>
          </div>
          <!--第三方登录-->
          <div style="font-family: OPPOfont4;margin-top: 20px">
            <fieldset class="sb_fieldset">
              <legend>第三方登陆</legend>
            </fieldset>
            <div>
              <img @click="loginsb" src="../../../static/images/shuchai/支付宝.png" class="zfbimg">
            </div>
          </div>
        </div>
      </div>

      <!--页脚-->
      <div class="box_footer">
        <p class="box_footer_p">mall公司版权所有-京ICP备10046444-京公网安备11010802020134号-京ICP证110507号</p>
      </div>
    </div>
</template>

<script>
  import { f_memlogin } from '../../api/member'
  export default {
    created() {
      this.$store.commit('changNav');
      this.openFullScreen1();
    },
    data(){
      return{
        ipone:"",
        pwd:"",

        fullscreenLoading: false,
        sbtime:1000,
      }
    },
    methods:{
      loginsb(){
        location.href='http://118.178.187.197:8088/zhifubao';
      },
      /*通用的待开发*/
      Todevelop(){
        this.$toTop()
      },
      /*回到首页*/
      gohomepage(){
        this.show = false;
        this.$store.commit('changNav2');
        this.$router.push("/");
        this.$router.go(0);
      },
      /*注册的按钮*/
      registeruser(){
        let arr = ['强烈建议使用第三方登陆!!!,如出现意料之外的错误请使用测试账号.', '测试的手机号2', '测试的密码1234'];
        let str = arr.join(' <br/> ');
        this.$notify({
          dangerouslyUseHTMLString: true,
          title: '看见我了吗',
          message: str,
          iconClass:'el-icon-warning-outline',
        });
      },
      /*登录的按钮*/
      submit(){
        let formDatas = new FormData();
        formDatas.append("ipone", this.ipone);
        formDatas.append("pwd", this.pwd);
        f_memlogin(formDatas).then(res => {
          if (res.res!=null){
            if (res.res.memberState==1){
              this.$message({
                message: '此账号已被封禁',
                type: 'warning'
              });
            }else {
              this.sbtime = 3000;
              this.$store.state.memberinfo = res.res;
              setTimeout(() => {
               /* alert(this.$store.state.memberloginUrl)*/
                if (this.$store.state.memberloginUrl=="http://localhost:8080/#/cart") {
                  location.href="http://118.178.187.197:8088/front/index.html#/cart";
                }else {
                  location.href=this.$store.state.memberloginUrl;
                }

              }, 2000);
              this.openFullScreen2();
            }

          } else{
            this.$message({
              message: '登录失败',
              type: 'warning'
            });
          }

        })
      },
      openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, this.sbtime);
      },

      openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: '正在登录',
          spinner: 'el-icon-loading',
          background: 'rgba(255,255,255, 0.6)'
        });
        setTimeout(() => {
          loading.close();
        }, 2600);
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

  .index_content_div0702{
    position: relative;left: 180px;font-family: OPPOfont2

  }

  .index_content_div0701{
    margin-left: 70px

  }

  .index_content_div07{
    font-family: OPPOfont4;font-size: 12px;margin-top: 10px;margin-left: -250px

  }

  .index_content_div06{
   font-family: OPPOfont4;margin-top: 10px

  }

  .index_content_div05{
    font-family: OPPOfont4;font-size: 12px;margin-top: 10px;margin-left: -250px

  }
  .index_content_div04{
   font-family: OPPOfont4;font-size: 15px;margin-top: 20px
  }

  .index_content_div03{
   font-family: OPPOfont4;font-size: 15px;margin-top: 20px
  }

  .index_content_div02{
   font-family: OPPOfont4;font-size: 15px;margin-top: 10px

  }
  .index_content_div01{
    font-family: OPPOfont2;font-size: 23px;
  }


  .zhnone{
    cursor: pointer;
  }

  /*上面是3.6写死的待开发样式*/
  .box_header_ul2 li{
    float: left;
    margin-left: 40px;
    cursor: pointer;
    font-family: OPPOfont4;
  }
  .box_header_ul2{
    margin-left: 1100px;
  }
  .box_header_ul li{
    float: left;
    margin-left: 40px;
    cursor: pointer;
  }
.box_header_ul{
    font-family: OPPOfont4;
    margin-left: 20px;
}
  .box_header{
    position: absolute;
    top: 30px;
    width: 100%;
    height:40px;
    /*background: white;*/
    color: black;
  }
  /*-------------------------------最上面的头--*/
.box_footer_p{
  position: absolute;
  top: 90px;
  left:420px;
  color: #9b9b9b;
  font-family: MyriadPro-Regular;
  font-size: 13px;
}
  .box_footer{
    position: absolute;
    top: 655px;
    width: 100%;
    height: 125px;
    background: white;
    color: black;
  }
  /*------------------------------上面的页脚---*/
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
    height: 48px;
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
    height: 48px;
    line-height: 1px;
    margin: 0 auto;
    text-indent: 16px;
    width: 80%;
  }
  .index_content{
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
    min-height: 375px;
    padding-top: 50px;
    padding-bottom: 10px;
    position: relative;
    top: -130px;
    width: 380px;
    color: black;
    text-align: center;
  }

  .box_content{
    position: relative;
    top: -200px;

  }



  .main_box_logo_sb{
    background: url(../../../static/images/shuchai/苹果.png) no-repeat;
    background-size: contain;
    height: 60px;
    margin: 45px auto 15px;
    position: relative;
    left: 455px;
  }
.main_box_logo{
  text-align: center;
  height: 100px;
}
  .main_box{
    background: transparent;
    height: auto;
    min-height: calc(100vh - 220px);
    position: relative;
    -webkit-box-sizing: border-box;

    border: none;
    border-radius: 0;
    box-sizing: border-box;
    margin: 0 auto 44px;
    position: relative;
    top: 30px;
    width: 960px;
  }
#main{
  position: absolute;
  background: url(https://id.heytap.com/img/heytap_bg.1612deb5.png) no-repeat;
  background-size: 100% 100%;
  left:0;
  right:0;
  bottom:0;
  top:0;

  color: white;
}
</style>
