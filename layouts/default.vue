<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
    <transition name="fade" mode="in-out">
      <Modal v-show="isShow" @close-modal="closeModal" />
    </transition>
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Modal from '~/components/Modal'

export default {
  components: {
    Header,
    Footer,
    Modal
  },
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    this.$root.$on('openModal', this.openModal)
  },
  beforeDestroy() {
    this.$root.$off('openModal', this.openModal)
  },
  methods: {
    openModal() {
      this.isShow = true
    },
    closeModal() {
      this.isShow = false
    }
  }
}
</script>
