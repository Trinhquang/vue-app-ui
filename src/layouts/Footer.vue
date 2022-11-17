<template>
  <footer class="text-center py-4 bg-gray-900">
    <p class="text-white mb-4">© 2022 by Design for Life.</p>
    <ul class="flex justify-content-center">
      <li
        v-for="item in socials"
        :key="item.id"
        class="mx-3"
      >
        <a
          :href="item.url"
          class="text-white"
          target="_blank"
        >
          <i :class="['pi text-2xl', item.icon]" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      socials: [
        {
          id: 1,
          url: 'https://www.facebook.com/',
          icon: 'pi-facebook'
        },
        {
          id: 2,
          url: 'https://twitter.com/',
          icon: 'pi-twitter'
        },
        {
          id: 3,
          url: 'https://www.instagram.com/',
          icon: 'pi-instagram'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
footer {
  a {
    transition: opacity 0.3s linear;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
