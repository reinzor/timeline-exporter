<template>
  <b-form inline id="data-selection">
    <label class="sr-only" for="from-data">From</label>
    <b-form-datepicker id="from-date" v-model="from" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>
    <label class="sr-only" for="to-date">To</label>
    <b-form-datepicker id="to-date" v-model="to" class="mb-2 mr-sm-2 mb-sm-0"></b-form-datepicker>
    <b-button variant="outline-secondary" :disabled="buttonDisabled" @click="fetchData">Fetch
      <b-spinner small v-if="fetching"></b-spinner>
    </b-button>
  </b-form>
</template>

<script>
import fetchGoogleTimelineData from '../services/fetch-google-timeline-data'

export default {
  data() {
    return {
      from: new Date(),
      to: new Date(),
      fetching: false
    };
  },
  computed: {
    buttonDisabled() {
      return this.from === '' || this.to === '' || this.fetching
    }
  },
  methods: {
    fetchData () {
      this.fetching = true
      fetchGoogleTimelineData(this.from, this.to).then((data) => {
        this.$emit('data-updated', data)
        this.fetching = false
      }).catch((error) => {
        console.log(error)
      })
    }
  }
};
</script>
<style>
#data-selection {
  margin-top: 10px;
  margin-bottom: 10px;
}
.b-form-datepicker {
  width: 300px !important
}
</style>