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
    <b-table striped hover :items="data.items">
      <template #cell(timeBegin)="data">
        <span v-b-tooltip.hover :title="data.value">{{ data.value | moment("calendar") }}</span>
      </template>
      <template #cell(timeEnd)="data">
        <span v-b-tooltip.hover :title="data.value">{{ data.value | moment("calendar") }}</span>
      </template>
      <template #cell(duration)="data">
        <span v-b-tooltip.hover :title="data.value">{{ data.value | duration('humanize') }}</span>
      </template>
      <template #cell(distance)="data">
        <span v-b-tooltip.hover :title="data.value" v-text="formatKilometers(data.value)" />
      </template>
    </b-table>
  </b-card-body>
</template>

<script>
import DownloadCsv from 'vue-json-csv'

import fetchGoogleTimelineData from '../services/fetch-google-timeline-data'
import { formatDuration } from '../util/time'
import { formatKilometers } from '../util/distance'

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
    formatDuration,
    formatKilometers
  }
};
</script>
<style scoped>
table {
  margin-top: 20px;
}
</style>