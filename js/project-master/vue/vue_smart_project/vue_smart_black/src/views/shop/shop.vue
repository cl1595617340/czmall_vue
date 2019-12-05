<template>
  <div id="main">

    <div id="main_div">
      <div class="main_div_sb" :style="goodsnav">
        <div class="main_div_divsb" :style="diamonds" @mouseover="showdiamonds" @mouseleave="leavediamonds">
          <i :style="diamonds_i" style="font-size: 20px;" class="el-icon-s-unfold"></i>
        </div>


        <div class="main_div_divsb_query">
          <ul>
            <transition-group name="querysb">
              <li v-for="(list,index) in querylist" :key="list.title">
                <div class="main_div_divsb_query_div">
                  <label>{{list.title}}:{{list.values}}</label>
                  <div class="main_div_divsb_query_i">
                    <i class="el-icon-close" @click="delquery(list.title,index)"></i>
                  </div>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>

        <div class="main_div_sb2" v-show="show_main_div_sb2" @mouseover="showdiamonds" @mouseleave="leavediamonds">
          <p style="background: #950014">
              首页
          </p>
          <p class="main_div_sb2_p" @click="arrow_right">
            Componen Models
            <i class="el-icon-arrow-right" style="margin-left: 40px;font-size: 17px"></i>
          </p>
          <p class="main_div_sb2_p" @click="arrow_up" style="border: none">
            TOP
            <i class="el-icon-arrow-up" style="margin-left: 140px;font-size: 17px"></i>
          </p>

        </div>
      </div>
    </div>

    <div id="content">
      <div class="content_left">
        <div style="padding-top: 30px">
          <label style="font-size: 31px;font-weight: 400;">机型概述</label>
        </div>

        <div class="content_left_mian">

          <div class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==0">
            <span style="font-size: 14px;color: black;">{{list.title}}</span>
            <ul class="content_left_mian_ul">
              <li v-for="(list2,index2) in list.values" >
                <button :disabled="disabledsb"  :class = "activesb == index2 ? 'addclass' : classsb" @click="goquery(list.title,list2.name,index2)"><i :class="classi == index2 ? 'el-icon-close' : 'el-icon-plus'"></i><label style="margin-left: 10px">{{list2.name}}</label></button>
              </li>
            </ul>
          </div>

          <div class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==1" style="margin-top: -5px">
            <span style="font-size: 14px;color: black;">{{list.title}}</span>
            <ul class="content_left_mian_ul">
              <li v-for="(list2,index2) in list.values">
                <button :disabled="disabledsb2" :class = "activesb2 == index2 ? 'addclass' : classsb2"  @click="goquery(list.title,list2.name,index2)"><i :class="classi2 == index2 ? 'el-icon-close' : 'el-icon-plus'"></i><label style="margin-left: 10px">{{list2.name}}</label></button>
              </li>
            </ul>
          </div>

          <div class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==2" style="margin-top: -5px">
            <span style="font-size: 14px;color: black;">{{list.title}}</span>
            <ul class="content_left_mian_ul">
              <li v-for="(list2,index2) in list.values">
                <button :disabled="disabledsb3" :class = "activesb3 == index2 ? 'addclass' : classsb3"  @click="goquery(list.title,list2.name,index2)"><i :class="classi3 == index2 ? 'el-icon-close' : 'el-icon-plus'"></i><label style="margin-left: 10px">{{list2.name}}</label></button>
              </li>
            </ul>
          </div>

          <div class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==3" style="margin-top: -5px">
            <span style="font-size: 14px;color: black;">{{list.title}}</span>
            <ul class="content_left_mian_ul">
              <li v-for="(list2,index2) in list.values">
                <button :disabled="disabledsb4" :class = "activesb4 == index2 ? 'addclass' : classsb4"  @click="goquery(list.title,list2.name,index2)"><i :class="classi4 == index2 ? 'el-icon-close' : 'el-icon-plus'"></i><label style="margin-left: 10px">{{list2.name}}</label></button>
              </li>
            </ul>
          </div>

          <div class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==4" style="margin-top: -5px">
            <span style="font-size: 14px;color: black;">{{list.title}}</span>
            <ul class="content_left_mian_ul">
              <li v-for="(list2,index2) in list.values">
                <button :disabled="disabledsb5" :class = "activesb5 == index2 ? 'addclass' : classsb5"  @click="goquery(list.title,list2.name,index2)"><i :class="classi5 == index2 ? 'el-icon-close' : 'el-icon-plus'"></i><label style="margin-left: 10px">{{list2.name}}</label></button>
              </li>
            </ul>
          </div>

          <div class="block">
            <el-slider
              v-model="value"
              range
              show-stops
              :max="10">
            </el-slider>
          </div>
        </div>

      </div>
   <!--   <div class="gray-box">
        <div  class="item-box">
           <ShopItem :key="index"  :item="item"  v-for="(item ,index) in goodsList" style="z-index: 10"></ShopItem>
        </div>
      </div>-->
      <div class="content_right">
        <div>

          <div class="content_right_div">
            <label><i class="el-icon-arrow-right"></i> i 我所爱  <span style="font-weight: 600">iphone8 Plus</span></label>
            <ul class="content_right_ul">

              <li class="content_right_ul_li1" :style="li1" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus深空灰.jpg">
                </div>
              </li>

              <li class="content_right_ul_li2" :style="li2" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus金色.jpg">
                </div>
              </li>

              <li class="content_right_ul_li3" :style="li3" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus银色.jpg">
                  <button style="margin-left: 50px" @click="showallgoods">catch</button>

                </div>
              </li>


            </ul>

          </div>
          <div class="content_right_div">
            <label><i class="el-icon-arrow-right"></i> Fever To  <span style="font-weight: 600">vivo X27</span></label>
            <ul class="content_right_ul">

              <li class="content_right_ul_li1" :style="li1" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus深空灰.jpg">
                </div>
              </li>

              <li class="content_right_ul_li2" :style="li2" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus金色.jpg">
                </div>
              </li>

              <li class="content_right_ul_li3" :style="li3" @mouseover="showipone" @mouseleave="hideipone">
                <div class="content_right_ul_div">
                  <img src="../../../static/images/goods/iphone8-plus银色.jpg">
                  <button style="margin-left: 50px" @click="showallgoods">catch</button>

                </div>
              </li>


            </ul>

          </div>
        </div>
      </div>
    </div>

    <prompt v-if="maxCount"></prompt>
    </div>
