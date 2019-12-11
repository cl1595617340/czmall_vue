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
                    <i class="el-icon-close" @click="delquery(list.title,index,list.values)"></i>
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

    <div id="content" :style="content">
      <div class="content_left">
        <div style="padding-top: 30px">
          <label style="font-size: 31px;font-weight: 400;">机型概述</label>
        </div>

        <div class="content_left_mian">


          <!--这个ul是滑块-->
          <ul style="padding-top: 30px" class="content_left_mian_ul">
            <li>
              <span style="font-size: 14px;color: black;">制造商建议零售价（含增值税）</span>
              <div class="block" style="width: 180px">
                <el-slider
                  v-model="slidervalue"
                  range
                  @change="changeslider"
                  :max="10">
                </el-slider>
              </div>

              <div v-for="(slider,index) in slidervalue">
                <label v-if="index==0 && slider==0">{{slider}}</label>
                <label v-if="index==0 && slider!=0">{{slider}},000</label>
                <label v-if="index==1" style="position: relative;left: 150px;top: -17px">{{slider}},000</label>
              </div>
            </li>
          </ul>


          <div style="padding-top: 5px" class="content_left_mian_div" v-for="(list,index) in querytypelist" v-if="index==0">
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

        </div>

      </div>
   <!--   <div class="gray-box">
        <div  class="item-box">
           <ShopItem :key="index"  :item="item"  v-for="(item ,index) in goodsList" style="z-index: 10"></ShopItem>
        </div>
      </div>-->
      <div class="content_right">
        <div>

          <transition-group name="queryGoodslist">
            <div v-show="queryGoodslist" :key="goodlist.goodsId" class="content_right_div" v-for="(goodlist,index) in goodslist" >
            <label  @click="showsb(index,goodlist.goodsId)" @mouseover="showipone(index)" @mouseleave="hideipone(index)">
              <i class="el-icon-arrow-right"></i> {{goodlist.goods_title}}
              <span style="font-weight: 600">{{goodlist.goodsName}}
              </span>
            </label>

            <ul class="content_right_ul" >

              <li  v-if="index2==0" :class="sstt[index2]" v-for="(goodcolorList,index2) in goodlist.goodscolorList" :style="liindex == index ? li1 : li1sb" @mouseover="showipone(index)" @mouseleave="hideipone(index)">
                <div class="content_right_ul_div">
                  <img @click="goGoodsInfo(goodlist.goodsId)" class="goodcolorList_img" @mouseover="show_img(goodcolorList.goodscolorId)" @mouseleave="hide_img(goodcolorList.goodscolorId)" :style="liindeximg == goodcolorList.goodscolorId ? goodcolorList_img : ''" :src="goodcolorList.goodscolorPicture">

                  <!--版本-->
                  <span v-for="(sbv,indexv) in goodlist.versionsList" v-if="indexv==0">
                    <div class="goodcolorList_versions" :style="liindexver == goodcolorList.goodscolorId ? goodcolorList_ver : goodcolorList_versb">
                      <label>建议零售价:￥<span style="color: #D10D0D">{{sbv.versionsPrice}}</span>起*</label>
                    </div>
                  </span>

                  <label class="goodcolorList_label" :style="liindexlabel == goodlist.goodsId ? goodcolorList_label : goodcolorList_labelsb">{{goodcolorList.goodscolorName}}</label>
                </div>
              </li>

              <li  v-if="index2==1" :class="sstt[index2]" v-for="(goodcolorList,index2) in goodlist.goodscolorList" :style="liindex == index ? li2 : li2sb" @mouseover="showipone(index)" @mouseleave="hideipone(index)">
                <div class="content_right_ul_div">
                  <img @click="goGoodsInfo(goodlist.goodsId)" class="goodcolorList_img" @mouseover="show_img(goodcolorList.goodscolorId)" @mouseleave="hide_img(goodcolorList.goodscolorId)" :style="liindeximg == goodcolorList.goodscolorId ? goodcolorList_img : ''" :src="goodcolorList.goodscolorPicture">
                  <!--版本-->
                  <span v-for="(sbv,indexv) in goodlist.versionsList" v-if="indexv==0">
                    <div class="goodcolorList_versions" :style="liindexver == goodcolorList.goodscolorId ? goodcolorList_ver : goodcolorList_versb">
                      <label>建议零售价:￥<span style="color: #D10D0D">{{sbv.versionsPrice}}</span>起*</label>
                    </div>
                  </span>
                  <label class="goodcolorList_label" :style="liindexlabel == goodlist.goodsId ? goodcolorList_label : goodcolorList_labelsb">{{goodcolorList.goodscolorName}}</label>
                </div>
              </li>


              <li  v-if="index2==2" :class="sstt[index2]" v-for="(goodcolorList,index2) in goodlist.goodscolorList" :style="liindex == index ? li3 : li3sb" @mouseover="showipone(index)" @mouseleave="hideipone(index)">
                <div class="content_right_ul_div">
                  <img @click="goGoodsInfo(goodlist.goodsId)" class="goodcolorList_img" @mouseover="show_img(goodcolorList.goodscolorId)" @mouseleave="hide_img(goodcolorList.goodscolorId)" :style="liindeximg == goodcolorList.goodscolorId ? goodcolorList_img : ''" :src="goodcolorList.goodscolorPicture">
                  <!--版本-->
                  <span v-for="(sbv,indexv) in goodlist.versionsList" v-if="indexv==0">
                    <div class="goodcolorList_versions" :style="liindexver == goodcolorList.goodscolorId ? goodcolorList_ver : goodcolorList_versb">
                      <label>建议零售价:￥<span style="color: #D10D0D">{{sbv.versionsPrice}}</span>起*</label>
                    </div>
                  </span>
                  <label class="goodcolorList_label" :style="liindexlabel == goodlist.goodsId ? goodcolorList_label : goodcolorList_labelsb">{{goodcolorList.goodscolorName}}</label>
                </div>
              </li>

              <li  v-if="index2==3" :class="sstt[index2]" v-for="(goodcolorList,index2) in goodlist.goodscolorList" :style="liindex == index ? li4 : li4sb" @mouseover="showipone(index)" @mouseleave="hideipone(index)">
                <div class="content_right_ul_div">
                  <img @click="goGoodsInfo(goodlist.goodsId)" class="goodcolorList_img" @mouseover="show_img(goodcolorList.goodscolorId)" @mouseleave="hide_img(goodcolorList.goodscolorId)" :style="liindeximg == goodcolorList.goodscolorId ? goodcolorList_img : ''" :src="goodcolorList.goodscolorPicture">
                  <!--版本-->
                  <span v-for="(sbv,indexv) in goodlist.versionsList" v-if="indexv==0">
                    <div class="goodcolorList_versions" :style="liindexver == goodcolorList.goodscolorId ? goodcolorList_ver : goodcolorList_versb">
                      <label>建议零售价:￥<span style="color: #D10D0D">{{sbv.versionsPrice}}</span>起*</label>
                    </div>
                  </span>
                  <label class="goodcolorList_label" :style="liindexlabel == goodlist.goodsId ? goodcolorList_label : goodcolorList_labelsb">{{goodcolorList.goodscolorName}}</label>
                </div>
              </li>
            </ul>

          </div>
          </transition-group>
          <!--搜索为空的时候-->
          <transition name="queryGoodslistNone">
            <div id="queryGoodslistNone" v-show="queryGoodslistNone" style="text-align: center">
              <p style="color: indianred">“星空之所以美丽，是因为不管黑暗如何蔓延，</p>
              <p style="color: indianred">都会有星星的光芒去把它照亮,</p>
              <p style="color: indianred">找到和自己一样的星星，把通往自由的路照亮吧！”</p>
              <p>空</p>
            </div>
          </transition>

        </div>

        <!--展开全部-->
        <div id="openall">
          <button @click="allshow">Catch ME</button>
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
  import { f_getGoodsListToType } from '../../api/goods'
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
          li4:"",
          li1sb:"",
          li2sb:'',
          li3sb:"",
          li4sb:"",
          li1sb:'',

          changipone:false,
          i :0,
          isb :0,

          liindex:-1,

          /*-----------------------------手机信息---*/
          goodslist:{},
          sstt: [
            "content_right_ul_li1",
            "content_right_ul_li2",
            "content_right_ul_li3",
            "content_right_ul_li4",
          ],
          goodcolorList_label:"",
          goodcolorList_labelsb:"",
          goodcolorList_img:"",
          liindeximg:-1,
          /*点击展开后鼠标悬浮图片才有动画*/
          changimg:false,
          liindexlabel:-1
          /*版本的动画*/,
          liindexver:-1,
          goodcolorList_ver:"",
          goodcolorList_versb:"",

          /*搜索为空的时候*/
          queryGoodslist:true,
          queryGoodslistNone:false,

          /*发送到后台的查询条件*/
          querylistsb:{laterNumcameras:"",tab:"",cell:"",cpunum:"",screen:"",startslider:"",endslider:""},
          //装物品id的集合,发送给前台的数据数量是由物品id数量决定的(endGoodsid),相当于分页的分页数量
          endGoodsid:2,
          /*解决滚动条到达懒加载会一直请求数据的bug*/
          isendGoodsid:false,
          /*滑块的值*/
          slidervalue:[0, 10],
          /*右边的搜索结果提示*/
          isgoquery:false,
          /*显示手机的内容高度,懒加载用的*/
          content:'',
        }
      },

      created() {
        this.$store.commit('changNav');
        this.getData();
      },

      methods:{
        getData(){
          let formDatas = new FormData();
          formDatas.append("obj", JSON.stringify(this.querylistsb));
          formDatas.append("endGoodsid", this.endGoodsid);
          console.log(JSON.stringify(this.querylistsb))
          f_getGoodsListToType(formDatas).then(res => {
            this.goodslist = res.goodsList;

            //如果数据为的时候，则出现提示
            if (this.goodslist==""){
              this.queryGoodslist = false;
              this.queryGoodslistNone =true;
              this.disabledandStart(1);
              this.isgoquery=false;
            }else {
              this.queryGoodslist = true;
              this.queryGoodslistNone =false;
              this.disabledandStart(2);

              if (this.isgoquery==true){
                this.$notify({
                  title: "共"+this.goodslist.length+"款机型",
                  dangerouslyUseHTMLString: true,
                  message:"自 2019 年 4 月 1 日起增值税税率进行调整。因此所列的厂商建议零售价将可能进行调整。请您与相对授权经销商咨询具体的价格信息。",
                });
              }

            }
            console.log(res.goodsList)
          })
        },
        /*点击图片进入商品信息*/
        goGoodsInfo(id){
          /*跳转页面并传值*/
          this.$router.push({path: '/ShopInfo',query:{ id:id}});
          this.$router.go(0);
        },
        /*通用禁用和启用查询按钮的方法*/
        disabledandStart(q){
          if (q==1){
            this.disabledsb = true;
            this.disabledsb2 = true;
            this.disabledsb3 = true;
            this.disabledsb4 = true;
            this.disabledsb5 = true;
            this.classsb = 'addclassb';
            this.classsb2 = 'addclassb';
            this.classsb3 = 'addclassb';
            this.classsb4 = 'addclassb';
            this.classsb5 = 'addclassb';
          } else{
            this.disabledsb = false;
            this.disabledsb2 = false;
            this.disabledsb3 = false;
            this.disabledsb4 = false;
            this.disabledsb5 = false;
            if (this.querylistsb.laterNumcameras!=''){
              this.disabledsb = true;
              this.classsb = 'addclassb';
              return;
            }
            if (this.querylistsb.tab!=''){
              this.disabledsb2 = true;
              this.classsb2 = 'addclassb';
              return;
            }
            if (this.querylistsb.cell!=''){
              this.disabledsb3 = true;
              this.classsb3 = 'addclassb';
              return;
            }
            if (this.querylistsb.cpunum!=''){
              this.disabledsb4 = true;
              this.classsb4 = 'addclassb';
              return;
            }
            if (this.querylistsb.screen!=''){
              this.disabledsb5 = true;
              this.classsb5 = 'addclassb';
              return;
            }
            this.classsb = 'otherclass';
            this.classsb2 = 'otherclass';
            this.classsb3 = 'otherclass';
            this.classsb4 = 'otherclass';
            this.classsb5 = 'otherclass';
          }
        },
        changeslider(){
          this.isgoquery=true;
          this.querylistsb.startslider = this.slidervalue[0]+"000";
          this.querylistsb.endslider = this.slidervalue[1]+"000";
          this.getData();
        },
        hide_img(id){
          if (this.changimg==true){
            this.liindexver = id;
            this.goodcolorList_ver="opacity:1;top:-25px;z-index:-1;opacity:0";
            this.liindeximg = id;
            this.goodcolorList_img="top:0px";
          }
        },
        /*鼠标悬浮图片*/
        show_img(id){
          if (this.changimg==true){
            this.liindexver = id;
            this.goodcolorList_ver="opacity:1;top:-15px;z-index:1;opacity:1";
            this.liindeximg = id;
            this.goodcolorList_img="top:-20px";
          }

        },
        /*展开全部*/
        allshow(){
          if (this.isb==0){
            this.goodcolorList_label="opacity:1;top:-10px";
            this.goodcolorList_labelsb="opacity:1;top:-10px";
            this.li1 = "left: -70px;";
            this.li2 = "left: -40px;";
            this.li3 = "left: -20px;";
            this.li4 = "left: 10px;";
            this.li1sb = "left: -70px;";
            this.li2sb = "left: -40px;";
            this.li3sb = "left: -20px;";
            this.li4sb = "left: 10px;";
            this.changipone=true;
            this.changimg=true;
            this.isb++;
          } else {
            this.goodcolorList_label="opacity:0;top:-30px";
            this.goodcolorList_labelsb="opacity:0;top:-30px";
            this.li1 = "left: 0px;";
            this.li2 = "left: -200px;";
            this.li3 = "left: -400px;";
            this.li4 = "left: -600px;";
            this.li1sb = "left: 0px;";
            this.li2sb = "left: -200px;";
            this.li3sb = "left: -400px;";
            this.li4sb = "left: -600px;";
            this.changipone=false;
            this.changimg=false;
            this.isb--;
          }

        },
        /*点击标题展开手机*/
        showsb(index,id){
          this.liindexlabel = id;
          this.liindex = index;
          if (this.i==0){
            this.goodcolorList_label="opacity:1;top:-10px";
            this.li1 = "left: -70px;";
            this.li2 = "left: -40px;";
            this.li3 = "left: -20px;";
            this.li4 = "left: 10px;";
            this.changipone=true;
            this.changimg=true;
            this.i++;
          } else {
            this.goodcolorList_label="opacity:0;top:-30px";
              this.li1 = "left: 0px;";
            this.li2 = "left: -200px;";
            this.li3 = "left: -400px;";
            this.li4 = "left: -600px;";
            this.changipone=false;
            this.changimg=false;
            this.i--;
          }

        },
        hideipone(index){
          if (this.changipone==false){
            this.liindex = index;
            this.li1 = "left: 0px;";
            this.li3 = "left: -400px;";
            this.li4 = "left: -600px;";
          }

        },
        showipone(index){
          if (this.changipone==false){
            this.liindex = index;
            this.li1 = "left: -60px;";
            this.li3 = "left: -340px;";
            this.li4 = "left: -480px;";
          }

        },
        /*----------------------------------------------上面鼠标悬浮手机的动画---*/
        delquery(title,index,name){
          this.isgoquery=false;
          // 根据下标删除
          this.querylist.splice(index,1);
          if (title=='拍照像素'){
            this.activesb = -1;
            this.classsb = 'otherclass';
            this.disabledsb = false;
            this.classi=-1;

            this.querylistsb.laterNumcameras = "";
          }else if (title=='运行内存'){
            this.activesb2 = -1;
            this.classsb2 = 'otherclass';
            this.disabledsb2 = false;
            this.classi2=-1;

            this.querylistsb.tab  = "";
          }else if (title=='电池续航'){
            this.activesb3 = -1;
            this.classsb3 = 'otherclass';
            this.disabledsb3 = false;
            this.classi3=-1;

            this.querylistsb.cell = "";
          }else if (title=='CPU主频'){
            this.activesb4 = -1;
            this.classsb4 = 'otherclass';
            this.disabledsb4 = false;
            this.classi4=-1;

            this.querylistsb.cpunum = "";
          }else if (title=='屏幕'){
            this.activesb5 = -1;
            this.classsb5 = 'otherclass';
            this.disabledsb5 = false;
            this.classi5=-1;

            this.querylistsb.screen = "";
          }
          this.getData();
        },
        /*点击查询条件。固定的头部显示条件*/
        goquery(title,name,index2){
          this.isgoquery=true;
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

            this.querylistsb.laterNumcameras = name;
          }else if (title=='运行内存') {
            //将点击的元素的索引赋值给变量
            this.activesb2 = index2;
            this.classsb2 = 'addclassb';
            this.disabledsb2 = true;
            this.classi2=index2;

            this.querylistsb.tab = name;
          }else if (title=='电池续航') {
            //将点击的元素的索引赋值给变量
            this.activesb3 = index2;
            this.classsb3 = 'addclassb';
            this.disabledsb3 = true;
            this.classi3=index2;

            this.querylistsb.cell = name;
          }else if (title=='CPU主频') {
            //将点击的元素的索引赋值给变量
            this.activesb4 = index2;
            this.classsb4 = 'addclassb';
            this.disabledsb4 = true;
            this.classi4=index2;

            this.querylistsb.cpunum = name;
          }else if (title=='屏幕') {
            //将点击的元素的索引赋值给变量
            this.activesb5 = index2;
            this.classsb5 = 'addclassb';
            this.disabledsb5 = true;
            this.classi5=index2;

            this.querylistsb.screen = name;
          }
          this.getData();


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
         /* console.log(scrollTop)*/
          if (scrollTop>=80){
            this.goodsnav = "position: fixed;top:0px";
          }else {
            this.goodsnav = "position: relative";
          }

          if (scrollTop>=470){
            if (this.isendGoodsid==false){
              this.endGoodsid = 3;
              this.getData();
              this.isendGoodsid=true;
            }
          } else{
           /* this.endGoodsid = 2;
            this.getData();*/
          }

          /*正式用的高度*/
          /*if (scrollTop>=850){
            this.endGoodsid = 3;
            this.getData();
            /!*this.content = 'height:2400px';*!/
          } else{

          }*/
        },
      },
      /*监听滚动条*/
      mounted() {
        window.addEventListener('scroll', this.windowScroll)
      },

      computed:{
        maxCount(){
          return this.$store.state.maxOff;
        },
      },
    }


