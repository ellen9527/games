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
    }
  },
  computed: {
    emptyIndex() {
      return this.cards.findIndex(item => item === '')
    },
  },
  created() {
    this.initSuffle()
  },
  methods: {
    initSuffle() {
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
      },[])
      console.warn('map:', this.map)

      this._shffle()
    },
    handleClick(location) {
      if (this._checkChange(location)) {
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
    _getTarget(init, old) {
      const legal = this.map[init].filter(el => el !== old)
      return legal[Math.floor(Math.random() * legal.length)]
    },
    _move(location, target) {
      this.cards.splice(target, 1, this._getCard(location))
      this.cards.splice(location, 1, '')
    },
    _shffle() {
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
      console.warn('target:', target)

      target.forEach((e, index) => {
        setTimeout(() => {
          this._move(e, this.emptyIndex)
          
        }, 100 * index);
      })
    },
  },
}
</script>

<template>
  <div class="jiugongge">
    <timer />
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
