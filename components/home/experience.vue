<script>
import { homeMixin } from '~/mixins/home'

const EXPERIENCE = [
  {
    year: '2009',
    title: '研究所 畢業',
    content: [
      {
        name: '論文系統開發',
        role: '全端',
        group: false,
        technology: ['Flash', 'ActionScript', 'PHP', 'MySQL'],
      },
    ],
  },
  {
    year: '2010.09',
    title: '中大網學所',
    content: [
      {
        name: '字詞句學習系統-打字遊戲',
        role: '全端',
        group: false,
        technology: ['Flash', 'ActionScript3.0', 'PHP', 'MySQL'],
      },
      {
        name: '捨棄Flash系統重構',
        role: '全端',
        group: false,
        technology: ['HTML5+CSS3', 'jQuery', 'Canvas'],
      },
      {
        name: '主題寫作系統',
        role: '全端',
        group: true,
        technology: ['PHP', 'MySQL', 'jQuery'],
      },
      {
        name: '教材編輯與分享',
        role: '全端',
        group: false,
        technology: ['PHP', 'MySQL', 'jQuery'],
      },
      {
        name: '學生學習歷程',
        role: '全端',
        group: true,
        technology: ['PHP', 'MySQL', 'jQuery', 'Bootstrap3'],
      },
    ],
  },
  {
    year: '2018.09',
    title: '迎廣科技',
    content: [
      {
        name: '公司電商網站',
        role: '後端',
        group: true,
        technology: ['PHP Lavaral', 'MySQL'],
      },
      {
        name: '公司形象官網',
        role: '前端',
        group: true,
        technology: ['jQuery', 'Bootstrap4'],
      },
    ],
  },
  {
    year: '2020.02',
    title: '順鴻科技',
    content: [
      {
        name: 'H5/PC包網',
        role: '前端',
        group: true,
        technology: ['Vue2', 'TypeScript'],
      },
      {
        name: 'PC活動網站',
        role: '前端',
        group: true,
        technology: ['Vue2', 'TypeScript'],
      },
      {
        name: 'H5體育網站',
        role: '前端',
        group: true,
        technology: ['Vue2+Nuxt', 'Vuetify'],
      },
    ],
  },
]
const GAP = 100 // 緩衝

export default {
  name: 'Experience',
  data() {
    return {
      experience: EXPERIENCE,
      localWidth: 0, // experience範圍width
      localHeight: 0, // experience範圍height
    }
  },
  mixins: [homeMixin],
  computed: {
    isShowExperience() {
      return this.scrollY > this.innerHeight * 1.6
    },
    isHiddenEnd() {
      return this.scroll > this.innerHeight * 6 - this.innerWidth
    },
    scroll() {
      const localScroll = this.scrollY - (this.innerHeight * 2 + GAP) // 100緩衝
      return localScroll < 0 ? 0 : localScroll
    },
    prograssStyle() {
      const prograss = -(this.scroll / this.localHeight * 100) + '%'
      return `transform: translateX(${prograss})`
    },
    endStyle() {
      const baseStart = this.innerHeight * 6 - this.innerWidth * 1.6 - GAP
      const baseEnd = this.innerHeight * 6 - this.innerWidth
      let end = Math.floor(this.innerWidth / 2)
      if (this.scroll > baseStart && this.scroll < baseEnd) {
        end = Math.floor(this.innerWidth / 2) + (this.scroll - baseStart)
      }
      return `transform: translateX(${end}px)`
    },
  },
  mounted() {
    this.localWidth = this.$refs.expBox.clientWidth
    this.localHeight = this.innerHeight * 6 // 設定為600vh
  },
}
</script>

<template>
  <div class="experience">
    <div ref="expBox" class="wrap d-flex align-center justify-center" :class="{ 'visible': isShowExperience }" :style="prograssStyle">
      <h1 :style="{ width: innerWidth + 'px'}">學經歷</h1>
      <div v-for="(exp, index) in experience" :key="index" class="wrap__item">
        <h3 class="d-flex align-center">
          <div>{{ exp.year }}</div>
          <div>{{ exp.title }}</div>
        </h3>
        <div class="mt-2 d-flex">
          <div v-for="(sys, index) in exp.content" :key="index" class="sys ml-10">
            <div class="sys__title px-2 py-1">{{ sys.name }}</div>
            <div class="sys__group d-flex align-center mt-2 ml-3">
              <div class="px-2 py-1">{{ sys.role }}</div>
              <div class="px-2 py-1">{{ sys.group ? '團隊' : '個人' }}</div>
            </div>
            <div class="tech d-flex mt-2 ml-6">
              <div v-for="(tech, index) in sys.technology" :key="index" class="px-2 py-1">{{ tech }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap__end">
        <h1 :style="endStyle">感謝觀看</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.experience {
  width: 100%;
  height: 600vh;
  background-color: #111;

  .wrap {
    position: fixed;
    top: 0;
    left: 0;
    // width: 100%;
    height: 100vh;
    opacity: 0;
    transition: opacity 500ms;

    &.visible {
      opacity: 1;
    }
    
    h1 {
      color: #ccc;
      text-align: center;
    }

    &__item {
      margin-left: 200px;
    }

    h3 {
      & > div {
        padding: 4px 10px;
        color: #fff;
        background-color: purple;    

        &:first-child {
          color: purple;
          background-color: #fff;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }

        &:nth-child(2) {
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
    }

    .sys {
      &__title {
        color: #fff;
        background-color: purple;
        border-radius: 8px;
      }

      &__group {
        & > div {
          color: #fff;
          background-color: purple;

          &:first-child {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }

          &:nth-child(2) {
            color: purple;
            background-color: #fff;
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }
      }
    }

    .tech {
      div {
        color: #fff;
        background-color: purple;
        border-radius: 8px;
        white-space: nowrap;
      }

      div + div {
        margin-left: 6px;
      }
    }

    &__end {
      width: 200vh;

      h1 {
        position: fixed;
      }
    }
  }
}
</style>
