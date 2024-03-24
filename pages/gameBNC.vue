<script>
export default {
  name: 'GameBNCPage',
  data() {
    return {
      valid: true,
      value: '',
      rules: [
        value => !!value || '請輸入數字!!',
        value => (value || '').length === 4 || '只能輸入4位數字',
        value => {
          const pattern = /\d{4}/
          return pattern.test(value) || 'Invalid Number.'
        },
      ],
      answer: [],
      results: [],
      showAnswer: false,
      answerRight: false,
      showRule: false,
      ruleHeight: 0,
    }
  },
  created() {
    this.initAnswer()
  },
  methods: {
    init() {
      this.results = []
      this.showAnswer = false
      this.answerRight = false
    },
    initAnswer() {
      const DIGITS = 4
      const space = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      this.answer = Array(DIGITS)
        .fill(0)
        .map(() => {
          const rom = Math.floor(Math.random() * space.length)
          const num = space[rom]
          space.splice(rom, 1)
          return num
        })
    },
    answerDisplay() {
      this.showAnswer = true
    },
    restart() {
      this.initAnswer()
      this.reset()
      this.results = []
      this.showAnswer = false
    },
    handleCheckAnswer() {
      if (!this.$refs.form.validate()) {
        return
      }

      const value = this.value
      const numArray = value.split('')
      const result = numArray.reduce(
        (acc, cur, idx) => {
          const num = parseInt(cur)
          if (num === this.answer[idx]) {
            acc.a++
          } else if (this.answer.find(el => el === num)) {
            acc.b++
          }
          return acc
        },
        {
          a: 0,
          b: 0,
        },
      )
      this.results.push({
        value,
        result: `${result.a}A${result.b}B`,
      })

      // 判斷遊戲是否結束（答對）
      if (result.a === 4) {
        this.answerRight = true
      }

      this.reset()
    },
    reset() {
      this.$refs.form.reset()
    },
    handleRuleBtn() {
      this.showRule = !this.showRule
    },
  },
}
</script>

<template>
  <div class="game ma-5">
    <v-btn color="primary" block to="/">回首頁</v-btn>
    <div class="game-rule mt-4">
      <v-btn @click="handleRuleBtn">遊戲說明</v-btn>
      <div class="game-rule__text pa-4" :class="{ '--hidden': !showRule }">
        <p class="mt-4">猜數字是一個經典遊戲，電腦會預設一組4位不重複的數字做為謎底，由玩家開始猜測。每一次的猜測中，電腦會給予提示，如果「數字對，位置對」會給予「A」，如果「數字對，位置不對」會給予「B」，數量則由數字提示。</p>
        <p>例如玩家猜測「6034」，而謎底為「6703」，其中「6」數字對，位置也對，此時給予A；「0」和「3」則是數字對，但位置不對，因此給予B，所以玩家輸入「6034」，根據謎底會回應「1A2B」，讓玩家以此為線索，猜測正確數字。</p>
        <p>點擊「給我答案」，會直接顯示答案。若要再玩一次，請點「重新開始」。</p>
        <p>點擊「重新開始遊戲」，會重新設定答案，開始新的一局遊戲。</p>
        <p>點擊「我猜是…」，輸入4位數字開始猜測謎底。</p>
        <p>點擊「清除數字」，可將輸入框數字清除。</p>
      </div>
    </div>
    <div class="text-right">
      <v-btn @click="answerDisplay">給我答案</v-btn>
      <v-btn @click="restart" class="ma-2">重新開始遊戲</v-btn>
    </div>
    <v-form ref="form" v-model="valid" class="game-form d-flex align-center">
      <v-text-field v-model="value" label="Guess the numbers" :rules="rules" />
      <v-btn color="primary" :disabled="answerRight || showAnswer" @click="handleCheckAnswer">
        我猜是…
      </v-btn>
      <v-btn @click="reset">清除數字</v-btn>
    </v-form>
    <div class="game-result">
      <div
        v-for="(result, idx) in results"
        :key="idx"
        class="d-flex justify-center my-1"
      >
        <div class="game-result__order text-right">#{{ idx + 1 }}</div>
        <div
          class="game-result__number primary primary--text text--lighten-5 px-1 rounded mx-5"
        >
          {{ result.value }}
        </div>
        <div>{{ result.result }}</div>
      </div>
    </div>
    <div
      v-if="answerRight"
      class="game-result__right text-center amber--text text--darken-4"
    >
      Congratulations!! 你答對了!
    </div>
    <div v-if="showAnswer" class="game-result__answer text-center">
      答案是
      <span class="red--text text--lighten-3">{{ answer.join('') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.game {
  &-rule__text {
    &.--hidden {
      display: none;
    }
  }

  &-form {
    button {
      margin: 0 5px;
    }

    input {
      font-size: 30px;
      text-align: center;
      letter-spacing: 2px;
    }
  }

  &-result {
    width: 50%;
    margin: 0 auto;
    font-size: 20px;

    &__order {
      width: 30px;
    }

    &__number {
      padding-top: 1px;
      padding-bottom: 1px;
    }

    &__right,
    &__answer {
      font-size: 30px;
    }
  }
}
</style>
