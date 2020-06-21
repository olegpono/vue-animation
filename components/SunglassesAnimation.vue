<template>
  <!-- eslint-disable prettier/prettier -->
  <div class="sunglasse-squares" @inview="play">
    <svg-icon name="sunglass-square" class="left-top" />
    <svg-icon name="sunglass-square" class="right-top" />
    <svg-icon name="sunglass-square" class="left-bottom" />
    <svg-icon name="sunglass-square" class="right-bottom" />
  </div>
</template>

<script>
export default {
  name: 'SunglassesAnimation',
  props: {
    delay: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tl: null
    }
  },
  beforeDestroy() {
    this.$observer.unobserve(this.$el)
  },
  async mounted() {
    this.$observer.observe(this.$el)

    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setAnimation() {
      console.warn(
        '.sunglasse-squares svg >>',
        this.$el.querySelectorAll('svg')
      )
      const options = { opacity: 1, scale: 1, ease: Back.easeOut }
      this.tl = new TimelineMax({ paused: true, delay: this.delay })
      this.tl.staggerTo('.sunglasse-squares svg', 0.5, options, 0.5)
    },
    play() {
      this.tl.play()
    }
  }
}
</script>

<style lang="scss">
.sunglasse-squares {
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
  .sunglasse-squares {
    width: 400px;

    svg {
      max-width: calc(50% - 10px);
      height: 200px;
    }
  }
}

@media screen and (max-width: 992px) {
  .sunglasse-squares {
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
