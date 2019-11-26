<template>
  <div id="home_div">
    <Carousel v-model="value1"  autoplay autoplay-speed=4000 loop class="home_carousel">
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
  </div>
</template>
<script>
  export default {
    data () {
      return {
        value1: 0
      }
    }
  }
</script>


<style scoped>
#home_div{
  width: 100%;
  height: 615px;
  background: black;
  cursor: pointer;
}
  .home_carousel{
    width: 100%;
    height: 615px;
  }
.demo-carousel img{
  height: 615px;
  width: auto;
  margin: 0 auto;
}
</style>
