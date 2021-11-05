<script>
export default {
  name: 'Timer',
  props: {
    switch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timer: null,
      time: 0,
    }
  },
  computed: {
    formatTime() {
      const t = Number(this.time)

      let hour = '00'
      const minute = this._padzero(Math.floor(t / 60))
      if (minute >= 60) {
        hour = this._padzero(Math.floor(minute / 60))
      }
      const second = this._padzero(t % 60)

      return `${hour}:${minute}:${second}`
    },
  },
  created() {
    this.initTimer()
  },
  watch: {
    switch(v) {
      if (v) {
        this.initTimer()
        return
      }
      clearInterval(this.timer)
    },
  },
  methods: {
    initTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }

      this.time = 0
      this.timer = setInterval(() => {
        this.time++
      }, 1000);
    },
    restart() {
      this.initTimer()
    },
    _padzero(num) {
      return num < 10 ? `0${num}` : num
    },
  },
}
</script>

<template>
  <div class="timer blue-grey--text blue-grey--darken-2">{{ formatTime }}</div>
</template>
