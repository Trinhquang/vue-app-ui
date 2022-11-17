<template>
  <main id="contact-page">
    <Banner title="Contact" />

    <div class="p-container py-6">
      <div class="grid">
        <div class="col-12 md:col-6">
          <form
            @submit.prevent="handleSubmit(!v$.$invalid)"
            class="p-fluid"
          >
            <div class="field mb-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-user" />
                <InputText
                  id="name"
                  v-model="v$.name.$model"
                  :class="{ 'p-invalid': v$.name.$invalid && submitted }"
                />
                <label
                  for="name"
                  :class="{ 'p-error': v$.name.$invalid && submitted }"
                  >Name*</label
                >
              </div>
              <small
                v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
                class="p-error"
                >{{ v$.name.required.$message }}</small
              >
            </div>
            <div class="field mb-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-envelope" />
                <InputText
                  id="email"
                  v-model="v$.email.$model"
                  :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                  aria-describedby="email-error"
                />
                <label
                  for="email"
                  :class="{ 'p-error': v$.email.$invalid && submitted }"
                  >Email*</label
                >
              </div>
              <span v-if="v$.email.$error && submitted">
                <span
                  id="email-error"
                  v-for="(error, index) of v$.email.$errors"
                  :key="index"
                >
                  <small class="p-error">{{ error.$message }}</small>
                </span>
              </span>
              <small
                v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                class="p-error"
                >{{ v$.email.required.$message }}</small
              >
            </div>
            <div class="field mb-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-phone" />
                <InputText
                  id="phone"
                  v-model="v$.phone.$model"
                  :class="{ 'p-invalid': v$.phone.$invalid && submitted }"
                />
                <label
                  for="phone"
                  :class="{ 'p-error': v$.phone.$invalid && submitted }"
                  >Phone*</label
                >
              </div>
              <small
                v-if="(v$.phone.$invalid && submitted) || v$.phone.$pending.$response"
                class="p-error"
                >{{ v$.phone.required.$message }}</small
              >
            </div>
            <div class="field mb-4">
              <div class="p-float-label p-input-icon-right">
                <i class="pi pi-comment" />
                <Textarea
                  id="message"
                  v-model="message"
                  rows="3"
                />
                <label for="message">Message</label>
              </div>
            </div>
            <Button
              type="submit"
              label="Submit"
              :loading="btnLoading"
            />
          </form>
        </div>
        <div class="col-12 md:col-2">
          <Divider layout="vertical" />
        </div>
        <div class="col-12 md:col-4">
          <ul>
            <li
              v-for="item in contacts"
              :key="item.id"
              class="flex align-items-center mb-3"
            >
              <i :class="['pi mr-3', item.icon]" />
              <a
                :href="'mailto:' + item.text"
                v-if="item.name === 'email'"
              >
                {{ item.text }}
              </a>
              <span v-else>
                {{ item.text }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26435.920790297107!2d-118.41704347955572!3d34.082583202286706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1668623700898!5m2!1sen!2s"
      width="100%"
      height="450"
      style="display: block; border: 0; -webkit-filter: grayscale(100%); filter: grayscale(100%)"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </main>
</template>

<script>
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Banner from '../components/Banner'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useContactStore } from '../stores'
import { useToast } from 'primevue/usetoast'
import { storeToRefs } from 'pinia'

export default {
  name: 'Contact',
  components: {
    Banner,
    Divider,
    InputText,
    Textarea,
    Button
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      message: '',
      submitted: false,
      contacts: [
        {
          id: 1,
          icon: 'pi-envelope',
          name: 'email',
          text: 'info@getintouch.we'
        },
        {
          id: 2,
          icon: 'pi-phone',
          name: 'phone',
          text: '+24 56 89 146'
        },
        {
          id: 3,
          icon: 'pi-building',
          name: 'address',
          text: 'Beverly Hills, California, US'
        },
        {
          id: 4,
          icon: 'pi-clock',
          name: 'working-hour',
          text: '09:00 - 18:00'
        }
      ]
    }
  },
  setup() {
    const toast = useToast()
    const contactStore = useContactStore()
    const { btnLoading } = storeToRefs(contactStore)
    const { addContact } = contactStore

    const showSuccess = () => {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Contact saved!',
        life: 3000
      })
    }

    return { v$: useVuelidate(), btnLoading, addContact, showSuccess }
  },
  validations() {
    return {
      name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required
      }
    }
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true

      if (isFormValid) {
        const payload = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message
        }
        this.addContact(payload)
          .then(() => {
            this.showSuccess()
            this.resetForm()
          })
          .finally(() => {
            this.submitted = false
          })
      }
    },
    resetForm() {
      this.name = ''
      this.email = ''
      this.phone = ''
      this.message = ''
    }
  }
}
</script>

<style lang="scss">
#contact-page {
  .p-button {
    background: black;
    border-color: black;
    &:hover {
      color: black;
      background: #ccc;
      border-color: #ccc;
    }
  }
}
</style>
