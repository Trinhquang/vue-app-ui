<template>
  <main id="about-page">
    <Banner title="About" />
    <div class="p-container py-6">
      <div class="grid">
        <div class="col-12 md:col-5">
          <Image
            src="https://archinect.imgix.net/uploads/99/9977a8564ee767c5b8d667f02fee4962.jpg?fit=crop&auto=compress%2Cformat&w=615"
            alt="Image"
            preview
          />
        </div>
        <div class="col-12 md:col-7 pl-5">
          <p class="mb-3">
            <strong> Mission: </strong>
            The goal of Archinect is to make architecture more connected and open-minded, and bring together designers
            from around the world to introduce new ideas from all disciplines.
          </p>
          <p class="mb-3">
            <strong> Background: </strong>
            Archinect was initially developed in 1997 by Paul Petrunia. The site has since become a top online
            destination for progressive-design oriented students, architects, educators, and fans.
          </p>
          <p>
            <strong> The Team: </strong>
            Archinect's direction is driven by the staff and contributors, as pictured below. Archinect's member-based
            community system allows anyone to participate by registering and contributing. Please contact us if you
            would like to contribute. We're always open to new perspectives.
          </p>
        </div>
      </div>
      <Divider class="my-5" />
      <Customer />
    </div>
  </main>
</template>

<script>
import Banner from '../components/Banner'
import Customer from '../components/Customer'
import Image from 'primevue/image'
import Divider from 'primevue/divider'

export default {
  name: 'About',
  components: {
    Banner,
    Customer,
    Image,
    Divider
  }
}
</script>

<style></style>
