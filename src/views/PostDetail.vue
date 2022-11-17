<template>
  <main id="post-detail-page">
    <div class="p-container py-6">
      <Card class="post-item border-noround py-4 px-6">
        <template #content>
          <div class="post-author flex align-items-center">
            <Avatar
              icon="pi pi-user"
              class="mr-3"
              shape="circle"
            />
            <div class="flex align-items-center">
              <h5 class="text-sm">{{ selectedPost.author }}</h5>
              <span class="mx-3">&bull;</span>
              <span class="text-sm">{{ formatDate(selectedPost.createdDate) }}</span>
            </div>
          </div>
          <h4 class="post-title uppercase text-3xl mt-3 mb-3">
            {{ selectedPost.title }}
          </h4>
          <p class="post-text">
            {{ selectedPost.description }}
          </p>
          <figure class="post-img mt-5">
            <img
              :src="selectedPost.image"
              :alt="selectedPost.title"
              class="block w-full"
            />
          </figure>
        </template>
      </Card>
    </div>
  </main>
</template>

<script>
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import { useBlogStore } from '../stores'
import { storeToRefs } from 'pinia'
import dayjs from 'dayjs'

export default {
  name: 'PostDetail',
  components: {
    Card,
    Avatar
  },
  data() {
    return {
      postId: this.$route.params.id
    }
  },
  setup() {
    const blogStore = useBlogStore()
    const { selectedPost } = storeToRefs(blogStore)
    const { fetchPostDetail } = blogStore

    return { selectedPost, fetchPostDetail }
  },
  async created() {
    await this.fetchPostDetail(this.postId)
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY')
    }
  }
}
</script>

<style lang="scss">
.post-item.p-card {
  border: 1px solid rgba(204, 204, 204, 0.75);
  box-shadow: none;
}
</style>
