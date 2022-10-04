<template>
  <b-card-body>
    <b-button-group class="d-print-none">
      <b-dropdown variant="primary">
        <template #button-content>
          <b-icon icon="download" aria-hidden="true"></b-icon>
        </template>
        <b-dropdown-item>
          <download-csv :data="csvItems" :name="`${data.name}.csv`">CSV</download-csv>
        </b-dropdown-item>
        <b-dropdown-item @click="print">PDF</b-dropdown-item>
      </b-dropdown>
    </b-button-group>
    <div v-for="data in groupedData" :key="data.name" style="margin-top: 20px">
      <h4>{{ data.name }}</h4>
      <b-table striped hover :items="data.items">
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
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | distance }}</span>
        </template>
        <template #cell(latitude)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | round(3) }}</span>
        </template>
        <template #cell(longitude)="data">
          <span v-b-tooltip.hover :title="`${data.value}`">{{ data.value | round(3) }}</span>
        </template>
      </b-table>
      <small class="text-muted">
        <i>Duration: {{ data.durationSum | duration('asHours') | round(2) }} hours</i>
        <i v-if="data.distanceSum">, Distance: {{ data.distanceSum | distance }}</i>
      </small>
    </div>
    <hr />
    <p class="text-muted">
      <i>Duration: {{ durationSum | duration('asHours') | round(2) }} hours</i>
      <i v-if="distanceSum">, Distance: {{ distanceSum | distance }}</i>
    </p>
  </b-card-body>
</template>

<script>
import DownloadCsv from 'vue-json-csv'
import { groupBy } from 'underscore'
import { getWeekNumber, getFirstDayOfWeek, getLastDayOfWeek, getFirstDayOfMonth } from '../util/date'
import globalOptions from '../services/global_options'
import moment from 'moment'

export default {
  components: {
    DownloadCsv
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    print() {
      window.print()
    }
  },
  computed: {
    groupedData() {
      const groups = groupBy(this.data.items, item => {
        if (globalOptions.groupMode === 'Week') {
          const weekNumber = getWeekNumber(item.timeBegin)
          const beginDay = moment(getFirstDayOfWeek(item.timeBegin)).format('ll')
          const endDay = moment(getLastDayOfWeek(item.timeBegin)).format('ll')
          return `Week ${weekNumber}: ${beginDay} - ${endDay}`
        } else if (globalOptions.groupMode === 'Month') {
          return moment(getFirstDayOfMonth(item.timeBegin)).format('MMMM YYYY')
        }
        return ``
      })
      return Object.keys(groups).map(group => {
        return {
          name: group,
          items: groups[group],
          durationSum: groups[group].reduce((sum, item) => {
            return sum + item.duration
          }, 0),
          distanceSum: groups[group].reduce((sum, item) => {
            if (item.distance !== undefined) {
              return sum === undefined ? item.distance : sum + item.distance
            }
            return undefined
          }, undefined)
        }
      })
    },
    durationSum() {
      return this.data.items.reduce((sum, item) => {
        return sum + item.duration
      }, 0)
    },
    distanceSum() {
      return this.data.items.reduce((sum, item) => {
        if (item.distance !== undefined) {
          return sum === undefined ? item.distance : sum + item.distance
        }
        return undefined
      }, undefined)
    },
    csvItems() {
      return this.data.items.map(item => {
        let csvItem = Object.assign({}, item)
        if (globalOptions.csvExportDatesInLocalTimezone) {
          csvItem.timeBegin = moment(item.timeBegin).format('YYYY-MM-DDTHH:mm:ss.SSS')
          csvItem.timeEnd = moment(item.timeEnd).format('YYYY-MM-DDTHH:mm:ss.SSS')
        }
        if (globalOptions.csvExportProcessedDistance) {
          csvItem.distance = this.$options.filters.distance(item.distance, 2, true)
        }
        if (globalOptions.csvExportProcessedDuration) {
          csvItem.duration = this.$options.filters.hhmmss(item.duration)
        }
        return csvItem
      })
    }
  }
}
</script>
<style scoped></style>
