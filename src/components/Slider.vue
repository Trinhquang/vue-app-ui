<template>
  <section class="vue-slider relative text-center">
    <figure class="m-0">
      <img
        src="../assets/images/banner.jpg"
        alt="Banner"
        class="block w-full"
      />
    </figure>
    <h1 class="absolute uppercase select-none font-medium">Design <span class="font-light">for</span> Life</h1>
  </section>
</template>

<script>
export default {
  name: 'Slider'
}
</script>

<style lang="scss">
.vue-slider {
  h1 {
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 22px;
    letter-spacing: 0.45em;
  }
}
</style>
