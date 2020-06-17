<template>
  <no-ssr>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <div class="section section--first">
        <div class="container container--text-center">
          <h1 class="section-title section-title--first">
            The world's entire <br />
            eyewear portfolio <br />
            ...in seconds, <span>Badaboom!</span>
          </h1>
        </div>
      </div>

      <div class="section section--green">
        <div class="container container--text-center">
          <h2 class="section-title section-title--small section-title--second">
            <span>
              The
              <div>{{ dynamicWord }}</div>
              way
            </span>
            With instant access to the world’s leading manufactures, you can
            build and produce bespoke eyewear collections
          </h2>
        </div>
      </div>

      <div class="section section--purple">
        <!-- <div class="section__next">
          <div class="next" @click="$refs.fullpage.api.moveSectionDown()"></div>
        </div> -->
      </div>
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'

export default {
  name: 'Body',
  components: {
    NoSsr
  },
  data() {
    return {
      interval: null,
      dynamicWord: null,
      dynamicWords: ['Quicker', 'Smarter', 'New'],
      options: {
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3'],
        scrollOverflow: true,
        onLeave: (anchor, index, item, isFirst, isLast) => {
          console.log('onLeave >>', anchor, index, item, isFirst, isLast)
        },
        afterLoad: (origin, destination, direction) => {
          console.log('afterLoad >>', origin, destination, direction)
        }
      }
    }
  },
  computed: {
    activeSection() {
      return this.$refs.fullpage.api.getActiveSection()
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    stopTimer() {
      clearInterval(this.interval)
    },
    startTimer() {
      let step = 0
      this.interval = setInterval(() => {
        if (step > this.dynamicWords.length - 1) step = 0
        this.dynamicWord = this.dynamicWords[step]
        step++
      }, 2000)
    }
  }
}
</script>
