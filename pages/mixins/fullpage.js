import isElement from 'lodash/isElement'

export default {
  data() {
    return {
      options: {
        menu: '#menu',
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
          'page11',
          'page12',
          'page13'
        ],
        scrollOverflow: true,
        scrollingSpeed: 1000,
        easing: 'none',
        onLeave: (section, nextSection, direction) => {
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

          const height = window.innerHeight
          const ease = Power0.out
          const duration = 0.5

          this.$root.$emit('active-section', nextSection.index)

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
  }
}
