<script>
export default {
  name: 'GameBNC',
  data() {
    return {
      valid: true,
      value: '',
      rules: [
        value => !!value || 'Required!!',
        value => (value || '').length === 4 || 'Only 4 characters!',
        value => {
          const pattern = /\d{4}/
          return pattern.test(value) || 'Invalid Number.'
        },
      ],
      answer: [],
      results: [],
      showAnswer: false,
      answerRight: false,
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
  },
}
</script>

<template>
  <div class="game">
    <div class="text-right">
      <v-btn @click="answerDisplay">Tell me the answer</v-btn>
      <v-btn @click="restart" class="ml-2">Restart</v-btn>
    </div>
    <v-form ref="form" v-model="valid" class="game--form d-flex align-center">
      <v-text-field v-model="value" label="Guess the numbers" :rules="rules" />
      <v-btn :disabled="answerRight || showAnswer" @click="handleCheckAnswer">
        Test
      </v-btn>
      <v-btn @click="reset">Reset</v-btn>
    </v-form>
    <div class="game--result">
      <div
        v-for="(result, idx) in results"
        :key="idx"
        class="d-flex justify-center my-1"
      >
        <div class="game--result__order text-right">#{{ idx + 1 }}</div>
        <div
          class="game--result__number primary primary--text text--lighten-5 px-1 rounded mx-5"
        >
          {{ result.value }}
        </div>
        <div>{{ result.result }}</div>
      </div>
    </div>
    <div
      v-if="answerRight"
      class="game--result__right text-center amber--text text--lighten-3"
    >
      Congratulations!! Your Answer is right!!
    </div>
    <div v-if="showAnswer" class="game--result__answer text-center">
      Answer is
      <span class="red--text text--lighten-3">{{ answer.join('') }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.game {
  &--form {
    button {
      margin: 0 5px;
    }

    input {
      font-size: 30px;
      text-align: center;
      letter-spacing: 2px;
    }
  }

  &--result {
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
