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
      const space = Array(pow)
        .fill(0)
        .map((e, i) => i)
        .filter(e => e !== 0)
      this.cards = Array(pow - 1)
        .fill(0)
        .map(() => {
          const rom = Math.floor(Math.random() * space.length)
          const num = space[rom]
          space.splice(rom, 1)
          return num
        })
      this.cards.push('')
      console.warn('cards:', this.cards)
    },
    handleClick(location) {
      if (this._checkChange(location)) {
        this.cards.splice(this.emptyIndex, 1, this._getCard(location))
        this.cards.splice(location, 1, '')
        console.warn('handle cards:', this.cards)
      }
      this.isTimer = !this.isTimer
    },
    _getCard(index) {
      return this.cards[index]
    },
    _checkChange(location) {
      console.warn('location:', location)
      if (location !== this.emptyIndex) {
        const [num1] = [location, this.emptyIndex].sort()
        const abs = Math.abs(location - this.emptyIndex)
        if ((abs === 1 && (num1 + 1) % this.size !== 0) || abs === this.size) {
          return true
        }
      }
      return false
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
    transition: all 0.3s ease;
  }
}
</style>
