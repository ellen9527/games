<script>
export default {
  name: 'ParallaxSimpleDemo',
  data() {
    return {
      positionX: '50%',
      positionY1: 30,
      positionY2: 100,
      positionY3: 150,
      Y1: 0,
      Y2: 0,
      Y3: 0,
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
    window.onload = () => {
        const pic1 = document.getElementById("pic1");
        const pic2 = document.getElementById("pic2");
        const pic3 = document.getElementById("pic3");
        this.positionY1 = this.Y1 = pic1.offsetTop * this.ratio;
        this.positionY2 = this.Y2 = pic2.offsetTop * this.ratio;
        this.positionY3 = this.Y3 = pic3.offsetTop * this.ratio;
        };
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY ||document.documentElement.scrollTop ||document.body.scrollTop
      console.log(scrollTop) //頁面滾動距離

      this.positionY1 = this.Y1 - scrollTop * this.ratio;
      this.positionY2 = this.Y2 - scrollTop * this.ratio;
      this.positionY3 = this.Y3 - scrollTop * this.ratio;

      if (scrollTop > 900) {
          this.titlePositon = "fixed";
          this.titleColor = "#fff";
          this.titleBorder = "1px solid #e5e5e5";
      } else {
          this.titlePositon = "static";
          this.titleColor = "transparent";
          this.titleBorder = "0";
      }  
    },
  },
}
</script>

<template>
  <div class="parallax-simple-demo fill-height">
    <div class="content-item">內容1</div>
    <div class="activebg fisrtbg" id="pic1" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY1+'px' }"></div>
    <div class="content-item">內容2</div>
    <div class="activebg secondbg" id="pic2" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY2+'px' }"></div>
    <div class="content-item">內容3</div>
    <div class="activebg thirdbg" id="pic3" v-bind:style="{'background-position-x':positionX,'background-position-y': positionY3+'px' }"></div>
    <div class="content-item">內容4</div>
    <div class="foot">foot</div>
  </div>
</template>

<style lang="scss">
.parallax-simple-demo {
  .content-item {
    background-color: #fff;
    width: 100%;
    line-height: 400px;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }

  .activebg {
    position: relative;
    width: 100%;
    height: 600px;
    background: #fff;
    background-attachment: fixed;
    background-position: center 0;
    background-repeat: no-repeat;
  }

  .fisrtbg {
      background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/fisrtbg.jpg);
  }

  .secondbg {
      background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/update/avd.jpg);
  }

  .thirdbg {
      background-image: url(https://sqimg.qq.com/qq_product_operations/im/2015/blog.jpg);
  }

  .foot {
      background-color: black;
      line-height: 500px;
      color: #fff;
      text-align: center;
      width: 100%;
      font-size: 30px;
      font-weight: bold;
  }
}
</style>./parallaxSimpleDemo.vue