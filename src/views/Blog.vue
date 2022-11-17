<template>
  <main id="blog-page">
    <Banner title="Blog" />
    <div class="p-container py-6">
      <div class="post-action mb-5 flex align-items-center justify-content-between">
        <PostSearch />
        <PostCreate />
      </div>
      <div class="post-list">
        <div
          class="post-loading flex align-items-center justify-content-center"
          v-if="loading"
        >
          <ProgressSpinner />
        </div>
        <PostItem
          v-for="(item, index) in sortedList"
          :item="item"
          :key="index"
          v-else
        />
      </div>
    </div>
  </main>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner'
import Banner from '../components/Banner'
import PostItem from '../components/PostItem'
import PostSearch from '../components/PostSearch'
import PostCreate from '../components/PostCreate'
import { useBlogStore } from '../stores'
import { storeToRefs } from 'pinia'

export default {
  name: 'Blog',
  components: {
    ProgressSpinner,
    Banner,
    PostItem,
    PostSearch,
    PostCreate
  },
  setup() {
    const blogStore = useBlogStore()
    const { loading, sortedList } = storeToRefs(blogStore)
    const { fetchPostList } = blogStore

    return { loading, sortedList, fetchPostList }
  },
  async created() {
    await this.fetchPostList()
  }
}
</script>

<style lang="scss">
#blog-page {
  .post-loading {
    height: 30rem;
    .p-progress-spinner {
      width: 4rem;
      height: 4rem;
    }
  }
}
</style>