</template>

<script>
  import GoodsData from '../../lib/newGoodsData';
  import ShopItem from "../../components/shop-item"
  import prompt from "../../components/prompt";
  import $ from 'jquery'
  /*我的组件*/
  import vShopGoods from "../shop/shopGoods";
    export default {
        //默认暴露一个模块
      components:{
        ShopItem,
        prompt,
        vShopGoods,
      },
      data(){
        return {
          goodsList:GoodsData,
          sortType:1,
          goodsnav:"position: relative",

          show_main_div_sb2:false,
          diamonds:"",
          diamonds_i:"color: white",

          querytypelist:[
            {title:"拍照像素",
              values:[
                {name:"五摄像头"},
                {name:"四摄像头"},
                {name:"三摄像头"},
                {name:"双摄像头"},
                {name:"高清拍摄"},
              ]
            },
            {title:"运行内存",
              values:[
                {name:"极速畅玩"},
                {name:"高速"},
                {name:"流畅"},
                {name:" 实用"},
              ]
            },
            {title:"电池续航",
              values:[
                {name:"超长待机"},
                {name:" 持久待机"},
              ]
            },
            {title:"CPU主频",
              values:[
                {name:"2.8GHz"},
                {name:"1.8GHz"},
                {name:" 2.2GHz"},
              ]
            },
            {title:"屏幕",
              values:[
                {name:"全面屏"},
                {name:"OLED屏幕"},
                {name:"双曲面"},
              ]
            },

          ],

          /*查询数据，显示在头部的*/
          querylist:[],
          activesb : -1,
          /*点击分类其他分类的样式clas*/
          classsb:"otherclass",
          disabledsb:false,
          classi:-1,

          /*--------------------------2--*/
          activesb2:-1,
          classsb2:"otherclass",
          disabledsb2:false,
          classi2:-1,
          /*--------------------------3--*/
          activesb3:-1,
          classsb3:"otherclass",
          disabledsb3:false,
          classi3:-1,
          /*--------------------------4--*/
          activesb4:-1,
          classsb4:"otherclass",
          disabledsb4:false,
          classi4:-1,
          /*--------------------------5--*/
          activesb5:-1,
          classsb5:"otherclass",
          disabledsb5:false,
          classi5:-1,
          /**/
          li1:"",
          li2:'',
          li3:"",

          changipone:false,
          i :0,
        }
      },
      methods:{
        showallgoods(){
          if (this.i==0){
            this.li2 = "left: -30px;";
            this.li3 = "left: 0px;";
            this.i++;
            this.changipone = true;
          } else {
            this.li2 = "left: -200px;";

            this.i--;
            this.changipone = false;
          }

        },
        hideipone(){
          if (this.changipone==false){
            this.li1 = "left: 0px;";
            this.li3 = "left: -400px;";
          }

        },
        showipone(){
          if (this.changipone==false){
            this.li1 = "left: -60px;";
            this.li3 = "left: -340px;";
          } else {

          }

        },
        /*----------------------------------------------鼠标悬浮手机的动画---*/
        delquery(title,index){
          // 根据下标删除
          this.querylist.splice(index,1);
          if (title=='拍照像素'){
            this.activesb = -1;
            this.classsb = 'otherclass';
            this.disabledsb = false;
            this.classi=-1;
          }else if (title=='运行内存'){
            this.activesb2 = -1;
            this.classsb2 = 'otherclass';
            this.disabledsb2 = false;
            this.classi2=-1;
          }else if (title=='电池续航'){
            this.activesb3 = -1;
            this.classsb3 = 'otherclass';
            this.disabledsb3 = false;
            this.classi3=-1;
          }else if (title=='CPU主频'){
            this.activesb4 = -1;
            this.classsb4 = 'otherclass';
            this.disabledsb4 = false;
            this.classi4=-1;
          }else if (title=='屏幕'){
            this.activesb5 = -1;
            this.classsb5 = 'otherclass';
            this.disabledsb5 = false;
            this.classi5=-1;
          }

        },
        /*点击查询条件。固定的头部显示条件*/
        goquery(title,name,index2){
          let listsb = [{title:'',values:""}];
          listsb.title = title;
          listsb.values = name;
          this.querylist.push(listsb);

          if (title=='拍照像素') {
            //将点击的元素的索引赋值给变量
            this.activesb = index2;
            this.classsb = 'addclassb';
            this.disabledsb = true;
            this.classi=index2;
          }else if (title=='运行内存') {
            //将点击的元素的索引赋值给变量
            this.activesb2 = index2;
            this.classsb2 = 'addclassb';
            this.disabledsb2 = true;
            this.classi2=index2;
          }else if (title=='电池续航') {
            //将点击的元素的索引赋值给变量
            this.activesb3 = index2;
            this.classsb3 = 'addclassb';
            this.disabledsb3 = true;
            this.classi3=index2;
          }else if (title=='CPU主频') {
            //将点击的元素的索引赋值给变量
            this.activesb4 = index2;
            this.classsb4 = 'addclassb';
            this.disabledsb4 = true;
            this.classi4=index2;
          }else if (title=='屏幕') {
            //将点击的元素的索引赋值给变量
            this.activesb5 = index2;
            this.classsb5 = 'addclassb';
            this.disabledsb5 = true;
            this.classi5=index2;
          }



        },

        /*------------------------------------------------------一些样式上的方法---*/
        arrow_right(){
          $('html,body').animate({scrollTop: 80}, 1000);
        },

        arrow_up(){
          $('html,body').animate({scrollTop: 0}, 1000);
        },
        showdiamonds(){
          this.show_main_div_sb2 =true;
          this.diamonds_i = "color: red";
          this.diamonds = "background: black";
        },

        leavediamonds(){
          this.show_main_div_sb2 =false;
          this.diamonds_i = "color: white";
          this.diamonds = "background: #950014";
        },

        sortByPrice(index){
          if (index==1) {
            this.sortType = 2;
          }else {
            this.sortType = 3;
          }
        },
        windowScroll () {
          // 滚动条距离页面顶部的距离
          // 以下写法原生兼容
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          /*console.log(scrollTop)*/
          if (scrollTop>=80){
            this.goodsnav = "position: fixed;top:0px";
          }else {
            this.goodsnav = "position: relative";
          }
        },
      },
      /*监听滚动条*/
      mounted() {
        window.addEventListener('scroll', this.windowScroll)
      },

      created() {
        this.$store.commit('changNav');
      },
      computed:{
        maxCount(){
          return this.$store.state.maxOff;
        },
      },
    }