</script>

<style>
  .el-slider__button-wrapper{
    z-index: 0;
  }
</style>
<style scoped>

#queryGoodslistNone{

  display: block;
  font: normal 700 30px/12px "SimSun", serif;
  transform: scale(1, 1.2);
  transition: all 0.3s ease;
  cursor: default;
}
#queryGoodslistNone p{
  position: relative;
  top: 50px;
  margin-top: 50px;
}
/*-------------------------------------------搜索为空的样子--*/
  .goodcolorList_versions{
    transition: all 0.5s ease;
    position: relative;
    top: -25px;
    z-index: -1;
    opacity: 0;
  }
  /*--------------------------------------价钱动画---*/
.goodcolorList_img{
  position: relative;
  transition: all 0.5s ease;
  top: 1px;
}
.goodcolorList_label{
  transition: all 1.1s ease;
  position: relative;
  top: -30px;
  opacity: 0;
}
  /*------------------颜色--------------*/
  #openall{
    position: fixed;
    width: 20px;
    height: 30px;
    top: 380px;
    right:20px;
    padding-left: 10px;
    padding-right: 30px;

  }
#openall button{
  width: 50px;
  height: 140px;
  background: #2A4B6D;
  box-shadow:0px 4px 10px #888888;
  color: white;
}
  .content_right_ul_li4{
    position: relative;
    left: -600px;
    transition: all 0.4s ease;
  }
  .content_right_ul_li3{
    position: relative;
    left: -400px;
    transition: all 0.4s ease;
  }
  .content_right_ul_li2{
    position: relative;
    left: -200px;
    transition: all 0.4s ease;
  }
  .content_right_ul_li1{
    position: relative;
    left: -1px;
    transition: all 0.4s ease;
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
    text-align: center;
    margin-top: 10px;
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
    width: 360px;
    height: 50px;
  }
  .content_right_div>label:hover{
    color:  #D10D0D;
  }
  .content_right_div{
    width: 90%;
    height: 350px;
    margin-left: 61px;
    margin-top: 10px;
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
  height:1800px;
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
    height:1600px;
    border-right: 1px #E3E4E4 solid;

  }

  .content_left{
    width: 240px;
    height:1800px;
  /*  background: whitesmoke;*/
    position: relative;
    top: 80px;
    float: left;
  }

  #content{

    width: 1220px;
    height:1800px;
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
    margin-top: -30px;
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

  .queryGoodslist-enter-active {
    animation: fadeIn 0.8s;
  }
  .queryGoodslist-leave-active {
    animation: fadeIn 0.8s reverse;
  }

  .queryGoodslistNone-enter-active {
    animation: fadeIn 4s;
  }

</style>
