<template>
  <section class="vue-banner text-center py-6">
    <h1 class="text-4xl uppercase select-none">{{ title }}</h1>
  </section>
</template>

<script>
export default {
  name: 'Banner',
  props: {
    title: String
  }
}
</script>

<style lang="scss">
.vue-banner {
  background-color: #eee;
  h1 {
    letter-spacing: 0.45em;
  }
}
</style>
