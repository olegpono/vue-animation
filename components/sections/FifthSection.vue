<template>
  <section class="section section--purple section--wdiw-3">
    <div class="container container--text-center">
      <div class="section__image">
        <SunglassesAnimation :delay="1.5" :green="true" />
      </div>
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--right"
      >
        Select styles, colours and add bespoke design details to balance your
        collection
      </h2>
    </div>
  </section>
</template>

<script>
import SunglassesAnimation from '~/components/SunglassesAnimation'

export default {
  name: 'FifthSection',
  components: {
    SunglassesAnimation
  },
  data() {
    return {
      animationOption: {
        name: 'fade-in-up',
        delay: 0.5,
        duration: 1
      }
    }
  }
}
</script>
