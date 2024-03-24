export const homeMixin = {
  data() {
    return {
      scrollY: 0, // 滑動的距離
      innerWidth: 1, // 可視範圍width
      innerHeight: 1, // 可視範圍height
    }
  },
  mounted() {
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      //頁面滾動距離
      this.scrollY = window.scrollY ||document.documentElement.scrollTop ||document.body.scrollTop
    },
  },
}