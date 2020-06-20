<template>
  <section class="section section--purple section--wdiw-1">
    <div class="container container--text-center">
      <div class="section__image">
        <svg-icon name="checks-image" />
      </div>
      <h2
        v-animate="animationOption"
        class="section-title section-title--small section-title--right"
      >
        Fill out a few questions about your label’s brand and target customer
      </h2>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ThirdSection',
  data() {
    return {
      animationOption: {
        options: {
          name: 'fade-in-up',
          delay: 0.5,
          duration: 1
        }
      }
    }
  }
}
</script>
