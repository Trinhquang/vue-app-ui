<template>
  <Button
    v-if="!postId"
    label="Create new post"
    icon="pi pi-plus"
    class="p-button-secondary p-button-outlined"
    @click="toggleDialog"
  />
  <Button
    v-if="postId"
    icon="pi pi-pencil"
    class="p-button-rounded p-button-secondary p-button-text"
    v-tooltip.top="'Edit'"
    @click="handleUpdate"
  />
  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    class="vue-dialog"
  >
    <template #header>
      <h3 class="p-dialog-title">{{ dialogTitle }}</h3>
    </template>
    <form
      @submit.prevent="handleSubmit(!v$.$invalid)"
      class="p-fluid"
    >
      <div class="field grid">
        <div class="col-3">
          <label
            for="image"
            :class="{ 'p-error': v$.image.$invalid && submitted }"
            >Image Url *</label
          >
        </div>
        <div class="col-9">
          <InputText
            id="image"
            v-model="v$.image.$model"
            :class="{ 'p-invalid': v$.image.$invalid && submitted }"
          />
          <small
            v-if="(v$.image.$invalid && submitted) || v$.image.$pending.$response"
            class="p-error"
          >
            {{ v$.image.required.$message }}.
            {{ v$.image.url.$message }}
          </small>
        </div>
        <div
          class="col-9 col-offset-3"
          v-if="!v$.image.$invalid"
        >
          <Image
            :src="image"
            alt="Image"
            width="250"
            preview
            class="mt-3"
          />
        </div>
      </div>

      <div class="field grid">
        <div class="col-3">
          <label
            for="title"
            :class="{ 'p-error': v$.title.$invalid && submitted }"
            >Title *</label
          >
        </div>
        <div class="col-9">
          <InputText
            id="title"
            v-model="v$.title.$model"
            :class="{ 'p-invalid': v$.title.$invalid && submitted }"
          />
          <small
            v-if="(v$.title.$invalid && submitted) || v$.title.$pending.$response"
            class="p-error"
          >
            {{ v$.title.required.$message }}.
          </small>
        </div>
      </div>

      <div class="field grid">
        <div class="col-3">
          <label
            for="description"
            :class="{ 'p-error': v$.description.$invalid && submitted }"
            >Description *</label
          >
        </div>
        <div class="col-9">
          <Textarea
            id="description"
            v-model="v$.description.$model"
            rows="5"
            :class="{ 'p-invalid': v$.description.$invalid && submitted }"
          />
          <small
            v-if="(v$.description.$invalid && submitted) || v$.description.$pending.$response"
            class="p-error"
          >
            {{ v$.description.required.$message }}. {{ v$.description.maxLength.$message }}.
          </small>
        </div>
      </div>

      <div class="flex justify-content-end">
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="toggleDialog"
          class="w-8rem p-button-outlined mr-3"
        />
        <Button
          label="Submit"
          icon="pi pi-check"
          class="w-8rem"
          autofocus
          type="submit"
          :loading="btnLoading"
        />
      </div>
    </form>
  </Dialog>
</template>

<script>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Image from 'primevue/image'
import { required, url, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useBlogStore } from '../stores'
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'

export default {
  name: 'PostCreate',
  components: {
    Button,
    Dialog,
    InputText,
    Textarea,
    Image
  },
  props: {
    postId: Number
  },
  computed: {
    dialogTitle() {
      return this.postId ? 'Update Post' : 'Create New Post'
    }
  },
  setup() {
    const toast = useToast()
    const blogStore = useBlogStore()
    const { btnLoading, selectedPost } = storeToRefs(blogStore)
    const { fetchPostDetail, createPost, updatePost } = blogStore

    const showSuccess = (type) => {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: type === 1 ? 'Post updated!' : 'Post created!',
        life: 3000
      })
    }

    return { v$: useVuelidate(), fetchPostDetail, createPost, updatePost, selectedPost, btnLoading, showSuccess }
  },
  data() {
    return {
      visible: false,
      image: '',
      title: '',
      description: '',
      submitted: false
    }
  },
  validations() {
    return {
      title: {
        required
      },
      image: {
        required,
        url
      },
      description: {
        required,
        maxLength: maxLength(500)
      }
    }
  },
  methods: {
    toggleDialog() {
      this.visible = !this.visible
      this.submitted = false
      this.resetForm()
    },
    handleUpdate() {
      this.toggleDialog()
      this.fetchPostDetail(this.postId)
    },
    handleSubmit(isFormValid) {
      this.submitted = true

      if (!isFormValid) {
        return
      } else {
        const payload = {
          image: this.image,
          title: this.title,
          description: this.description
        }
        if (this.postId) {
          this.updatePost(this.postId, payload).then(() => {
            this.toggleDialog()
            this.showSuccess(1)
          })
        } else {
          this.createPost(payload).then(() => {
            this.toggleDialog()
            this.showSuccess()
          })
        }
      }
    },
    resetForm() {
      this.title = ''
      this.image = ''
      this.description = ''
    }
  },
  watch: {
    selectedPost(value) {
      if (value) {
        this.image = this.selectedPost.image
        this.title = this.selectedPost.title
        this.description = this.selectedPost.description
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-inputtext {
  box-shadow: none !important;
  &:hover,
  &:focus {
    border-color: black !important;
  }
}
.p-image {
  img {
    display: block;
  }
}
.p-image-preview-container > img {
  display: block;
}
</style>
