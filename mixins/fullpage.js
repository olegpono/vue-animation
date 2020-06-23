import get from 'lodash/get'
import isElement from 'lodash/isElement'

export default {
  data() {
    return {
      blockScroll: { down: false, up: false },
      withoutTransition: {
        up: [3, 4, 5, 6, 7],
        down: [4, 5, 6, 7, 8]
      },
      options: {
        anchors: [
          'page1',
          'page2',
          'page3',
          'page4',
          'page5',
          'page6',
          'page7',
          'page8',
          'page9',
          'page10',
          'page11'
        ],
        scrollOverflow: true,
        scrollingSpeed: 1000,
        easing: 'none',
        onLeave: (section, nextSection, direction) => {
          this.$root.$emit('onLeave', { section, nextSection, direction })
          if (this.blockScroll[direction]) {
            return false
          }

          const nextSectionId = nextSection.index + 1
          // Hack to fix apple trackpad and mouses issue for overflowed sections
          // TODO: here we have to use jQuery / refactor it
          const leavingSection = $(section.item)
          if (direction === 'down') {
            if (isElement(section.item.querySelector('.section-end'))) {
              const windowHeight = $(window).height()
              const leftToEnd = leavingSection.find('.section-end').offset().top
              if (leftToEnd > windowHeight) {
                return false
              }
            }
          }

          const isDisabledTransition = get(
            this.withoutTransition,
            [direction],
            []
          ).includes(nextSectionId)

          if (isDisabledTransition) {
            return true
          }

          const height = window.innerHeight
          const ease = Power0.out
          const duration = 0.5

          this.$root.$emit('active-section', nextSectionId)

          if (direction === 'down') {
            TweenMax.to(section.item, duration * 1.5, {
              y: height * 0.9,
              ease
            })
            TweenMax.to(
              section.item.querySelector('.container'),
              duration * 1.5,
              {
                opacity: 0,
                scale: 0.98,
                ease
              }
            )
          } else {
            TweenMax.set(nextSection.item, { y: height * 0.9 })
            TweenMax.set(nextSection.item.querySelector('.container'), {
              opacity: 0,
              scale: 0.98
            })
            TweenMax.to(
              nextSection.item.querySelector('.container'),
              // eslint-disable-next-line prettier/prettier
              duration, {
                opacity: 1,
                scale: 1,
                ease
              }
            )
            TweenMax.to(nextSection.item, duration, {
              y: 0,
              ease
            })
          }
        }
      }
    }
  },
  created() {
    this.$root.$on('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$on('setBlockScroll', this.setBlockScroll)
    this.$root.$on('go-next', this.goToNext)
    this.$root.$on('go-prev', this.goToPrev)
    this.$root.$on('setAllowScrolling', this.setAllowScrollingHandler)
  },
  beforeDestoy() {
    this.$root.$off('updateWithoutTransition', this.updateWithoutHandler)
    this.$root.$off('setBlockScroll', this.setBlockScroll)
  },
  methods: {
    goToNext() {
      this.$refs.fullpage.api.moveSectionDown()
    },
    goToPrev() {
      this.$refs.fullpage.api.moveSectionUp()
    },
    setAllowScrollingHandler(value, direction) {
      this.$refs.fullpage.api.setAllowScrolling(...arguments)
    },
    updateWithoutHandler(array) {
      this.withoutTransition = array
    },
    setBlockScroll(value) {
      this.blockScroll = value
    }
  }
}
