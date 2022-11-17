<template>
  <Card class="post-item border-noround mb-5">
    <template #content>
      <div class="grid grid-nogutter">
        <div class="col-12">
          <router-link :to="{ name: 'PostDetail', params: { id: postId } }">
            <figure class="post-image m-0">
              <img
                :src="item.image"
                :alt="item.title"
                class="block w-full"
              />
            </figure>
          </router-link>
        </div>
        <div class="col-12">
          <div class="post-content relative h-full">
            <div class="post-author flex align-items-center">
              <Avatar
                icon="pi pi-user"
                class="mr-3"
                shape="circle"
              />
              <div>
                <h5 class="text-xs">{{ item.author }}</h5>
                <span class="text-xs">{{ formatDate(item.createdDate) }}</span>
              </div>
            </div>
            <router-link :to="{ name: 'PostDetail', params: { id: postId } }">
              <h4 class="post-title uppercase text-3xl overflow-hidden">
                {{ item.title }}
              </h4>
            </router-link>
            <p class="post-description overflow-hidden">
              {{ item.description }}
            </p>
            <div class="post-react flex align-items-center justify-content-between absolute text-xs">
              <ul class="flex align-items-center">
                <li class="mr-3">{{ item.views }} views</li>
                <li>{{ item.comments }} comments</li>
              </ul>
              <div class="flex align-items-center">
                <span>{{ item.likes }}</span>
                <ToggleButton
                  v-model="checked"
                  :value="postId"
                  onLabel=""
                  offLabel=""
                  onIcon="pi pi-heart-fill"
                  offIcon="pi pi-heart"
                  class="border-none p-0"
                />
              </div>
            </div>
            <div
              class="post-action flex align-items-center absolute"
              v-if="this.isBlogPage"
            >
              <PostCreate :postId="postId" />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-secondary p-button-text"
                v-tooltip.top="'Delete'"
                @click="handleDelete($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import dayjs from 'dayjs'
import { useBlogStore } from '../stores'
import { useToast } from 'primevue/usetoast'
import PostCreate from './PostCreate'

export default {
  name: 'PostItem',
  components: {
    Card,
    Avatar,
    Button,
    ToggleButton,
    PostCreate
  },
  props: {
    item: Object
  },
  data() {
    return {
      checked: false
    }
  },
  setup() {
    const toast = useToast()
    const blogStore = useBlogStore()
    const { likePost, deletePost } = blogStore

    const showSuccess = () => {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Post deleted!', life: 3000 })
    }

    return { likePost, deletePost, showSuccess }
  },
  computed: {
    postId() {
      return this.item.id
    },
    isBlogPage() {
      return this.$route.path !== '/'
    }
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('MMM D, YYYY')
    },
    async handleLike(value) {
      const data = {
        likes: value ? this.item.likes + 1 : this.item.likes - 1
      }
      this.likePost(this.postId, data)
    },
    async handleDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to remove this post?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deletePost(this.postId).then(() => {
            this.showSuccess()
          })
        }
      })
    }
  },
  watch: {
    checked(value) {
      this.handleLike(value)
    }
  }
}
</script>

<style lang="scss">
.post-item.p-card {
  border: 1px solid rgba(204, 204, 204, 0.75);
  box-shadow: none;
  .p-card-body,
  .p-card-content {
    padding: 0;
  }
  @media (min-width: 768px) {
    .grid {
      > div {
        &:first-of-type {
          width: 46.9%;
        }
        &:last-of-type {
          width: 53.1%;
        }
      }
    }
  }
}
.post-image {
  height: 310px;
  img {
    height: 310px;
    object-fit: cover;
  }
}
.post-content {
  padding: 24px 50px;
  a {
    text-decoration: none !important;
  }
}
.post-author {
  margin-bottom: 12px;
}
.post-title {
  color: #565656;
  line-height: 1.2;
  margin-bottom: 12px;
  -webkit-line-clamp: 2;
  &:hover {
    color: #888;
  }
}
.post-title,
.post-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.post-description {
  -webkit-line-clamp: 3;
}
.post-react {
  left: 50px;
  right: 50px;
  bottom: 0;
  border-top: 1px solid rgba(204, 204, 204, 0.75);
  padding: 12px 0;
}
.p-togglebutton {
  background: transparent !important;
  box-shadow: none !important;
  .p-button-icon {
    color: #e84a43 !important;
  }
}
.post-action {
  right: 30px;
  top: 20px;
}
</style>
