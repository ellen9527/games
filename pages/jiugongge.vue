<script>
import Timer from '~/components/timer'

export default {
  name: 'JiugonggePage',
  components: {
    Timer,
  },
  data() {
    return {
      size: 3,
      cards: [],
      map: [],
      timerSwitch: false,
    }
  },
  computed: {
    emptyIndex() {
      return this.cards.findIndex(item => item === '')
    },
    lastKey() {
      return this.size * this.size - 1
    },
    isComplete() {
      const testArr = [...this.cards].slice(0, -1)
      return testArr.every((e, i) => e === i + 1)
    },
    gaming() {
      return this.timerSwitch && !this.isComplete
    },
  },
  created() {
    this.initSuffle()
  },
  watch: {
    isComplete(v) {
      if (v) {
        this.timerSwitch = false
      }
    }
  },
  methods: {
    async initSuffle() {
      const pow = this.size * this.size

      // 初始化
      this.cards = Array(pow)
        .fill(0)
        .map((e, i) => i)
        .filter(e => e !== 0)
      this.cards.push('')

      // 產生每個位置合法移動map
      this.map = this.cards.reduce((acc, e, key) => {
        let base = [key - 1, key + 1, key - this.size, key + this.size]
        if ((key + 1) % this.size === 0) {
          base.splice(1, 1)
        } else if (key % this.size === 0) {
          base.splice(0, 1)
        }

        acc[key] = base.filter(el => el >= 0 && el < this.cards.length).sort()
        return acc
      }, [])

      this._shffle() // 打亂
    },
    _timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    handleClick(location) {
      if (this._checkChange(location) && this.gaming) {
        this._move(location, this.emptyIndex)
        // console.warn('handle cards:', this.cards)
      }
      this.isTimer = !this.isTimer
    },
    _getCard(index) {
      return this.cards[index]
    },
    _checkChange(location) {
      if (location !== this.emptyIndex) {
        const [num1] = [location, this.emptyIndex].sort()
        const abs = Math.abs(location - this.emptyIndex)
        if ((abs === 1 && (num1 + 1) % this.size !== 0) || abs === this.size) {
          return true
        }
      }
      return false
    },
    async _shffle() {
      // 打亂
      let target = [this.emptyIndex]
      for (let i = 0; i < 50; i++) {
        const length = target.length
        const goal = target.slice(-1)
        const old = length > 1 ? target[length - 2] : null
        target.push(this._getTarget(goal, old))
      }

      // 結束於最後一格
      let endEmpty = target[target.length - 1]
      while (endEmpty !== this.cards.length - 1) {
        const [goal] = this.map[endEmpty].slice(-1)
        target.push(goal)
        endEmpty = goal
      }
      // console.warn('target:', target)

      target.forEach(async (e, i) => {
        await this._timeout(100 * i)
        this._move(e, this.emptyIndex)
      })

      await this._timeout(100 * target.length)
      this.timerSwitch = true // 計時開始
    },
    _getTarget(init, old) {
      const legal = this.map[init].filter(el => el !== old)
      return legal[Math.floor(Math.random() * legal.length)]
    },
    _move(location, target) {
      this.cards.splice(target, 1, this._getCard(location))
      this.cards.splice(location, 1, '')
    },
  },
}
</script>

<template>
  <div class="jiugongge">
    <timer :switch="timerSwitch" />
    <div class="d-flex justify-center">
      <transition-group name="fade" class="jiugongge-square d-flex">
        <div
          v-for="(col, i) in cards"
          :key="col"
          :class="[
            'jiugongge-square__block',
            _getCard(i) === '' ? '--empty' : '',
          ]"
          @click="handleClick(i)"
        >
          {{ col }}
        </div>
      </transition-group>
    </div>
    <div v-if="isComplete" class="text-center amber--text text--darken-4 mt-2">
      Congratulations!!
    </div>
  </div>
</template>

<style lang="scss">
.jiugongge {
  &-square {
    max-width: 300px;
    flex-wrap: wrap;

    &__block {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      color: var(--v-blue-grey-lighten5);
      background-color: var(--v-blue-grey-darken1);
      border-right: 1px solid var(--v-blue-grey-lighten5);
      border-bottom: 1px solid var(--v-blue-grey-lighten5);

      &.--empty {
        background-color: transparent;
      }
    }
  }

  .fade-move {
    transition: all 0.1s ease;
  }
}
</style>
