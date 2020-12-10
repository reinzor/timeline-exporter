<template>
  <b-card-body>
    <b-dropdown variant="primary">
      <template #button-content>
        <b-icon icon="download" aria-hidden="true"></b-icon>
      </template>
      <b-dropdown-item>
        <download-csv :data="data.items" :name="`${data.name}.csv`">CSV</download-csv>
      </b-dropdown-item>
    </b-dropdown>
    <b-table striped hover :items="data.items" :fields="fields">
      <template #cell(timeBegin)="data">
        <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | moment('calendar') }}</span>
      </template>
      <template #cell(timeEnd)="data">
        <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | moment('calendar') }}</span>
      </template>
      <template #cell(duration)="data">
        <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | duration('humanize') }}</span>
      </template>
      <template #cell(distance)="data">
        <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | kilometers }}</span>
      </template>
    </b-table>
  </b-card-body>
</template>

<script>
import DownloadCsv from 'vue-json-csv'

export default {
  components: {
    DownloadCsv
  },
  data() {
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'address', sortable: true },
        { key: 'timeBegin', sortable: true },
        { key: 'timeEnd', sortable: true },
        { key: 'duration', sortable: true },
        { key: 'category', sortable: true },
        { key: 'distance', sortable: true }
      ]
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
<style scoped>
table {
  margin-top: 20px;
}
</style>