</script>


<style scoped>
  .content_right_ul_li3{

    position: relative;
    left: -400px;
    transition: all 0.8s ease;
  }
  .content_right_ul_li2{

    position: relative;
    left: -200px;
    transition: all 0.8s ease;
  }
  .content_right_ul_li1{
    position: relative;

    transition: all 0.8s ease;
  }

  /*.content_right_ul_li1:hover + .content_right_ul_li2{
    left: -290px;
  }*/



  .content_right_ul_div img{
    width: 200px;
    height: auto;
  }

.content_right_ul_div{

}
  .content_right_ul{
    margin-left: 55px;
  }
.content_right_ul li{
  float: left;
  cursor: pointer;
}
  /*-----------------上面是图片内容的样式--*/
  .content_right_div>label>i{
    font-weight: 600;
  }
  .content_right_div>label{
    display: block;
    font: normal 400 27px/12px "SimSun", serif;
    transform: scale(1, 1.1);
    transition: all 0.3s ease;
    cursor: pointer;
    width: 400px;
  }
  .content_right_div>label:hover{
    color:  #D10D0D;
  }
  .content_right_div{
    width: 90%;
    height: 350px;
    margin-left: 61px;
    margin-top: 30px;
    padding-top: 30px;
  }
 .content_right>div{
    width: 100%;
    min-height:1700px;
    /*background: wheat;*/
    margin-top:95px;
  }

