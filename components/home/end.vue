<script>
import { homeMixin } from '~/mixins/home'

export default {
  name: 'End',
  data() {
    return {
      ends: [
        '感謝您的耐心觀看',
        '以下是我自己閒瑕之餘寫的Side Project',
        '雖然並不複雜，但可以使用自己開發的小程式令我感到更加愉悅',
      ],
      links: [
        {
          name: 'Bulls & Cows 猜數字',
          link: '/gameBNC',
          icon: 'mdi-android',
        },
        {
          name: '簡易 Todo List',
          link: '/list',
          icon: 'mdi-format-list-bulleted-square',
        },
        {
          name: 'Jiugongge九宮格',
          link: '/jiugongge',
          icon: 'mdi-heart',
        },
      ],
    }
  },
  mixins: [homeMixin],
  computed: {
    scroll() {
      const localScroll = this.scrollY - this.innerHeight * 8
      return localScroll > 0 ? localScroll : 0  
    },
    progress() {
      return `${Math.max(0, (this.innerHeight - this.scroll) / this.innerHeight * 100)}%`
    },
    isHiddenLink() {
      return this.scroll < this.innerHeight - 100
    },
  },
  methods: {
    handleClick() {
      window.open("https://github.com/ellen9527/games", "_blank")
    },
  },
}
</script>

<template>
  <div class="end">
    <!-- <div class="end__banner"></div> -->
    <div class="wrap">
      <div class="wrap__item --white">
        <div class="d-flex flex-column align-center justify-center">
          <img :src="require(`~/assets/images/github.png`)" @click="handleClick" />
          <p v-for="(txt, index) in ends" :key="index">{{ txt }}</p>
          <div :class="['wrap__item--link', 'mt-2', { '--hidden': isHiddenLink}]">
            <v-btn v-for="(project, index) in links" :key="index" :to="project.link">
              <v-icon class="mr-1">{{ project.icon }}</v-icon>
              {{ project.name }}
            </v-btn>
          </div>
        </div>
      </div>
      <div class="wrap__item" :style="{ height: progress }">
        <div class="d-flex flex-column align-center justify-center">
          <img :src="require(`~/assets/images/github-black.png`)" @click="handleClick" />
          <p v-for="(txt, index) in ends" :key="index">{{ txt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.end {
  position: relative;
  width: 100%;
  height: 200vh;
  background-color: #ccc;

  // &__banner {
  //   height: 700px;
  //   background: url('~/assets/images/cat.jpg') no-repeat;
  //   background-size: cover;
  // }

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
      color: #fff;
      overflow: hidden;
      background: #000;

      & > div {
        height: 100vh;
      }

      &.--white {
        color: #101010;
        background-color: #fff;
      }

      img {
        width: 60px;
        height: 60px;
        margin: 10px;
        cursor: pointer;
      }

      &--link {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        transition: all 500ms;

        &.--hidden {
          opacity: 0;
        }
      }
    }
  }
}
</style>
