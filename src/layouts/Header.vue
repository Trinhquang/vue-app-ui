<template>
  <header>
    <div class="p-container">
      <Menubar
        :model="items"
        class="vue-menu justify-content-between"
      >
        <template #start>
          <router-link to="/">
            <img
              alt="logo"
              src="../assets/images/logo.png"
              height="40"
              class="block"
            />
          </router-link>
        </template>
        <template #item="{ item }">
          <router-link
            :to="item.url"
            :class="['p-menuitem-link', getLinkClass(item)]"
            role="menuitem"
            tabindex="-1"
            aria-hidden="true"
          >
            <!--            <span :class="['p-menuitem-icon', item.icon]"></span>-->
            <span class="p-menuitem-text text-sm font-light uppercase">{{ item.label }}</span>
          </router-link>
        </template>
      </Menubar>
    </div>
  </header>
</template>

<script>
import Menubar from 'primevue/menubar'

export default {
  name: 'Header',
  components: {
    Menubar
  },
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          url: '/'
        },
        {
          label: 'Blog',
          icon: 'pi pi-list',
          url: '/blog'
        },
        {
          label: 'About',
          icon: 'pi pi-user',
          url: '/about'
        },
        {
          label: 'Contact',
          icon: 'pi pi-phone',
          url: '/contact'
        }
      ]
    }
  },
  methods: {
    getLinkClass(item) {
      return item.url === this.$route.path ? 'p-menuitem-active' : ''
    }
  }
}
</script>

<style lang="scss">
#header {
  background: white;
}
.p-menubar.vue-menu {
  background: transparent;
  border-color: transparent;
  .p-menuitem {
    margin-left: 2rem;
  }
  .p-menuitem-link {
    &:hover,
    &.p-menuitem-active {
      .p-menuitem-text {
        color: black !important;
      }
    }
  }
  .p-menuitem-text {
    color: #999 !important;
    transition: color 0.3s ease;
  }
  .p-menuitem-content {
    background: transparent !important;
  }
}
</style>
