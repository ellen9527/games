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

      const hour = this._padzero(Math.floor(t / 3600))
      const minute = this._padzero(Math.floor((t % 3600) / 60))
      const second = this._padzero(t % 60)

      return `${hour}:${minute}:${second}`
    },
  },
  // 不放在 created:generate 時 SSR 也會跑 created,interval 沒人清會卡住 process
  mounted() {
    if (this.switch) {
      this.initTimer()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
