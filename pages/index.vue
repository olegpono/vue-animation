<template>
  <no-ssr>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <FirstSection />
      <SecondSection />
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'
import FirstSection from '~/components/sections/FirstSection'
import SecondSection from '~/components/sections/SecondSection'

export default {
  name: 'Body',
  components: {
    NoSsr,
    FirstSection,
    SecondSection
  },
  data() {
    return {
      options: {
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3'],
        scrollOverflow: true,
        scrollingSpeed: 1000,
        easing: 'none',
        onLeave: (section, nextSection, direction) => {
          const height = window.innerHeight
          const duration = 1
          const ease = Power0.out

          if (direction === 'down') {
            TweenMax.to(section.item, duration, {
              y: height,
              ease
            })
            TweenMax.to(section.item.querySelector('.container'), duration, {
              opacity: 0,
              scale: 0.95,
              ease
            })
          } else {
            TweenMax.to(
              nextSection.item.querySelector('.container'),
              duration,
              {
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
  computed: {
    activeSection() {
      return this.$refs.fullpage.api.getActiveSection()
    }
  }
}
</script>
