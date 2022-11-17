<template>
  <main id="home-page">
    <Slider />
    <div class="p-container py-6">
      <Gallery />

      <div class="post-list mt-6">
        <div class="col-12 text-center">
          <h2 class="text-2xl uppercase font-light mb-3">Posts</h2>
        </div>

        <PostItem
          v-for="(item, index) in homeList"
          :item="item"
          :key="index"
        />

        <div
          class="text-center"
          v-if="homeList?.length > 0"
        >
          <Button
            label="View All Posts"
            class="w-22rem h-3rem mt-6 border-noround"
            @click="handleClick"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Slider from '../components/Slider'
import Gallery from '../components/Gallery'
import PostItem from '../components/PostItem'
import { useBlogStore } from '../stores'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'

export default {
  name: 'Home',
  components: {
    Slider,
    Gallery,
    PostItem,
    Button
  },
  setup() {
    const blogStore = useBlogStore()
    const { homeList } = storeToRefs(blogStore)
    const { fetchPostList } = blogStore

    return { homeList, fetchPostList }
  },
  async created() {
    await this.fetchPostList()
  },
  methods: {
    handleClick() {
      this.$router.replace('/blog')
    }
  }
}
</script>

<style lang="scss">
#home-page {
  .p-button {
    background: black;
    border-color: black;
    &:hover {
      color: black;
      background: #ccc;
      border-color: #ccc;
    }
  }
}
</style>
