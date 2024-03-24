<script>
import { homeMixin } from '~/mixins/home'

export default {
  name: 'Introduce',
  data() {
    return {
      introductions: [
        '歡迎來到我的自介頁面',
        '我叫Ellen，目前是一名Web前端工程師',
        '有10年的開發經驗',
      ],
    }
  },
  mixins: [homeMixin],
  computed: {
    progress() {
      return `${Math.max(0, (this.innerHeight - this.scrollY) / this.innerHeight * 100)}%`
    },
  },
}
</script>

<template>
  <div class="introduce">
    <div class="wrap">
      <div class="wrap__item --black">
        <div>
          <p v-for="(txt, index) in introductions" :key="index">{{ txt }}</p>
        </div>
      </div>
      <div class="wrap__item" :style="{ height: progress }">
        <div>
          <p v-for="(txt, index) in introductions" :key="index">{{ txt }}</p>
      </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.introduce {
  position: relative;
  width: 100%;
  height: 200vh;

  .wrap {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    &__item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #101010;
      overflow: hidden;
      background-color: #fff;

      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }

      &.--black {
        color: #fff;
        background-color: #000;
      }
    }
  }
}
</style>