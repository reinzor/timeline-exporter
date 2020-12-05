<template>
  <b-card-body>
    <b-table striped hover :items="data">
      <template #cell(timeBegin)="data">{{data.value.calendar()}}</template>
      <template #cell(timeEnd)="data">{{data.value.calendar()}}</template>
      <template #cell(duration)="data">{{data.value.humanize()}}</template>
      <template #cell(distance)="data">{{formatKilometers(data.value)}}</template>
    </b-table>
  </b-card-body>
</template>

<script>
import fetchGoogleTimelineData from '../services/fetch-google-timeline-data'
import { formatKilometers } from '../util/distance'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatKilometers
  }
};
</script>