<template>
  <section class="section section--purple section--it-works">
    <div class="container container--text-center">
      <div class="section-block section-block--one">
        <div class="section__image">
          <ChecksDrawing :play="playAnimation(0)" :delay="0.25" />
        </div>
        <h2 class="section-title section-title--small section-title--right">
          Fill out a few questions about your label’s brand and target customer
        </h2>
      </div>

      <div class="section-block section-block--two">
        <h2 class="section-title section-title--small section-title--left">
          <div class="text">
            Based on your inputs, our algorithm automatically searches our
            portfolio and presents products that are specific to your needs
          </div>
        </h2>
        <div class="section__image">
          <SquaresAnimation :play="playAnimation(1)" :delay="0.25" />
        </div>
      </div>

      <div class="section-block section-block--three">
        <div class="section__image">
          <SquaresAnimation
            :play="playAnimation(2)"
            :delay="0.25"
            :green="true"
          />
        </div>
        <h2 class="section-title section-title--small section-title--right">
          Select styles, colours and add bespoke design details to balance your
          collection
        </h2>
      </div>

      <div class="section-block section-block--four">
        <h2 class="section-title section-title--small section-title--left">
          Place your order and let us handle all factory coordination,
          production management, quality control and delivery
        </h2>
        <div class="section__image">
          <SquaresAnimation
            :play="playAnimation(3)"
            :squares="squares"
            :delay="0.25"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import isNull from 'lodash/isNull'
import debounce from 'lodash/debounce'
import ChecksDrawing from '~/components/ChecksDrawing'
import SquaresAnimation from '~/components/SquaresAnimation'

export default {
  name: 'ThirdSection',
  components: {
    ChecksDrawing,
    SquaresAnimation
  },
  data() {
    return {
      delay: 1,
      step: null,
      disabled: false,
      imagePlaying: false,
      squares: ['tool-square', 'sunglass-square', 'box-square', 'plane-square']
    }
  },
  computed: {
    titles() {
      return [...this.$el.querySelectorAll('.section-title')]
    },
    images() {
      return [...this.$el.querySelectorAll('.section__image')]
    },
    playAnimation() {
      return (step) => this.step === step && this.imagePlaying
    },
    sectionAnchor() {
      return this.$el.getAttribute('data-anchor')
    },
    maxStep() {
      return this.titles.length - 1
    }
  },
  watch: {
    step(newStep, prevStep) {
      this.play(newStep, prevStep)
    }
  },
  async mounted() {
    this.$root.$on('afterLoad', this.afterLoadHander)
    this.$root.$on('onLeave', this.debounceOnLeaveHandler)

    await this.$nextTick()
    this.setAnimation()
  },
  methods: {
    setAnimation() {
      TweenMax.set(this.titles, { opacity: 0, y: 30 })
      TweenMax.set(this.images, { opacity: 0 })
    },
    play(step, prevStep) {
      const tl = new TimelineMax()
      if (!isNull(prevStep)) {
        tl.to(this.titles[prevStep], 0.5, { opacity: 0, y: 30 })
        tl.to(this.images[prevStep], 0.5, { opacity: 0 }, '-=0.5')
      }

      if (!isNull(step) && step >= 0 && step <= this.maxStep) {
        tl.to(this.titles[step], 0.5, {
          delay: prevStep ? 0.5 : 0,
          opacity: 1,
          y: 0,
          onComplete: () => {
            this.imagePlaying = true
          }
        })
        tl.to(this.images[step], 0.5, { opacity: 1 })
        this.imagePlaying = false
      }
    },
    debounceOnLeaveHandler: debounce(
      function() {
        this.onLeaveHander(...arguments)
      },
      500,
      {
        leading: true,
        trailing: false
      }
    ),
    onLeaveHander({ section, nextSection, direction, anchor }) {
      if (this.$el.isEqualNode(nextSection.item)) {
        return
      }

      if (!this.$el.isEqualNode(section.item)) {
        return
      }

      // if (!this.disabled) {
      //   this.disableScrolling()
      // }

      switch (true) {
        case direction === 'up' && this.step >= 1:
          this.decreaseStep()
          return
        case direction === 'down' && this.step < this.maxStep:
          this.increaseStep()
          return
        case direction === 'up' && this.step === 0:
          this.step = null
          this.enableScrolling()
          this.$root.$emit('go-prev')
          return
        case direction === 'down' && this.step === this.maxStep:
          this.increaseStep()
          this.enableScrolling()
          this.$root.$emit('go-next')
          break
      }
    },
    afterLoadHander({ direction, anchor }) {
      if (this.sectionAnchor !== anchor) return
      if (direction === 'down') {
        this.step = 0
      } else {
        this.step = this.maxStep
      }
      this.disableScrolling()
    },
    increaseStep() {
      this.step = this.step + 1
    },
    decreaseStep() {
      this.step = this.step - 1
    },
    disableScrolling() {
      // this.disabled = true
      this.$root.$emit('setBlockScroll', { down: true, up: true })
    },
    enableScrolling() {
      // this.disabled = false
      // this.resetAnimation()
      this.$root.$emit('setBlockScroll', { down: false, up: false })
    }
  }
}
</script>
