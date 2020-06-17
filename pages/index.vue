<template>
  <no-ssr>
    <full-page id="fullpage" ref="fullpage" :options="options">
      <!-- HOME SECTION -->
      <div class="section section--header gradient-home">
        <!-- <MainSection /> -->
        <div class="section__next">
          <div class="next" @click="$refs.fullpage.api.moveSectionDown()">
            <span>Try it</span>
            sdfsdfsdf111
            <!-- <img src="./assets/images/arrow-down.svg" alt="" /> -->
          </div>
        </div>
      </div>
      <!-- END -->
      <!-- VIDEO SECTION -->
      <div class="section gradient-video">
        <!-- <VideoSection /> -->
        <div class="section__next">
          <div class="next" @click="$refs.fullpage.api.moveSectionDown()">
            sdfdsfsd22222
            <!-- <img src="./assets/images/arrow-down.svg" alt="" /> -->
          </div>
        </div>
      </div>
      <!-- END -->
      <!-- HOWITWORKS SECTION -->
      <div class="section gradient-works">
        <!-- <HowSection /> -->
        <div class="section__next">
          <div class="next" @click="$refs.fullpage.api.moveSectionDown()">
            sdfsdsdf33333
            <!-- <img src="./assets/images/arrow-down.svg" alt="" /> -->
          </div>
        </div>
      </div>
      <!-- END -->
    </full-page>
  </no-ssr>
</template>

<script>
import NoSsr from 'vue-no-ssr'

export default {
  components: {
    NoSsr
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
  }
}
</script>
