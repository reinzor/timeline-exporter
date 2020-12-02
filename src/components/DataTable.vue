<template>
  <b-card-body>
    <b-table striped hover :items="items"></b-table>
  </b-card-body>
</template>

<script>
import fetchGoogleTimelineData from '../services/fetch-google-timeline-data'

export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    items() {
      return this.data.map((e) => {
        return e.properties
      })
    }
  }
};
</script>