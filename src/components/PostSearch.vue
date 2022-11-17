<template>
  <section class="vue-search">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text"
        v-model="keyword"
        placeholder="Search posts"
        class="w-30rem"
      />
      <span
        @click="clearSearch"
        class="cursor-pointer p-1"
        v-show="keyword?.length > 0"
      >
        <i class="pi pi-times" />
      </span>
    </span>
  </section>
</template>

<script>
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import { useBlogStore } from '../stores'

export default {
  name: 'PostSearch',
  components: {
    InputText
  },
  setup() {
    const keyword = ref()
    const { searchPosts } = useBlogStore()
    return { keyword, searchPosts }
  },
  methods: {
    clearSearch() {
      this.keyword = ''
    }
  },
  watch: {
    keyword(value) {
      this.searchPosts(value)
    }
  }
}
</script>

<style lang="scss">
.vue-search {
  .p-inputtext {
    border-color: transparent;
    border-bottom-color: #ccc;
    box-shadow: none !important;
    &:hover,
    &:focus,
    &:enabled:hover,
    &:enabled:focus {
      border-color: transparent;
      border-bottom-color: #333;
    }
  }
}
</style>
