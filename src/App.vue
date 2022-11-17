<template>
  <Header />
  <RouterView />
  <Footer />
  <Toast />
  <ConfirmPopup />
</template>

<script>
import Header from './layouts/Header.vue'
import Footer from './layouts/Footer'
import Toast from 'primevue/toast'
import ConfirmPopup from 'primevue/confirmpopup'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Toast,
    ConfirmPopup
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@100;200;300;400;500;600;700;800;900&display=swap');

html,
body,
#app,
.p-component {
  font-family: 'Jost', sans-serif !important;
  line-height: 1.5;
}

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.p-container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
}

.p-confirm-popup {
  .p-button {
    box-shadow: none !important;
  }
  .p-confirm-popup-accept {
    color: white !important;
    background-color: black !important;
    border-color: black !important;
  }
  .p-confirm-popup-reject {
    color: black !important;
  }
}

.p-dialog {
  .p-button {
    border-color: black !important;
    box-shadow: none !important;
  }
  .p-button:not(.p-button-outlined) {
    color: white !important;
    background-color: black !important;
  }
  .p-button-outlined {
    color: black !important;
  }
}
</style>
