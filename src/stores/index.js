import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    loading: false,
    btnLoading: false,
    postList: [],
    searchList: [],
    selectedPost: {}
  }),
  getters: {
    homeList(state) {
      return state.postList.slice(0, 3)
    },
    sortedList(state) {
      return state.postList.sort((a, b) => b.id - a.id)
    }
  },
  actions: {
    async fetchPostList() {
      this.loading = true
      try {
        const data = await axios.get(`${API_URL}/posts`)
        const resData = data.data
        if (resData) {
          this.postList = resData
          setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async fetchPostDetail(id) {
      try {
        const data = await axios.get(`${API_URL}/posts/${id}`)
        this.selectedPost = data.data
      } catch (error) {
        console.log(error)
      }
    },
    async searchPosts(keyword) {
      try {
        const data = await axios.get(`${API_URL}/posts?searchKey=${keyword}`)
        if (keyword === '') {
          this.postList = data.data
        } else {
          this.postList = data.data.filter((item) => JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase()))
        }
      } catch (error) {
        console.log(error)
      }
    },
    async createPost(data) {
      this.btnLoading = true
      const { image, title, description } = data
      const payload = {
        id: Number(this.postList[0].id) + 1,
        image,
        author: 'Admin',
        createdDate: new Date(),
        title,
        description,
        views: 0,
        comments: 0,
        likes: 0
      }
      try {
        const res = await axios.post(`${API_URL}/posts`, payload)
        this.postList = [...this.postList, res.data]
        await this.$nextTick(() => {
          this.btnLoading = false
        })
      } catch (error) {
        console.log(error)
        this.btnLoading = false
      }
    },
    async updatePost(id, data) {
      this.btnLoading = true
      const { image, title, description } = data
      const item = this.postList.find((item) => (item.id = id))
      const payload = { ...item, image, title, description }
      try {
        const res = await axios.put(`${API_URL}/posts/${id}`, payload)
        const resData = res.data
        this.postList.map((item) => {
          if (item.id === id) {
            item.image = resData.image
            item.title = resData.title
            item.description = resData.description
          }
        })

        await this.$nextTick(() => {
          this.btnLoading = false
        })
      } catch (error) {
        console.log(error)
        this.btnLoading = false
      }
    },
    async deletePost(id) {
      try {
        await axios.delete(`${API_URL}/posts/${id}`)
        this.postList = this.postList.filter((item) => item.id !== id)
      } catch (error) {
        console.log(error)
      }
    },
    async likePost(id, data) {
      try {
        const res = await axios.patch(`${API_URL}/posts/${id}`, data)
        this.postList.map((item) => {
          if (item.id === id) {
            item.likes = res.data.likes
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export const useContactStore = defineStore('contact', {
  state: () => ({
    loading: false,
    btnLoading: false,
    contactList: []
  }),
  actions: {
    async fetchCustomers() {
      this.loading = true
      try {
        const data = await axios.get(`${API_URL}/contacts`)
        const resData = data.data
        if (resData) {
          this.loading = false
          this.contactList = resData
        }
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    },
    async addContact(data) {
      this.btnLoading = true
      const payload = {
        id: Date.now(),
        ...data
      }
      try {
        const res = await axios.post(`${API_URL}/contacts`, payload)
        this.contactList = [...this.contactList, res.data]
        await setTimeout(() => {
          this.btnLoading = false
        })
      } catch (error) {
        console.log(error)
        this.btnLoading = false
      }
    }
  }
})