.content_right{
  width: 970px;
  min-height:1700px;
   /* background: wheat;*/
  position: relative;
  top: 80px;
  float: left;
 /* left:240px;*/
}


  /*--------------------------------------------------------------上面是主要内容右边的部分---*/

.addclass{
  background: #313639;
  color: white;
}
.addclass:hover label{
  cursor: pointer;
}
.addclass:hover{
  background: #D10D0D;
  color: white;
}

/*被禁用的其他按钮*/
.addclassb{
  color: #C8CACB;
  cursor: default;
  border: 1px #C8CACB solid;
}

/*没被禁用前的class*/
.otherclass{
  border: 1px black solid;
}

.otherclass:hover i{
  color: indianred;
}
.otherclass:hover label{
  color: indianred;
}
.otherclass:hover {
  border: 1px indianred solid;
}

.otherclass i{
  font-weight: 600;
  margin-left: -20px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.otherclass label{
  transition: all 0.3s ease;
  cursor: pointer;
}

.addclass2{
  background: #313639;
  color: white;
}
.addclass2:hover{

}

/*--------------------------------------------------------上面是用户点击查询分类后的样式---*/

  /*叉叉*/
  .main_div_divsb_query_i{
    position: relative;
    text-align: right;
    top: -30px;
    cursor: pointer;
  }
  .main_div_divsb_query_i:hover{
    color: darkred;
  }
  .main_div_divsb_query_div{
    width: 160px;
    height: 30px;
    line-height: 30px;
    border-bottom: 4px indianred solid;
    padding-left: 5px;
    padding-right: 10px;
  }
  .main_div_divsb_query li{
    float: left;
    margin-left: 30px;
  }
  .main_div_divsb_query{

    width: 80%;
    height: 50px;
    margin-left: 275px;
    margin-top: -40px;
    line-height: 50px;
    padding-top: 20px;
  }

  /*-------------------------------------------------------------上面是固定查询头的数据样式--*/
  .content_left_mian_div{
    margin-top: 20px;
    padding-top: 30px;

  }
  .content_left_mian_ul li{
    margin-top: 20px;

  }

  .content_left_mian button{
    width: 180px;
    height: 50px;
    /*border: 1px black solid;*/
    padding-right: 50px;
    font-size: 13px;
    transition: all 0.3s ease;
  }

  .content_left_mian{
    width: 100%;
    min-height:1700px;
    border-right: 1px #E3E4E4 solid;

  }

  .content_left{
    width: 240px;
    min-height:1700px;
  /*  background: whitesmoke;*/
    position: relative;
    top: 80px;
    float: left;
  }

  #content{

    width: 1220px;
    min-height:1700px;
    padding: 0 0 25px;
    margin: 0 auto;

    z-index: 2;
    clear:both;
    transition: all 0.2s ease;
  }

