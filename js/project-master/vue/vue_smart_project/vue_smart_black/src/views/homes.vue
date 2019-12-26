<template>
  <!--<div id="home_div">
    <Carousel v-model="value1" radius-dot="true" utoplay  loop class="home_carousel">
      <CarouselItem>
        <div class="demo-carousel"><img src="../assets/img/test/1.jpg" ></div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel"><img src="../assets/img/test/2.jpg" ></div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel"><img src="../assets/img/test/3.jpg" ></div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel"><img src="../assets/img/test/4.jpg" ></div>
      </CarouselItem>
    </Carousel>
  </div>-->
  <div id="home_div">
    <div class="block">
      <el-carousel trigger="click" height="615px" >
        <el-carousel-item>
          <div class="demo-carousel"><img src="../assets/img/test/1.jpg" ></div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="demo-carousel"><img src="../assets/img/test/2.jpg" ></div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="demo-carousel"><img src="../assets/img/test/3.jpg" ></div>
        </el-carousel-item>

        <el-carousel-item>
          <div class="demo-carousel"><img src="../assets/img/test/4.jpg" ></div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>


</template>
<script>
  export default {
    data () {
      return {
      }
    },

    methods:{

    },

  }
</script>


<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
#home_div{
  width: 100%;
  height: 665px;
  background: black;
  cursor: pointer;
}
  .home_carousel{
    width: 100%;
    height: 665px;
  }
  .demo-carousel{
    background: black;
  }
.demo-carousel img{
  height: 665px;
  width: auto;
  margin: 0 auto;
}
</style>
