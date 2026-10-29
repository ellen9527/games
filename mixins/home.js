export const homeMixin = {
  data() {
    return {
      scrollY: 0, // 滑動的距離
      innerWidth: 1, // 可視範圍width
      innerHeight: 1, // 可視範圍height
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener("scroll", this.handleScroll)
    window.addEventListener("resize", this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    handleResize() {
      this.innerWidth = window.innerWidth
      this.innerHeight = window.innerHeight
    },
    handleScroll() {
      //頁面滾動距離
      this.scrollY = window.scrollY ||document.documentElement.scrollTop ||document.body.scrollTop
    },
  },
}