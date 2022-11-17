import { createWebHistory, createRouter } from 'vue-router'
const Home = () => import('../views/Home')
const About = () => import('../views/About')
const Blog = () => import('../views/Blog')
const Contact = () => import('../views/Contact')
const PostDetail = () => import('../views/PostDetail')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetail
  }
]

const appRouter = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
  }
})

export default appRouter
