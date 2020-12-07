<template>
  <b-card-body>
    <b-table striped hover :items="data">
      <template #cell(timeBegin)="data">
        <span v-b-tooltip.hover :title="data.value.format('YYYY-DD-MM hh:mm:ss')" v-text="data.value.calendar()" />
      </template>
      <template #cell(timeEnd)="data">
        <span v-b-tooltip.hover :title="data.value.format('YYYY-DD-MM hh:mm:ss')" v-text="data.value.calendar()" />
      </template>
      <template #cell(duration)="data">
        <span v-b-tooltip.hover :title="formatDuration(data.value)" v-text="data.value.humanize()" />
      </template>
      <template #cell(distance)="data">
        <span v-b-tooltip.hover :title="data.value" v-text="formatKilometers(data.value)" />
      </template>
    </b-table>
  </b-card-body>
</template>

<script>
import fetchGoogleTimelineData from '../services/fetch-google-timeline-data'
import { formatDuration } from '../util/time'
import { formatKilometers } from '../util/distance'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDuration,
    formatKilometers
  }
};
</script>