/*---------------------------------------------------------上面是中间手机内容的样式--*/
  .main_div_sb2 p{
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 15px;
    color: white;
    line-height: 50px;
    border-bottom: 1px silver solid;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .main_div_sb2_p{
    background: black;
  }
  .main_div_sb2_p:hover{
    background: #950014;
  }
  .main_div_sb2{
    background: black;
    width: 240px;
    height: 150px;
    margin-left: 65px;
    margin-top: -10px;
  }
.main_div_sb{
  width: 100%;
 /* background: red;*/
  background: #EFF0F1;
  top: 30px;
  height: 50px;
  z-index: 9999;
}
/*方块*/
  .main_div_divsb{
    width: 40px;
    height: 40px;
    background: #950014;
    position: relative;
    left: 65px;
   /* top: 10px;*/
    text-align: center;
    line-height:48px;

    transition: all 0.4s ease;
    cursor: pointer;
    z-index: 10000;
  }
  .main_div_divsb:hover{
    /*background: black;*/
  }
  .main_div_divsb i{
    transition: all 0.8s ease;
  }
  .main_div_divsb:hover i{
    color: #950014;
  }



  #main_div{
    width: 100%;
    height: 80px;
    background: #EFF0F1;
    box-shadow:0px 0px 0px #888888;
    z-index: 1;
  }


  /*---------------------------------------------上面是我的样式--*/
  #main{
    transition: all 2s ease 0s;
  }
  .sku-box{
    position: relative;
    top: 80px;
  }
  .sort-option{
    border-top: 1px solid #D8D8D8;
    color: #999;
  }
  .sort-option ul{
    height: 60px;
    line-height: 60px;
  }
  .sort-option li{
    position: relative;
    float: left;
    padding-left: 42px;
  }
  .sort-option li:first-child{
    padding-left: 9px;
  }
  .sort-option li:before{
    content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
  }
  .sort-option li:first-child:before{
    display: none;
  }
  .sort-option a{
    display: block;
    font-size: 12px;
    color: #999;
  }
  .sort-option a.active, .sort-option a:hover{
    color: #5683EA;
  }
  .gray-box{

    margin-top: 200px;

    overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
  }
  .sku-box .item-box{
    clear: both;
    overflow: hidden;
    margin: 0 -1px -1px -1px;
  }

  .querysb-enter-active {
    animation: fadeInDown 0.5s;
  }
  .querysb-leave-active {
    animation: fadeInDown 0.5s reverse;
  }

</style>
