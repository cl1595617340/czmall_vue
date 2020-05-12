<template>
  <div class="footer">
    <div class="container">
      <div class="siteinfo">
        <ul class="c0">
          <h3 class="c1">订单服务</h3>
          <ul>
            <li class="c2"><a class="c3">购买指南</a></li>
            <li class="c2"><a class="c3" @click="open4">支付方式</a></li>
            <li class="c2"><a class="c3" @click="open5">送货政策</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">服务支持</h3>
          <ul>
            <li class="c2"><a class="c3" @click="open6">官方开源</a></li>
            <li class="c2"><a class="c3" @click="open7">项目前端</a></li>
            <li class="c2"><a class="c3" @click="open8">项目后端</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">自助服务</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" @click="open9">个人博客</a></li>
            <li class="c2"><a class="c3" target="_blank" @click="open10">个人简介</a></li>
            <li class="c2"><a class="c3" target="_blank" @click="open11">个人视频</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">其他项目</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" >待开发...</a></li>
            <li class="c2"><a class="c3" target="_blank" >待开发...</a></li>
            <li class="c2"><a class="c3" target="_blank" >待开发...</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">参考的样式网站</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" href="https://www.apple.com.cn/?afid=p238%7C2LYlmDRr_mtid_18707vxu38484&cid=aos-cn-kwba-brand-bz">Apple  (中国)</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://www.opposhop.cn/products/487.html">OPPO</a></li>
            <li class="c2"><a class="c3" target="_blank" href="https://shop.vivo.com.cn/">VIVO</a></li>
          </ul>
        </ul>
        <ul class="c0">
          <h3 class="c1">需要帮助?</h3>
          <ul>
            <li class="c2"><a class="c3" target="_blank" @click="open14">帮助</a></li>
          </ul>
        </ul>

        <ul class="c4">
          <li class="tel"><a class="c5" target="_blank">A17607100469</a></li>
          <li class="time">需要帮助请微信联系</li>
          <li class="online">
          </li>
        </ul>
      </div>

      <div class="copyright">
        <h4 class="content-c2">Copyright ©2017, exrick.cn Co., Ltd. All Rights Reserved</h4>
        <ul class="privacy">
          <li class="content-c1"><a class="content-c0" @click="open1">法律声明</a></li>
          <li class="content-c1"><a class="content-c0" @click="open2">隐私条款</a></li>
          <li class="content-c1"><a class="content-c0" target="_blank" href="https://github.com/Exrick">开发者中心</a></li>
        </ul>
      </div>
      <div class="cop">
        <a class="content-c3" href="http://www.miibeian.gov.cn/" target="_blank">
          <span class="content-c3">蜀ICP备16030308号-1</span>
          <span class="content-c3">蜀ICP证16030308号</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      open1 () {
        this.$notify.info({
          title: '法律声明',
          message: '此仅为个人项目，仅供学习参考，承担不起任何法律问题'
        })
      },
      open2 () {
        this.$notify.info({
          title: '隐私条款',
          message: '本网站将不会严格遵守有关法律法规和本隐私政策所载明的内容收集、使用您的信息'
        })
      },
      open3 () {
        this.$notify({
          title: '离线帮助',
          message: '没人会帮助你，请自己靠自己',
          type: 'warning'
        })
      },
      open4 () {
        this.$notify.info({
          title: '支付方式',
          message: '承蒙厚爱'
        })
      },
      open5 () {
        this.$notify({
          title: '送货政策',
          message: '我拿什么送你',
          type: 'warning'
        })
      },
      open6 () {
        this.$notify({
          title: '官方开源',
          message: '暂不考虑开源呢',
          type: 'warning'
        })
      },
      open7 () {
        this.$notify({
          title: '项目前端',
          message: '暂不考虑开源呢',
          type: 'warning'
        })
      },
      open8 () {
        this.$notify({
          title: '项目后端',
          message: '暂不考虑开源呢',
          type: 'warning'
        })
      },
      open9 () {
        this.$notify({
          title: '个人博客',
          message: '0.0',
          type: 'warning'
        })
      },
      open10 () {
        this.$notify({
          title: '个人简介',
          message: '一个低调的祖安人',
          type: 'warning'
        })
      },
      open11 () {
        this.$notify({
          title: '个人视频',
          message: '频视人个',
          type: 'warning'
        })
      },

      open14 () {
        this.$notify({
          title: '帮助',
          message: '没人会帮助你，请自己靠自己',
          type: 'warning'
        })
      },

    },
    components: {
    }
  }
</script>
<style scoped>
  .footer {
    padding: 50px 0 20px;
    border-top: 1px solid #e6e6e6;
    background: white;
    /*margin-top: 50px;*/
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: OPPOfont1;
  }

  .container {
    width: 1220px;
  }

  .siteinfo {
    height: 100px;
    padding: 50px 0 130px;
    border-bottom: 1px solid #e6e6e6;
    position: relative;
  }

  .c0 {
    width: 149px;
    line-height: 1;
    float: left;
  }

  .c1 {
    color: #646464;
    font-size: 12px;
    padding: 0 0 14px;
  }

  .c2 {
    color: #c3c3c3;
    font-size: 12px;
    padding: 6px 0;
  }

  .c3 {
    color: #969696;
  }

  .c4 {
    position: absolute;
    right: 0;
    overflow: hidden;
    line-height: 34px;
  }

  .tel {
    font-size: 30px;
    line-height: 1;
    color: #646464;
    top: -2px;
    position: relative;
  }

  .c5 {
    color: #646464;
    right: -20px;
    position: relative;
  }

  .time {
    margin-top: 5px;
    right: 0px;
    position: relative;
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .online {
    clear: both;
    width: 241px;
    font-size: 12px;
    line-height: 18px;
    color: #c3c3c3;
    text-align: right;
  }

  .button {
    width: 130px;
    height: 34px;
    font-size: 14px;
    color: #5079d9;
    border: 1px solid #dcdcdc;
    margin-top: 8px;
  }

  .copyright {
    color: #434d55;
    font-size: 12px;
    padding: 40px 0 0;
    display: flex;

  }

  .privacy {
    float: left;
    margin: 0 0 0 12px;
  }

  .content-c0 {
    color: #5079d9;
    cursor: pointer;

  }

  .content-c1 {
    float: left;
    line-height: 12px;
    padding: 1px 10px 0;
    border-left: 1px solid #ccc;
  }

  .content-c2 {
    float: left;
    height: 15px;
    line-height: 15px;
    color: #757575;
  }

  .cop {
    clear: both;
    padding: 10px 0 0;
    height: 15px;
  }

  .content-c3 {
    margin-right: 20px;
    color: #bdbdbd;
    font-size: 12px;
    height: 12px;
    line-height: 1;
  }
</style>
