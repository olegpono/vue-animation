<template>
  <div class="squares-animation" @inview="play">
    <template v-if="squares.length">
      <svg-icon
        v-for="(square, index) in squares"
        :key="index"
        :name="square"
        :class="classes[index]"
      />
    </template>
    <template v-else-if="green">
      <svg-icon
        v-for="(square, index) in greenSunglassesArray"
        :key="index"
        :name="square"
        :class="classes[index]"
      />
    </template>
    <template v-else>
      <svg-icon name="sunglass-square" class="left-top" />
      <svg-icon name="sunglass-square" class="right-top" />
      <svg-icon name="sunglass-square" class="left-bottom" />
      <svg-icon name="sunglass-square" class="right-bottom" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'SquaresAnimation',
  props: {
    delay: {
      type: Number,
      default: 1
    },
    green: {
      type: Boolean,
      default: false
    },
    squares: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tl: null,
      greenSunglassesArray: [],
      classes: ['left-top', 'right-top', 'left-bottom', 'right-bottom']
    }
  },
  computed: {
    dynamicIcon() {
      return this.green ? 'sunglass-square-green' : 'sunglass-square'
    }
  },
  beforeDestroy() {
    this.$observer.unobserve(this.$el)
  },
  created() {
    this.setGreenSquares()
  },
  async mounted() {
    this.$observer.observe(this.$el)

    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setGreenSquares() {
      const greenSquares = this.getTwoNumbers()
      for (let i = 0; i < 4; i++) {
        const icon = greenSquares.includes(i)
          ? 'sunglass-square-green'
          : 'sunglass-square'
        this.greenSunglassesArray.push(icon)
      }
    },
    setAnimation() {
      const options = { opacity: 1, scale: 1, ease: Back.easeOut }
      this.tl = new TimelineMax({ paused: true, delay: this.delay })
      this.tl.staggerTo(this.$el.querySelectorAll('svg'), 0.5, options, 0.5)
    },
    play() {
      this.tl.play()
    },
    getTwoNumbers() {
      const first = this.getRandomFromRange(0, 3)
      let second = first
      while (second === first) {
        second = this.getRandomFromRange(0, 3)
      }
      return [first, second]
    },
    getRandomFromRange(min, max, except) {
      const minValue = Math.ceil(min)
      const maxValue = Math.floor(max)
      return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    }
  }
}
</script>

<style lang="scss">
.squares-animation {
  width: 520px;
  display: flex;
  flex-wrap: wrap;

  svg {
    opacity: 0;
    transform: scale(0.85);
    width: calc(50% - 10px);
    height: 250px;
    margin: 0 18px 18px 0;
    flex-basis: calc(50% - 10px);
  }

  .right-top {
    margin-right: 0;
  }

  .right-bottom,
  .left-bottom {
    margin-bottom: 0;
  }

  .right-bottom {
    margin-right: 0;
  }
}

@media screen and (max-width: 1440px) {
  .squares-animation {
    width: 400px;

    svg {
      max-width: calc(50% - 10px);
      height: 200px;
    }
  }
}

@media screen and (max-width: 992px) {
  .squares-animation {
    width: 250px;
    height: 250px;
    margin: 0 auto;

    svg {
      height: 250px;
      width: 250px;
      max-width: inherit;
      flex-basis: 100%;
      margin: 0;

      &:not(:first-child) {
        display: none;
      }
    }
  }
}
</style>
