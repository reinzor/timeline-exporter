<template>
  <div>
    <b-card-body style="padding-bottom: 0">
      <multiselect v-model="names" :multiple="true" :options="nameOptions"></multiselect>
    </b-card-body>
    <data-table :data="timesheetData" />
  </div>
</template>

<script>
import DataTable from './DataTable'

export default {
  components: {
    DataTable
  },
  data() {
    return {
      names: []
    }
  },
  computed: {
    nameOptions() {
      return Array.from(new Set(this.data.items.map(i => i.name)))
    },
    timesheetData() {
      let items = this.data.items.filter(i => this.names.length === 0 || this.names.includes(i.name))
      items = items.map(i => {
        return {
          name: i.name,
          address: i.address,
          timeBegin: i.timeBegin,
          timeEnd: i.timeEnd,
          duration: i.duration,
          category: i.category
        }
      })
      return { name: `timesheet_${this.data.name}`, items: items }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
