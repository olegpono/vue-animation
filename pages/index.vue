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
  }
}
</script>
