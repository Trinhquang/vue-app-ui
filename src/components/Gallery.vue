<template>
  <Galleria
    :value="images"
    v-model:activeIndex="activeIndex"
    :responsiveOptions="responsiveOptions"
    :numVisible="8"
    containerStyle="max-width: 50%"
    :circular="true"
    :fullScreen="true"
    :showItemNavigators="true"
    v-model:visible="displayCustom"
  >
    <template #item="slotProps">
      <img
        :src="slotProps.item.src"
        :alt="slotProps.item.alt"
        style="width: 100%; display: block"
      />
    </template>
    <template #thumbnail="slotProps">
      <img
        :src="slotProps.item.src"
        :alt="slotProps.item.alt"
        style="display: block"
      />
    </template>
  </Galleria>

  <div
    v-if="images"
    class="vue-gallery grid"
  >
    <div class="col-12 text-center">
      <h2 class="text-2xl uppercase font-light mb-3">Gallery</h2>
    </div>
    <div
      v-for="(image, index) of images"
      class="col-3"
      :key="index"
    >
      <figure class="m-0 relative">
        <img
          :src="image.src"
          :alt="image.alt"
          style="cursor: pointer"
        />
        <figcaption
          class="absolute flex align-items-center justify-content-center bg-black-alpha-60 cursor-pointer"
          @click="imageClick(index)"
        >
          <span class="text-white text-xl font-light">
            {{ image.alt }}
          </span>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
import Galleria from 'primevue/galleria'

export default {
  name: 'Gallery',
  components: {
    Galleria
  },
  data() {
    return {
      images: [
        {
          src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Style%20&%20Design%20blog/01.jpg',
          alt: 'Cactus'
        },
        {
          src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Style%20&%20Design%20blog/02.jpg',
          alt: 'Stairs'
        },
        {
          src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Style%20&%20Design%20blog/03.jpg',
          alt: 'Lamp'
        },
        {
          src: 'https://static.parastorage.com/services/instagram-cdn/1.691.0/assets/ig-templates-accounts/Editor/Style%20&%20Design%20blog/04.jpg',
          alt: 'Chair'
        }
      ],
      activeIndex: 0,
      displayCustom: false,
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 5
        },
        {
          breakpoint: '768px',
          numVisible: 3
        },
        {
          breakpoint: '560px',
          numVisible: 1
        }
      ]
    }
  },
  methods: {
    imageClick(index) {
      this.activeIndex = index
      this.displayCustom = true
    }
  }
}
</script>

<style lang="scss">
.vue-gallery {
  h2 {
    letter-spacing: 0.45em;
  }
  figure {
    figcaption {
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.3s linear;
      letter-spacing: 0.5rem;
    }
    &:hover {
      figcaption {
        opacity: 1;
      }
    }
  }
}
</style>
