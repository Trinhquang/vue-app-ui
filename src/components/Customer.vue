<template>
  <DataTable
    :value="contactList"
    :paginator="true"
    class="p-datatable-customers"
    :rows="5"
    dataKey="id"
    :rowHover="true"
    v-model:filters="filters"
    filterDisplay="menu"
    :loading="loading"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 15, 20]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
    :globalFilterFields="['name']"
    responsiveLayout="scroll"
  >
    <template #header>
      <div class="flex justify-content-between align-items-center">
        <h5 class="m-0 font-bold text-xl">Customers</h5>
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText
            v-model="filters['global'].value"
            placeholder="Search"
          />
        </span>
      </div>
    </template>
    <template #empty> No customers found. </template>
    <template #loading> Loading customers data. Please wait. </template>

    <Column
      field="name"
      header="Name"
      sortable
    />
    <Column
      field="email"
      header="Email"
      sortable
    />
    <Column
      field="phone"
      header="Phone Number"
      sortable
    />
  </DataTable>
</template>

<script>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import { useContactStore } from '../stores'
import { storeToRefs } from 'pinia'
import { FilterMatchMode, FilterOperator } from 'primevue/api'

export default {
  name: 'Customer',
  components: {
    DataTable,
    Column,
    InputText
  },
  setup() {
    const contactStore = useContactStore()
    const { loading, contactList } = storeToRefs(contactStore)
    const { fetchCustomers } = contactStore

    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      }
    })

    return { filters, loading, contactList, fetchCustomers }
  },
  async created() {
    await this.fetchCustomers()
  }
}
</script>

<style scoped></style>
