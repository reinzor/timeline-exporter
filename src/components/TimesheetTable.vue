<template>
  <b-card-body>
    <multiselect v-model="names" :multiple="true" :options="nameOptions"></multiselect>
    <hr />
    <span class="text-muted" v-if="timesheetData.durationSum > 0">
      {{ timesheetData.durationSum | duration('humanize') }}
      ({{ timesheetData.durationSum | duration('asHours') | round(2) }} hours)
    </span>
    <div v-for="data in timesheetData.dataArray" :key="data.name">
      <hr />
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
      </b-table>
    </div>
  </b-card-body>
</template>

<script>
export default {
  data() {
    return {
      names: [],
      fields: [
        { key: 'name', sortable: true },
        { key: 'timeBegin', sortable: true },
        { key: 'timeEnd', sortable: true },
        { key: 'duration', sortable: true },
        { key: 'category', sortable: true }
      ]
    }
  },
  computed: {
    nameOptions() {
      return Array.from(new Set(this.data.items.map(i => i.name)))
    },
    timesheetData() {
      const filteredDataItems = this.data.items.filter(i => this.names.includes(i.name))
      const durationSum = filteredDataItems.reduce((sum, i) => {
        return sum + i.duration
      }, 0)
      return {
        dataArray: [{ name: 'all', items: filteredDataItems }],
        durationSum: durationSum
      }
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
