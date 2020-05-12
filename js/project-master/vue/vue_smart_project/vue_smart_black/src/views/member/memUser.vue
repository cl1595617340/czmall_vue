<template>
  <div id="main"   v-loading.fullscreen.lock="fullscreenLoading">
    <div class="main_content">

        <div class="main_content_div" >
          <img :src="member.avatar">
          <label class="main_content_div_label" >{{member.nickName}}</label>
          <br/>
        </div>
        <div class="main_content_div02" >
          绑定安全手机
        </div>

        <div class="main_content_div03"  >
          <input placeholder="请输入手机号" class="input_sb" v-model="saveMembers.memberipone">
        </div>
        <div class="main_content_div04">
          <input type="password" placeholder="请输入密码" class="input_sb" v-model="saveMembers.memberpwd">
        </div>
        <div   class="exitsb fontsb" @click="exitsb">
          退出 <i class="el-icon-switch-button"></i>
        </div>
        <div class="main_content_div05" >
          <button class="login_btn" @click="next">继续</button>
        </div>

      </div>

  </div>
</template>

<script>
  import { sbzfb } from '../../api/member'
  import { saveMember } from '../../api/member'
  import { f_getMemByName } from '../../api/member'
  export default {
    data(){
      return{
        member:{

        },
        /*保存到数据库的对象*/
        saveMembers:{
          memberName:"",
          sex:"",
          email:"",
          birthday:"",
          memberProvince:"",
          membercity:"",
          memberState:"",
          memberipone:"",
          memberpwd:"",
          avatar:"",
        },
        fullscreenLoading: false,
        sbtime:3000,
      }
    },
    created() {
      this.$store.commit('changNav');
      this.getData();
    },
    methods:{
      getData(){

        /*获取支付宝登录的用户信息*/
        sbzfb().then(resb => {
          this.$store.state.memberinfo = resb.sb;
          this.$store.state.memberinfo.memberName = resb.sb.nickName;
          this.$store.state.memberinfo.sex = resb.sb.gender;
       /*   console.log(this.$store.state.memberinfo);*/
          this.member = this.$store.state.memberinfo;
          console.log(1111111);
          console.log(this.$store.state.memberinfo);
          console.log(22222222);
          console.log(this.member);
          this.openFullScreen1();

          /*根基名字查询用户是否已经支付宝注册过了*/
          let formDatas = new FormData();
          formDatas.append("name",this.$store.state.memberinfo.nickName);
          f_getMemByName(formDatas).then(res => {

            console.log(res.member);
            if (res.res){
              setTimeout(() => {
                if (this.$store.state.memberloginUrl=="http://localhost:8080/#/cart") {
                  location.href="http://118.178.187.197:8088/front/index.html#/cart";
                }else {
                  location.href=this.$store.state.memberloginUrl;
                }
              }, 3000);
            }
          })
        })

      },
      /*继续的按钮*/
      next(){
        console.log(this.member);
        /*添加用户端api*/
        this.saveMembers.memberName = this.member.nickName;
        this.saveMembers.sex = this.member.gender;
        this.saveMembers.email = "";
        this.saveMembers.birthday = "1999-03-07";
        this.saveMembers.memberProvince = this.member.province;
        this.saveMembers.membercity = this.member.city;
       /*  this.saveMembers.memberState = this.member.nickName;
         this.saveMembers.memberipone = this.member.nickName;*/
        this.saveMembers.avatar = this.member.avatar;

        let formDatas = new FormData();
        formDatas.append("obj", JSON.stringify(this.saveMembers));
        saveMember(formDatas).then(res => {
            if (res.res){
              this.openFullScreen1();
              setTimeout(() => {
                location.href=this.$store.state.memberloginUrl;
              }, 1500);
            }else {
              this.$message({
                message: '登录失败',
                type: 'warning'
              });
            }
        })
      },
      exitsb(){
        this.$store.state.memberinfo = "";
        this.$router.push({path: '/'});
        this.$router.go(0);
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

  .main_content_div_label{
    position: relative;top: 10px
  }

  .fontsb{
    font-family: OPPOfont4;
  }
  .main_content_div05{
    font-family: OPPOfont4;position: relative;top: 70px

  }

  .main_content_div04{
    ont-family: OPPOfont4;font-size: 15px;position: relative;top: 50px;

  }
  .main_content_div03{
    font-family: OPPOfont4;font-size: 15px;position: relative;top: 30px
  }
  .main_content_div02{
   font-family: OPPOfont4;font-size: 15px;margin-top: 20px;color: black;

  }
  .main_content_div{
    font-family: OPPOfont2;font-size: 16px;color: black;margin-top: 20px
  }


  .exitsb{
    color: black;
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 290px;
  }
  /*退出*/
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
    width:80%;
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
    line-height: 1px;
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
