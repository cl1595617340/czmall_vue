<template>
    <div class="main">
      <!--第3个内容,专区,要循环的-->
      <div class="home_div_div03">
        <div class="home_div_div03_title">
          <p>商品
            <i class="el-icon-arrow-right"></i>{{typename}}
            <span v-if="typename2!=undefined"><i class="el-icon-arrow-right"></i>{{typename2}}</span>
          </p>
        </div>
        <div class="home_div_div03_content" v-if="goodsList.length!=0">
          <ul>
            <li class="hoverli" @click="gogoodsinfo(site.goodsId)" v-for="(site,index) in goodsList">
              <a>
                <img :src="site3.goodscolorPicture" v-for="(site3,index3) in site.goodscolorList" v-if="index3==0">
              </a>
              <div class="home_div_div03_content_div">
                <p style="font-size: 16px">{{site.goodsName}}</p>
                <p class="sbpsb" style="font-size: 12px;color: #626262">{{site.goodsDescribe}}</p>
              </div>
              <div  class="home_div_div03_content_div" v-for="(site3,index3) in site.versionsList" v-if="index3==0">
                <p style="color: #f51919;margin-top: 30px;">￥{{site3.versionsPrice}}.00</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="home_div_div03_content_none" v-if="goodsList.length==0">
          <p>空空乳液</p>
          <p>到别处看看吧...</p>
        </div>
      </div>

    </div>
</template>

<script>
  import { f_typeGoods } from '../../api/goods';
  import { goAlipay } from '../../api/goods';
  export default {
    data () {
      return {
        typeid:-1,
        typename:"",
        typename2:"",
        //数据
        goodsList:[],
        type:-1,

      }
    },
    created(){
      $('html,body').animate({scrollTop: 0}, 10);
    },
    methods:{
      getData(){
        let formDatas = new FormData();
        formDatas.append("id", this.typeid);
        formDatas.append("type", this.type);
        f_typeGoods(formDatas).then(res => {
          this.goodsList = res.goodsList;
          console.log(res.goodsList)
        })
      },

      /*点击图片进入商品详情*/
      gogoodsinfo(id){
        /*跳转页面并传值*/
        this.$router.push({path: '/ShopInfo',query:{ id:id}});
        this.$router.go(0);
      },
    },
    mounted() {
      window.addEventListener('scroll', this.windowScroll);
      this.$store.commit('changheaderStyle',1);
      this.$store.commit('changfooterStyle',1);
      this.$store.commit('changNav');
      let id = this.$route.query.id;
      this.typeid = id;
      let name = this.$route.query.name;
      this.typename = name;
      let name2 = this.$route.query.name2;
      this.typename2 = name2;
      if (this.typename2==undefined){
        this.type = 0;
      } else {
        this.type = 1;
      }
      this.getData();
      $('html,body').animate({scrollTop: 0}, 10);
    },
  }
</script>

<style scoped>
  .home_div_div03_content_none p{
    font-size: 23px;
    position: relative;
    top: 150px;
    font-family: OPPOfont5;
  }
  .home_div_div03_content_none{
    width: 91%;
    height: 500px;
    background: white;
    margin: 0 auto;
    text-align: center;
    position: relative;
    top: 20px;
  }
  /*-----------------------空--*/
  .sbpsb{
    font-size: 12px;
    color: rgb(98, 98, 98);
    width: 80%;
    margin: 0 auto;
    line-height: 15px !important;
  }
  .sbli_img{
    width: 610px !important;
    height:380px !important;
  }

  /* position: relative;
   top: -74px;*/
  /*-专区大图*/
  .home_div_div03_content_div p{
    line-height: 30px;
  }
  .home_div_div03_content_div{
    text-align: center;
    width: 100%;
    height: 50px;
    color: black;
    font-family: OPPOfont1;
    position: relative;
    top: 30px;
  }
  .home_div_div03_content img{
    width: 172px;
    height: 172px;
    margin: 0 auto;
    margin-top: 43px;
  }
  .home_div_div03_content li{
    position: relative;
    display: inline-block;
    margin-bottom: 10px;
    text-align: center;
    background-color: #fff;
    width: 300px;
    height: 380px;
    margin-left: 5px;
    margin-top: 5px;
  }

  .home_div_div03_content ul{
    margin-top: 20px;
    margin-left: 60px;
  }
  .home_div_div03_content{
    width: 100%;
    min-height: 70px;
  }
  /*--专区内容-*/
  .home_div_div03_title p{
    color: #333;
    font-size: 14px;
    font-family: OPPOfont1;
    text-align: left;
    margin-left: 65px;
  }
  .home_div_div03_title{
    text-align: center;

  }
  .home_div_div03{
    width: 100%;
    min-height: 100px;
    margin: 0 auto;
    padding-top: 30px;
   /* margin-top: 50px;*/
  }
  .hoverli:hover{
    box-shadow: #ccc 0px 10px 10px;
    top: -3px;
  }
  .hoverli{
    cursor: pointer;
    position: relative;
    transition: all 0.4s;
    top: 1px;
  }
  /*通用的鼠标悬浮*/
  .home_div_div02 img{
    width: 300px;
    height: auto;

  }
  .home_div_div02 ul{
    margin-top: 15px;
    margin-left: 55px;
  }
  .home_div_div02 li{
    float: left;
    margin-left: 10px;
    transition: all 0.4s;
  }
  .main{
    width: 100%;
    min-height: 200px;
    background: #F4F4F4;
    padding-bottom: 80px;
  }


</style>
